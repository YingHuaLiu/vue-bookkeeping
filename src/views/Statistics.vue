<template>
  <div class="statistics">
    <div class="title">
      <span class="title-date">
        <yd-datetime v-model="date" type="month" :callback="callback" :end-date="endDate"></yd-datetime>
        <Icon name="jiantouxia"/>
      </span>
      <span class="title-expense-income">
        <span @click="type='-'" :class="type==='-'?'selected':''">支出</span>
        <span> / </span>
        <span @click="type='+'" :class="type==='+'?'selected':''">收入</span>
      </span>
    </div>
    <div :class="[selectedMonthList.length===0?'ifLengthIsZero':'']">
      <div class="line-chart-wrapper">
        <v-chart class="line-chart" :option="lineOption"/>
      </div>
      <div class="pie-chart-wrapper">
        <v-chart class="pie-chart" :option="pieOption"/>
      </div>
    </div>
    <div :class="[selectedMonthList.length===0?'':'ifLengthIsZero']">
      <NullList/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Watch} from 'vue-property-decorator'
import _ from 'lodash'
import dayjs from 'dayjs'
import {use} from 'echarts/core'
import {CanvasRenderer} from 'echarts/renderers'
import {PieChart, LineChart} from 'echarts/charts'
import {TitleComponent, TooltipComponent, LegendComponent, GridComponent} from 'echarts/components'
import VChart from 'vue-echarts'
import NullList from '@/components/NullList.vue'

use([
  CanvasRenderer,
  PieChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

type  Result = {
  date: string;
  income: number;
  expense: number;
  items: RecordItem[];
}[];

type RootState = {
  recordList: RecordItem[];
}
@Component({
  components: {NullList, VChart}
})
export default class Statistics extends Vue {
  date = dayjs(new Date()).format('YYYY-MM-DD')
  endDate = this.date
  year = dayjs(new Date()).format('YYYY')
  month = dayjs(new Date()).format('MM')
  type = '-'
  selectedMonthList: Result = []

  get recordList() {
    return (this.$store.state as RootState).recordList
  }

  get groupedList() {
    const {recordList} = this
    if (recordList.length === 0) {
      return [] as Result
    }
    const newRecordList: RecordItem[] = JSON.parse(JSON.stringify(recordList))
        .sort((a: RecordItem, b: RecordItem) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf())
    const result: Result = [
      {
        date: newRecordList[0].date,
        items: [newRecordList[0]],
        income: 0,
        expense: 0
      }
    ]
    for (let i = 1; i < newRecordList.length; i++) {
      const current = newRecordList[i]
      const last = result[result.length - 1]
      if (last.date === current.date) {
        last.items.push(current)
      } else {
        result.push({
          date: current.date,
          items: [current],
          income: 0,
          expense: 0
        })
      }
    }
    result.map(group => {group.income = group.items.reduce((sum, item) => {return sum + item.amount}, 0)})
    result.map(group => {group.expense = group.items.reduce((sum, item) => {return sum + item.amount}, 0)})
    result.forEach(group => {
      let income = 0, expense = 0
      group.items.forEach(item => {
        if (item.type === '+') {
          income += item.amount
        } else {
          expense += item.amount
        }
      })
      group.income = income
      group.expense = expense
    })
    return result
  }

  get lineOption() {
    const xData = [], expenseData = [], incomeData = []
    this.selectedMonthList = this.groupedList.filter(item =>
        dayjs(item.date).format('YYYY') === this.year &&
        dayjs(item.date).format('MM') === this.month)

    for (let i = 0; i < dayjs(this.date).daysInMonth(); i++) {
      xData.push(`${i + 1}`)
      const found = _.find(this.selectedMonthList, {
        date: dayjs(`${this.year}-${this.month}-${i + 1}`).format('YYYY-MM-DD')
      })
      expenseData.push(found ? found.expense : 0)
      incomeData.push(found ? found.income : 0)
    }
    return {
      title: {
        text: '收支趋势图'
      },
      tooltip: {
        trigger: 'axis',
        // formatter: '{b0}: {c0}'
      },
      grid: {
        left: '15vw',
        right: '15vw'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xData
      },
      yAxis: {
        show: false,
        type: 'value'
      },
      series: [
        {
          name: this.type === '-' ? '支出' : '收入',
          type: 'line',
          symbolSize: 4,
          data: this.type === '-' ? expenseData : incomeData
        }
      ]
    }
  }

  get pieOption() {
    const data: object[] = []
    this.selectedMonthList.forEach(dayItem => {
      dayItem.items.forEach(item => {
        if (item.type === this.type) {
          const found: | undefined = _.find(data, {name: item.tag.text})
          if (found) {
            found.value += item.amount
          } else {
            data.push({
              name: item.tag.text,
              value: item.amount
            })
          }
        }
      })
    })
    return {
      title: {
        text: '类别占比图'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'pie',
          data: data,
          tooltip: {
            formatter: '{b0}: {c0}元'
          }
        }
      ]
    }
  }

  beforeCreate() {
    this.$store.commit('fetchRecord')
  }

  callback(date: string) {
    this.date = date
    this.year = dayjs(this.date).format('YYYY')
    this.month = dayjs(this.date).format('MM')
  }
}
</script>

<style lang="scss" scoped>
.statistics {
  padding: 4vw 5vw 0 5vw;
}

.title {
  margin-bottom: 2vw;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title-date {
    display: flex;
    align-items: center;

    .yd-datetime-input {
      font-size: 20px;
      font-weight: bold;
    }

    .icon {
      font-size: 14px;
    }
  }

  .title-expense-income {
    font-size: 14px;
    font-weight: bold;
    color: #717774;

    .selected {
      color: black;
    }
  }
}

.line-chart-wrapper {
  width: 100%;
  height: 30vh;
  border: 1px solid black;
  margin-bottom: 2vh;
  //overflow: hidden;
}

.pie-chart-wrapper {
  width: 100%;
  height: 30vh;
  border: 1px solid black;
}

.ifLengthIsZero {
  display: none;
}
</style>

<template>
  <div class="detail-wrapper">
    <div class="detail">
      <div class="detail-date-total">
        <div class="detail-date">
          <Icon name="rili"/>
          <yd-datetime v-model="time" type="month" :callback="callback" :end-date="endDate"></yd-datetime>
        </div>
        <div class="detail-total">
          <span class="detail-total-left">总收入:{{ monthIncome }}元</span>
          |
          <span class="detail-total-right">总支出:{{ monthExpense }}元</span>
        </div>
      </div>
      <ol>
        <li class="group" v-for="(record,index) in selectedMonthList" :key="index">
          <div class="groupTitle">
            <span>{{ record.date }} {{ record.weekday }}</span>
            <span></span>
            <span>收入:{{ record.income }}元 | 支出:{{ record.expense }}元</span>
          </div>
          <ol>
            <li v-for="item in record.items" :key="item.id">
              <van-swipe-cell :before-close="beforeClose" :name="item.id">
              <span class="tag">
                <Icon :name="item.tag.iconName"/>
                <a>{{ item.tag.text }}</a>
              </span>
                <span class="notes">{{ item.notes }}</span>
                <span class="amount">{{ item.type + item.amount }} </span>
                <template #right>
                  <van-button square type="danger" text="删除"/>
                </template>
              </van-swipe-cell>
            </li>
          </ol>
        </li>
      </ol>
      <div :class="[selectedMonthList.length===0?'':'ifLengthIsZero']">
        <NullList/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import dayjs from 'dayjs'
import NullList from '@/components/NullList.vue'

type  Result = {
  date: string;
  weekday: string;
  income: number;
  expense: number;
  items: RecordItem[];
}[];

type RootState = {
  recordList: RecordItem[];
}

type stringKeyObject = {
  [key: number]: string;
}
const weekdayMap: stringKeyObject = {
  0: '星期日',
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六'
}
@Component({
  components: {NullList}
})
export default class Detail extends Vue {
  time = dayjs(new Date()).format('YYYY-MM-DD')
  year = dayjs(new Date()).format('YYYY')
  month = dayjs(new Date()).format('MM')
  endDate = this.time
  monthIncome = 0
  monthExpense = 0
  selectedMonthList: Result = []

  get recordList() {
    return (this.$store.state as RootState).recordList
  }

  get groupedList() {
    const {recordList} = this
    if (recordList.length === 0) {
      return [] as Result
    }
    const newList: RecordItem[] = JSON.parse(JSON.stringify(recordList))
        .sort((a: RecordItem, b: RecordItem) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf())
    const result: Result = [
      {
        date: newList[0].date!,
        weekday: weekdayMap[dayjs(newList[0].date).day()],
        items: [newList[0]],
        income: 0,
        expense: 0
      }
    ]
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i]
      const last = result[result.length - 1]
      if (last.date === current.date) {
        last.items.push(current)
      } else {
        result.push({
          date: current.date!,
          weekday: weekdayMap[dayjs(current.date).day()],
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

  beforeCreate() {
    this.$store.commit('fetchRecord')
  }

  beforeMount() {
    this.monthTotal()
  }

  monthTotal() {
    this.monthExpense = 0
    this.monthIncome = 0
    this.selectedMonthList = this.groupedList.filter(item =>
        dayjs(item.date).format('YYYY') === this.year &&
        dayjs(item.date).format('MM') === this.month)
    for (let i = 0; i < this.selectedMonthList.length; i++) {
      this.monthExpense += this.selectedMonthList[i].expense
      this.monthIncome += this.selectedMonthList[i].income
    }
  }

  callback(time: string) {
    this.time = time
    this.year = dayjs(this.time).format('YYYY')
    this.month = dayjs(this.time).format('MM')
    this.monthTotal()
  }

  beforeClose({name, instance}: Record<string, any>) {
    this.$dialog.confirm({
      message: '确定删除吗？',
    }).then(() => {
      this.$store.commit('deleteRecord', name)
      this.monthTotal()
    }).catch(() => {
      instance.close()
    })
  }
}
</script>

<style lang="scss" scoped>
.detail-wrapper {
  overflow: auto;
}

.detail-date-total {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2vh;
}

.detail-date {
  font-size: 22px;
  display: flex;
  align-items: center;

  svg {
    font-size: 34px;
  }
}

.detail-total {
  width: 100%;
  font-size: 16px;

  .detail-total-left {
    display: inline-block;
    text-align: right;
    width: 48%;
  }

  .detail-total-right {
    display: inline-block;
    width: 45%;
  }
}

.detail {
  max-height: 92vh;
  margin: 0 4.5vw;
  font-weight: bold;

  .group {
    margin-bottom: 12px;
    font-size: 14px;

    .groupTitle {
      color: grey;
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
    }

    .van-swipe-cell {
      width: 100%;
      margin-top: 2vw;
      border-bottom: 1px solid #e8e8e8;
      height: 42px;

      .tag {
        width: 20vw;

        svg {
          border: 1px solid #717774;
          border-radius: 50%;
          font-size: 32px;
          margin-right: 2vw;
        }

        a {
          display: inline-block;
          overflow: hidden; //超出的文本隐藏
        }
      }

      .notes {
        display: inline-block;
        width: 40vw;
        margin: 0 3vw;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
      }

      .amount {
        display: inline-block;
        width: 24vw;
        text-align: right;
        overflow: hidden; //超出的文本隐藏
      }
    }
  }


}

.ifLengthIsZero {
  display: none;
}
</style>

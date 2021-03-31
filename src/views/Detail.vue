<template>
  <div class="detail">
    <h3>收支记录</h3>
    <ol>
      <li class="group" v-for="(record,index) in groupedList" :key="index">
        <div class="groupTitle">
          <span>{{ record.date }} </span>
          <span>{{ record.weekday }}</span>
          <span>收入:{{ record.income }}|支出:{{ record.expense }}</span>
        </div>
        <ol>
          <li v-for="item in record.items" :key="item.id">
            <van-swipe-cell>
              <Icon :name="item.tag.iconName"/>
              <span>{{ item.tag.text }}</span>
              <span>{{ item.notes }}</span>
              <span>{{ item.amount }}</span>
              <template #right>
                <van-button square type="danger" text="删除"/>
              </template>
            </van-swipe-cell>

          </li>
        </ol>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import dayjs from 'dayjs'

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
@Component
export default class Detail extends Vue {
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
        date: newList[0].date,
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
          date: current.date,
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
}
</script>

<style lang="scss" scoped>
.detail {
  height: 92vh;
  margin: 0 16px;
  font-weight: bold;

  .group {
    margin-bottom: 12px;
    font-size: 14px;

    .groupTitle {
      color: grey;
    }

    .van-swipe-cell {
      border-bottom: 1px solid grey;

      svg {
        font-size: 34px;
      }
    }
  }


}
</style>

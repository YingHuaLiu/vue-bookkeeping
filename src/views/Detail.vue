<template>
  <div class="detail">
    <h3>收支记录</h3>
    <ol>
      <li v-for="(record,index) in groupedList" :key="index">
        <div>
          <span>{{ record.date }} </span>
          <span>{{ record.weekday }}</span>
          <span>结余:{{record.total}}</span>
        </div>
        <ol>
          <li v-for="item in record.items" :key="item.id">
            <van-swipe-cell>
              <van-cell :border="false" title="单元格" value="内容" />
              <template #right>
                <van-button square type="danger" text="删除" />
              </template>
            </van-swipe-cell>
            <span>{{ item.tag.iconName }}</span>
            <span>{{ item.tag.text }}</span>
            <span>{{ item.notes }}</span>
            <span>{{ item.amount }}</span>
          </li>
        </ol>
      </li>
      <!--      <li v-for="(group,index) in groupedList" :key="index">-->
      <!--        <h3 class="title">{{ beautify(group.title) }} <span>￥{{ group.total }}</span></h3>-->
      <!--        <ol>-->
      <!--          <li class="record" v-for="item in group.items" :key="item.id">-->
      <!--            <span>{{ tagString(item.tags) }}</span>-->
      <!--            <span class="notes">{{ item.notes }}</span>-->
      <!--            <span>￥{{ item.amount }}</span>-->
      <!--          </li>-->
      <!--        </ol>-->
      <!--      </li>-->
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
  total?: number;
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
        items: [newList[0]]
      }
    ]
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i]
      const last = result[result.length - 1]
      if (last.date === current.date) {
        last.items.push(current)
      } else {
        result.push({date: current.date, weekday: weekdayMap[dayjs(current.date).day()], items: [current]})
      }
    }
    result.map(group => {group.total = group.items.reduce((sum, item) => sum + item.amount, 0)})
    return result
  }

  beforeCreate() {
    this.$store.commit('fetchRecord')
  }
}
</script>

<style lang="scss" scoped>
.detail{
  height: 92vh;
  background-image: url("../../public/img/bg.jpg");
  h3{
    font-weight: bold;
  }
  .van-cell{
    background: transparent;
  }
}
</style>

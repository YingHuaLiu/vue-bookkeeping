<template>
  <div class="nav">
    <van-tabbar v-model="active" @change="onChange" :route="true">
      <van-tabbar-item to="/money" name="money" icon="add-o">记账</van-tabbar-item>
      <van-tabbar-item to="/detail" name="detail" icon="search">明细</van-tabbar-item>
      <van-tabbar-item to="/statistics" name="statistics" icon="chart-trending-o">统计</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component
export default class Nav extends Vue {
  active = this.$router.history.current.path.substring(1)

  onChange(active: string) {
    this.active = active
  }
}
</script>

<style lang="scss" scoped>
.van-tabbar {
  height: 8vh;
}
</style>

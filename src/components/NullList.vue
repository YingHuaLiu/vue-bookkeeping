<template>
  <div class="null-list">
    <div class="icon">
      <Icon name="cat"/>
    </div>
    <div class="text">
      抱歉当前时间没有记录哦喵~
    </div>
    <div>
      <van-button type="default" @click="jumpToMoney">去记账！</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component
export default class extends Vue {
  jumpToMoney() {
    this.$router.push('/')
  }
}
</script>

<style lang="scss" scoped>
.null-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  .icon {
    font-size: 160px;
  }

  .text {
    font-size: 18px;
  }

  .van-button {
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    background: #e88294;
    color: white;
  }
}

</style>

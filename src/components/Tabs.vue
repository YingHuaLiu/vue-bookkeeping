<template>
  <ul class="tabs">
    <li @click="select('-')" :class="type==='-'?'selected':''">支出</li>
    <li @click="select('+')" :class="type==='+'?'selected':''">收入</li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

@Component
export default class Tabs extends Vue {
  @Prop(String) type!: string

  select(type: string) {
    this.$emit('updateType', type)
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  text-align: center;
  font-size: 24px;
  height: 8vh;
  color: grey;

  li {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.selected {
      color: black;
    }
  }
}
</style>

<template>
  <ul class="types">
    <li :class="value==='-'&&'selected'" @click="selectedType('-')">支出</li>
    <li :class="value==='+'&&'selected'" @click="selectedType('+')">收入</li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Types extends Vue {
  @Prop() readonly value!: string;  //!可以不用设置初始值

  selectedType(type: string) {
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown');
    }
    this.$emit('update:value', type);
  }
}
</script>
<style lang="scss" scoped>
.types {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;

  > li {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.selected::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 4px;
      left: 0;
      bottom: 0;
      background: #000;
    }
  }
}
</style>
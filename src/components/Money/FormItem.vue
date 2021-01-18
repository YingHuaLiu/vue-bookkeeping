<template>
  <label class="formItem">
    <span class="name">{{ fieldName }}</span>
    <input type="text" :placeholder="placeHolder" :value="value" @input="onValueChanged($event.target.value)">
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue {
  @Prop({default: ''}) readonly value!: string;
  @Prop({required: true}) fieldName!: string;
  @Prop() placeHolder?: string;

  onValueChanged(value: string) {
    this.$emit('update:value', value);
  }
}
</script>

<style lang="scss" scoped>
.formItem {
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;

  .name {
    padding-right: 16px;
  }

  input {
    height: 44px;
    flex-grow: 1;
    background: transparent;
    border: none;
  }
}
</style>
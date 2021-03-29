<template>
  <label class="formItem">
    <span class="name">{{ fieldName }}</span>
    <input type="text" :placeholder="placeHolder"
           :value="value"
           @compositionstart="flag = false" @compositiοnend="flag = false"
           @input="onValueChanged($event.target.value)">
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
  height:8vh;
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  background: #f6d169;

  .name {
    padding-right: 16px;
  }

  input {
    height: 30px;
    flex-grow: 1;
    border: none;
    background: #f6d169;
  }
}
</style>

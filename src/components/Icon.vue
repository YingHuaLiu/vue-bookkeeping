<template>
  <svg class="icon" @click="$emit('click',$event)">
    <use :xlink:href="'#icon-'+name"/>
  </svg>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

@Component
export default class Icon extends Vue {
  @Prop(String) readonly name!: string
}
</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

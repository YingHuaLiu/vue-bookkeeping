<template>
  <div class="layout">
    <div class="tabsAndTags">
      <Tabs :type="record.type" v-on:updateType="updateType"/>
      <Tags v-on:updateTag="updateTag"/>
    </div>
    <NumberPad @submit="saveRecord"/>
  </div>
</template>

<script lang="ts">
import Tabs from '@/components/Tabs.vue'
import Tags from '@/components/Tags.vue'
import NumberPad from '@/components/NumberPad.vue'
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component({
  components: {Tabs, NumberPad, Tags}
})
export default class Money extends Vue {
  record: RecordItem = {
    tag: {},
    notes: '',
    type: '-',
    amount: 0,
    date: ''
  }

  updateType(type: string) {
    this.record.type = type
  }

  updateTag(tag: Tag) {
    this.record.tag = tag
  }

  saveRecord(notes: string, amount: number, date: Date) {
    this.record.notes = notes
    this.record.amount = amount
    this.record.date = date
    console.log(this.record)
    this.$store.commit('createRecord', this.record)
  }
}
</script>

<style lang="scss">
.layout {
  height: 92vh;
  display: flex;
  flex-direction: column;

  .tabsAndTags {
    background-image: url("../../public/img/bg.jpg");
  }
}
</style>

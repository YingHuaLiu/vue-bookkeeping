<template>
  <div class="layout">
    <Tabs :type="record.type" v-on:updateType="updateType"/>
    <Tags :type="record.type" v-on:updateTag="updateTag"/>
    <NumberPad @submit="saveRecord"/>
  </div>
</template>

<script lang="ts">
import Tabs from '@/components/Tabs.vue'
import Tags from '@/components/Tags.vue'
import NumberPad from '@/components/NumberPad.vue'
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import createId from '@/lib/createId'

@Component({
  components: {Tabs, NumberPad, Tags}
})
export default class Money extends Vue {
  record: RecordItem = {
    id: undefined,
    tag: undefined,
    notes: '',
    type: '-',
    amount: 0,
    date: undefined
  }

  updateType(type: string) {
    this.record.type = type
  }

  updateTag(tag: Tag) {
    this.record.tag = tag
  }

  saveRecord(notes: string, amount: number, date: string) {
    this.record.id = createId()
    this.record.notes = notes
    this.record.amount = amount
    this.record.date = date
    this.$store.commit('createRecord', this.record)
  }
}
</script>

<style lang="scss">
.layout {
  height: 92vh;
  display: flex;
  flex-direction: column;
}
</style>

<template>
  <div class="layout">
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <Tags @update:value="onUpdateTags"/>
    <FormItem field-name="备注" place-holder="请输入备注" @update:value="onUpdateNotes"/>
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
  </div>
</template>

<script lang="ts">
import Tags from '@/components/Money/Tags.vue'
import FormItem from '@/components/Money/FormItem.vue'
import NumberPad from '@/components/Money/NumberPad.vue'
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import recordTypeList from '@/constants/recordTypeList'
import Tabs from '@/components/Tabs.vue'

@Component({
  components: {Tabs, NumberPad, FormItem, Tags}
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList
  }

  recordTypeList = recordTypeList
  record: RecordItem = {
    tags: [], notes: '', type: '-', amount: 0
  }

  created() {
    this.$store.commit('fetchRecords')
  }

  onUpdateTypes(value: string) {
    this.record.type = value
  }

  onUpdateNotes(value: string) {
    this.record.notes = value
  }

  onUpdateTags(value: string[]) {
    this.record.tags = value
  }

  saveRecord() {
    this.$store.commit('createRecord', this.record)
  }
}
</script>

<style lang="scss">
.layout {
  height: 90vh;
  display: flex;
  flex-direction: column;
}
</style>

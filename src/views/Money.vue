<template>
  <Layout class-prefix="layout">
    {{ recordList }}
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <!--    <Types :value="record.type" @update:value="onUpdateTypes"/>-->
    <Types :value.sync="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    <!--sync是用于子组件修改了datasource的值可以相应修改tags的值-->
  </Layout>
</template>

<script lang="ts">
import Tags from '@/components/Money/Tags.vue';
import Notes from '@/components/Money/Notes.vue';
import Types from '@/components/Money/Types.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import model from '@/model';
//2ed640fad95f0f7e46b70b07753c76366d0e4874
const recordList = model.fetch();

@Component({
      components: {NumberPad, Types, Notes, Tags},
    }
)
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行'];
  record: RecordItem = {
    tags: [], notes: '', type: '-', amount: 0
  };
  recordList = recordList;

  onUpdateTypes(value: string) {
    this.record.type = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  saveRecord() {
    const record2 = model.clone(this.record);
    record2.createdAt = new Date();
    this.recordList.push(record2);
  }

  @Watch('recordList')
  onRecordListChange() {
    window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
<style lang="scss" scoped>
</style>
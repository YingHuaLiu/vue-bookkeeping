<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <!--    <Types :value="record.type" @update:value="onUpdateTypes"/>-->
    <Types :value.sync="record.type"/>
    <div class="notes">
      <FormItem field-name="备注" place-holder="请输入备注" @update:value="onUpdateNotes"/>
    </div>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import Tags from '@/components/Money/Tags.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Types from '@/components/Money/Types.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import recordListModel from '@/models/RecordListModel';
import tagListModel from '@/models/TagListModel';

const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();

@Component({
      components: {NumberPad, Types, FormItem, Tags},
    }
)
export default class Money extends Vue {
  tags = tagList;
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
    const record2 = recordListModel.clone(this.record);
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

.notes {
  padding: 8px 0;
}
</style>
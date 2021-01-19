<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" @click="goBack" name="left"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag.name" @update:value="updateTag"
                field-name="标签名" place-holder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {Button, FormItem}
})
export default class EditLabel extends Vue {
  //todo
  tag = []//store.findTag(this.$route.params.id);

  created() {
    if (!this.tag) {
      this.$router.replace('/404');
    }
  }

  updateTag(name: string) {
    if (this.tag) {
      //todo
      // store.updateTag(this.tag.id, name);
    }
  }

  remove() {
    if (this.tag) {
      //todo
      // if (store.removeTag(this.tag.id)) {
      //   this.$router.back();
      // } else {
      //   window.alert('删除失败');
      // }
    }
  }

  goBack() {
    this.$router.back();
  }

}
</script>

<style lang="scss" scoped>
.navBar {
  background: white;
  height: 44px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > .leftIcon {
    width: 24px;
    height: 24px;
  }

  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}

.form-wrapper {
  background: white;
  margin-top: 8px;
}

.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>
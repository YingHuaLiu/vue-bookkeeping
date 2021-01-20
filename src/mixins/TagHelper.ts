import {Component} from 'vue-property-decorator';
import Vue from 'vue';

@Component
export class TagHelper extends Vue {
  createTag() {
    const tag = window.prompt('请输入新标签名');
    if (!tag) {
      return window.alert('标签名不能为空');
    }
    this.$store.commit('createTag', tag);
  }
}

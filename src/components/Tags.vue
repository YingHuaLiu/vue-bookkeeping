<template>
  <ul class="tags">
    <li v-for="(tag,index) in tagList" :key="index">
      <span v-if="tag.type===type" @click="selectTag(tag)" :class="tag.id===selectedTag.id?'selected':''">
        <Icon :name="tag.iconName"/>
        <a>{{ tag.text }}</a>
      </span>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import tagList from '@/database/tagList'

@Component
export default class Tags extends Vue {
  @Prop(String) type: string
  tagList = tagList
  selectedTag = null

  created() {
    this.selectedTag = tagList[0]
    this.$emit('updateTag', this.selectedTag)
  }

  selectTag(tag: Tag) {
    this.selectedTag = tag
    this.$emit('updateTag', tag)
  }
}
</script>

<style lang="scss" scoped>
.tags {
  padding: 0 16px 20px 16px;
  height: 44vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;

  span {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px #4d5450 solid;
    border-radius: 50%;
    width: 14vw;
    height: 14vw;
    margin: 4px 2vh;

    svg {
      font-size: 34px;
    }

    a {
      font-size: 8px;
      font-weight: bold;
    }

    &.selected {
      border: 3px solid #e46f81;
    }
  }


}
</style>

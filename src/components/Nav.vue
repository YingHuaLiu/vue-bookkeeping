<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money"/>
      记账
    </router-link>
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="label"/>
      标签
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics"/>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
import Icon from '@/components/Icon.vue';

export default {
  name: 'Nav',
  components: {Icon}
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
nav {
  @extend %outerShadow;
  display: flex;
  flex-direction: row;
  font-size: 12px;

  > .item {
    display: flex;
    flex-direction: column;
    width: 33.333%;
    justify-content: center;
    align-items: center;
    margin: 4px 0;

    .icon {
      width: 32px;
      height: 32px;
    }
  }

  > .item.selected {
    color: red;
  }
}


</style>
<script setup>
defineOptions({ name: 'MenuItem ' })

defineProps({
  menu: {
    type: Object
  }
})
</script>

<template>
  <dl :style="{textIndent: menu.depth + 'em'}">
    <dt>
      <router-link :to="menu.path">{{ menu.meta.title }}</router-link>
    </dt>
    <dd v-if="menu.children">
      <MenuItem v-for="child of menu.children" :key="child.name" :menu="child" />
    </dd>
  </dl>
</template>

<style scoped lang="less">
dl {
  dt {
    a {
      display: block;
      border-radius: 5px;
      padding: 5px 0;
      margin: 5px 0;
      opacity: 0.9;

      &:hover {
        opacity: 1;
        background-color: hsla(160, 100%, 37%, 0.2);
      }

      &.router-link-exact-active {
        color: var(--color-text);

        &:hover {
          background-color: transparent;
        }
      }
    }
  }
}
</style>

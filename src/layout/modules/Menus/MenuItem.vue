<script setup>
import SvgIcon from '@/components/SvgIcon/index.vue'

defineOptions({ name: 'MenuItem ' })

defineProps({
  menu: {
    type: Object,
  },
})
</script>

<template>
  <dl>
    <dt>
      <router-link :to="menu.path" :style="{ paddingLeft: menu.depth + 'em' }"
        ><SvgIcon v-if="menu.meta.icon" :icon="menu.meta.icon" class="text-2xl" /><span>{{
          menu.meta.title
        }}</span></router-link
      >
    </dt>
    <dd v-if="menu.children">
      <MenuItem v-for="child of menu.children" :key="child.path" :menu="child" />
    </dd>
  </dl>
</template>

<style scoped lang="less">
dl {
  dt {
    a {
      display: flex;
      gap: 0 10px;
      border-radius: 5px;
      padding: 5px;
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

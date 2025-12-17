<script setup>
import {onMounted} from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

onMounted(() => {
  const leftStyle =
    'background-color:#2f353a;color:#fff;padding:0 5px;line-height:1.2rem;border-radius:0.2rem 0 0 0.2rem;'
  const rightStyle =
    'background-color:#17a2b8;color:#fff;padding:0 5px;line-height:1.2rem;border-radius:0 0.2rem 0.2rem 0;'
  console.log(`%c MODE %c ${import.meta.env.MODE}`, leftStyle, rightStyle)
  // eslint-disable-next-line no-undef
  console.log(`%c VERSION %c ${__APP_VERSION__}`, leftStyle, rightStyle)
  // eslint-disable-next-line no-undef
  console.log(`%c BUILD_TIME %c ${__APP_BUILD_TIME__}`, leftStyle, rightStyle)
})
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

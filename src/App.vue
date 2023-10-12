<template>
  <div>

    <SearchDeep />
    <HelloWorld />
  </div>
</template>

<script>

import SearchDeep from './components/Search.vue';
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
HelloWorld,
    SearchDeep
  }
}
</script>

<style scoped>
  * {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>

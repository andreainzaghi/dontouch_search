<template>
  <div>

    <SearchDeep />
    
  </div>
</template>

<script>

import SearchDeep from './components/Search.vue';

export default {
  name: 'App',
  components: {

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

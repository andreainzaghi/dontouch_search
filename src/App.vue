<template>
  <div>
   
    <SearchComponent />
    <!-- <HelloWorld /> -->
  </div>
</template>

<script>

import SearchComponent from './components/SearchComponent/SearchComponent.vue';
// import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
// HelloWorld,
    SearchComponent,
   
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

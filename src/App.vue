<template>
  <div>

    <!-- <SearchStatsComponent
      v-bind="$refs.searchComponentRef"
    />    -->
    <SearchComponent />
    <!-- <HelloWorld /> -->
  </div>
</template>

<script>

import SearchComponent from './components/SearchComponent/SearchComponent.vue';
// import SearchStatsComponent from './components/SearchStatsComponent.vue';
// import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
// HelloWorld,
    SearchComponent,
    // SearchStatsComponent
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

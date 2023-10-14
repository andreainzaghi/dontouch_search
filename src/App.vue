<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
// Poiché stai usando i componenti solo attraverso il router, non hai bisogno di importarli qui.
export default {
  name: 'App'
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

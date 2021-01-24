<template>
  <div id="app">
    <Sharescreen />
  </div>
</template>

<script>
import Sharescreen from './components/Sharescreen.vue'

export default {
  name: 'App',
  components: {
    Sharescreen
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

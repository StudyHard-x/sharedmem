

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import devPixelRatio from "@/utils/devicePixelRatio.js";

  export default {
    name: "App",
    created() {
      new devPixelRatio().init();
    }
  };
</script>

<style>
html,
body {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0px;
    margin: 0px;
}
#app {

    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    /*widows: 100%;*/
    height: 100%;
    width: 100%;
}
</style>

<template>
  <div class="bg-theme bg-theme1" id="app" data-app>
    
   <!-- end loader -->
    <div id="wrapper">
    <component v-bind:is="layout"></component>
    </div>
    <script2 type="text/javascript" src="/static/assets/js/jquery.min.js"></script2>
    <script2 type="text/javascript" src="/static/assets/js/popper.min.js"></script2>
    <script2 type="text/javascript" src="/static/assets/js/bootstrap.min.js"></script2>
    <!-- simplebar js -->
    <script2 src="/static/assets/plugins/simplebar/js/simplebar.js"></script2>
    <script2 type="text/javascript" src="/static/assets/js/sidebar-menu.js"></script2>
    <!-- Custom script2s -->
    <script2 src="/static/assets/js/app-script.js"></script2>
   
        
  </div>
</template>

<script>
const main = 'main'
export default {
  name: 'App',
  computed: {
    layout () {
      return (this.$route.meta.layout || main) + '-layout'
    }
  }
}
</script>
<style>
@import "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons";
@import "../static/assets/css/bootstrap.min.css";
@import "../static/assets/css/animate.css";
@import "../static/assets/css/icons.css";
@import "../static/assets/css/app-style.css";
@import "../static/assets/plugins/simplebar/css/simplebar.css";
@import "../static/assets/css/sidebar-menu.css";
@import "../static/assets/css/custom.css";
</style>


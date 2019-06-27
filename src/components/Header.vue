<template>
  <div id="app">
    <b-navbar
      toggleable="lg" 
      id="mainNav"
      v-b-scrollspy:nav-scroller
    >

      <b-navbar-brand class="mr-auto" href="/">
        <img src="./TINY_LOGO.png" alt="FIG ANALYTICS" class="center">
      </b-navbar-brand>
      <b-navbar-toggle id="nav-hover" target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto" >
          <b-nav-text  href="#about">About</b-nav-text>

          <b-nav-text href="#services">Services</b-nav-text>

          <b-nav-text to="/login">Login</b-nav-text>

          <b-nav-text to="/register">Sign Up</b-nav-text>

        </b-navbar-nav>
      </b-collapse>

    </b-navbar>
  </div>
</template>

<script src="./scripts/header.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/css/header.css";
</style>

<template>
  <div id="app">
    <b-navbar toggleable="lg" id="mainNav" v-b-scrollspy:nav-scroller>
      <b-navbar-brand class="mr-auto" href="/">
        <img src="./TINY_LOGO.png" alt="FIG ANALYTICS" class="center" />
      </b-navbar-brand>
      <b-navbar-toggle id="nav-hover" target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-text href="#about">
            <a class="nav-link" href="#about">About</a>
          </b-nav-text>

          <b-nav-text href="#services">
            <a class="nav-link" href="#services">Services</a>
          </b-nav-text>

          <b-nav-text>
            <router-link class="nav-link" to="/login">Login</router-link>
          </b-nav-text>

          <b-nav-text to="/register">
            <router-link class="nav-link" to="/register">Sign Up</router-link>
          </b-nav-text>
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

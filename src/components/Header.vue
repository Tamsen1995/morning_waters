<template>
  <div id="app">
    <b-navbar toggleable="lg" id="mainNav">
      <b-navbar-brand class="mr-auto" href="/">
        <img src="./TINY_LOGO.png" alt="FIG ANALYTICS" class="center" />
      </b-navbar-brand>
      <b-navbar-toggle id="nav-hover" target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-text @click="scrollToDiv('about')">
            <a class="nav-link">About</a>
          </b-nav-text>

          <b-nav-text @click="scrollToDiv('services')">
            <a class="nav-link">Services</a>
          </b-nav-text>

          <b-nav-text v-if="productionMode === false" @click="redirectTo('Login')">
            <a class="nav-link">Login</a>
          </b-nav-text>

          <b-nav-text v-if="productionMode === false" @click="redirectTo('Signup')">
            <a class="nav-link" to="/register">Sign Up</a>
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

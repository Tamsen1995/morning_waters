<template>

  <div id="app">
    <b-nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav" v-b-scrollspy:nav-scroller>
      <div class="container">
        <a class="navbar-brand" href="/"><img src="./TINY_LOGO.png" alt="FIG ANALYTICS" class="center"></a>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="#about">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#services">Services</a>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" to="/login">
                Login
              </router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" to="/register">
                Sign Up
              </router-link>
            </li>

          </ul>
        </div>
      </div>
    </b-nav>
  </div>
</template>

<script src="./scripts/header.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../assets/css/header.css';
</style>

<template>
  <div id="app">
    <b-nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand" href="/">
          <img src="./TINY_LOGO.png" alt="FIG ANALYTICS" class="center">
        </a>
        <button
          class="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
          <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <!-- /dashboard/creditsScreen/creditsPurchasing -->
            <!-- TODO : Insert credits here -->
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/dashboard/creditsScreen"
                v-if="this.user == null"
              >Credits: {{ this.credits }}</router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" to="/dashboard" v-if="this.user == null">Profile</router-link>
            </li>

            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/dashboard/quoteRequestsScreen"
                v-if="this.user == null"
              >Inbox</router-link>
            </li>

            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/dashboard/settings"
                v-if="this.user == null"
              >Settings</router-link>
            </li>

            <li class="nav-item" @click="logout()">
              <router-link class="nav-link" to="/">
                <i class="ti-close"></i> Logout
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </b-nav>
  </div>
</template>

<script src="./scripts/dashboardHeader.js">
</script>

<style>
@import "../assets/css/figanal.css";
</style>

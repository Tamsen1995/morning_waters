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

            <!-- Orders -->
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/dashboard/creditsScreen"
                v-if="this.user == null"
                style="padding-top:0px;padding-bottom:0px;"
              >
                <img
                  src="../assets/css/noun_orders_crop.png"
                  alt="New Orders"
                  width="60px"
                  height="40px"
                  style="padding-left:5px;"
                >
              </router-link>
              <router-link
                class="nav-link"
                to="/dashboard/creditsScreen"
                v-if="this.user == null"
                style="padding-top:0px;padding-bottom:0px; margin-bottom:0px;"
              >
                Orders
                <span class="badge badge-success">{{ this.credits }}</span>
              </router-link>
            </li>

            <!-- Inbox -->
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/dashboard/quoteRequestsScreen"
                v-if="this.user == null"
                style="padding-top:0px;padding-bottom:0px;padding-left:0px;"
              >
                <img src="../assets/css/noun_Mail_crop.png" alt="Inbox" width="55px" height="40px">
              </router-link>
              <router-link
                class="nav-link"
                to="/dashboard/quoteRequestsScreen"
                v-if="this.user == null"
                style="padding-top:0px;padding-bottom:0px; margin-bottom:0px;"
              >Inbox</router-link>
            </li>

            <!-- Profile -->
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/dashboard"
                v-if="this.user == null"
                style="padding-top:0px;padding-bottom:0px;"
              >
                <img
                  src="../assets/css/noun_profile_crop.png"
                  alt="Profile"
                  width="55px"
                  height="40px"
                >
              </router-link>
              <router-link
                class="nav-link"
                to="/dashboard"
                v-if="this.user == null"
                style="padding-top:0px;padding-bottom:0px; margin-bottom:0px;"
              >Profile</router-link>
            </li>

            <!-- Settings -->
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/dashboard/settings"
                v-if="this.user == null"
                style="padding-top:0px;padding-bottom:0px;"
              >
                <img
                  src="../assets/css/noun_settings_crop.png"
                  alt="Inbox"
                  width="55px"
                  height="40px"
                >
              </router-link>
              <router-link
                class="nav-link"
                to="/dashboard/settings"
                v-if="this.user == null"
                style="padding-top:0px;padding-bottom:0px; margin-bottom:0px;"
              >Settings</router-link>
            </li>

            <!-- Logout -->
            <li class="nav-item nav-center" @click="logout()">
              <router-link class="nav-link nav-center" to="/">
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
@import "../assets/css/header.css";
</style>

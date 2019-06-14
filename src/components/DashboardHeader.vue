<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="dashboard_nav">
      <div class="container">
        <a class="navbar-brand" href="/">
          <img src="./TINY_LOGO.png" alt="FIG ANALYTICS" class="center">
        </a>
        <!-- <button
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
        </button>-->
        <!-- <div class="collapse navbar-collapse" id="navbarResponsive"> -->
        <ul class="navbar-nav ml-auto">
          <!-- /dashboard/creditsScreen/creditsPurchasing -->

          <!-- Orders -->
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/dashboard/pending_orders"
              v-if="this.user == null"
              style="padding-top:0px;padding-bottom:0px;padding-left:15px;"
            >
              <i class="fas fa-seedling" id="dash_icon"></i>
            </router-link>
            <router-link
              class="nav-link"
              to="/dashboard/pending_orders"
              v-if="this.user == null"
              style="padding-top:0px;padding-bottom:0px; margin-bottom:0px;padding-right:15px;"
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
              style="padding-top:0px;padding-bottom:0px;padding-left:7px;"
            >
              <i class="fas fa-envelope" alt="Inbox" id="dash_icon"></i>
            </router-link>
            <router-link
              class="nav-link"
              to="/dashboard/quoteRequestsScreen"
              v-if="this.user == null"
              style="padding-top:0px;padding-bottom:0px; margin-bottom:0px;"
            >
              Inbox
              <span class="badge badge-info">{{itemsInCart}}</span>
            </router-link>
          </li>

          <!-- Profile -->
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/dashboard"
              v-if="this.user == null"
              style="padding-top:0px;padding-bottom:0px;padding-left:10px;"
            >
              <i class="fas fa-home" id="dash_icon"></i>
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
              style="padding-top:0px;padding-bottom:0px;padding-left:15px;"
            >
              <i class="fas fa-sliders-h" id="dash_icon"></i>
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
            <router-link class="nav-link" to="/dashboard/settings" v-if="this.user == null">
              <i class="fas fa-sign-out-alt"></i>
              Logout
            </router-link>
            <!-- <router-link class="nav-link nav-center" to="/" style="margin-top:0px;">
                 Logout
            </router-link>-->
          </li>
        </ul>
      </div>
      <!-- </div> -->
    </nav>
  </div>
</template>

<script src="./scripts/dashboardHeader.js">
</script>

<style>
@import "../assets/css/header.css";
</style>

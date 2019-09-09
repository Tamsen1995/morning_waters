<template>
  <div id="app">
    <b-navbar toggleable="lg" style="position: sticky" id="seller_nav">
      <b-navbar-brand href="#" class="mr-auto" style="margin-bottom:15px;">
        <router-link class="nav-link" to="/dashboard" v-if="this.user == null">
          <img src="../TINY_LOGO.png" alt="FIG ANALYTICS" class="center" />
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-navbar-nav class="ml-auto">
        <!-- Profile -->
        <b-nav-item>
          <router-link
            class="nav-link"
            to="/dashboard"
            v-if="this.user == null"
            style="padding-top:0px;padding-bottom:0px;padding-left:7px;"
          >
            <i class="fas fa-home" id="seller_nav_icon"></i>
          </router-link>
          <router-link
            class="nav-link"
            to="/dashboard"
            v-if="this.user == null"
            style="padding-top:0px;padding-bottom:0px; margin-bottom:0px;"
          >Profile</router-link>
        </b-nav-item>
        <!-- Orders -->
        <b-nav-item href="#" v-if="this.user == null">
          <router-link
            class="nav-link"
            to="/dashboard/pending_orders"
            v-if="this.user == null"
            style="padding-top:0px;padding-bottom:0px;padding-right:10px;"
          >
            <i class="fas fa-seedling" id="seller_nav_icon"></i>
          </router-link>

          <router-link
            class="nav-link"
            to="/dashboard/pending_orders"
            v-if="this.user == null"
            style="padding-top:0px;padding-bottom:0px; margin-bottom:0px;padding-right:5px;"
          >
            Orders
            <span class="badge badge-orders">{{ this.pendingOrders }}</span>
          </router-link>
        </b-nav-item>

        <!-- Inbox -->
        <b-nav-item>
          <router-link
            class="nav-link"
            to="/dashboard/quoteRequestsScreen"
            v-if="this.user == null"
            style="padding-top:0px;padding-bottom:0px;padding-left:7px;"
          >
            <i class="fas fa-envelope" alt="Inbox" id="seller_nav_icon"></i>
          </router-link>
          <router-link
            class="nav-link"
            to="/dashboard/quoteRequestsScreen"
            v-if="this.user == null"
            style="padding-top:0px;padding-bottom:0px; margin-bottom:0px;"
          >
            Inbox
            <span class="badge badge-inbox">{{ this.newMessages }}</span>
          </router-link>
        </b-nav-item>

        <!-- Settings -->
        <b-nav-item>
          <router-link
            class="nav-link"
            to="/dashboard/settings"
            v-if="this.user === null"
            style="padding-top:0px;padding-bottom:0px;padding-left:5px;"
          >
            <i class="fas fa-sliders-h" id="seller_nav_icon"></i>
          </router-link>
          <router-link
            class="nav-link"
            to="/dashboard/settings"
            v-if="this.user == null"
            style="padding-top:0px;padding-bottom:0px; margin-bottom:0px;"
          >Settings</router-link>
        </b-nav-item>

        <!-- Logout -->
        <b-nav-item>
          <router-link
            v-if="this.user === null"
            to="/"
            class="nav-link"
            style="padding-top:0px;padding-bottom:0px;padding-left:5px;"
            @click="logout()"
          >
            <i class="fas fa-sign-out-alt" id="seller_nav_icon"></i>
          </router-link>
          <router-link
            v-if="this.user === null"
            to="/"
            class="nav-link"
            style="padding-top:0px;padding-bottom:0px; margin-bottom:0px;">
            Logout
          </router-link>
          <!-- <router-link class="nav-link nav-center" to="/" style="margin-top:0px;">
                  Logout
          </router-link>-->
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script src="./scripts/dashboardHeader.js">
</script>

<style>
@import "../../assets/css/header.css";
</style>

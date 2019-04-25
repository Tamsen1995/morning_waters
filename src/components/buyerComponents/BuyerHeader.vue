<template>
  <div id="app">
    <b-nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand" href="/">
          <img src="./../TINY_LOGO.png" alt="FIG ANALYTICS" class="center">
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
            <!-- This is the dropdown menu -->
            <li class="nav-item" v-if="this.buyerLoggedIn === true">
              <!-- <a class="nav-link"> -->
              <a class="nav-link" @click="toggleDropdownMenu()">Orders</a>
              <!-- </a> -->
            </li>

            <div v-show="this.dropdownMenu" class="absolute">
              <div>Order History</div>
              <div>Shipping</div>
            </div>

            <!--  -->

            <li class="nav-item" v-if="this.buyerLoggedIn === false">
              <a class="nav-link" @click="redirectToSignUp()">Sign Up</a>
            </li>

            <li class="nav-item" v-if="this.buyerLoggedIn === false">
              <a class="nav-link" @click="redirectToLogin()">Login</a>
            </li>

            <li class="nav-item" v-if="this.buyerLoggedIn === true">
              <a class="nav-link" @click="redirectToInbox()">Inbox</a>
            </li>

            <li class="nav-item" v-if="this.buyerLoggedIn === true">
              <a class="nav-link" @click="redirectToBillings()">Billing</a>
            </li>

            <li class="nav-item" v-if="this.buyerLoggedIn === true">
              <a class="nav-link" @click="redirectToSettings()">Settings</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" @click="goToBuyersCart()">Cart : {{itemsInCart}}</a>
            </li>
          </ul>
        </div>
      </div>
    </b-nav>
  </div>
</template>

<script src="./scripts/buyerHeader.js">
</script>

<style>
@import "../../assets/css/header.css";
</style>

<template>
  <div id="app">
    <b-nav class="navbar navbar-expand-lg navbar-light fixed-top" id="dashboard_nav">
      <div class="container">
        <a class="navbar-brand">
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
            <!-- Orders -->
            <!-- This is the dropdown menu -->
            <li
              class="nav-item"
              v-if="this.buyerLoggedIn === true"
              @click="redirectOntoBuyerDashboard()"
            >
              <a
                class="nav-link"
                @click="toggleDropdownMenu()"
                style="padding-top:0px;padding-bottom:0px;padding-left:10px;"
              >
                <i class="fas fa-seedling" id="dash_icon"></i>
              </a>
              <!-- <a class="nav-link"> -->
              <a
                class="nav-link"
                style="padding-top:0px;padding-bottom:0px; margin-bottom:0px;"
              >Orders</a>
              <!-- </a> -->
              <!-- <div v-show="this.dropdownMenu" class="absolute">
                <div>Order History</div>
                <div>Shipping</div>
              </div>-->
            </li>

            <!-- Login/Sign-up -->
            <li class="nav-item nav-center" v-if="this.buyerLoggedIn === false">
              <a class="nav-link nav-center" @click="redirectToSignUp()">Sign Up</a>
            </li>

            <li class="nav-item nav-center" v-if="this.buyerLoggedIn === false">
              <a class="nav-link nav-center" @click="redirectToLogin()">Login</a>
            </li>

            <!-- Inbox -->
            <li class="nav-item" v-if="this.buyerLoggedIn === true">
              <a
                class="nav-link"
                @click="redirectToInbox()"
                style="padding-top:0px;padding-bottom:0px;padding-left:15px;"
              >
                <i class="fas fa-envelope" alt="Inbox" id="dash_icon"></i>
              </a>
              <a
                class="nav-link"
                @click="redirectToInbox()"
                style="padding-top:0px;padding-bottom:0px; margin-bottom:0px;"
              >
                Inbox
                <span class="badge badge-primary">{{itemsInCart}}</span>
              </a>
            </li>

            <!-- Billing -->
            <li class="nav-item" v-if="this.buyerLoggedIn === true">
              <a
                class="nav-link"
                @click="redirectToBillings()"
                style="padding-top:0px;padding-bottom:0px;"
              >
                <i class="fas fa-money-bill-wave-alt" id="dash_icon"></i>
              </a>
              <a
                class="nav-link"
                @click="redirectToBillings()"
                style="padding-top:0px;padding-bottom:0px; margin-bottom:0px;"
              >Billing</a>
            </li>

            <!-- Settings -->
            <li class="nav-item" v-if="this.buyerLoggedIn === true">
              <a
                class="nav-link"
                @click="redirectToSettings()"
                style="padding-top:0px;padding-bottom:0px;padding-left:15px;"
              >
                <i class="fas fa-sliders-h" id="dash_icon"></i>
              </a>
              <a
                class="nav-link"
                @click="redirectToSettings()"
                style="padding-top:0px;padding-bottom:0px; margin-bottom:0px;"
              >Settings</a>
            </li>

            <!-- View Cart -->
            <li class="nav-item">
              <!-- Go to Modal Cart -->
              <a
                class="nav-link"
                @click="manifestModalShowCart()"
                style="padding-top:0px;padding-bottom:0px;"
              >
                <i class="fas fa-shopping-cart" id="dash_icon"></i>
              </a>
              <a
                class="nav-link"
                @click="manifestModalShowCart()"
                style="padding-top:0px;padding-bottom:0px; margin-bottom:0px;"
              >
                Cart:
                <span class="badge badge-success">{{itemsInCart}}</span>
              </a>
            </li>

            <li class="nav-item" v-if=" this.buyerLoggedIn === true">
              <router-link class="nav-link nav-center" to="/">
                <a
                  class="nav-link"
                  @click="buyerLogout()"
                  style="padding-top:0px;padding-bottom:0px;"
                >Logout</a>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </b-nav>

    <!-- View Cart Modal -->
    <modal
      name="view-cart"
      height="auto"
      pivotY="0"
      scrollable="true"
      style="padding-top:85px; padding-left:240px;"
    >
      <div class="container" id="shopping-cart">
        <div class="pull-right">
          <a @click="$modal.hide('view-cart')">
            <h4>x</h4>
          </a>
        </div>
        <shopping-cart></shopping-cart>
        <button class="btn-cart btn-default pull-right btn-block" @click="goToBuyersCart()">
          <h3>View Cart</h3>
        </button>
      </div>
      <br>
    </modal>
  </div>
</template>

<script src="./scripts/buyerHeader.js">
</script>

<style>
@import "../../assets/css/header.css";
</style>

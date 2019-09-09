<template>
  <div>
    <b-navbar toggleable="lg" id="buyer_nav">
      <b-navbar-brand href="#" class="mr-auto" style="margin-bottom:15px;">
        <img src="../LOGO_tiny.png" id="brand" alt="FIG ANALYTICS" class="center" />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" style="margin-bottom:15px;"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- Orders -->
          <!-- This is the dropdown menu -->
          <b-nav-item
            href="#"
            v-if="this.buyerLoggedIn === true"
            @click="redirectOntoBuyerDashboard()"
          >
            <a
              class="nav-link"
              @click="toggleDropdownMenu()"
              style="padding-top:0px;padding-bottom:0px;padding-left:10px;"
            >
              <i class="fas fa-seedling" id="buyer_nav_icon"></i>
            </a>

            <a
              class="nav-link"
              style="padding-top:0px;padding-bottom:0px; margin-bottom:0px;"
            >Orders</a>
          </b-nav-item>

          <b-nav-item v-if="this.buyerLoggedIn === true">
            <a
              class="nav-link"
              @click="redirectToInbox()"
              style="padding-top:0px;padding-bottom:0px;"
            >
              <i class="fas fa-envelope" alt="Inbox" id="buyer_nav_icon"></i>
            </a>
            <a
              class="nav-link"
              @click="redirectToInbox()"
              style="padding-top:0px;padding-bottom:0px; margin-bottom:0px;"
            >
              Inbox
              <span class="badge badge-primary"></span>
            </a>
          </b-nav-item>

          <!-- <b-nav-item v-if="this.buyerLoggedIn === false">
            <i class="fas fa-envelope" alt="Inbox" id="buyer_nav_icon" style="padding-right:5px;"></i>

            <b-nav-item-dropdown
              class="nav-item"
              text="Inbox"
              right
              id="dropdown-left"
              style="margin-top:-6px;"
            >
              <request-quote-cart></request-quote-cart>
              <button class="btn-cart btn-default pull-right btn-block" @click="goToBuyersCart()">
                <h3>View Messages</h3>
              </button>
            </b-nav-item-dropdown>
          </b-nav-item> -->

          <!-- Billing -->
          <b-nav-item class="nav-item" v-if="this.buyerLoggedIn === true">
            <a
              class="nav-link"
              @click="redirectToBillings()"
              style="padding-top:0px;padding-bottom:0px; padding-left:7px;"
            >
              <i class="fas fa-money-bill-wave-alt" id="buyer_nav_icon"></i>
            </a>
            <a
              class="nav-link"
              @click="redirectToBillings()"
              style="padding-top:0px;padding-bottom:0px; margin-bottom:0px;"
            >Billing</a>
          </b-nav-item>

          <!-- Settings -->
          <b-nav-item v-if="this.buyerLoggedIn === true">
            <a
              class="nav-link"
              @click="redirectToSettings()"
              style="padding-top:0px;padding-bottom:0px;padding-left:4px;"
            >
              <i class="fas fa-sliders-h" id="buyer_nav_icon"></i>
            </a>
            <a
              class="nav-link"
              @click="redirectToSettings()"
              style="padding-top:0px;padding-bottom:0px; margin-bottom:0px;"
            >Settings</a>
          </b-nav-item>

          <!-- Cart -->

          <!-- Make cart icon green after 1 item is in the cart. Add span tag w/ number of items-->
          <b-nav-item>
            <i
              class="fas fa-shopping-cart"
              id="buyer_nav_icon"
              style="margin-top:1px;padding-top:0px;padding-bottom:0px;padding-right:10px;"
            ></i>
            <b-nav-item-dropdown
              class="nav-item"
              text="Cart"
              right
              id="dropdown-left"
              style="margin-top:-6px;"
            >
              <md-card style="background-color: purple; color: white; text-align: center; height: 50%;">
                <span class="md-title"><h3>Cart</h3></span>
              </md-card>
              <shopping-cart></shopping-cart>
              <request-quote-cart></request-quote-cart>
              <button class="btn-cart btn-default pull-right btn-block" @click="goToBuyersCart()">
                <h2>View</h2>
              </button>
            </b-nav-item-dropdown>
          </b-nav-item>

          <b-nav-item class="nav-item" v-if=" this.buyerLoggedIn === true">
            <router-link class="nav-link nav-center" to="/">
              <a class="nav-link" @click="buyerLogout()" style="margin-top:-13px;">Logout</a>
            </router-link>
          </b-nav-item>
          <!-- Login/Sign-up -->
          <b-nav-item
            class="nav-item"
            v-if="this.buyerLoggedIn === false"
            href="#"
            @click="redirectToSignUp()"
            style="padding-top:22px;"
          >Sign Up</b-nav-item>

          <b-nav-item
            class="nav-item"
            v-if="this.buyerLoggedIn === false"
            href="#"
            @click="redirectToLogin()"
            style="padding-top:22px;"
          >Login</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script src="./scripts/buyerHeader.js">
</script>

<style>
@import "../../assets/css/header.css";
</style>

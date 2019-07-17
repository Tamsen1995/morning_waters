<template>
  <div >
    <b-navbar toggleable="lg"  id="buyer_nav">
      <b-navbar-brand href="#" class="mr-auto" style="margin-bottom:15px;">
        <img src="./../TINY_LOGO.png" alt="FIG ANALYTICS" >
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" style="margin-bottom:15px;"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav >


        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" >

          <b-nav-item  v-if="this.buyerLoggedIn === true">
          
            <a
              class="nav-link"
              @click="redirectToInbox()"
              style="padding-top:0px;padding-bottom:0px;padding-left:10px;"
            >
              <i class="fas fa-envelope" alt="Inbox" id="buyer_nav_icon"></i>
            </a>
            <a
              class="nav-link"
              @click="redirectToInbox()"
              style="padding-top:0px;padding-bottom:0px; margin-bottom:0px;"
            >
              Inbox
              <span class="badge badge-primary">{{itemsInCart}}</span>
            </a>
          </b-nav-item>

          <!-- Orders -->
            <!-- This is the dropdown menu -->
            <b-nav-item href="#"
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
              <!-- </a> -->
              <!-- <div v-show="this.dropdownMenu" class="absolute">
                <div>Order History</div>
                <div>Shipping</div>
              </div>-->
            </b-nav-item>

          <!-- Billing -->
          <b-nav-item  class="nav-item" v-if="this.buyerLoggedIn === true">
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
          <b-nav-item>
            <i class="fas fa-shopping-cart" id="buyer_nav_icon" style="padding-top:0px;padding-bottom:0px;padding-right:5px;"></i>
            <b-nav-item-dropdown class="nav-item" text="Cart" right id="dropdown-left">
              <shopping-cart></shopping-cart>
            </b-nav-item-dropdown>
          </b-nav-item>

          <b-nav-item class="nav-item" v-if=" this.buyerLoggedIn === true">
            <router-link class="nav-link nav-center" to="/">
              <a
                class="nav-link"
                @click="buyerLogout()"
                style="padding-top:28px;"
              >Logout</a>
            </router-link>
          </b-nav-item>
          <!-- Login/Sign-up -->
          <b-nav-text  href="#" v-if="this.buyerLoggedIn === false" @click="redirectToSignUp()"
          style="padding-top:26px;">       
            Sign Up
          </b-nav-text>

          <b-nav-text  href="#" v-if="this.buyerLoggedIn === false" 
            @click="redirectToLogin()"
            style="padding-top:26px;"
          >
           Login
          </b-nav-text>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>


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

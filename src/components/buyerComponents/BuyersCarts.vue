<template>
<div id="app">
  <buyer-header></buyer-header>
  <br>
  <br>
  <br>
  <br>
  <body>
    <br>
    <shopping-cart v-if="this.shoppingCart.length > 0"></shopping-cart>

    <br>
    <request-quote-cart v-if="this.quoteRequestsCart.length > 0"></request-quote-cart>
  </body>

  <!-- Checkout button -->
  <b-button @click="redirectToCheckoutOrLogin()">
    <p>Checkout</p>
  </b-button>
</div>
</template>

<script>
import ShoppingCart from "@/components/buyerComponents/ShoppingCart";
import RequestQuoteCart from "@/components/buyerComponents/RequestQuoteCart";
import BuyerHeader from "@/components/buyerComponents/BuyerHeader";

export default {
  data() {
    return {};
  },
  created() {
    this.getCartItemsFromStore();
    this.getQuoteRequestsCartFromStore();
  },
  mounted() {
    console.log(`\nThe buyers cart is being mounted\n`); // TESTING
  },
  components: {
    ShoppingCart,
    RequestQuoteCart,
    BuyerHeader
  },
  methods: {
    async redirectToCheckoutOrLogin() {
      try {
        this.$store.dispatch("setShoppingCartFlag", true);

        const isUserLoggedIn = this.$store.getters.userLoggedIn;
        if (isUserLoggedIn === true) {
          this.$router.push({
            name: "buyerCheckout"
          });
        } else {
          this.$router.push({
            name: "buyerLogin"
          });
        }
      } catch (error) {
        console.log(`\nError in redirectToCheckoutOrLogin : ${error}\n`); // TESTING
        if (error) throw error;
      }
    },
    async getQuoteRequestsCartFromStore() {
      try {
        const quoteRequestsCart = this.$store.getters.getQuoteRequestsCart;
        if (quoteRequestsCart) {
          this.quoteRequestsCart = quoteRequestsCart;
        } else {
          this.quoteRequestsCart = [];
        }
      } catch (error) {
        if (error) throw error;
      }
    },
    async getCartItemsFromStore() {
      try {
        const shoppingCartItems = this.$store.getters.getShoppingCartItems;
        if (shoppingCartItems) {
          this.shoppingCart = shoppingCartItems;
        } else {
          this.shoppingCart = [];
        }
      } catch (error) {
        if (error) throw error;
      }
    }
  }
};
</script>

<style>
</style>

<template>
<div id="app">
  <buyer-header></buyer-header>
  <div class="responsive-component" v-responsive= "{
  small: el => el.width < 860
  }">

    <body class="buyers_carts">
      <div class="container" style="max-width:800px; display: block;
        margin-left: auto;
        margin-right: auto;">
        <div class="container cart_container">

          <div class="card">
            <h5 class="card-header" style="text-align: center; color:white; background-color: purple;">Cart</h5>
            <div class="card-body">
              <shopping-cart v-if="this.shoppingCart.length > 0"></shopping-cart>
            </div>

            <h3 style="text-align:center;">
              <a href="#" class="card-link">Continue Shopping</a>
            </h3>
            <!-- Checkout button -->
            <button @click="redirectToCheckoutOrLogin()" class="btn-cart btn-default pull-right btn-block">
              <h3>Checkout</h3>
            </button>

          </div>

          
          <br>
          <br>
          <request-quote-cart v-if="this.quoteRequestsCart.length > 0"></request-quote-cart>
          <!-- Send Messages -->
          <button @click="redirectToCheckoutOrLogin()" class="btn-cart btn-default pull-right btn-block">
            <h3>Send to seller</h3>
          </button>
        </div>


        <br>
        <br>
        <br>
        <br>
        <h3 style="text-align:center;"></h3>

      </div>
    </body>
  </div>

</div>
</template>

<script>
import ShoppingCart from "@/components/buyerComponents/ShoppingCart";
import RequestQuoteCart from "@/components/buyerComponents/RequestQuoteCart";
import BuyerHeader from "@/components/buyerComponents/BuyerHeader";

export default {
  data() {
    return {
      shoppingCartItems: [],
      quoteRequestsCart: []
    };
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
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
@import "../../assets/css/settings.css";
</style>

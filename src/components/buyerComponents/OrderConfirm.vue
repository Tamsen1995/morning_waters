<template>
<div id="app">
  <buyer-header></buyer-header>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <body>
    <h1>Order Confirmation</h1>
  </body>
</div>
</template>

<script>
// import ShoppingCart from "@/components/buyerComponents/ShoppingCart"; // TODO : Remove
// import RequestQuoteCart from "@/components/buyerComponents/RequestQuoteCart"; // TODO : Remove
import BuyerHeader from "@/components/buyerComponents/BuyerHeader";

// import BuyerPaymentService from "@/services/BuyerPaymentService";

// let stripe = Stripe(`pk_test_CLMSL40and9mdJdOgCRMbLfs`); // TODO : Replace this with the live api key
// let elements = stripe.elements();
// let card = null;

export default {
  data() {
    return {};
  },
  beforeDestroy() {},
  created() {},
  mounted() {
    console.log(`\nThe order confirm page is being mounted\n`); // TESTING
  },
  components: {
    BuyerHeader
  },
  methods: {}
};
</script>

<style>
</style>

<template>
<div id="app">
  <buyer-header></buyer-header>
  <div class="responsive-component" v-responsive="{
    small: el => el.width < 860
    }">
    <body class="buyer-checkout">
      <div
        class="container"
        style="max-width:800px; display: block;
          margin-left: auto;
          margin-right: auto;"
      >
        <h5 style="text-align:center;">Order Confirmation</h5>
        <br />
        <p style="text-align:center;color:purple;">
          The seller has 3-5 business days to confirm your order.
          <br />Once confirmed, you will recieve a confirmation email, and you will be charged.
          <br />
          <br />Your order will appear in ORDERS, and any messages in your INBOX.
        </p>

        <md-card md-with-hover style="background-color: white;">
          <md-card-content>
            <div class="container">
              <!-- <shopping-cart v-if="this.shoppingCart.length > 0"></shopping-cart> -->

              <br />
              <!-- <request-quote-cart v-if="this.quoteRequestsCart.length > 0"></request-quote-cart> -->
            </div>
            <a class="pull-right">Download Invoice</a>
          </md-card-content>
        </md-card>
      </div>
    </body>
  </div>
</div>
</template>

<script>
import BuyerHeader from "@/components/buyerComponents/BuyerHeader";
import { ResponsiveDirective } from "vue-responsive-components";

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
  directives: {
    responsive: ResponsiveDirective
  },
  methods: {}
};
</script>

<style>
@import "../../assets/css/settings.css";
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
</style>

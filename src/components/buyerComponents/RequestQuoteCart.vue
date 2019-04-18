<template>
  <div id="app">
    <h1>Request Quotes !!</h1>

    <ul class="request-quote-cart">
      <li v-for="item in this.quoteRequestsCart" v-bind:key="item">
        Item : {{ item.serviceTitle }}
        <br>
        Description : {{ item.serviceDescription }}
        <br>
        Quanitity : {{ item.quantity }}
        <br>
        Inquiry : {{ item.inquiryText }}
        <br>
      </li>
    </ul>

    <br>
    <br>
    <br>
    <br>
    <br>
    <!--  -->
    <h1 @click="testingDelete()">Testing only please delete</h1>
  </div>
</template>

<script>
import BuyerServices from "@/services/BuyerServices";

export default {
  data() {
    return {
      quoteRequestsCart: null
    };
  },
  mounted() {
    this.getQuoteRequestsCartFromStore();
  },
  methods: {
    // TESTING
    async testingDelete() {
      try {
        this.$store.dispatch("clearQuoteRequestsCart");
        this.getQuoteRequestsCartFromStore();
      } catch (error) {
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
    }
  }
};
</script>

<style>
</style>

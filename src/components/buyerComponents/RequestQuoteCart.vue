<template>
<div id="app" style="background-color: white;">
  <body>
    <md-card style="background-color: purple; color: white; text-align: center; height: 50%;">
      <span class="md-title">Quote Request</span>
    </md-card>

    <!-- <h1 style="text-align: center;"></h1> -->

    <md-list
      :md-expand-single="expandSingle"
      v-for="item in this.quoteRequestsCart"
      v-bind:key="item"
    >
      <md-list-item md-expand :md-expanded.sync="expandNews">
        <md-icon>whatshot</md-icon>
        <span class="md-list-item-text">News</span>

        <md-list slot="md-expand">
          <md-list-item class="md-inset">Item : {{ item.serviceTitle }}</md-list-item>
          <md-list-item class="md-inset">Description : {{ item.serviceDescription }}</md-list-item>
          <md-list-item class="md-inset">Quanitity : {{ item.quantity }}</md-list-item>
          <md-list-item class="md-inset">Inquiry : {{ item.inquiryText }}</md-list-item>
        </md-list>
      </md-list-item>
    </md-list>

    <br />
    <br />
    <br />
    <br />
    <br />
    <!--  -->
    <md-card style="background-color: black; color: white;">
      <md-button @click="testingDelete()">Testing only please delete</md-button>
    </md-card>
  </body>
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

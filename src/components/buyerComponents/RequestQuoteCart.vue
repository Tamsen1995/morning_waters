<template>
<div id="app" style="background-color: white;">
  <body>
    <md-card style="background-color: #311c63; color: white; text-align: center; height: 50%;">
      <span class="md-title">Quote Requests</span>
    </md-card>

    <!-- <h1 style="text-align: center;"></h1> -->

    <md-list
      :md-expand-single="expandSingle"
      v-for="(item, index) in this.quoteRequestsCart"
      v-bind:key="index"
    >
      <md-list-item md-expand :md-expanded.sync="expandNews">
        <md-icon>whatshot</md-icon>
        <span class="md-list-item-text">Request #{{index+1}}</span>

        <md-list slot="md-expand">
          <md-card>
            <md-card-content style="font-size: 0.7vw; ">
              Item : {{ item.serviceTitle }}
              <br />
              Description : {{ item.serviceDescription }}
              <br />
              Quanitity : {{ item.quantity }}
              <br />
              Inquiry : {{ item.inquiryText }}
              <br />
            </md-card-content>
          </md-card>
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

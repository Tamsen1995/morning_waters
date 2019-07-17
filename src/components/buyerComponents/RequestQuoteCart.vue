<template>
<div id="app" style="background-color: white;">
  <body id="requestQuoteCart">
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
        <i class="fas fa-atom" id="service_logo"></i>
        <span class="md-list-item-text">Request #{{index+1}}</span>

        <md-list slot="md-expand">
              <h3 style="text-align:center;">
      <a href="#" class="card-link">Edit Message</a>
    </h3>
          <md-card>
            <md-card-content>
              Item : {{ item.serviceTitle }}
              <br />
              Quanitity : {{ item.quantity }}
              <br />
              Turn Around Time : 
              <br />
              Inquiry : 
              <md-content style="text-align:left" id="inquiry-text" class="md-scrollbar">
               <p>{{ item.inquiryText }}</p>
              </md-content>
              <br />
            </md-card-content>
          </md-card>
        </md-list>
      </md-list-item>
    </md-list>

    <!-- Add Modal to edit Quote request, with delete request functionality -->
    
    <br>

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
#requestQuoteCart #service_logo {
  color: #4527a0;
  font-size: 20px;
  padding-right:10px;
}

#requestQuoteCart #inquiry-text {
  max-width: 800px;
  height: 150px;
  max-height: 400px;
  padding: 5px;
  overflow: auto;
  border:#3094f1 solid 2px;
}
</style>

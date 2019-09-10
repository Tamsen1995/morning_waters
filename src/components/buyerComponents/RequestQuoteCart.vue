
<template>
<div id="app" style="background-color: white;">
  <body id="requestQuoteCart">
    <md-card style="background-color: #8972cc; color: white; text-align: center; height: 50%;">
      <span class="md-title"><h3>Quote Requests</h3></span>
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
          <md-card>
            <md-card-content>
              <span class="pull-right" id="tooltip">
                <md-tooltip md-delay="300">Delete Message</md-tooltip>
              </span>

              <!-- Editable Service Specific Request Form -->
              <form>
                Item : {{ item.serviceTitle }}
                <br />
                <br />
                Quantity : {{ item.quantity }}
                <br />
                <br />
                Turn Around Time : {{item.turnAroundtime}}
                <br />
                <br />
                Message to Seller: {{item.inquiryText}}
                <!-- <br />
              Inquiry : 
              <md-content style="text-align:left" id="inquiry-text" class="md-scrollbar">
               <p>{{ item.inquiryText }}</p>
              </md-content>
                <br />-->
              </form>
            </md-card-content>
          </md-card>
        </md-list>
      </md-list-item>
    </md-list>

    <!-- <md-list style="background-color:#eeeef6;">
      <md-list-item md-expand :md-expanded.sync="expandNews">
        <i class="fas fa-plus" id="service_logo"></i>
        <span class="md-list-item-text">Add Quote Request</span>

        <md-list slot="md-expand">
          <md-card style="background-color:white;">
            <md-card-content>
              <form></form>
            </md-card-content>
          </md-card>
        </md-list>
      </md-list-item>
    </md-list> -->

    <!-- Add Modal to edit Quote request, with delete request functionality -->

    <br />
  </body>
</div>
</template>

<script>
import BuyerServices from "@/services/BuyerServices";
export default {
  data() {
    return {
      expandNews: false,
      expandSingle: false,
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
  padding-right: 10px;
}
#requestQuoteCart #inquiry-text {
  max-width: 800px;
  height: 150px;
  max-height: 400px;
  padding: 5px;
  overflow: auto;
  border: #3094f1 solid 2px;
}
#requestQuoteCart #tooltip {
  min-width: 60px;
  display: inline-block;
  text-align: center;
}
</style>
<template>
  <div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <h1>Pending orders page</h1>
    <br>
    <br>
    <br>

    <div v-for="(order, index) in orders" v-bind:key="index" @click="confirmOrder(index)">
      <br>
      {{order}}
      <br>
    </div>

    <br>
    <br>
    <button v-on:click="goToShippingUI">Go to shipping UI</button>

    <modal name="ask-seller-if-seller-needs-to-ship">
      <div>Do you need to ship something ?</div>
      <button @click="sellerNeedsToShip(true)">Yes</button>
      <button @click="sellerNeedsToShip(false)">No</button>
    </modal>

    <modal name="ask-seller-if-buyer-needs-to-ship">
      <div>Do you need to ship something ?</div>
      <button @click="buyerNeedsToShip(true)">Yes</button>
      <button @click="buyerNeedsToShip(false)">No</button>
    </modal>
  </div>
</template>

<script>
import PageHeader from "@/components/Header.vue";
import AuthenticationService from "@/services/AuthenticationService";
import UserServices from "@/services/UserServices";
import Api from "@/services/Api";
import { ResponsiveDirective } from "vue-responsive-components";

export default {
  data() {
    return {
      orderToBeConfirmed: null,
      orders: null,
      orderItems: null
    };
  },
  async created() {
    await this.getSellerOrders();
    await this.getSellerOrderItems();
  },
  async mounted() {},
  components: {},
  directives: {},
  methods: {
    async buyerNeedsToShip(buyerNeedsToShip) {
      try {
        if (buyerNeedsToShip === true) {
          // set buyer_shipping status on the order to true
        } else {
          // set buyer_shipping status on the order to false
        }
      } catch (error) {
        if (error) throw error;
      }
    },
    async sellerNeedsToShip(sellerNeedsToShip) {
      try {
        if (sellerNeedsToShip === true) {
          // set seller_shipping status on the order to true
        } else {
          // set seller_shipping status on the order to false
        }
        this.$modal.hide("ask-seller-if-seller-needs-to-ship");
        this.$modal.show("ask-seller-if-buyer-needs-to-ship");
      } catch (error) {
        if (error) throw error;
      }
    },
    // this function will
    async confirmOrder(index) {
      try {
        this.orderToBeConfirmed = this.orders[index];
        this.$modal.show("ask-seller-if-seller-needs-to-ship");
      } catch (error) {
        if (error) throw error;
      }
    },
    async goToShippingUI() {
      try {
        // https://goshippo.com/oauth/authorize?response_type=code&client_id=YOUR_PARTNER_ID&scope=*&state=YOUR_RANDOM_STRING
        // window.open(
        //   "https://goshippo.com/oauth/authorize?response_type=code&client_id=YOUR_PARTNER_ID&scope=*&state=YOUR_RANDOM_STRING"
        // );
      } catch (error) {
        if (error) throw error;
      }
    },
    async getSellerOrderItems() {
      try {
        const userExtracted = this.$store.getters.getUserInfo;

        const response = await UserServices.getSellersOrderItems(
          userExtracted.id
        );

        this.orderItems = response.data;
      } catch (error) {
        if (error) throw error;
      }
    },
    async getSellerOrders() {
      try {
        const userExtracted = this.$store.getters.getUserInfo;

        const response = await UserServices.getLockedOrders(userExtracted.id);
        this.orders = response.data.orders;
      } catch (error) {
        if (error) throw error;
      }
    }
  }
};
</script>

<style>
</style>

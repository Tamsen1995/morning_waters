<template>
  <div id="app">
    <dashboard-header></dashboard-header>
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

    <!-- This shall be converted to an actual order array. -->
    <div v-for="(order, index) in orders" v-bind:key="index" @click="confirmOrder(index)">
      <br>
      <h3>ORDER ID :</h3>
      {{order.orderId}}
      <br>
      <br>
      <div v-for="(orderItem, index) in orderItems" v-bind:key="index">
        <div v-if="orderItem.orderId === order.orderId">
          <h5>Title:</h5>
          {{orderItem.title}}
          <br>
          <h5>Description:</h5>
          {{orderItem.description}}
        </div>
      </div>
      <br>
      <br>
    </div>
    <!--  -->
    <br>
    <br>
    <button v-on:click="goToShippingUI">Go to shipping UI</button>

    <!-- <button @click="sellerNeedsToShip(true)">Yes</button>
      <button @click="sellerNeedsToShip(false)">No</button>


      <div>Does the buyer need to ship something ?</div>
      <button @click="buyerNeedsToShip(true)">Yes</button>
    <button @click="buyerNeedsToShip(false)">No</button>-->

    <!-- <input type="radio" id="one" value="One" v-model="picked">
      <label for="one">One</label>
      <br>
      <input type="radio" id="two" value="Two" v-model="picked">
      <label for="two">Two</label>
      <br>
    <span>Picked: {{ picked }}</span>-->

    <modal name="ask-seller-if-seller-needs-to-ship">
      <!--  -->
      <div>
        Do you need to ship something ?
        <br>
        <input type="radio" id="one" value="true" v-model="seller_shipping">
        <label for="one">Yes</label>
        <br>
        <input type="radio" id="two" value="false" v-model="seller_shipping">
        <label for="two">No</label>
        <br>
        <span>Picked: {{ picked }}</span>
      </div>
      <br>
      <!--  -->
      <div>
        Does the buyer need to ship something ?
        <br>
        <input type="radio" id="one" value="true" v-model="buyer_shipping">
        <label for="one">Yes</label>
        <br>
        <input type="radio" id="two" value="false" v-model="buyer_shipping">
        <label for="two">No</label>
        <br>
        <span>Picked: {{ pickedTwo }}</span>
      </div>
      <!--  -->
      <!-- <button @click="buyerNeedsToShip(false)">No</button> -->
      <button @click="submitShippingInfo()">Submit</button>
    </modal>
  </div>
</template>

<script>
import DashboardHeader from "@/components/DashboardHeader.vue";
import PageHeader from "@/components/Header.vue";
import AuthenticationService from "@/services/AuthenticationService";
import ShippingService from "@/services/ShippingService";
import UserServices from "@/services/UserServices";
import Api from "@/services/Api";
import { ResponsiveDirective } from "vue-responsive-components";

export default {
  data() {
    return {
      orderToBeConfirmed: null,
      shippingInfo: {
        seller_shipping: false,
        buyer_shipping: false
      },
      orders: null,
      orderItems: null,
      seller_shipping: false,
      buyer_shipping: false
    };
  },
  async created() {
    await this.getSellerOrders();
    await this.getSellerOrderItems();
  },
  async mounted() {},
  components: {
    DashboardHeader
  },
  directives: {},
  methods: {
    async submitShippingInfo() {
      try {
        const response = await ShippingService.appendShippingToOrder({
          orderId: this.orderToBeConfirmed.orderId,
          seller_shipping: this.seller_shipping,
          buyer_shipping: this.buyer_shipping
        });
        console.log(`\nThe response being : ${JSON.stringify(response)}\n`); // TESTING
      } catch (error) {
        if (error) throw error;
      }
    },
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
        var randomString =
          Math.random()
            .toString(36)
            .substring(2, 15) +
          Math.random()
            .toString(36)
            .substring(2, 15);

        window.open(`${process.env.SHIPPO_OAUTH_LINK}${randomString}`);
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

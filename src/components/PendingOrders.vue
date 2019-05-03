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
    <!-- <div v-for="(item, index) in order" v-bind:key="index">
          <div v-if="item.subject">
            <br>
            {{item.message}}
          </div>
          <div v-else>
            Title: {{item.title}}
            <br>
            Description: {{item.description}}
    </div>-->
    <!--  -->
    <div v-for="(order, index) in orders" v-bind:key="index" @click="goToOrderStatus(index)">
      <br>
      {{order}}
      <br>
    </div>
    <!--  -->
    <br>
    <br>
    <button v-on:click="goToShippingUI">Go to shipping UI</button>
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
    async goToOrderStatus(index) {
      try {
        console.log(`\nLoggin the index : ${index}\n`); // TESTING
      } catch (error) {
        if (error) throw error;
      }
    },
    async goToShippingUI() {
      try {
        // https://goshippo.com/oauth/authorize?response_type=code&client_id=YOUR_PARTNER_ID&scope=*&state=YOUR_RANDOM_STRING
        window.open(
          "https://goshippo.com/oauth/authorize?response_type=code&client_id=YOUR_PARTNER_ID&scope=*&state=YOUR_RANDOM_STRING"
        );
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

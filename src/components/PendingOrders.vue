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
    <div v-for="(item, index) in orders" v-bind:key="index">
      <br>
      {{item}}
      <br>
    </div>
    <!--  -->
    <br>
    <br>
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

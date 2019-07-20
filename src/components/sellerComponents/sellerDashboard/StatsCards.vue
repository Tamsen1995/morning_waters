<template>
  <div class="card-group">
    <div
      class="card"
      style="min-width: 30%;border-color: rgb(136, 2, 177);
              border-width: 3px; 
              border-style: solid;"
    >
      <!-- <img src="..." class="card-img-top" alt="..."> -->
      <div class="card-body">
        <h3 class="card-title" style="color: rgb(136, 2, 177)">Pending Orders:</h3>
        <h3 class="card-text">{{ this.credits }}</h3>
        <button class="btn-block" id="btn-orders" @click="redirectToPendingOrders()">View Orders</button>
      </div>
    </div>
    <div
      class="card"
      style="min-width: 30%;border-color: rgb(138, 207, 0);
              border-width: 3px; 
              border-style: solid;"
    >
      <!-- <img src="..." class="card-img-top" alt="..."> -->
      <div class="card-body">
        <h3 class="card-title" style="color: rgb(138, 207, 0);">New Leads:</h3>
        <h3 class="card-text">{{ this.leads }}</h3>
        <!-- <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> -->
        <button class="btn-block" id="btn-leads" @click="redirectToInbox()">View Leads</button>
      </div>
    </div>
    <div
      class="card"
      style="min-width: 30%;border-color: #2282ff;
              border-width: 3px; 
              border-style: solid;"
    >
      <!-- <img src="..." class="card-img-top" alt="..."> -->
      <div class="card-body">
        <h3 class="card-title" style="color: #2282ff;">Page Views:</h3>
        <h3 class="card-text">{{ this.pageViews }}</h3>
        <p class="card-text">
          <small class="text-muted">Last updated [timestamp]</small>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardHeader from "@/components/sellerComponents/DashboardHeader.vue";
import UserServices from "@/services/UserServices";
import DashboardServices from "@/services/DashboardServices";
import { ResponsiveDirective } from "vue-responsive-components";
var $ = require("jQuery");

export default {
  data() {
    return {
      credits: 0,
      leads: 0,
      pageViews: 0
    };
  },
  components: {
    DashboardHeader
  },
  directives: {
    responsive: ResponsiveDirective
  },
  methods: {
    async redirectToInbox() {
      try {
        this.$router.push({
          name: "quoteRequestsScreen"
        });
      } catch (error) {
        if (error) throw error;
      }
    },
    async redirectToPendingOrders() {
      try {
        this.$router.push({
          name: "pendingOrders"
        });
      } catch (error) {
        if (error) throw error;
      }
    },

    addService() {
      this.$modal.show("add-service");
    }
  },
  mounted() {}
};
</script>

<style scoped>
@import "../../../assets/css/dashboard.css";
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
</style>
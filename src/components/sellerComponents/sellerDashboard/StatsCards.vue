<template>
  <div class="card-group">
    <div class="card">
      <!-- <img src="..." class="card-img-top" alt="..."> -->
      <div class="card-body">
        <h3 class="card-title" style="color: #6545c5;">Pending Orders:</h3>
        <h3 class="card-text">{{ this.credits }}</h3>
        <button class="btn-block" id="btn-orders" @click="redirectToPendingOrders()">View Orders</button>
      </div>
    </div>
    <div class="card">
      <!-- <img src="..." class="card-img-top" alt="..."> -->
      <div class="card-body">
        <h3 class="card-title" style="color: rgb(138, 207, 0);">New Leads:</h3>
        <h3 class="card-text">{{ this.leads }}</h3>
        <!-- <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> -->
        <button class="btn-block" id="btn-leads" @click="redirectToInbox()">View Leads</button>
      </div>
    </div>
    <div class="card">
      <!-- <img src="..." class="card-img-top" alt="..."> -->
      <div class="card-body">
        <h3 class="card-title" style="color: #301a70;">Page Views:</h3>
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
  async created() {
    await this.retrievePageViews();
  },
  methods: {
    async retrievePageViews() {
      try {
        const userExtracted = this.$store.getters.getUserInfo;
        const response = await UserServices.retrieveSellerProfile(
          userExtracted.id
        );
        this.pageViews = response.data.user.pageViews;
      } catch (error) {
        if (error) throw error;
      }
    },
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
  }
};
</script>

<style scoped>
@import "../../../assets/css/dashboard.css";
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
</style>
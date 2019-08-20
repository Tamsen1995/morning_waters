<template>
  <div>
    <b-progress :max="max" class="mb-3">
      <b-progress-bar variant="success" :value="percentage"></b-progress-bar>
    </b-progress>
    {{this.percentage}} %
    <!-- Prompt to commence onboarding-->
    <modal name="onboarding-add-services">
      <div>
        <br />[Some kind of call to action for services (let Guy write)]
        <br />Would you like to add a service ?
      </div>
      <md-button class="md-dense md-raised md-primary" @click="addServices()">Add Services</md-button>
    </modal>
    <!--  -->

    <modal name="onboarding-add-stripe-connect">
      <div>
        <br />[Some kind of call to action stripe connect (let Guy write)]
        <br />Would you like to add a service ?
      </div>
      <md-button class="md-dense md-raised md-primary" @click="addPayoutMethod()">Add Payout method</md-button>
    </modal>
  </div>
</template>

<script>
import ProgressBar from "vue-simple-progress";
import UserServices from "@/services/UserServices";
import PaymentService from "@/services/PaymentService";
import DashboardServices from "@/services/DashboardServices";

export default {
  data() {
    return {
      percentage: 0,
      max: 100,
      seller: null,
      user: null,
      userServices: null
    };
  },
  components: {
    ProgressBar
  },
  mounted() {
    this.determineOnboardingStatus();
    // this.commenceOnboarding();
  },
  methods: {
    // this function should be invoked in the dashboard
    // everytime any steps related to the onboarding are updated
    // in order to trigger the onboarding
    async attemptOnboardingProcess() {
      try {
        if (this.userServices.length <= 0) {
          // no services means they need to add a service
          this.$modal.show("onboarding-add-services");
        } else if (this.seller.stripeConnectAcctInfo === "") {
          this.$modal.show("onboarding-add-stripe-connect");
        }

        //////////////////////////////////////////////////
      } catch (error) {
        if (error) throw error;
      }
    },

    async addServices() {
      try {
        this.$emit("dashboard-add-services");

        this.$modal.hide("onboarding-add-services");
      } catch (error) {
        if (error) throw error;
      }
    },
    async addPayoutMethod() {
      try {
        const userExtracted = this.$store.getters.getUserInfo;

        PaymentService.makeStripeConnectAccount(userExtracted);
        this.$modal.hide("onboarding-add-stripe-connect");

        this.determineOnboardingStatus();
      } catch (error) {
        if (error) throw error;
      }
    },

    async commenceOnboarding() {
      try {
        this.determineOnboardingStatus();
      } catch (error) {
        if (error) throw error;
      }
    },
    async determineOnboardingStatus() {
      try {
        this.user = this.$store.getters.getUserInfo;
        this.seller = (await UserServices.retrieveSellerProfile(
          this.user.id
        )).data.user;

        this.userServices = (await DashboardServices.queryForUsersServices(
          this.seller.serviceTableId
        )).data.usersServices;

        this.percentage = 0;
        // Here we are adding percentages for the progress bar itself
        for (var i = 0; i < this.userServices.length && i < 5; i++) {
          this.percentage = this.percentage + 10;
        }
        if (this.seller.about !== "") {
          this.percentage = this.percentage + 10;
        }
        if (this.seller.stripeConnectAcctInfo !== "") {
          this.percentage = this.percentage + 30;
        }
        if (this.seller.shippo_api_key !== "") {
          this.percentage = this.percentage + 30;
        }
        ///////////////////////////////////////////////
        this.attemptOnboardingProcess();
      } catch (error) {
        if (error) throw error;
      }
    }
  }
};
</script>

<style scoped>
</style>
<template>
  <div>
    <b-progress :max="max" class="mb-3">
      <b-progress-bar variant="success" :value="percentage"></b-progress-bar>
    </b-progress>
    {{this.percentage}} %
    <!-- Prompt to commence onboarding-->
    <modal name="onboarding-step-one">
      <div>
        <br />[Some kind of call to action for services (let Guy write)]
        <br />Would you like to add a service ?
      </div>
      <md-button class="md-dense md-raised md-primary" @click="addServices()">Add Services</md-button>
    </modal>
    <!--  -->
  </div>
</template>

<script>
import ProgressBar from "vue-simple-progress";
import UserServices from "@/services/UserServices";
import DashboardServices from "@/services/DashboardServices";

export default {
  data() {
    return {
      percentage: 0,
      max: 100,
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
    async addServices() {
      try {
        this.$emit("dashboard-add-services");
        this.$modal.hide("onboarding-step-one");
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
    async attemptOnboardingProcess() {
      try {
        // Below here the onboarding process itself is triggered

        if (this.userServices.length <= 0) {
          // no services means they need to add a service
          this.$modal.show("onboarding-step-one");
        }

        //////////////////////////////////////////////////
      } catch (error) {
        if (error) throw error;
      }
    },
    async determineOnboardingStatus() {
      try {
        this.user = this.$store.getters.getUserInfo;
        const seller = (await UserServices.retrieveSellerProfile(this.user.id))
          .data.user;

        this.userServices = (await DashboardServices.queryForUsersServices(
          seller.serviceTableId
        )).data.usersServices;

        this.percentage = 0;
        // Here we are adding percentages for the progress bar itself
        for (var i = 0; i < this.userServices.length && i < 5; i++) {
          this.percentage = this.percentage + 10;
        }
        if (seller.about !== "") {
          this.percentage = this.percentage + 10;
        }
        if (seller.stripeConnectAcctInfo !== "") {
          this.percentage = this.percentage + 20;
        }
        if (seller.shippo_api_key !== "") {
          this.percentage = this.percentage + 20;
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
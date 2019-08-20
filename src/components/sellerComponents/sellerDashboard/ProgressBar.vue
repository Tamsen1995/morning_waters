<template >
  <div class="contrainer" v-if="onboarded === false">
    <md-card style="padding: 20px; margin-bottom: 2%; background-color: white;">
      <md-button
        class="md-raised"
        :md-ripple="false"
        @click="determineOnboardingStatus()"
      >Make your profile marketable</md-button>

      <md-tooltip md-direction="right">
        <md-card style="background-color: #9c4dcc; color: white;">
          <md-card-content>
            5 services
            <md-icon v-if="userServices && userServices.length >= 5">check</md-icon>
            <br />About
            <md-icon v-if="seller && seller.about !== ''">check</md-icon>
            <br />Shippo
            <md-icon v-if="seller && seller.shippo_api_key !== ''">check</md-icon>
            <br />Payout
            <md-icon v-if="seller && seller.stripeConnectAcctInfo !== ''">check</md-icon>
            <br />
          </md-card-content>
        </md-card>
      </md-tooltip>

      <b-progress :max="max" class="mb-3">
        <b-progress-bar variant="success" :value="percentage"></b-progress-bar>
      </b-progress>
      {{this.percentage}} %
      <!-- Prompt to commence onboarding-->
      <modal height="auto" name="onboarding-add-services">
        <div>
          <br />[Some kind of call to action for services (let Guy write)]
          <br />Would you like to add a service ?
        </div>
        <md-button class="md-dense md-raised md-primary" @click="addServices()">Add Services</md-button>
      </modal>
      <!--  -->

      <modal height="auto" name="onboarding-add-stripe-connect">
        <div>
          <br />[Some kind of call to action stripe connect (let Guy write)]
          <br />Would you like to add a service ?
        </div>
        <md-button
          class="md-dense md-raised md-primary"
          @click="addPayoutMethod()"
        >Add Payout method</md-button>
      </modal>

      <modal height="auto" name="onboarding-add-shippo-acct">
        <div>
          <br />
          <br />In order to handle shipping a shippo acct is required
        </div>
        <md-button
          class="md-dense md-raised md-primary"
          @click="addShippoAccount()"
        >Add Shippo account</md-button>
      </modal>

      <modal height="auto" name="onboarding-add-about-section">
        <div style="padding: 5%;">
          <br />
          <br />[Call to action for about section]
          <md-field>
            <label>Textarea</label>
            <md-textarea v-model="aboutTextarea"></md-textarea>
          </md-field>
          <md-button
            class="md-dense md-raised md-primary"
            @click="addSellerAboutSection()"
          >Add About section</md-button>
        </div>
      </modal>

      <modal height="auto" name="thank-you-for-adding-a-payout-method">
        <div>
          <div>
            <br />
            <br />Thank you for adding a payout method
          </div>
          <md-button
            class="md-dense md-raised md-primary"
            @click="proceedAfterPayoutRegistration()"
          >Next</md-button>
        </div>
      </modal>
    </md-card>
  </div>
</template>

<script>
import ProgressBar from "vue-simple-progress";
import UserServices from "@/services/UserServices";
import PaymentService from "@/services/PaymentService";
import DashboardServices from "@/services/DashboardServices";
import ShippingService from "@/services/ShippingService";

export default {
  data() {
    return {
      percentage: 0,
      max: 100,
      seller: null,
      user: null,
      userServices: null,
      onboarded: false,
      aboutTextarea: ""
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
        if (this.userServices && this.userServices.length <= 0) {
          // no services means they need to add a service
          this.$modal.show("onboarding-add-services");
        } else if (this.seller && this.seller.stripeConnectAcctInfo === "") {
          this.$modal.show("onboarding-add-stripe-connect");
        } else if (this.seller && this.seller.about === "") {
          this.$modal.show("onboarding-add-about-section");
        } else if (this.seller && this.seller.shippo_api_key === "") {
          this.$modal.show("onboarding-add-shippo-acct");
        }

        //////////////////////////////////////////////////
      } catch (error) {
        if (error) throw error;
      }
    },
    async addSellerAboutSection() {
      try {
        this.aboutTextarea = "";
        this.$modal.hide("onboarding-add-about-section");
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
        this.$modal.show("thank-you-for-adding-a-payout-method");
      } catch (error) {
        if (error) throw error;
      }
    },
    async addShippoAccount() {
      try {
        ShippingService.makeShippoApiToken();
        this.$modal.hide("onboarding-add-shippo-acct");
        this.$modal.show("thank-you-for-adding-a-payout-method");
      } catch (error) {
        if (error) throw error;
      }
    },

    async proceedAfterPayoutRegistration() {
      try {
        this.$modal.hide("thank-you-for-adding-a-payout-method");
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
        console.log(`skjnjsdfn${JSON.stringify(this.seller)}`); // TESTING
        this.userServices = (await DashboardServices.queryForUsersServices(
          this.seller.serviceTableId
        )).data.usersServices;

        this.percentage = 0;
        // Here we are adding percentages for the progress bar itself
        if (this.userServices) {
          for (var i = 0; i < this.userServices.length && i < 5; i++) {
            this.percentage = this.percentage + 5;
          }
        }
        if (this.seller && this.seller.about !== "") {
          this.percentage = this.percentage + 10;
        }
        if (this.seller && this.seller.stripeConnectAcctInfo !== "") {
          this.percentage = this.percentage + 40;
        }
        if (this.seller && this.seller.shippo_api_key !== "") {
          this.percentage = this.percentage + 25;
        }

        ///////////////////////////////////////////////

        // if the onboarding has been completed we wanna make sure to signal this to the back
        if (this.percentage === 100) {
          this.onboarded = true;
        }

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
<template >
  <div class="contrainer" id="progress" v-if="onboarded === false">
    <md-card style="padding: 20px; margin-bottom: 2%; background-color: white; border-radius: 5px;">
      <div class="row">
        <div class="col">
          <h4>Profile completion:</h4>
        </div>
        <div class="col">
          <md-button
            v-if="userServices && percentage >= 80 && userServices.length < 5"
            class="md-raised pull-right"
            :md-ripple="false"
            @click="addServices()"
          >Improve your profile</md-button>
          <md-button
            v-else
            class="md-raised pull-right blinking"
            :md-ripple="false"
            @click="determineOnboardingStatus()"
          >Complete your profile</md-button>
          <!-- TO DO: Add link to public profile -->
          <md-button
            @click="previewPublicProfile()"
            id="publicProfile-link"
            class="pull-right"
            :md-ripple="false"
          >Preview your profile</md-button>
        </div>
      </div>
      <md-tooltip md-direction="right" md-active>
        <md-card style="background-color: white; color: purple;">
          <md-card-content>
            <h3>To do:</h3>
            <hr />Add service listing
            <md-icon v-if="userServices && userServices.length >= 1">check</md-icon>
            <br />Add about info
            <md-icon v-if="seller && seller.about !== ''">check</md-icon>
            <br />Shippo setup
            <md-icon v-if="seller && seller.shippo_api_key !== ''">check</md-icon>
            <br />Payout setup
            <md-icon v-if="seller && seller.stripeConnectAcctInfo !== ''">check</md-icon>
            <br />
          </md-card-content>
        </md-card>
      </md-tooltip>

      <b-progress :max="max" class="mb-3">
        <b-progress-bar class="progress_fill" :value="percentage"></b-progress-bar>
      </b-progress>
      {{this.percentage}} %
      <!-- Prompt to commence onboarding-->
      <modal :adaptive="true" :resizable="true" height="auto" name="onboarding-add-services">
        <div id="progress_modal">
          <h4>To begin marketing, you must add at least 1 service.</h4>
          <br />
          <!-- <h5>A good service listing includes:</h5>
          <ol>
            <li>Service description for buyers</li>
            <li>At least 5 descriptive keywords (the more the better)</li>
            <li>Pricing</li>
            <li>Turn-around time</li>
          </ol>-->
          <br />Would you like to add a service?
          <md-button
            class="md-dense md-raised md-primary"
            style="color: purple;"
            @click="addServices()"
          >
            <i class="fas fa-atom" id="service_logo"></i> Add Services
          </md-button>
        </div>
      </modal>
      <!--  -->

      <modal height="auto" :adaptive="true" :resizable="true" name="onboarding-add-stripe-connect">
        <div class="container" id="progress_modal">
          <h3>Add Payout System</h3>
          <br />
          <h5>Your payout system is used for buyers to pay you. This information is mandatory before you can recieve payments from buyers.</h5>
          <br />
          <md-button
            class="md-dense md-raised md-primary"
            @click="addPayoutMethod()"
          >Add Payout method</md-button>
          <br />
          <br />
          <p>
            We partner with Stripe to ensure safe & secure transactions.
            <a>Learn more</a>
          </p>
        </div>
      </modal>

      <modal height="auto" :adaptive="true" :resizable="true" name="onboarding-add-shippo-acct">
        <div id="progress_modal">
          <br />We recommend you use our shipping partners shippo for smoother transactions.
          <br />With shippo you can handle delicate packages, dry ice, insurance, and get live updates - all on our platform...
          <br />And you get 30% off!
          <md-button
            class="md-dense md-raised md-primary"
            @click="addShippoAccount()"
          >Add Shippo account</md-button>
        </div>
      </modal>

      <modal height="auto" :adaptive="true" :resizable="true" name="onboarding-add-about-section">
        <div id="progress_modal">
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

      <modal
        height="auto"
        :adaptive="true"
        :resizable="true"
        name="thank-you-for-adding-a-payout-method"
      >
        <div id="progress_modal">
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

      <modal
        height="auto"
        :adaptive="true"
        :resizable="true"
        name="thank-you-for-adding-a-shipping-method"
      >
        <div id="progress_modal">
          <div>
            <br />
            <br />Thank you for adding a shipping method
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
    this.determineOnboardingPercentage();
    // this.commenceOnboarding();
  },
  methods: {
    async previewPublicProfile() {
      try {
        const userExtracted = this.$store.getters.getUserInfo;

        this.$router.push({
          name: "publicProfile",
          params: {
            id: userExtracted.id
          },
          query: { preview: "true" }
        });
      } catch (error) {
        if (error) throw error;
      }
    },
    async determineOnboardingPercentage() {
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
        if (this.userServices.length >= 1) {
          this.percentage = this.percentage + 25;
        }
        if (this.seller && this.seller.about !== "") {
          this.percentage = this.percentage + 25;
        }
        if (this.seller && this.seller.stripeConnectAcctInfo !== "") {
          this.percentage = this.percentage + 25;
        }
        if (this.seller && this.seller.shippo_api_key !== "") {
          this.percentage = this.percentage + 25;
        }

        ///////////////////////////////////////////////

        // if the onboarding has been completed we wanna make sure to signal this to the back
        if (this.percentage === 100) {
          this.onboarded = true;
        }
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
        if (this.userServices.length >= 1) {
          this.percentage = this.percentage + 25;
        }
        if (this.seller && this.seller.about !== "") {
          this.percentage = this.percentage + 25;
        }
        if (this.seller && this.seller.stripeConnectAcctInfo !== "") {
          this.percentage = this.percentage + 25;
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
    },
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
        const userExtracted = this.$store.getters.getUserInfo;

        const response = await UserServices.addSellerAboutSection({
          sellerId: userExtracted.id,
          about: this.aboutTextarea
        });
        this.$emit("update-about-section");

        this.$modal.hide("onboarding-add-about-section");
        this.aboutTextarea = "";
        this.determineOnboardingStatus();
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
        this.$modal.show("thank-you-for-adding-a-shipping-method");
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
    }
  }
};
</script>

<style scoped>
@import "../../../assets/css/progress.css";
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
</style>
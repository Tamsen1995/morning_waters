<template>
<div id="app">
  <dashboard-header />
  <body class="dashboard">
    <!--  -->

    <div
      class="payment-cards"
      v-for="source in this.customerSources"
      v-bind:key="source.id"
      v-on:click="promptForDefaultSourceConfirm(source.id)"
    >
      <pre>{{ source.brand }} ending in	{{ source.last4 }} </pre>
      <pre> expires : {{ source.exp_month }} / {{ source.exp_year }}</pre>
    </div>

    <!--  -->
  </body>

  <!-- Prompt to ask the user if they want to make this card the default source -->
  <modal name="change-default-source-prompt">
    <div class="container" style="margin:75px">
      <div class="row">
        <div class="col-md-4">
          <h4>Would you like to make this card your default payment method ?</h4>

          <button
            class="btn btn-info pull-right"
            style="margin-top:10px"
            type="button"
            @click="makeDefaultSource"
          >Submit</button>
        </div>
      </div>
    </div>
  </modal>
  <!--  -->

  <!-- Tells the user that the default source has been changed -->
  <modal name="default-source-changed">
    <div class="container" style="margin:75px">
      <div class="row">
        <div class="col-md-4">
          <h4>Your default payment method has been changed</h4>

          <button
            class="btn btn-info pull-right"
            style="margin-top:10px"
            type="button"
            @click="hideConfirmMessage"
          >OK Great</button>
        </div>
      </div>
    </div>
  </modal>
  <!--  -->
</div>
</template>

<script>
import DashboardHeader from "@/components/DashboardHeader.vue";
import SettingsService from "@/services/SettingsService";

export default {
  data() {
    return {
      user: null,
      customerSources: [],
      sourceToBeDefaulted: ""
    };
  },
  mounted() {
    this.getStripeUserInfo();
  },
  components: {
    DashboardHeader
  },
  methods: {
    // Takes the source ID provided and sets it as the default source
    async hideConfirmMessage() {
      this.$modal.hide("default-source-changed");
    },
    async makeDefaultSource() {
      try {
        const userExtracted = this.$store.getters.getUserInfo;

        const updateDefaultSourceInfo = {
          stripeCustomerId: userExtracted.stripeCustomerId,
          sourceID: this.sourceToBeDefaulted
        };
        this.$modal.hide("change-default-source-prompt");
        const response = await SettingsService.updateDefaultSource(
          updateDefaultSourceInfo
        );
        console.log(`\nResponse for makeDefaultSource : ${response}\n`);
        this.$modal.show("default-source-changed");
      } catch (error) {
        console.log(`\nThe error inside of makeDefaultSource: ${error}`); // TESTING
        if (error) throw error;
      }
    },
    async promptForDefaultSourceConfirm(sourceID) {
      try {
        this.$modal.show("change-default-source-prompt");
        this.sourceToBeDefaulted = sourceID;
      } catch (error) {
        console.log(
          `\nAn error occurred in promptForDefaultSourceConfirm ${error}\n`
        );
        if (error) throw error;
      }
    },
    async getStripeUserInfo() {
      try {
        const userExtracted = this.$store.getters.getUserInfo;
        const stripeUserInfo = await SettingsService.getStripeUserInfo(
          userExtracted
        );
        this.subscriptions = stripeUserInfo.data.subscriptions.data;
        const customerSources = stripeUserInfo.data.stripeCustomer.sources;
        this.customerSources = customerSources.data;

        console.log(
          `\nThe customer's default source is : ${JSON.stringify(
            stripeUserInfo.data.stripeCustomer.default_source
          )}\n`
        ); // TESTING
      } catch (error) {
        console.log(
          `\nAn error occurred in SettingsChangeDefaultSource getStripeUserInfo ${error}\n`
        );
        if (error) throw error;
      }
    }
  }
};
</script>

<style>
@import "../assets/css/dashboard.css";
.payment-cards {
  width: 400px;
  font-size: 150%;
  border: 2px solid purple;
  padding: 20px;
  margin-left: 10px;
}
</style>

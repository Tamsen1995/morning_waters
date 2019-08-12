<template>
  <div>
    <br />
    <h1>IN HERE THE stripeconnect client id IS APPENDED TO EITHER THE SELLER OR THE BUYER</h1>
    <br />
  </div>
</template>

<script>
import ShippingService from "@/services/ShippingService";
import PaymentService from "@/services/PaymentService";
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    async generateStripConnectClientId() {
      try {
        const buyerExtracted = this.$store.getters.getBuyerInfo;
        const userExtracted = this.$store.getters.getUserInfo;

        if (userExtracted) {
          const stripeConnectClientIdRequest = {
            sellerId: userExtracted.id,
            code: this.$route.params.code,
            state: this.$route.params.state,
            grant_type: "authorization_code"
          };

          await PaymentService.generateSellerStripeConnectClientId(
            stripeConnectClientIdRequest
          );
          window.close();
        } else {
          const stripeConnectClientIdRequest = {
            buyerId: buyerExtracted.id,
            code: this.$route.params.code,
            state: this.$route.params.state,
            grant_type: "authorization_code"
          };
          console.log(
            `\n\nHere we'll have to determine if the buyers will also need a stripe connect account\n`
          ); // TESTING
        }
      } catch (error) {
        if (error) throw error;
      }
    }
  },
  mounted() {
    // if it isn't already generated
    this.generateStripConnectClientId();
  },
  created() {}
};
</script>

<style>
</style>

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
        console.log(` -- >${this.$route.params.code}`); // TESTING
        console.log(` -- >${this.$route.params.state}`); // TESTING
        const buyerExtracted = this.$store.getters.getBuyerInfo;
        const userExtracted = this.$store.getters.getUserInfo;
        // // This assumes the seller has opened a new shippo account
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
          // await ShippingService.generateSellerApiToken(shippoAPItokenRequest);
          window.close();
        } else {
          const stripeConnectClientIdRequest = {
            buyerId: buyerExtracted.id
            //     client_id: process.env.SHIPPO_CLIENT_ID,
            //     client_secret: process.env.SHIPPO_CLIENT_SECRET,
            //     code: this.$route.params.code,
            //     state: this.$route.params.state,
            //     grant_type: "authorization_code"
          };
          console.log(
            `\n\n--- buyer > ${JSON.stringify(stripeConnectClientIdRequest)}\n`
          ); // TESTING
          //   // This assumes the buyer has opened a new shippo account
          // await ShippingService.generateBuyerApiToken(shippoAPItokenRequest);
          // window.close();
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

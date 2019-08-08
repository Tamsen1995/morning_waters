<template>
  <div>
    <br />
    <h1>IN HERE THE SHIPPO API KEY IS APPENDED TO EITHER THE SELLER OR THE BUYER</h1>
    <br />
  </div>
</template>

<script>
import ShippingService from "@/services/ShippingService";
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    async generateAPItoken() {
      try {
        const buyerExtracted = this.$store.getters.getBuyerInfo;
        const userExtracted = this.$store.getters.getUserInfo;
        // This assumes the seller has opened a new shippo account
        if (userExtracted) {
          const shippoAPItokenRequest = {
            sellerId: userExtracted.id,
            client_id: process.env.SHIPPO_CLIENT_ID,
            client_secret: process.env.SHIPPO_CLIENT_SECRET,
            code: this.$route.params.code,
            state: this.$route.params.state,
            grant_type: "authorization_code"
          };
          await ShippingService.generateSellerApiToken(shippoAPItokenRequest);
          window.close();
        } else {
          const shippoAPItokenRequest = {
            buyerId: buyerExtracted.id,
            client_id: process.env.SHIPPO_CLIENT_ID,
            client_secret: process.env.SHIPPO_CLIENT_SECRET,
            code: this.$route.params.code,
            state: this.$route.params.state,
            grant_type: "authorization_code"
          };
          // This assumes the buyer has opened a new shippo account
          await ShippingService.generateBuyerApiToken(shippoAPItokenRequest);
          window.close();
        }
      } catch (error) {
        if (error) throw error;
      }
    }
  },
  mounted() {
    // if it isn't already generated
    this.generateAPItoken();
  },
  created() {}
};
</script>

<style>
</style>

<template>
  <div>
    <b-progress :max="max" class="mb-3">
      <b-progress-bar variant="success" :value="percentage"></b-progress-bar>
    </b-progress>
    {{this.percentage}}
  </div>
</template>

<script>
import ProgressBar from "vue-simple-progress";
import UserServices from "@/services/UserServices";

export default {
  data() {
    return {
      percentage: 0,
      max: 100,
      value: [0, 0, 0]
    };
  },
  components: {
    ProgressBar
  },
  mounted() {
    this.determineOnboardingStatus();
  },
  methods: {
    async determineOnboardingStatus() {
      try {
        const userExtracted = this.$store.getters.getUserInfo;
        const seller = (await UserServices.retrieveSellerProfile(
          userExtracted.id
        )).data.user;

        if (seller.about !== "") {
          this.percentage = this.percentage + 25;
        }
        if (seller.stripeConnectAcctInfo !== "") {
          this.percentage = this.percentage + 15;
        }
        console.log(`\nseller :  ${JSON.stringify(seller)}\n`); // TESTING
      } catch (error) {
        if (error) throw error;
      }
    }
  }
};
</script>

<style scoped>
</style>
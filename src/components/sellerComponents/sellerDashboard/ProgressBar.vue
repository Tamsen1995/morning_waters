<template>
  <div>
    <b-progress :max="max" class="mb-3">
      <b-progress-bar variant="success" :value="value[0]"></b-progress-bar>
      <b-progress-bar variant="success" :value="value[1]"></b-progress-bar>
      <b-progress-bar variant="success" :value="value[2]"></b-progress-bar>
    </b-progress>
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
      value: [30, 0, 0]
    };
  },
  components: {
    ProgressBar
  },
  created() {
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
          this.percentage = 20;
        }

        console.log(`\n\nthe seller is : ${JSON.stringify(seller)}\n`); // TESTING
      } catch (error) {
        if (error) throw error;
      }
    }
  }
};
</script>

<style scoped>
</style>
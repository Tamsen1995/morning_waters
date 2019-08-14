<template>
  <div>
    <progress-bar size="medium" v-bind:val="percentage" v-bind:text="`${percentage}%`"></progress-bar>
  </div>
</template>

<script>
import ProgressBar from "vue-simple-progress";

export default {
  data() {
    return {
      percentage: 10
    };
  },
  components: {
    ProgressBar
  },
  mounted() {
    // TESTING only
    window.setTimeout(this.determineOnboardingStatus, 3000);
  },

  methods: {
    async determineOnboardingStatus() {
      try {
        this.percentage = this.percentage + 50;
      } catch (error) {
        if (error) throw error;
      }
    }
  }
};
</script>

<style scoped>
</style>
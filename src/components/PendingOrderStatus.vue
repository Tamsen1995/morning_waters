<template>
<div>
  <dashboard-header></dashboard-header>
  <body>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>

    <br>
    <br>
    <br>
    <br>
    <h1>TIMELINE</h1>
  </body>
</div>
</template>

<script>
import DashboardHeader from "@/components/DashboardHeader.vue";

export default {
  data() {
    return {
      orderId: ""
    };
  },
  async created() {},
  async mounted() {
    this.orderId = this.$route.params.orderId;
  },
  components: {
    DashboardHeader
  }
};
</script>

<style>
</style>

<template>
<div id="app">
  <buyer-header></buyer-header>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <body>
    <h1>Order Confirmation</h1>
  </body>
</div>
</template>

<script>
import BuyerHeader from "@/components/buyerComponents/BuyerHeader";

export default {
  data() {
    return {};
  },
  beforeDestroy() {},
  created() {},
  mounted() {
    console.log(`\nThe order confirm page is being mounted\n`); // TESTING
  },
  components: {
    BuyerHeader
  },
  methods: {}
};
</script>

<style>
</style>

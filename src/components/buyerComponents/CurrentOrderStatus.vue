<template>
<div id="app">
  <buyer-header></buyer-header>
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
    {{ this.order }}
    <br>
    <br>
  </body>
</div>
</template>

<script>
import BuyerHeader from "@/components/buyerComponents/BuyerHeader";

export default {
  data() {
    return {
      order: null
    };
  },
  mounted() {
    this.getOrderStatus();
  },
  //   beforeDestroy() {
  //     this.$store.dispatch("setObjectToBeSent", null);
  //   },
  components: {
    BuyerHeader
  },
  methods: {
    async getOrderStatus() {
      try {
        this.order = this.$store.getters.getObjectToBeSent;
        // console.log(
        //   `\nThe order which needs to be processed is : ${JSON.stringify(
        //     this.order
        //   )}\n`
        // ); // TESTING
      } catch (error) {
        if (error) throw error;
      }
    }
  }
};
</script>

<style>
</style>

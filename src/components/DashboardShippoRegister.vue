<template>
  <div>
    <br>
    <h1>IN HERE THE SHIPPO API KEY IS APPENDED TO EITHER THE SELLER OR THE BUYER</h1>
    <br>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    async getShippoCodeAndState() {
      try {
        console.log(`\n\n -- >state: ${this.$route.params.state}\n\n`); // TESTING
        console.log(`\n\n -- >code: ${this.$route.params.code}\n\n`); // TESTING
      } catch (error) {
        if (error) throw error;
      }
    }
  },
  mounted() {
    this.getShippoCodeAndState();
  },
  created() {
    this.getShippoCodeAndState();
  }
};
</script>

<style>
</style>

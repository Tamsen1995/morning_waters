<template>
  <div id="app">
    <b-navbar toggleable="lg" style="position: sticky" id="seller_nav">
      <b-navbar-brand href="#" class="mr-auto" style="margin-bottom:15px;">
        <div @click="redirectToDash()">
          <md-icon>keyboard_return</md-icon>Back to Dashboard
        </div>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  directives: {},
  async created() {},
  async mounted() {},
  methods: {
    async redirectToDash() {
      try {
        this.$router.push({ name: "dashboard" });
      } catch (error) {
        if (error) throw error;
      }
    }
  }
};
</script>

<style>
@import "../../assets/css/header.css";
</style>

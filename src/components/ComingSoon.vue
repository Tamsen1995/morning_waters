<template>
<div>
  <page-header></page-header>
  <body>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />

    <md-empty-state
      style="background-color: grey; color: white;"
      md-rounded
      md-label="Coming Soon"
      md-description="We'll contact you when our services are fully operational."
    >
      <img
        src="../assets/css/TINY_LOGO_WHITE.png"
        alt="FIG ANALYTICS"
        class="center"
        id="login-logo"
      />
    </md-empty-state>
  </body>
</div>
</template>

<script>
import PageHeader from "@/components/Header.vue";

export default {};
</script>

<style scoped>
@import "../assets/css/forms.css";
@import url("https://fonts.googleapis.com/css?family=Open+Sans|Roboto");
</style>

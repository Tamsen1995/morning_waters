<template>
<div id="app">
  <buyer-header></buyer-header>
  <div class="responsive-component" v-responsive="{
    small: el => el.width < 860
    }">
    <body class="settings">
      <div id="settings-page">
      <billing-tab></billing-tab>
      </div>
    </body>
  </div>
</div>
</template>

<script>
import BuyerHeader from "@/components/buyerComponents/BuyerHeader.vue";
import { ResponsiveDirective } from "vue-responsive-components";
import BillingTab from "@/components/buyerComponents/BuyerSettingsBillingsTab.vue";

export default {
  data() {
    return {};
  },
  directives: {
    responsive: ResponsiveDirective
  },
  mounted() {},
  components: {
    BuyerHeader,
    BillingTab
  },
  methods: {}
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
@import "../../assets/css/settings.css";
</style>

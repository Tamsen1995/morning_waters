<template>
  <div>
    <div class="container" id="name-location">
      <div class="d-flex justify-content-center" id="company-name">
        <h1 style="text-align:center:">{{ this.companyName }}</h1>
      </div>
      <div class="d-flex justify-content-center" id="company-location">
        <h4 style="text-align:center:">Location: {{ this.companyLocation }}</h4>
      </div>
      <div class="d-flex justify-content-center" id="company-logo">
        <div id="logo-border">
          <div class="circle" id="logo"></div>
        </div>
      </div>
    </div>
    <br />

    <!-- About Section -->
    <div class="container" id="about">
      <h4>About:</h4>
      <!-- Scroll Content -->
      <md-content class="md-scrollbar">
        <p style="text-align:left">{{ this.about }}</p>
      </md-content>

      <!-- Transition Expand Content -->

      <!-- <transition-expand>
        <md-card>
          <div v-if="expanded">{{this.about}}</div>
        </md-card>
      </transition-expand>
      <md-button
              class="md-dense md-raised md-primary"
              @click="expanded = !expanded"
      >{{ expanded ? `Shrink` : `Expand` }}</md-button>-->
    </div>
  </div>
</template>

<script>
import UserServices from "@/services/UserServices";
import TransitionExpand from "@/components/TransitionExpand";

export default {
  data() {
    return {
      user: null,
      companyName: "",
      companyLocation: "",
      about: "",
      expanded: false
    };
  },
  components: {
    TransitionExpand
  },
  methods: {
    async getUserInfo() {
      // TODO : Make a request for the public user info into the backend
      try {
        const userExtracted = this.$store.getters.getUserInfo;
        const userId = userExtracted.id;
        const response = (await UserServices.getPublicProfileInfo(userId)).data;
        this.user = response.user;
        this.companyName = this.user.companyName;
        this.about = this.user.about;
      } catch (error) {
        if (error) throw error;
      }
    }
  },
  mounted() {
    this.getUserInfo();
  }
};
</script>

<style scoped>
@import "../../../assets/css/dashboard.css";
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
</style>
<template>
  <div>
    <div class="container" id="name-location">
      <div class="d-flex justify-content-center" id="company-name">
        <h1 style="text-align:center:">{{ this.companyName }}</h1>
      </div>

      <div class="d-flex justify-content-center" d="company-location">
        <h4>{{ this.companyLocation.city }}, {{ this.companyLocation.country }}</h4>
      </div>

      <!-- <div class="row">
        <div class="col">
          <div class="pull-right" id="company-location">
            <h4>{{ this.companyLocation.city }}, {{ this.companyLocation.country }}</h4>
          </div>
        </div>
        <div class="col">
          <a id="publicProfile-link" style="text-align:left;">
            Preview your profile
          </a>
        </div>
      </div>-->
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
        <md-button
          v-if="this.editingAboutSection === false"
          @click="editAboutSection()"
          style="color:#301a70"
          class="pull-right md-fab md-mini md-plain"
        >
          <md-icon>edit</md-icon>
        </md-button>
        <div v-else>
          <md-field>
            <label>Edit about section here</label>
            <md-textarea v-model="aboutTextarea" style="background-color: #e8eaf6;"></md-textarea>
          </md-field>
          <md-button @click="saveAboutEdit()" class="md-raised">Save edit</md-button>
        </div>
        <p style="text-align:left" v-if="this.editingAboutSection === false">{{ this.about }}</p>
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
      aboutTextarea: "",
      about: "",
      editingAboutSection: false
    };
  },
  components: {
    TransitionExpand
  },
  methods: {
    editAboutSection() {
      this.aboutTextarea = this.about;

      this.editingAboutSection = true;
    },
    async saveAboutEdit() {
      try {
        const userExtracted = this.$store.getters.getUserInfo;

        const response = await UserServices.addSellerAboutSection({
          sellerId: userExtracted.id,
          about: this.aboutTextarea
        });
        this.editingAboutSection = false;
        this.aboutTextarea = "";
        this.getUserInfo();
        this.$emit("determine-onboarding-status");
      } catch (error) {
        if (error) throw error;
      }
    },
    async getUserInfo() {
      // TODO : Make a request for the public user info into the backend
      try {
        const userExtracted = this.$store.getters.getUserInfo;
        const userId = userExtracted.id;
        const response = (await UserServices.getPublicProfileInfo(userId)).data;
        this.user = response.user;
        this.companyName = this.user.companyName;
        this.about = this.user.about;
        this.companyLocation = JSON.parse(userExtracted.address);
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
<template>
<div>
  <buyer-header></buyer-header>
  <body class="login">
    <div
      class="responsive-component"
      v-responsive="{
      small: el => el.width < 430
      }"
      id="register"
    >
      <b-container id="buyer-login">
        <b-row>
          <b-col>
            <hr>
            <b-container>
              <div id="fig-logo-white">
                <img
                  src="../../assets/css/TINY_LOGO_WHITE.png"
                  alt="FIG ANALYTICS"
                  class="center"
                  id="login-logo"
                >
              </div>
            </b-container>
            <!-- Loadng animation -->
            <div class="loader" v-if="loadingFlag == 2">Loading...</div>

            <!-- Form -->
            <b-card bg-variant="transparent">
              <!-- <div id="fig-logo-white"> <b-img src="./LOGO_WHITE_mini.png" fluid alt="Responsive image"/></div> -->
              <h1>Login</h1>
              <hr>
              <br>

              <form>
                <div class="form-group row">
                  <label for="email" class="col-sm col-form-label">Email:</label>
                  <div class="col-sm-12">
                    <input
                      type="text"
                      class="form-control"
                      id="staticEmail"
                      value="Enter your email"
                      v-model="email"
                    >
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm col-form-label">Password:</label>
                  <div class="col-sm-12">
                    <input
                      type="password"
                      class="form-control"
                      id="inputPassword"
                      placeholder="Enter your password"
                      v-model="password"
                    >
                  </div>
                </div>
              </form>

              <br>
              <div class="error" v-html="error"/>
              <!-- <br> -->

              <button
                type="button"
                class="btn btn-outline pull-right"
                id="submit"
                @click="buyerLogin"
              >
                <h3>Submit</h3>
              </button>

              <a @click="redirectOntoBuyerRegister()">Don't have an account ?</a>
            </b-card>
            <br>
            <br>
            <!-- Footer -->
            <div id="form-footer">
              <b-container id="legal-links">
                <b-row>
                  <b-col cols="8">
                    <h5>Terms and Conditions</h5>
                  </b-col>
                  <b-col cols="4">
                    <h5>Privacy</h5>
                  </b-col>
                </b-row>
              </b-container>
              <br>
              <p style="text-align:center">Fig Analytics is a certified C Corporation.</p>
              <p style="text-align:center">&copy; FIG 2018. All Rights Reserved.</p>
            </div>
            <hr>
          </b-col>
          <!-- <b-col cols="12" md="auto"></b-col> -->
        </b-row>
      </b-container>
    </div>
  </body>
</div>
</template>

<script>
import PageHeader from "@/components/Header.vue";
import BuyerHeader from "@/components/buyerComponents/BuyerHeader.vue";
import AuthenticationService from "@/services/AuthenticationService";
import Api from "@/services/Api";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
      loadingFlag: 0
    };
  },
  components: {
    BuyerHeader,
    PageHeader
  },
  methods: {
    async redirectOntoBuyerRegister() {
      try {
        console.log(`\nThe redirect\n`); // TESTING
        this.$router.push({
          name: "buyerRegister"
        });
      } catch (error) {
        console.log(`\nError in redirectOntoBuyerRegister\n`); // TESTING
        if (error) throw error;
      }
    },
    // logs the buyer in and redirects accordingly
    async buyerLogin() {
      try {
        const response = await AuthenticationService.buyerLogin({
          email: this.email,
          password: this.password
        });
        localStorage.setItem("id_token", response.data.token);
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setBuyer", response.data.buyer);
        Api().defaults.headers.common[
          "Authorization"
        ] = AuthenticationService.getAuthHeader();

        const comingFromShoppingCart = this.$store.getters.getShoppingCartFlag;

        if (comingFromShoppingCart == false) {
          this.$router.push({
            name: "buyerDashboard"
          });
        } else {
          this.$router.push({
            name: "buyerCheckout"
          });
        }
      } catch (error) {
        console.log(`An error occured in the login component ${error}`); // TESTING
      }
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/forms.css";
@import url("https://fonts.googleapis.com/css?family=Open+Sans|Roboto");
</style>

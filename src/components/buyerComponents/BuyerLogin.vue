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
      <div class="container-fluid" style="width: 65%" id="login">
        <md-card>
          <div class="row">
            <br />
            <div class="col">
              <div class="container-fluid">
                <br />
                <br />
                <div id="fig-logo-white">
                  <img
                    src="../../assets/css/TINY_LOGO_WHITE.png"
                    alt="FIG ANALYTICS"
                    class="center"
                    id="login-logo"
                  />
                </div>
                <br />
              </div>
              <!-- Loadng animation -->
              <div class="loader" v-if="loadingFlag == 2">Loading...</div>

              <!-- Form -->

              <div class="container-fluid" style="width: 50%">
                <md-card class="card border-0" id="rounded">
                  <form>
                    <br />
                    <h3>Buyer Login</h3>
                    <br />
                    <hr />

                    <md-field>
                      <label>Email:</label>
                      <br />
                      <md-input
                        placeholder="Enter your email address"
                        class="form-control"
                        v-model="email"
                      ></md-input>
                    </md-field>

                    <md-field>
                      <label>Password:</label>
                      <br />
                      <md-input
                        type="password"
                        v-model="password"
                        class="form-control"
                        id="inputPassword"
                        placeholder="Enter your password"
                      ></md-input>
                    </md-field>

                    <br />
                    <div class="error" v-html="error" />

                    <div class="container" id="center">
                      <md-button
                        type="button"
                        @click="buyerLogin()"
                        style="background-color: purple; color: white;"
                      >Login</md-button>
                      <br />
                      <br />
                      <p>
                        Don't have an account yet?
                        <a @click="redirectOntoBuyerRegister()">Sign up</a>
                      </p>
                    </div>
                  </form>
                </md-card>
              </div>
              <!-- Footer -->
              <div class="container" id="form-footer">
                <a href="#" id="legal-links">Terms and Conditions</a>
                <br />
                <a href="#" id="legal-links">Privacy</a>
                <br />
                <hr />
                <p style="text-align:center">Fig Analytics is a certified C Corporation.</p>
                <p style="text-align:center">&copy; FIG 2018. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </md-card>
      </div>
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

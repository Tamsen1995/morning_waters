<template>
<div id="app">
  <buyer-header></buyer-header>
  <div class="responsive-component" v-responsive="{
    small: el => el.width < 430
    }">
    <body>
      <div class="row">
        <div class="col">
          <div class="container">
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
          <md-card class="card" id="login">
            <form>
              <br />
              <h2>Buyer Login</h2>
              <br />

              <md-field>
                <label>Email:</label>
                <br />
                <md-input
                  placeholder="Enter your email address"
                  class="form-control"
                  v-model="email"
                  v-on:keyup.enter="buyerLogin()"
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
                  v-on:keyup.enter="buyerLogin()"
                ></md-input>
              </md-field>

              <br />
              <div class="error" v-html="error" />

              <div class="container" id="center">
                <md-button
                  type="button"
                  @click="buyerLogin()"
                  id="btn-login"
                  style="width:100px;"
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
          <!-- Footer -->
          <div class="container" id="login-form-footer">
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
    </body>
  </div>
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

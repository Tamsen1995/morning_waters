<template>
<div>
  <buyer-header></buyer-header>
  <div
    class="responsive-component"
    v-responsive="{
      small: el => el.width < 430,
      large: el=> el.width > 1030
      }"
  >
    <body class="register">
      <div class="fixed-horizontal-center">
        <!-- Loadng animation -->
        <!-- <div class="loader">Loading...</div> -->
        <!-- Form -->
        <b-card bg-variant="light" style="max-width: 100rem;" id="register">
          <h1>Buyer Sign Up</h1>
          <br>
          <!-- <hr> -->
          <br>
          <div class="error" v-html="error"/>
          <!-- input for name -->
          <form>
            <div>Personal Info</div>
            <hr>
            <div class="form-group row">
              <label for="name" class="col-sm col-form-label">Name:</label>
              <div class="col-sm-12">
                <input
                  v-model="name"
                  type="text"
                  class="form-control"
                  id="staticEmail"
                  value="Enter your name"
                >
              </div>
            </div>

            <div class="form-group row">
              <label for="email" class="col-sm col-form-label">Email:</label>
              <div class="col-sm-12">
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  placeholder="Enter your email"
                >
              </div>
            </div>

            <div class="form-group row">
              <label for="inputPassword" class="col-sm col-form-label">Password:</label>
              <div class="col-sm-12">
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  placeholder="Enter your password"
                >
              </div>
            </div>

            <div class="form-group row">
              <label for="inputPassword" class="col-sm col-form-label">Confirm Password:</label>
              <div class="col-sm-12">
                <input
                  v-model="passwordConfirm"
                  type="password"
                  class="form-control"
                  placeholder="Re-enter your password"
                >
              </div>
            </div>

            <!--  -->
            <div>
              Address
              <br>
              <!-- Street -->
              <div class="form-group row">
                <label for="inputStreet" class="col-sm col-form-label">Street:</label>
                <div class="col-sm-12">
                  <input
                    v-model="address.street"
                    type="text"
                    class="form-control"
                    placeholder="Enter your street"
                  >
                </div>
              </div>

              <!-- City -->
              <div class="form-group row">
                <label for="inputCity" class="col-sm col-form-label">City:</label>
                <div class="col-sm-12">
                  <input
                    v-model="address.city"
                    type="text"
                    class="form-control"
                    placeholder="Enter your city"
                  >
                </div>
              </div>

              <!-- State -->
              <div class="form-group row">
                <label for="inputState" class="col-sm col-form-label">State:</label>
                <div class="col-sm-12">
                  <input
                    v-model="address.state"
                    type="text"
                    class="form-control"
                    placeholder="Enter your city"
                  >
                </div>
              </div>

              <!-- Zip -->
              <div class="form-group row">
                <label for="inputZip" class="col-sm col-form-label">Zip:</label>
                <div class="col-sm-12">
                  <input
                    v-model="address.zip"
                    type="text"
                    class="form-control"
                    placeholder="Enter your zip code"
                  >
                </div>
              </div>

              <!-- Country -->
              <div class="form-group row">
                <label for="inputCountry" class="col-sm col-form-label">Country:</label>
                <div class="col-sm-12">
                  <input
                    v-model="address.country"
                    type="text"
                    class="form-control"
                    placeholder="Enter your country"
                  >
                </div>
              </div>
            </div>
            <!--  -->
            <br>
            <!--  -->
            <div class="form-group row">
              <label for="inputPhoneNumber" class="col-sm col-form-label">Phone Number:</label>
              <div class="col-sm-12">
                <input
                  v-model="number"
                  type="number"
                  class="form-control"
                  placeholder="Enter your phone number"
                >
              </div>
            </div>
            <!--  -->
          </form>

          <button type="button" class="btn btn-outline pull-right" id="submit" @click="register">
            <h3>Submit</h3>
          </button>
        </b-card>
        <br>
        <br>
        <!-- Footer -->
        <div id="register-form-footer">
          <hr>
          <b-container id="legal-links">
            <b-row>
              <b-col cols="3"></b-col>
              <b-col cols="4">
                <h5>Terms and Conditions</h5>
              </b-col>
              <b-col cols="2">
                <h5>Privacy</h5>
              </b-col>
            </b-row>
          </b-container>
          <br>
          <p style="text-align:center">Fig Analytics is a certified C Corporation.</p>
          <p style="text-align:center">&copy; FIG 2018. All Rights Reserved.</p>
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
import { ResponsiveDirective } from "vue-responsive-components";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      address: {
        street: "",
        city: "",
        state: "",
        zip: "",
        country: ""
      },
      number: "",
      contactListTableId: "",
      error: null
    };
  },
  components: {
    BuyerHeader
  },
  directives: {
    responsive: ResponsiveDirective
  },
  methods: {
    // Prefills registration
    // info if it was provided on the homepage
    async register() {
      try {
        const response = await AuthenticationService.buyerRegister({
          name: this.name,
          email: this.email,
          password: this.password,
          passwordConfirm: this.passwordConfirm,
          address: JSON.stringify(this.address),
          number: this.number
        });
        localStorage.setItem("id_token", response.data.token);
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setBuyer", response.data.buyer);
        Api().defaults.headers.common[
          "Authorization"
        ] = AuthenticationService.getAuthHeader();

        const shoppingCartFlag = this.$store.getters.getShoppingCartFlag;

        if (shoppingCartFlag == true) {
          console.log(`\nRedirecting onto buyer checkout\n`); // TESTING
          this.$router.push({
            name: "buyerCheckout"
          });
        } else {
          console.log(`\nRedirecting onto buyer dashboard\n`); // TESTING
          this.$router.push({
            name: "buyerDashboard"
          });
        }
      } catch (error) {
        console.log(`\nAn error occurred in register ${error}\n`); // TESTING
        this.error = error.response.data.error;
        if (error) throw error;
      }
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/forms.css";
.error {
  color: red;
}
</style>

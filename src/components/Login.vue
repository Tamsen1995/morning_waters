<template>
<div id="app">
  <page-header></page-header>
  <body>
    <div
      class="responsive-component"
      v-responsive="{
      small: el => el.width < 430
      }"
      id="register"
    >
      <b-container id="login">
        <b-row>
          <br><br><br>
          <b-col>
            <b-container>
              <div id="fig-logo-white">
                <img
                  src="../assets/css/TINY_LOGO_WHITE.png"
                  alt="FIG ANALYTICS"
                  class="center"
                  id="login-logo"
                >
              </div>
              <br>
            </b-container>
            <!-- Loadng animation -->
            <div class="loader" v-if="loadingFlag == 2">Loading...</div>

            <!-- Form -->
            <b-card bg-variant="transparent">
              <form>
              <h1>Login</h1>
              <br><hr>
                <div class="form-group row">
                  <label for="email" class="col-sm col-form-label">Email:</label>
                  <div class="col-sm-12">
                    <input
                      type="email"
                      v-model="email"
                      class="form-control"
                      id="staticEmail"
                      placeholder="Enter your email"
                    >
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm col-form-label">Password:</label>
                  <div class="col-sm-12">
                    <input
                      type="password"
                      v-model="password"
                      class="form-control"
                      id="inputPassword"
                      placeholder="Enter your password"
                    >
                  </div>
                </div>
                <br>
                <div class="error" v-html="error"/>
                <div style="text-align: center;">
                  <button type="button" class="btn btn-outline" id="btn-login" @click="login">
                    <h3>Submit</h3>
                  </button>
                  <button type="button" class="btn btn-outline" id="btn-login">
                    <h3>Sign Up</h3>
                  </button>
              </div>
              </form>
            </b-card>

            <!-- Footer -->
            <div id="form-footer" class="center">
              <b-container id="legal-links">
                <div style="text-align:center">
                    <a href="#">Terms and Conditions</a>
                    <br>
                    <a href="#">Privacy</a>
                </div>
              </b-container>
              <br><hr><br>
              <p style="text-align:center">Fig Analytics is a certified C Corporation.</p>
              <p style="text-align:center">&copy; FIG 2018. All Rights Reserved.</p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </body>
</div>
</template>

<script src="./scripts/login.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/css/forms.css";
@import url("https://fonts.googleapis.com/css?family=Open+Sans|Roboto");
</style>

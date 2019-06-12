<template>
<div>
  <page-header></page-header>
  <body class="login">
    <div
      class="responsive-component"
      v-responsive="{
      small: el => el.width < 430
      }"
      id="register"
    >
      <div class="container" id="login">
        <div class="row">
          <br>
          <br>
          <br>
          <div class="col">
            <div class="container">
              <div id="fig-logo-white">
                <img
                  src="../assets/css/TINY_LOGO_WHITE.png"
                  alt="FIG ANALYTICS"
                  class="center"
                  id="login-logo"
                >
              </div>
              <br>
            </div>
            <!-- Loadng animation -->
            <div class="loader" v-if="loadingFlag == 2">Loading...</div>

            <!-- Form -->
            <div class="card border-0" id="rounded">
              <form>
                <h1>Login</h1>
                <br>
                <hr>
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

                <div class="container" id="center">
                  <button type="button" class="btn btn-outline" id="btn-login" @click="login">
                    <h3>Submit</h3>
                  </button>
                  <br>
                  <br>
                  <p>
                    Don't have an account yet?
                    <a
                      href="#/register"
                      @click="redirectToSignup()"
                    >Sign up</a>
                  </p>
                </div>
              </form>
            </div>

            <!-- Footer -->
            <div class="container" id="form-footer">
              <a href="#" id="legal-links">Terms and Conditions</a>
              <br>
              <a href="#" id="legal-links">Privacy</a>
              <br>
              <hr>
              <p style="text-align:center">Fig Analytics is a certified C Corporation.</p>
              <p style="text-align:center">&copy; FIG 2018. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>
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

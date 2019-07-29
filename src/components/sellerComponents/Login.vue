<template>
<div id="app">
  <page-header></page-header>
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
          <div>{{ this.errorMessage }}</div>

          <div class="card" id="login">
            <form>
              <br />
              <h2>Seller Login</h2>
              <br />
              <hr />
              <div class="form-group row">
                <label for="email" class="col-sm col-form-label">Email:</label>
                <div class="col-sm-12">
                  <input
                    type="email"
                    v-model="email"
                    class="form-control"
                    id="staticEmail"
                    placeholder="Enter your email"
                    v-on:keyup.enter="login()"
                  />
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
                    v-on:keyup.enter="login()"
                  />
                </div>
              </div>
              <br />
              <div class="error" v-html="error" />

              <div class="container" id="center">
                <md-button type="button" @click="login()" id="btn-login" style="width:100px;">Login</md-button>
                <br />
                <br />
                <p>
                  Don't have an account yet?
                  <a href="#/register" @click="redirectToSignup()">Sign up</a>
                </p>
              </div>
            </form>
          </div>

          <!-- Footer -->
          <div class="container" id="login_form-footer">
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

<script src="./scripts/login.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/forms.css";
@import url("https://fonts.googleapis.com/css?family=Open+Sans|Roboto");
</style>

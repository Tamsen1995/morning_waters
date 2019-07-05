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
          <!--  -->
          <!--  -->
          <!--  -->
          <md-card>
            <md-card-header>
              <div class="md-title">Buyer Sign Up</div>
            </md-card-header>

            <md-card-content>
              <br />
              <!-- <hr> -->
              <br />
              <div class="error" v-html="error" />
              <!-- input for name -->
              <form>
                <div>Personal Info</div>
                <hr />
                <div class="form-group row">
                  <div class="col-sm-12">
                    <!--  -->
                    <md-field>
                      <label>Name :</label>
                      <md-input class="form-control" v-model="name"></md-input>
                    </md-field>
                    <!--  -->
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col-sm-12">
                    <!--  -->
                    <md-field>
                      <label>Email :</label>
                      <md-input class="form-control" v-model="email"></md-input>
                    </md-field>
                    <!--  -->
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col-sm-12">
                    <!--  -->
                    <md-field>
                      <label>password :</label>
                      <md-input type="password" class="form-control" v-model="password"></md-input>
                    </md-field>
                    <!--  -->
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col-sm-12">
                    <!--  -->
                    <md-field>
                      <label>Confirm Password :</label>
                      <md-input type="password" class="form-control" v-model="passwordConfirm"></md-input>
                    </md-field>
                    <!--  -->
                  </div>
                </div>

                <!--  -->
                <div>
                  Address
                  <br />
                  <!-- Street -->
                  <div class="form-group row">
                    <div class="col-sm-12">
                      <!--  -->
                      <md-field>
                        <label>Street :</label>
                        <md-input class="form-control" v-model="address.street"></md-input>
                      </md-field>
                      <!--  -->
                    </div>
                  </div>

                  <!-- City -->
                  <div class="form-group row">
                    <div class="col-sm-12">
                      <!--  -->
                      <md-field>
                        <label>City :</label>
                        <md-input class="form-control" v-model="address.city"></md-input>
                      </md-field>
                      <!--  -->
                    </div>
                  </div>

                  <!-- State -->
                  <div class="form-group row">
                    <div class="col-sm-12">
                      <!--  -->
                      <md-field>
                        <label>State :</label>
                        <md-input class="form-control" v-model="address.state"></md-input>
                      </md-field>
                      <!--  -->
                    </div>
                  </div>

                  <!-- Zip -->
                  <div class="form-group row">
                    <div class="col-sm-12">
                      <!-- <input
                        v-model="address.zip"
                        type="text"
                        class="form-control"
                        placeholder="Enter your zip code"
                      />-->

                      <!--  -->
                      <md-field>
                        <label>Zip :</label>
                        <md-input class="form-control" v-model="address.zip"></md-input>
                      </md-field>
                      <!--  -->
                    </div>
                  </div>

                  <!-- Country -->
                  <div class="form-group row">
                    <div class="col-sm-12">
                      <!--  -->
                      <md-field>
                        <label>Country :</label>
                        <md-input class="form-control" v-model="address.country"></md-input>
                      </md-field>
                      <!--  -->
                    </div>
                  </div>
                </div>
                <!--  -->
                <br />
                <!--  -->
                <div class="form-group row">
                  <div class="col-sm-12">
                    <md-field>
                      <label>Phone Number:</label>

                      <md-input v-model="number" type="text" placeholder="Enter your phone number"></md-input>
                    </md-field>
                  </div>
                </div>
                <!--  -->
              </form>
            </md-card-content>

            <md-card-actions>
              <md-button @click="register">Submit</md-button>
            </md-card-actions>
          </md-card>

          <!--  -->
          <!--  -->
          <!--  -->
        </b-card>
        <br />
        <br />
        <!-- Footer -->
        <div id="register-form-footer">
          <hr />
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
          <br />
          <p style="text-align:center">Fig Analytics is a certified C Corporation.</p>
          <p style="text-align:center">&copy; FIG 2018. All Rights Reserved.</p>
        </div>
      </div>
    </body>
  </div>
</div>
</template>

<script src="./scripts/buyerRegister.js">
</script>

<style scoped>
@import "../../assets/css/forms.css";
.error {
  color: red;
}
</style>

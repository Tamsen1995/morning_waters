<template>
<div>
  <buyer-header></buyer-header>
  <div
    class="responsive-component"
    v-responsive="{
      small: el => el.width < 860
      }"
  >
    <body>
      <div class="fixed-horizontal-center">
        <!-- Loadng animation -->
        <div class="loader" v-if="loadingFlag== 2">Loading...</div>
        
        <!-- Form -->
        <md-card id="register">
          <md-card-header>
            <h2 style="text-align:center; color:#361555;">Buyer Sign Up</h2>
          </md-card-header>

          <md-card-content>

            <div class="error" v-html="error" />
              <form>
                <md-steppers :md-active-step.sync="active" md-linear md-vertical >
                  <md-step id="first" :md-done.sync="first" md-label="Personal Info" md-description="Required">

                    <div class="form-group row">
                      <div class="col-sm-12">
                        <md-field>
                          <label>Name :</label>
                          <md-input class="form-control" v-model="name"></md-input>
                        </md-field>
                      </div>
                    </div>

                    <div class="form-group row">
                      <div class="col-sm-12">
                        <md-field>
                          <label>Email :</label>
                          <md-input class="form-control" v-model="email"></md-input>
                        </md-field>
                      </div>
                    </div>

                    <div class="form-group row">
                      <div class="col-sm-12">
                        <md-field>
                          <label>password :</label>
                          <md-input type="password" class="form-control" v-model="password"></md-input>
                        </md-field>
                      </div>
                    </div>

                    <div class="form-group row">
                      <div class="col-sm-12">
                        <md-field>
                          <label>Confirm Password :</label>
                          <md-input type="password" class="form-control" v-model="passwordConfirm"></md-input>
                        </md-field>
                      </div>
                    </div>
                    <md-button style="border-radius:15px;" class="md-raised md-primary" @click="setDone('first', 'second')">Continue</md-button>
                </md-step>
          
                <md-step id="second" :md-done.sync="second" md-label="Organization Info" md-description="Required">

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
                  <md-field>
                    <label>Zip :</label>
                    <md-input class="form-control" v-model="address.zip"></md-input>
                  </md-field>

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

                  <br />

                  <div class="form-group row">
                    <div class="col-sm-12">
                      <md-field>
                        <label>Phone Number:</label>

                        <md-input v-model="number" type="text" placeholder="Enter your phone number"></md-input>
                      </md-field>
                    </div>
                  </div>
                  <md-button style="border-radius:15px;" class="md-raised md-primary" @click="setDone('second', 'third')">Continue</md-button>
                </md-step>
              
                <!-- Terms&Conditions -->
                <md-step id="third" :md-done.sync="third" md-label="Terms & Conditions" md-description="Required">
                  <div
                    name="termly-embed"
                    data-id="5c4ca188-e4a8-4d86-b760-1a88ff2915f8"
                    data-type="iframe"
                  ></div>
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="termsCheck" />
                    <label class="form-check-label" for="termsCheck" style="padding-left:20px;">Accept</label>
                  </div>
                  <br />
                  
                  <md-button style="border-radius:15px;" class="md-raised md-primary" @click="setDone('third', 'fourth')">Continue</md-button>
                </md-step>
                
                <!-- Privacy -->
                <md-step id="fourth" :md-done.sync="fourth" md-label="Privacy" md-description="Required" >
                  <div
                    name="termly-embed"
                    data-id="5c4ca188-e4a8-4d86-b760-1a88ff2915f8"
                    data-type="iframe"
                  ></div>
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="privacyCheck" />
                    <label class="form-check-label" for="privacyCheck" style="padding-left:20px;">Accept</label>
                  </div>
                  <br />
                  
                  <md-button class="md-raised md-primary" id="btn-login" @click="register">Sign Up</md-button>
                </md-step>
              </md-steppers>
            </form>

          </md-card-content>

        </md-card>
        <br />
        <br />
        <!-- Footer -->
        <div class="container" id="form-footer">
          <a href="#" id="legal-links">Terms and Conditions</a>
          <br />
          <a
            href="https://app.termly.io/document/privacy-policy/a291c868-81c5-4419-81c8-735597b64d86"
          >Privacy</a>
          <br />
          <hr />
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

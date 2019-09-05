<template>
<div id="app">
  <page-header></page-header>
  <div class="responsive-component" v-responsive="{
      small: el => el.width < 860
      }">
    <body>
      <div class="fixed-horizontal-center">
        <!-- Loadng animation -->
        <div class="loader" v-if="loadingFlag== 2">Loading...</div>

        <!-- Form -->
        <md-card id="register">
          <md-card-header>
            <h2 style="text-align:center; color:#361555;">Seller Sign Up</h2>
          </md-card-header>

          <md-card-content>

            <!-- Form -->
            <form>
              <div class="error" v-html="error" />
              <md-steppers :md-active-step.sync="active" md-linear md-vertical>
                <!-- First Name -->
                <md-step
                  id="first"
                  :md-done.sync="first"
                  md-label="Personal Info"
                  md-description="Required"
                >
                  <div class="form-group row">
                    <!-- CHANGE TO FIRST NAME -->
                    <md-card style="background-color:#e7ff8c;">
                      <label
                        for="name"
                        class="col-sm col-form-label"
                        style="text-align: center"
                      >Beta key</label>

                      <div class="col-sm-12">
                        <input
                          v-model="betaKey"
                          type="text"
                          class="form-control"
                          placeholder="Please enter your beta key"
                          v-on:keyup.enter="setDone('first', 'second')"
                        />
                      </div>
                      <br />
                      <br />
                      <br />
                    </md-card>
                  </div>

                  <div class="form-group row">
                    <!-- CHANGE TO FIRST NAME -->
                    <label for="name" class="col-sm col-form-label">First Name:</label>
                    <div class="col-sm-12">
                      <input
                        v-model="firstName"
                        type="text"
                        class="form-control"
                        placeholder="Enter your first name"
                        v-on:keyup.enter="setDone('first', 'second')"
                      />
                    </div>
                  </div>
                  <!-- ADD LAST NAME -->
                  <div class="form-group row">
                    <label for="name" class="col-sm col-form-label">Last Name:</label>
                    <div class="col-sm-12">
                      <input
                        v-model="lastName"
                        type="text"
                        class="form-control"
                        placeholder="Enter your last name"
                        v-on:keyup.enter="setDone('first', 'second')"
                      />
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
                        v-on:keyup.enter="setDone('first', 'second')"
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="inputPassword" class="col-sm col-form-label">Password:</label>
                    <div class="col-sm-12">
                      <!-- ADD PASSWORD RESTRICTIONS (length, characters, numbers) -->
                      <input
                        v-model="password"
                        type="password"
                        class="form-control"
                        placeholder="Must be at least 7 characters long with at least one digit."
                        v-on:keyup.enter="setDone('first', 'second')"
                      />
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
                        v-on:keyup.enter="setDone('first', 'second')"
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="inputPhoneNumber" class="col-sm col-form-label">Phone Number:</label>
                    <div class="col-sm-12">
                      <input
                        v-model="number"
                        type="number"
                        class="form-control"
                        placeholder="Enter your phone number"
                        v-on:keyup.enter="setDone('first', 'second')"
                      />
                    </div>
                  </div>

                  <!-- Job Title -->
                  <div class="form-group row">
                    <label for="inputPhoneNumber" class="col-sm col-form-label">Role:</label>
                    <div class="col-sm-12">
                      <input
                        v-model="jobTitle"
                        type="text"
                        class="form-control"
                        placeholder="Enter your job title"
                        v-on:keyup.enter="setDone('first', 'second')"
                      />
                    </div>
                  </div>
                  <md-button
                    style="border-radius:15px;"
                    class="md-raised md-primary"
                    @click="setDone('first', 'second')"
                  >Continue</md-button>
                </md-step>

                <!--Organization Info -->
                <md-step
                  id="second"
                  :md-done.sync="second"
                  md-label="Organization Info"
                  md-description="Required"
                >
                  <!-- MANDATORY -->
                  <!-- Org Name -->
                  <div class="form-group row">
                    <label for="inputCompanyName" class="col-sm col-form-label">Organization Name:</label>
                    <div class="col-sm-12">
                      <input
                        v-model="companyName"
                        type="text"
                        class="form-control"
                        placeholder="Enter the name of your organization"
                        v-on:keyup.enter="setDone('second', 'third')"
                      />
                    </div>
                  </div>

                  <!-- NON MANDATORY -->
                  <!-- Company Website -->
                  <div class="form-group row">
                    <label for="inputCompanyWebsite" class="col-sm col-form-label">Website:</label>
                    <div class="col-sm-12">
                      <input
                        v-model="companyWebsite"
                        type="text"
                        class="form-control"
                        placeholder="Enter your organization's website"
                        v-on:keyup.enter="setDone('second', 'third')"
                      />
                    </div>
                  </div>
                  <!-- MANDATORY -->
                  <!-- About -->
                  <div class="form-group row">
                    <label for="About" class="col-sm col-form-label">About:</label>
                    <div class="col-sm-12">
                      <textarea
                        v-model="about"
                        rows="10"
                        class="form-control"
                        placeholder="Tell us about your organization's work"
                        v-on:keyup.enter="setDone('second', 'third')"
                      ></textarea>
                    </div>
                  </div>
                  <br />
                  <!-- <h5 style="color:#880599">You can add service listings after you've signed up.</h5> -->

                  <!-- Billing -->
                  <!-- ADD BANK ACCOUNT INFO SUBMISSION -->
                  <!-- <h2 style="color:#880599">Payment System Setup</h2>
                  <h5 style="color:#880599">Bank information for Fig payments </h5>-->
                  <div>
                    Shipping Address
                    <br />
                    <!-- Street -->
                    <div class="form-group row">
                      <label for="inputStreet" class="col-sm col-form-label">Street:</label>
                      <div class="col-sm-12">
                        <input
                          v-model="address.street"
                          type="text"
                          class="form-control"
                          placeholder="Enter your street"
                          v-on:keyup.enter="setDone('second', 'third')"
                        />
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
                          v-on:keyup.enter="setDone('second', 'third')"
                        />
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
                          v-on:keyup.enter="setDone('second', 'third')"
                        />
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
                          v-on:keyup.enter="setDone('second', 'third')"
                        />
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
                          v-on:keyup.enter="setDone('second', 'third')"
                        />
                      </div>
                    </div>
                  </div>
                  <md-button
                    style="border-radius:15px;"
                    class="md-raised md-primary"
                    @click="setDone('second', 'third')"
                  >Continue</md-button>
                </md-step>

                <md-step
                  id="third"
                  :md-done.sync="third"
                  md-label="Terms & Conditions"
                  md-description="Required"
                >
                  <div
                    name="termly-embed"
                    data-id="5c4ca188-e4a8-4d86-b760-1a88ff2915f8"
                    data-type="iframe"
                  ></div>
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="termsCheck" />
                    <label
                      class="form-check-label"
                      for="termsCheck"
                      style="padding-left:20px;"
                    >Accept</label>
                  </div>
                  <br />
                  <md-button
                    style="border-radius:15px;"
                    class="md-raised md-primary"
                    @click="setDone('third', 'fourth')"
                  >Continue</md-button>
                </md-step>

                <md-step
                  id="fourth"
                  :md-done.sync="fourth"
                  md-label="Privacy"
                  md-description="Required"
                >
                  <div class="row">
                    <div class="col">
                      <div
                        name="termly-embed"
                        data-id="a291c868-81c5-4419-81c8-735597b64d86"
                        data-type="iframe"
                      ></div>
                    </div>
                  </div>

                  <!-- Mandatory -->
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="privacyCheck" />
                    <label
                      class="form-check-label"
                      for="privacyCheck"
                      style="padding-left:20px;"
                    >Accept</label>
                  </div>
                  <br />
                  <md-button
                    style="border-radius:15px;"
                    class="md-raised md-primary"
                    @click="setDone('fourth', 'fifth')"
                  >Continue</md-button>
                </md-step>

                <!-- Shippo -->
                <md-step
                  id="fifth"
                  :md-done.sync="fifth"
                  md-label="Shippo Set Up"
                  md-description="Optional"
                >
                  <div class="row">
                    <div class="col">
                      <img src="../../assets/css/shippo_logo.jpg" alt="Shippo" class="center" />
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="col"
                      style="text-align:center;"
                    >Shippo is our trusted partner for all things shipping, including: expedited shipping, insurrance and dry ice.</div>
                  </div>
                  <br />
                  <br />On
                  <span style="background-color:purple; color:white;">Submit</span> you will redirected to create an account with Shippo
                  to seamlessly manage shipping logistics on our platform.
                  <br />
                  <br />(Not mandatory, but highly recommended!)
                  <br />
                  <br />

                  <md-button
                    class="md-raised md-primary center"
                    style="height:40px; background-color: white; color: purple;"
                    id="btn-login"
                    @click="register()"
                  >Skip Shippo & Sign Up</md-button>

                  <md-button
                    class="md-raised md-primary center"
                    style="height:40px;"
                    id="btn-login"
                    @click="register(), makeShippoApiToken()"
                  >Sign Up</md-button>
                  <div class="error" v-html="error" />
                </md-step>
              </md-steppers>
            </form>
          </md-card-content>
        </md-card>

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

<script src="./scripts/register.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/forms.css";
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");

</style>

<template>
<div id="app">
  <page-header></page-header>
  <div
    class="responsive-component"
    v-responsive= "{
      small: el => el.width < 860
      }">
    <body>
      <div class="fixed-horizontal-center">
        <!-- Loadng animation -->
        <div class="loader" v-if="loadingFlag == 2">Loading...</div>

        <div class="card" id="register">
          <div class="error" v-html="error"/>
          <!-- Form -->
          <form >
            <h1>Sign Up</h1>

            <hr>
            <div class="container">
                <div v-if="step === 1">
             
                    <h2 style="color:#880599;">Personal Info</h2>

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

                    <!-- Job Title -->
                    <div class="form-group row">
                      <label for="inputPhoneNumber" class="col-sm col-form-label">Job Title:</label>
                      <div class="col-sm-12">
                        <input
                          v-model="jobTitle"
                          type="text"
                          class="form-control"
                          placeholder="Enter your job title"
                        >
                      </div>
                    </div>


                  <button @click.prevent="next()"
                    type="button" 
                    class="btn btn-outline float-right" 
                    id="btn-next"
                    >
                    <h3>Next</h3>

                  </button>
                </div>

                <!-- Company Info -->
                <div v-if="step === 2">
                  
                    <h2 style="color:#880599">Company Info</h2>
                    <!-- Company Name -->
                    <div class="form-group row">
                      <label for="inputCompanyName" class="col-sm col-form-label">Company Name:</label>
                      <div class="col-sm-12">
                        <input
                          v-model="companyName"
                          type="text"
                          class="form-control"
                          placeholder="Enter your company's name"
                        >
                      </div>
                    </div>
                    <!-- Company Website -->
                    <div class="form-group row">
                      <label for="inputCompanyWebsite" class="col-sm col-form-label">Company Website:</label>
                      <div class="col-sm-12">
                        <input
                          v-model="companyWebsite"
                          type="text"
                          class="form-control"
                          placeholder="Enter your company's website"
                        >
                      </div>
                    </div>
                    <!-- Billing -->
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
                    <!-- About -->
                    <div class="form-group row">
                      <label for="About" class="col-sm col-form-label">About:</label>
                      <div class="col-sm-12">
                        <textarea
                          v-model="about"
                          rows="10"
                          class="form-control"
                          placeholder="Tell us about your company"
                        ></textarea>
                      </div>
                    </div>
                    <br>

                  
                  <button @click.prevent="prev()" 
                    type="button" 
                    class="btn btn-outline" 
                    id="btn-previous">
                    <h3>Previous</h3>
                  </button>
                  <button @click.prevent="next()" 
                    type="button" 
                    class="btn btn-outline float-right" 
                    id="btn-next">
                    <h3>Next</h3>
                  </button>
                  
                </div>

            </div>
            
            <!-- Terms & Conditions -->
            <div v-if="step === 3">
              <div class="row">
                <div class="col">
                  <h3>
                  Terms & Conditions
                  </h3>
                </div>
              </div>
              <div name="termly-embed" data-id="5c4ca188-e4a8-4d86-b760-1a88ff2915f8" data-type="iframe"></div>
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="termsCheck">
                <label class="form-check-label" for="termsCheck" style="padding-left:20px;">Accept</label>
              </div>
              <br>
              <button @click.prevent="prev()" 
                type="button" 
                class="btn btn-outline " 
                id="btn-previous">
                <h3>Previous</h3>
                </button>
              <button @click.prevent="next()" 
                type="button" 
                class="btn btn-outline float-right" 
                id="btn-next">
                <h3>Next</h3>
              </button>
              
            </div>
            
            <!-- Privacy -->
            <div v-if="step === 4">
              <div class="row">
                <div class="col">
                  <h3>Privacy</h3>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div name="termly-embed" data-id="a291c868-81c5-4419-81c8-735597b64d86" data-type="iframe"></div>
                </div>
              </div>

              <!-- Mandatory -->
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="privacyCheck">
                <label class="form-check-label" for="privacyCheck" style="padding-left:20px;">Accept</label>
              </div>
              <br>



              <button @click.prevent="prev()" 
                type="button" 
                class="btn btn-outline " 
                id="btn-previous">
                <h3>Previous</h3>
              </button>
              <button @click.prevent="next()" 
                type="button" 
                class="btn btn-outline float-right" 
                id="btn-next" >
                <h3>Next</h3>
              </button>
              
            </div>

            <!-- Shippo -->
            <div v-if="step === 5">
              <div class="row">
                <div class="col">
                  
                  <div class="row">
                    <div class="col" >
                      <img src="../assets/css/shippo_logo.jpg" alt="Shippo" class="center">
                    </div>
                  </div>
                  <div class="row">
                    <div class="col" style="text-align:center;">
                      Shippo is our trusted partner for all things shipping, including: expedited shipping, insurrance and dry ice. 
                    </div>
                  </div>
                  <br> <br>
                  On <span style="background-color:purple; color:white;"> Submit</span> you will redirected to create an account with Shippo
                   to seamlessly manage shipping logistics on our platform. 
                  <br> <br>
                  (Not mandatory, but highly recommended!)
                  <br>
                  <br>
                  <div class="row">
                    <div class="col">
                      <button @click.prevent="prev()" 
                        type="button" 
                        class="btn btn-outline" 
                        id="btn-previous">
                        <h3>Previous</h3>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              


              <div class="row">
                <div class="col">
                <hr>
                <!-- <div style="text-align:center;"> -->
                  <button type="button" 
                    class="btn btn-outline btn-block" 
                    id="btn-submit" @click="register">
                    <h3>Submit</h3>
                  </button>
                </div>
                <!-- </div> -->
              </div>

            </div>

            <!-- <div style="text-align:center;">
              <button type="button" class="btn btn-outline" id="submit" @click="register">
                <h3>Submit</h3>
              </button>
            </div> -->
          </form>
        </div>

        <!-- Footer -->
        <div id="form-footer" class="center">
          <div class="container" id="legal-links">
            <div style="text-align:center">
              <a href="#">Terms and Conditions</a>
              <br>
              <a href="https://app.termly.io/document/privacy-policy/a291c868-81c5-4419-81c8-735597b64d86">Privacy</a>
            </div>
          </div>
          <!-- <hr>
              <p style="text-align:center">Fig Analytics is a certified C Corporation.</p>
          <p style="text-align:center">&copy; FIG 2018. All Rights Reserved.</p>-->
        </div>
      </div>
    </body>
    <!-- </div> -->
  </div>
</div>
</template>

<script src="./scripts/register.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/css/forms.css";
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
.error {
  color: red;
}
</style>

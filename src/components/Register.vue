<template>
  <div id="app">
    <page-header></page-header>
    <div class="responsive-component" v-responsive="{
      small: el => el.width < 430,
      large: el=> el.width > 1030
      }">

    <body> 

      <div class="fixed-horizontal-center">
        <!-- Loadng animation -->
        <div class="loader" v-if="loadingFlag == 2">Loading...</div>


        <div class="card border-0" id="register">
          <div class="error" v-html="error"/>
          <!-- Form -->
          <form>
            <h1>Sign Up</h1>
            <br><hr>
            <div class="container">
              <div class="row">

                <div class="col-sm-6">
                  <!-- <h2>Personal Info</h2> -->

                  <div class="form-group row">
                    <label for="name" class="col-sm col-form-label">Name:</label>
                    <div class="col-sm-12">
                      <input v-model="name" type="text" class="form-control" id="staticEmail" value="Enter your name">
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="email" class="col-sm col-form-label">Email:</label>
                    <div class="col-sm-12">
                      <input v-model="email" type="email" class="form-control" placeholder="Enter your email">
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="inputPassword" class="col-sm col-form-label">Password:</label>
                    <div class="col-sm-12">
                      <input v-model= "password" type="password" class="form-control" placeholder="Enter your password">
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="inputPassword" class="col-sm col-form-label">Confirm Password:</label>
                    <div class="col-sm-12">
                      <input v-model= "passwordConfirm" type="password" class="form-control" placeholder="Re-enter your password">
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="inputPhoneNumber" class="col-sm col-form-label">Phone Number:</label>
                    <div class="col-sm-12">
                      <input v-model="number" type="number" class="form-control" placeholder="Enter your phone number">
                    </div>
                  </div> 

                  <!-- Job Title -->
                  <div class="form-group row">
                    <label for="inputPhoneNumber" class="col-sm col-form-label">Job Title:</label>
                    <div class="col-sm-12">
                      <input v-model="jobTitle" type="text" class="form-control" placeholder="Enter your job title">
                    </div>
                  </div> 
                  <br>
                  <br>
                </div>



                <div class="col-sm-6">
                  <!-- <h2>Company Info</h2> -->
                  <!-- Company Name -->
                  <div class="form-group row">
                    <label for="inputCompanyName" class="col-sm col-form-label">Company Name:</label>
                    <div class="col-sm-12">
                      <input v-model="companyName" type="text" class="form-control" placeholder="Enter your company's name">
                    </div>
                  </div> 
                  <!-- Company Website -->
                  <div class="form-group row">
                    <label for="inputCompanyWebsite" class="col-sm col-form-label">Company Website:</label>
                    <div class="col-sm-12">
                      <input v-model="companyWebsite" type="text" class="form-control" placeholder="Enter your company's website">
                    </div>
                  </div>
                  <!-- Billing -->
                  <!-- Need to add more controls/ inputs -->
                  <div class="form-group row">
                    <label for="billingAddress" class="col-sm col-form-label">Billing Address:</label>
                    <div class="col-sm-12">
                      <input v-model="billingAddress" type="text" class="form-control" placeholder="Enter your billing address">
                    </div>
                  </div> 
                  <!-- About -->
                  <div class="form-group row">
                    <label for="About" class="col-sm col-form-label">About:</label>
                    <div class="col-sm-12">
                      <textarea v-model="about" rows="10" class="form-control" placeholder="Tell us about your company"></textarea>
                    </div>
                  </div> 
                  <br>
                </div>
              </div>
            </div>
                <div style="text-align:center;">
                <button type="button" class="btn btn-outline" id="submit" @click="register">
                <h3>Submit</h3>
                </button>
              </div> 
          </form>

        </div>

          <!-- Footer -->
            <div id="form-footer" class="center">
              <div class="container" id="legal-links">
                <div style="text-align:center">
                    <a href="#">Terms and Conditions</a>
                    <br>
                    <a href="#">Privacy</a>
                </div>
              </div>
              <!-- <hr>
              <p style="text-align:center">Fig Analytics is a certified C Corporation.</p>
              <p style="text-align:center">&copy; FIG 2018. All Rights Reserved.</p> -->
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
  @import '../assets/css/forms.css';
  .error {
    color: red;
  }
</style>

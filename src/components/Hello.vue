<template>
<body>
  <div class="responsive-component" v-responsive="{
    small: el => el.width < 430
    }">
    <page-header/>
    <!-- v-on:scroll="handleScroll"> -->
    <header class="masthead">
      <div class="col-centered my-auto">
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <a>
          <img src="./LOGO.png" alt="FIG ANALYTICS" class="center">
        </a>
        <br>
        <hr>
        <br>
        <br>
        <h1>Grow your Biotech Network.</h1>
        <br>
        <br>
        <div class="col-md-12 text-center">
          <a href="#start" class="btn-signup btn-signup-outline btn-xl">Sign Up</a>
        </div>
        <br>
        <br>
        <br>
        <br>
        <div class="col-md-12 text-center">
          <router-link class="btn-signup btn-signup-outline btn-xl" to="/login">Client Login</router-link>
        </div>
      </div>
    </header>

    <section class="purple" id="about">
      <div class="container-fluid">
        <h3>
          Email marketing on the front-end, A.I. on the back-end.
          <br>
        </h3>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <h4>
          We’ve streamlined biotech marketing,
          <br>so you can focus on innovating.
          <br>
        </h4>
      </div>
    </section>

    <section class="services">
      <div class="col-centered my-auto">
        <h2>Our Services</h2>
        <br>
        <br>
        <br>
        <br>
        <br>
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-6">
              <div class="feature-item">
                <img src="../assets/css/leads.png" class="icon">
                <h3>Automated Leads Generation</h3>
                <h5
                  class="text-muted"
                >Buyer discovery and matchmaking for your biotech products & services</h5>
              </div>
            </div>
            <br>
            <br>
            <br>
            <br>
            <br>
            <div class="col-lg-6">
              <div class="feature-item">
                <img src="../assets/css/email1.png" class="icon">
                <h3>Email Marketing Campaigns</h3>
                <h5
                  class="text-muted"
                >From email design to distribution: tracked and analyzed for maximum results</h5>
              </div>
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col-lg-6">
              <div class="feature-item">
                <img src="../assets/css/search.png" class="icon">
                <h3>Citation Tracking</h3>
                <h5 class="text-muted">Coming soon!</h5>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="feature-item">
                <img src="../assets/css/abstract.png" class="icon">
                <h3>Abstract Analysis</h3>
                <h5 class="text-muted">Categorizing projects and optimizing lead generation</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="green">
      
        <carousel :adjustableHeight="true" :per-page="1" :autoplay="true" :autoplayTimeout="2000">

          <!-- Step 1 -->
          <slide>
            <img src="../assets/css/hello_step_1.png" alt="FIG ANALYTICS" class="center" id="pitch">
          </slide>

          <!-- Step 2 -->
          <slide>
            <img src="../assets/css/hello_step_2.png" alt="FIG ANALYTICS" class="center" id="pitch">
          </slide>

          <!-- Step 3 -->
          <slide>
            <img src="../assets/css/hello_step_3.png" alt="FIG ANALYTICS" class="center" id="pitch">
          </slide>

          <!-- Step 4 -->
          <slide>
            <div class="container-fluid">
              <div class="col-sm-12">
                <h3>Start your project today.</h3>
                <br>
                <br>
                <br>
                <!-- The continue button needs to lead onto the registration around here -->
                <form>
                  <div class="row">
                    <div class="col-sm-12">
                      <p>Company Name:</p>
                      <input v-model="companyName" type="text" name="company">
                      <br>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12">
                      <p>Email:</p>
                      <input v-model="emailAddress" type="text" name="email">
                    </div>
                  </div>
                </form>

                <br>
                <br>
                <a
                  href="#register"
                  class="btn btn-outline btn-xl"
                  @click="continueOntoRegisterForm()"
                >Continue</a>
                <br>
                <br>
                <!-- <h3>Start your project today.</h3> -->
              </div>
            </div>
          </slide>

        </carousel>
      
    </section>

    <footer>
      <div class="container-fluid" id="contact">
        <div class="row">
          <div class="col-lg-6">
            <h4 style="text-align:center">Email: fig.analytica@gmail.com</h4>
            <br>
            <h4 style="text-align:center">
              Address: 1138 South Cleveland St,
              <br>Oceanside CA 92054
              <br>
            </h4>
            <br>
          </div>
          <div class="col-lg-2">
            <ul class="list-unstyled">
              <h4>
                <li>Home</li>
                <li>About</li>
                <li>Services</li>
                <li>Contact</li>
              </h4>
            </ul>
          </div>
          <br>
          <br>
          <br>
          <br>
          <div class="col-lg-2">
            <router-link class="btn-default btn-lg" to="/login">Client Login</router-link>
            <br>
            <br>
            <router-link class="btn-success btn-lg" to="/register">Sign Up</router-link>
          </div>
        </div>
      </div>
      <div class="container-fluid" id="copy-rights">
        <p style="text-align:center">Fig Analytics is a certified C Corporation.</p>
        <p style="text-align:center">&copy; FIG 2018. All Rights Reserved.</p>
      </div>
    </footer>
  </div>
</body>
</template>

<script src="./scripts/hello.js">
</script>

<style scoped>
@import "../assets/css/figanal.css";
/* @import url('https://fonts.googleapis.com/css?family=Montserrat');  */
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
/* @import url('https://fonts.googleapis.com/css?family=Open+Sans|Roboto'); */
</style >

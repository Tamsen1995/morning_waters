<template>
<body>
  <div class="responsive-component" v-responsive="{
    small: el => el.width < 430
    }">
    <page-header></page-header>

    <header class="masthead">
      <div>
        <a>
          <img src="./LOGO.png" alt="FIG ANALYTICS" class="center" />
        </a>
        <br />
        <hr />
        <br />
        <br />
        <h1>Grow your Biotech Network.</h1>
        <br />
        <br />
        <div class="col-md-12 text-center">
          <router-link class="btn-signup btn-signup-outline btn-xl" to="/register">Sign Up</router-link>
          <!-- Conditionally render one which will lead to coming soon page -->
        </div>
        <br />
        <br />
        <br />
        <br />
        <div class="col-md-12 text-center">
          <router-link class="btn-signup btn-signup-outline btn-xl" to="/login">Client Login</router-link>
          <!-- Conditionally render one which will lead to coming soon page -->
        </div>
      </div>
    </header>

    <section ref="our-services" class="services" id="services">
      <div class="col-centered my-auto">
        <h2>Our Services</h2>
        <br />
        <hr />
        <br />
        <br />
        <br />
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-6">
              <div class="feature-item">
                <img src="../assets/css/leads.png" class="icon" />
                <h3>Smart Lead Generation</h3>
                <br />
                <h5
                  class="text-muted"
                >Buyer discovery and matchmaking for your biotech products & services.</h5>
              </div>
              <!-- Transition Expand Content -->
              <transition-expand>
                <div id="expanded">
                  <div v-if="expanded">
                    <h5>Using our proprietary algorithm; we connect you with high quality leads. Only pay for direct responses and inquiries about your products and services, the rest is free advertisement! You tell us about your target (things such as: keywords, your product's description, your competitors, target geographic area), and we funnel clients directly to you.</h5>
                  </div>
                </div>
              </transition-expand>
              <a id="btn-expand" @click="expanded = !expanded">
                <h2>{{ expanded ? `-` : `+` }}</h2>
              </a>
              <br />
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div class="col-lg-6">
              <div class="feature-item">
                <img src="../assets/css/email1.png" class="icon" />
                <h3>Full Service Sales Platform</h3>
                <br />
                <h5
                  class="text-muted"
                >Streamlined interface guides you from A to B through the Sales process.</h5>
              </div>

              <!-- Transition Expand Content -->
              <transition-expand>
                <div id="expanded">
                  <div v-if="expanded">
                    <h5>
                      With prospective clients directly sent to your inbox,
                      <br />you can negotiate real-time sales using a set of tools for quote generation and purchase orders.
                      <br />All orders are handled and insured by Stripe and pre-agreed fulfillment contracts. List your company and services in the marketplace and let us handle the rest.
                    </h5>
                  </div>
                </div>
              </transition-expand>
              <a id="btn-expand" @click="expanded = !expanded">
                <h2>{{ expanded ? `-` : `+` }}</h2>
              </a>

              <br />
            </div>
          </div>
          <br />

          <div class="row">
            <div class="col-lg-6">
              <div class="feature-item">
                <img src="../assets/css/abstract.png" class="icon" />
                <h3>Shipping Logistics & Handling</h3>
                <br />
                <h5
                  class="text-muted"
                >Our shipping partners handle everything from fragile packaging and dry ice to insurance.</h5>
              </div>

              <!-- Transition Expand Content -->
              <transition-expand>
                <div id="expanded" style="text-align:center">
                  <div v-if="expanded">
                    <h5>We know how difficult shipping in the life sciences industry can be—with time sensitivity, perishable packages, and international shipping requirements. Using pre-negotiated labels and shipping agreements, we can drastically reduce your shipping costs while assuring expedient and safe delivery.</h5>
                  </div>
                </div>
              </transition-expand>
              <a id="btn-expand" @click="expanded = !expanded">
                <h2>{{ expanded ? `-` : `+` }}</h2>
              </a>

              <br />
            </div>
            <div class="col-lg-6">
              <div class="feature-item">
                <img src="../assets/css/search.png" class="icon" />
                <h3>Citation Tracking</h3>
                <br />
                <h5 class="text-muted">Coming soon!</h5>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section ref="about" class="about" id="about">
      <div class="container-fluid">
        <h2>Your one-stop shop for biotech exchange.</h2>
        <br />
        <hr />
        <br />
        <br />
        <h3>
          Digital Marketplace on the Front-End,
          <br />AI on the Back-End.
        </h3>
        <br />
        <br />
        <br />
        <img class="wasp" src="../assets/css/wasp.png" />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h4>
          We’ve streamlined B2B marketing,
          <br />so you can focus on innovating.
        </h4>
      </div>
    </section>

    <section class="carousel">
      <carousel :adjustableHeight="true" :per-page="1" :autoplay="true" :autoplayTimeout="2000">
        <!-- Step 1 -->
        <slide>
          <br />
          <br />
          <img src="../assets/css/new_pitch_1.svg" alt="FIG ANALYTICS" class="center" id="pitch" />
          <br />
          <br />
          <br />
        </slide>

        <!-- Step 2 -->
        <slide>
          <img src="../assets/css/new_pitch_2.svg" alt="FIG ANALYTICS" class="center" id="pitch" />
        </slide>

        <!-- Step 3 -->
        <slide>
          <img src="../assets/css/new_pitch_3.svg" alt="FIG ANALYTICS" class="center" id="pitch" />
        </slide>

        <!-- Step 4 -->
        <slide>
          <div class="container-fluid" id="start">
            <div class="col-sm-12">
              <h3>Start your project today.</h3>
              <br />
              <hr />
              <br />
              <br />
              <!-- The continue button needs to lead onto the registration around here -->
              <form>
                <div class="row">
                  <div class="col-sm-12">
                    <p>Company Name:</p>
                    <input v-model="companyName" type="text" name="company" />
                    <br />
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <p>Email:</p>
                    <input v-model="emailAddress" type="text" name="email" />
                  </div>
                </div>
              </form>

              <br />
              <br />
              <br />
              <!-- <a
                href="#register"
                class="btn btn-outline btn-xl"
                @click="continueOntoRegisterForm()"
              >Continue</a>-->

              <a class="btn btn-outline btn-xl" @click="continueOntoComingSoonPage()">Continue</a>

              <br />
              <br />
              <br />
              <br />
              <br />
              <!-- <h3>Start your project today.</h3> -->
            </div>
          </div>
        </slide>
      </carousel>
    </section>

    <footer>
      <div class="container-fluid" id="contact">
        <div class="row">
          <div class="col">
            <md-button
              style="background-color: white; color: black;"
              @click="redirectToFaqPage()"
            >FAQ</md-button>

            <h3>Contact Us</h3>
            <br />
            <h4 style="text-align:center">info@fig-analytics.com</h4>
            <br />
            <h4 style="text-align:center">
              1138 South Cleveland St
              <br />Oceanside CA 92054
              <br />
              <br />
            </h4>
            <br />
          </div>
          <!-- <div class="col-lg-2">
            <ul class="list-unstyled">
              <h4>
                <li>Home</li>
                <li>About</li>
                <li>Services</li>
                <li>Contact</li>
              </h4>
            </ul>
          </div>-->
          <!-- <br>
          <div class="col-lg-2">
            <div class="container" style="max-width:200px;text-align:center;">
            <router-link class="btn-default btn-large btn-block" id="btn-footer" to="/login">Client Login</router-link>
            <br>
            <router-link class="btn-success btn-large btn-block" id="btn-footer" to="/register">Sign Up</router-link>
            </div>
          </div>-->
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
</style>


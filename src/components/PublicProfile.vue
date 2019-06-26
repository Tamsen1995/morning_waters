<template>
<div id="app">
  <buyer-header></buyer-header>
  <div class="responsive-component" v-responsive="{
      small: el => el.width < 860
      }">
    <body class="dashboard">
      <div class="container" id="dashboard">
        <div id="main">
          <div class="container" id="name-location">
            <div class="d-flex justify-content-center" id="company-name">
              <h1 style="text-align:center:">{{ this.companyName }}</h1>
            </div>
            <div class="d-flex justify-content-center" id="company-location">
              <h4 style="text-align:center:">Location: {{ this.companyLocation }}</h4>
            </div>
            <div class="d-flex justify-content-center" id="company-logo">
              <div id="logo-border">
                <div class="circle" id="logo"></div>
              </div>
            </div>
          </div>

          <!-- About Section -->
          <div class="container" id="about">
            <div class="row">
              <h4>About:</h4>
              <p style="text-align:left">{{ this.about }}</p>
            </div>
          </div>
        </div>

        <br>
        <br>
        <br>

        <div class="services">
          <br>
          <div id="services">
            <button
              @click="manifestModalInquiry(service)"
              class="btn-gen-inq btn btn-primary pull-right"
            >General inquiry</button>
            <h4>Services:</h4>
          </div>

          <div class="col-12">
            <div class="card" v-for="(service, index) in this.services" :key="service.id">
              <h4 class="card-header" style="text-align:left; text-indent:15px;">{{ service.title }}</h4>
              <div class="card-body">
                <!-- Service Description -->
                <button
                  @click="manifestModalForm(service)"
                  class="btn-quote-req btn btn-primary pull-right"
                >Request Quote</button>
                <h5
                  class="card-text"
                  style="text-align:left; padding:15px;"
                >{{ service.description }}</h5>

                <!-- This is where I'll list the subservices -->
                <div v-for="(subService, index) in subServices" :key="index">
                  <div
                    class="container"
                    id="price-chart"
                    v-if="subService.parentServiceId === service.id"
                  >
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Service Subtitle</th>
                          <th scope="col">Turn Around Time</th>
                          <th scope="col">Price/ Unit</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">{{ subService.title }}</th>
                          <td>{{ subService.turnAroundTime }}</td>
                          <td>{{ subService.servicePrice }}</td>
                          <td>
                            <button class="btn btn-success">Add to Cart</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <!--  -->

                <!-- Service/Price Listings -->
                <button
                  class="btn btn-success"
                  @click="addServiceToCart(service, index)"
                >Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- quote request cart -->
      <div id="request-quote-cart">
        <request-quote-cart></request-quote-cart>
      </div>

      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
    </body>

    <!-- General Inquiry -->
    <modal name="general-inquiry-modal">
      <div class="container" style="margin:50px" id="gen_inquiry">
        <div class="row">
          <div class="col-10">
            <p>Want to send a message to this seller about their listing?</p>
            <textarea
              v-model="inquiryText"
              class="form-control animated"
              placeholder="Enter your message"
              rows="5"
            ></textarea>

            <button
              class="btn btn-info pull-right"
              @click="submitInquiryText()"
              style="margin-top:10px"
              type="button"
            >Submit</button>
          </div>
        </div>
      </div>
    </modal>

    <!-- Specific Inquiry -->
    <modal height="auto" scrollable="true" name="request-quote-modal" style="padding-bottom:25px">
      <div class="container" style="margin:25px" id="spec_inquiry">
        <div class="row">
          <div class="col-10">
            <div v-if="this.itemChosen">
              <p style="text-align:left;">
                <strong>Service : {{ this.itemChosen.title }}</strong>
              </p>
              <ul>
                <!-- price/unit -->
                <li>Price/Unit</li>

                <!-- turnaround time -->
                <li>Turnaround Time</li>
              </ul>

              <label>Amount? (optional)</label>
              <input v-model="pickedQuantityQuoteRequest" type="number" style="width: 40px">

              <br>
              <br>Send message to Seller
              <textarea
                v-model="inquiryText"
                class="form-control animated"
                placeholder="Enter your message"
                rows="5"
              ></textarea>
            </div>
          </div>
          <br>
        </div>

        <button
          class="btn btn-info"
          style="margin-top:10px"
          type="button"
          @click="submitQuoteRequest()"
        >Submit</button>
      </div>
    </modal>
  </div>
</div>

<!-- Potentially deprecated -->
</template>


<script src="./scripts/publicProfile.js">
</script>

<style scoped>
@import "../assets/css/dashboard.css";
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
div.card {
  margin-left: auto;
  margin-right: auto;
}
#shopping-cart {
  margin-left: 1000px;
  border: 1px solid green;
}
#request-quote-cart {
  margin-left: 1000px;
  border: 1px solid green;
}
</style>



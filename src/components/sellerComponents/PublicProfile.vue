<template>
<div id="app">
  <buyer-header v-if="preview === false"></buyer-header>
  <div class="responsive-component" v-responsive="{
      small: el => el.width < 860
      }">
    <body class="public-profile">
      <div class="container" id="public-profile">
        <!-- <div id="main"> -->
        <div class="container" id="name-location">
          <div class="d-flex justify-content-center" id="company-name">
            <h1 style="text-align:center:">{{ this.companyName }}</h1>
          </div>
          <div
            class="d-flex justify-content-center"
            id="company-location"
            v-if="this.companyLocation "
          >
            <h4
              style="text-align:center:"
            >{{ this.companyLocation.city }}, {{ this.companyLocation.country }}</h4>
          </div>
          <div class="d-flex justify-content-center" id="company-logo">
            <div id="logo-border">
              <div class="circle" id="logo"></div>
            </div>
          </div>
        </div>

        <!-- About Section -->
        <div class="container" id="about">
          <h4>About:</h4>
          <!-- Scroll Content -->
          <md-content class="md-scrollbar">
            <p style="text-align:left">{{ this.about }}</p>
          </md-content>

          <!-- Transition Expand Content -->

          <!-- <transition-expand>
            <md-card>
              <div v-if="expanded">{{this.about}}</div>
            </md-card>
          </transition-expand>
          <md-button
            class="md-dense md-raised md-primary"
            @click="expanded = !expanded"
          >{{ expanded ? `Shrink` : `Expand` }}</md-button>-->
        </div>
        <br />
        <br />

        <div id="services">
          <br />
          <!-- <md-button
            style="background-color: #4828a5; color: white;"
            @click="manifestModalInquiry(service)"
            class="md-raised md-primary pull-right submit-buttons-md"
          >Message Seller</md-button>-->

          <h2>Services:</h2>
          <br />
          <div class="service-border"></div>
          <!-- <div class="col-md-9"> -->
          <div v-for="(service, index) in this.services" :key="index">
            <div v-if="service.showOnProfile === true && service.isSubService === false">
              <div class="service-border">
                <md-card-area md-inset>
                  <md-card-header>
                    <div v-if="subServicesPresent(service) === false">
                      <div class="row">
                        <div class="col-8">
                          <i class="fas fa-atom" id="service_logo"></i>
                          <span class="md-title">{{ service.title }}</span>
                        </div>
                        <div class="col-4">
                          <div class="container" id="btn-container">
                            <md-button
                              v-if="preview === false"
                              @click="manifestModalForm(service)"
                              class="md-raised md-primary"
                              style="background-color: #8164d8; color: white;"
                            >Request Quote</md-button>
                            <md-button
                              v-if="preview === false"
                              style="background-color: #51b828; color: white;"
                              @click="manifestAddToCartModal(service, index)"
                            >Add to Cart</md-button>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-6">
                          <span id="time">
                            <md-icon>access_time</md-icon>
                            Turnaround time : {{ service.turnAroundTime }}
                          </span>
                          <span id="negTime">
                            Negotiable
                            {{ service.serviceNegTime }}
                          </span>
                        </div>
                        <div class="col-6">
                          <div class="container pull-right" id="price-container">
                            <div class="row">
                              <span
                                id="price"
                              >${{service.servicePrice}}.00 per {{ service.unitType }}</span>
                              <span id="negPrice">
                                Negotiable
                                {{ service.serviceNegPrice }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- </div> -->
                    </div>
                  </md-card-header>

                  <md-card-content
                    class="md-scrollbar"
                    style="word-wrap: break-word;"
                    id="service-description"
                  >{{ service.description }}</md-card-content>
                  <div style="padding-left: 15px;">
                    <md-chip
                      class="md-primary md-accent"
                      style="background-color: white; color: #a558e4; border: 1px solid #a558e4;"
                      v-for="(chip, index) in service.tags"
                      :key="index"
                    >{{ chip.tag }}</md-chip>
                  </div>
                </md-card-area>
                <br />
                <div v-for="(subService, index) in services" :key="index">
                  <md-card
                    id="subservice-block"
                    v-if="(subService.isSubService === true) && (subService.parentServiceId === service.id)"
                  >
                    <md-card-area>
                      <md-card-header>
                        <div class="row">
                          <div class="col-7">
                            <i class="fas fa-atom" id="service_logo"></i>
                            <span class="md-title">{{ subService.title }}</span>
                          </div>
                          <div class="col-5">
                            <div class="container" id="btn-container">
                              <md-button
                                v-if="preview === false"
                                @click="manifestModalForm(service)"
                                class="md-raised md-primary"
                                style="background-color: #8164d8; color: white;"
                              >Request Quote</md-button>
                              <md-button
                                v-if="preview === false"
                                style="background-color: #51b828; color: white;"
                                @click="manifestAddToCartModal(service, index)"
                              >Add to Cart</md-button>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-6">
                            <span id="time">
                              <md-icon>access_time</md-icon>
                              Turnaround time : {{ subService.turnAroundTime }}
                            </span>
                            <span id="negTime">
                              Negotiable
                              {{ subService.serviceNegTime }}
                            </span>
                          </div>
                          <div class="col-6">
                            <div class="container pull-right" id="price-container">
                              <div class="row">
                                <span
                                  id="price"
                                >${{subService.servicePrice}}.00 per {{ subService.unitType }}</span>
                                <span id="negPrice">
                                  Negotiable
                                  {{ subService.serviceNegPrice }}
                                </span>
                              </div>
                            </div>
                          </div>
                          <!-- <div class="col-6">
                            <div class="pull-right">
                              <md-button
                                @click="manifestModalForm(service)"
                                class="md-raised md-primary "
                                style="background-color: #8164d8; color: white;"
                              >Request Quote</md-button>
                              <md-button
                                style="background-color: #51b828; color: white;"
                                @click="manifestAddToCartModal(service, index)"
                              >Add to Cart</md-button>
                            </div>
                          </div>-->
                        </div>
                      </md-card-header>
                      <md-card-content
                        class="md-scrollbar"
                        id="service-description"
                      >{{ subService.description }}</md-card-content>
                    </md-card-area>

                    <div style="padding-left: 15px;">
                      <md-chip
                        class="md-primary md-accent"
                        style="background-color: white; color: #a558e4; border: 1px solid #a558e4;"
                        v-for="(chip, index) in subService.tags"
                        :key="index"
                      >{{ chip.tag }}</md-chip>
                    </div>
                    <br />
                  </md-card>
                </div>
              </div>
            </div>
            <br />
          </div>

          <!-- This is where I list the services -->
          <!-- </div> -->

          <!-- quote request cart -->
          <!-- <div class="col-md-3">
            <md-card>
              <request-quote-cart></request-quote-cart>
            </md-card>
          </div>-->
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </body>

    <!-- General Inquiry -->
    <modal
      name="general-inquiry-modal"
      height="auto"
      scrollable
      :clickToClose="true"
      id="inquiry-modal"
    >
      <div class="container" id="gen_inquiry">
        <div class="md-title">
          <h2>Want to send a message to this seller about their listing?</h2>
        </div>
        <p>
          *You can view messages by clicking on the
          <i class="fas fa-shopping-cart"></i> cart icon.
        </p>
        <form class="md-layout">
          <md-field>
            <label>Message to Seller:</label>
            <md-textarea
              v-model="inquiryText"
              class="form-control animated"
              placeholder="Enter your message"
              rows="5"
            ></md-textarea>
          </md-field>
          <md-button
            class="md-raised md-primary submit-buttons-md"
            @click="submitInquiryText()"
            style="margin-top:10px; color: #301a70;"
            type="button"
          >Submit</md-button>
        </form>
      </div>
    </modal>

    <!-- add to cart modal -->
    <modal
      height="auto"
      scrollable
      name="add-to-cart-modal"
      :clickToClose="true"
      id="inquiry-modal"
    >
      <div class="container" id="gen_inquiry">
        <div class="md-title">
          <h2>Add to cart:</h2>

          <div v-if="this.itemChosen">
            <h4>
              <i class="fas fa-atom" id="service_logo"></i>
              Service : {{ this.itemChosen.title }}
              <ul>
                <li>{{ this.itemChosen.servicePrice}} / {{ this.itemChosen.serviceUnit}}</li>
                <li>Turnaround Time = {{ this.itemChosen.turnAroundTime}}</li>
              </ul>
            </h4>
          </div>
        </div>
        <form class="md-layout">
          <!-- MAKE QUANTITY MANDATORY -->
          <div class="col-4">
            <div class="form-group">
              <label for="exampleInputEmail1">
                <h4>Quantity</h4>
              </label>
              <input v-model="pickedQuantityService" type="number" id="turnAroundTimeSelect" />
              <small id="emailHelp" class="form-text text-muted">Ex: 3 samples</small>
            </div>
          </div>
          <md-field>
            <label>Message to seller (Optional)</label>
            <md-textarea
              v-model="inquiryText"
              class="form-control animated"
              placeholder="Ask your seller a question about this service"
              rows="5"
            ></md-textarea>
          </md-field>
        </form>
        <div class="error" v-html="error" />

        <md-button
          class="md-raised md-primary submit-buttons-md"
          style="margin-top:10px"
          type="button"
          @click="addServiceToCart()"
        >Add to cart</md-button>
      </div>
    </modal>

    <!-- Specific Inquiry -->
    <modal
      height="auto"
      scrollable
      name="request-quote-modal"
      :clickToClose="true"
      id="inquiry-modal"
    >
      <div class="container" id="gen_inquiry">
        <div class="md-title">
          <h2>Request a quote:</h2>

          <div v-if="this.itemChosen">
            <h4>
              <i class="fas fa-atom" id="service_logo"></i>
              Service : {{ this.itemChosen.title }}
              <ul>
                <li>{{ this.itemChosen.servicePrice}} / {{ this.itemChosen.serviceUnit}}</li>
                <li>Turnaround Time = {{ this.itemChosen.turnAroundTime}}</li>
              </ul>
            </h4>
          </div>
        </div>
        <form class="md-layout">
          <md-field>
            <label>Message to Seller:</label>
            <md-textarea
              v-model="inquiryText"
              class="form-control animated"
              placeholder="Enter your message"
              rows="5"
            ></md-textarea>
          </md-field>
        </form>
        <md-button
          class="md-raised md-primary submit-buttons-md"
          style="margin-top:10px"
          type="button"
          @click="submitQuoteRequest()"
        >Submit</md-button>
      </div>
    </modal>
  </div>
</div>

<!-- Potentially deprecated -->
</template>


<script src="./scripts/publicProfile.js">
</script>

<style scoped>
@import "../../assets/css/publicprofile.css";
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
.error {
  color: red;
}
</style>



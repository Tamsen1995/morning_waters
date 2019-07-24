<template>
<div id="app">
  <buyer-header></buyer-header>
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
          >{{ expanded ? `Shrink` : `Expand` }}</md-button> -->
        </div>
        <br />
        <br />

        <div id="services">
          <br />
          <md-button
          style="background-color: #4828a5; color: white;"
            @click="manifestModalInquiry(service)"
            class="md-raised md-primary pull-right submit-buttons-md"
          >Message Seller</md-button>

          <h2>Services:</h2>
          <br />
          <div class="service-border"></div>
          <!-- <div class="col-md-9"> -->
          <div v-for="(service, index) in this.services" :key="service.id">
            <div v-if="service.isSubService === false">
              <div class="service-border">
                <md-card-area md-inset>
                  <md-card-header >
                    <div >
                      <div class="pull-right">
                      
                        <div
                          style="color:#51b828;font-size: 20px;"
                          id="price-text"
                        >Price: {{service.servicePrice}}$</div>
                        <md-button
                          @click="manifestModalForm(service)"
                          class="md-raised md-primary"
                          style="background-color: #8164d8; color: white;"
                        >Request Quote
                        </md-button>
                        <md-button
                          style="background-color: #51b828; color: white;"
                          @click="addServiceToCart(service, index)"
                        >Add to Cart</md-button>
                        
                      </div>
                    </div>
                    
                    <i class="fas fa-atom" id="service_logo"></i>
                    <span class="md-title">{{ service.title }}</span>

                    <div>
                      <md-icon>access_time</md-icon>
                      Turnaround time : {{ service.turnAroundTime }}
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
                      v-for="chip in service.tags"
                      :key="chip"
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
                        <div class="pull-right">
                        
                          <div
                            style="color:#51b828;font-size: 20px;"
                            id="price-text"
                          >Price: {{subService.servicePrice}}$</div>
                          <md-button
                            @click="manifestModalForm(service)"
                            class="md-raised md-primary"
                            style="background-color: #8164d8; color: white;"
                          >Request Quote
                          </md-button>
                          <md-button
                            style="background-color: #51b828; color: white;"
                            @click="addServiceToCart(subService, index)"
                          >Add to Cart</md-button>
                          
                        </div>
                        
                        <div class="md-title" style="font: 20px Roboto;">{{ subService.title }}</div>
                        <div>
                        <md-icon>access_time</md-icon>
                        Turnaround time : {{ subService.turnAroundTime }}
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
                        v-for="chip in subService.tags"
                        :key="chip"
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
          </div> -->
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
    <modal name="general-inquiry-modal" height="auto" scrollable="true" :clickToClose="true" id="inquiry-modal">
      <div class="container" id="gen_inquiry">
        <!-- <div class="row">
          <div class="col-10"> -->
        <div class="md-title">
          <h2>
            <i class="fas fa-atom" id="service_logo"></i>
            Want to send a message to this seller about their listing?
          </h2>
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
          <md-button
            class="btn btn-default pull-right"
            @click="submitInquiryText()"
            style="margin-top:10px"
            type="button"
          >Submit</md-button>
    
        </form>



      </div>
    </modal>

    <!-- Specific Inquiry -->
    <modal height="auto" scrollable="true" name="request-quote-modal" :clickToClose="true" id="inquiry-modal">
      <div class="container"  id="spec_inquiry">
        <form class="md-layout">
          <div v-if="this.itemChosen">
            <md-title>
              <h2>
                <i class="fas fa-atom" id="service_logo"></i>
                Service : {{ this.itemChosen.title }}
              </h2>
            </md-title>
            <ul>
              <!-- price/unit -->
              <li>Price/Unit</li>
              <!-- turnaround time -->
              <li>Turnaround Time</li>
            </ul>
            <md-field>
              <label>Amount? (optional)</label>
              <md-input v-model="pickedQuantityQuoteRequest" type="number" />
            </md-field>

            <md-field>
              <label>Message to Seller:</label>
              <md-textarea
                v-model="inquiryText"
                class="form-control animated"
                placeholder="Enter your message"
                rows="5"
                style="min-width:600px;"
              ></md-textarea>          
            </md-field>
          </div>
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
</style>



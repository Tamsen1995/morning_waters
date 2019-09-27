
<template>
<div id="app">
  <dashboard-header />

  <div class="responsive-component" v-responsive="{
        small: el => el.width < 860
        }">
    <body class="dashboard">
      <div class="container" id="dashboard">
        <!-- This section is reserved for the profile information -->
        <div>
          <!-- insert about section -->
          <about-section ref="aboutSection" v-on:determine-onboarding-status="updateProgressBar()"></about-section>
        </div>
        <br />
        <br />
        <div>
          <progress-bar ref="progressBar" v-on:dashboard-add-services="addService()"></progress-bar>
        </div>

        <!-- Stats Cards -->
        <div id="stats">
          <stats-cards></stats-cards>
        </div>
        <br />
        <br />

        <div id="services">
          <br />
          <h2>Services:</h2>
          <br />
          <div class="service-border"></div>
          <!-- Empty state for service listings when no listings have been added -->
          <md-empty-state
            md-rounded
            class="md-accent"
            md-icon="error_outline"
            md-label="No Services Added"
            v-if="this.services.length === 0"
            md-description="Add services to get started."
          ></md-empty-state>

          <!-- Beginning of cards -->
          <div v-for="(service, index) in this.services" :key="index">
            <div v-if="service.showOnProfile === true && service.isSubService === false">
              <div class="service-border">
                <md-card-area md-inset>
                  <md-card-header>
                    <i class="fas fa-atom" id="service_logo"></i>
                    <span class="md-title">{{ service.title }}</span>

                    <md-card-content>
                      <div class="card-reservation">
                        <div class="row">
                          <div class="col-6">
                            <span id="time">
                              <md-icon>access_time</md-icon>
                              Turnaround time : {{ service.turnAroundTime }} {{ service.timeUnit }}
                            </span>
                            <span
                              id="negTime"
                              v-if="service && service.serviceNegTime === true"
                            >Negotiable</span>
                          </div>
                          <div class="col-6" style="text-align:right;">
                            <span id="price">${{service.servicePrice}} per {{ service.unitType }}</span>

                            <span
                              id="negPrice"
                              v-if="service && service.serviceNegPrice === true"
                            >Negotiable</span>
                          </div>

                          <span
                            id="taxable"
                            v-if="service && service.serviceTaxable === true"
                          >Taxable</span>
                        </div>
                      </div>
                    </md-card-content>
                  </md-card-header>

                  <!-- TESTING -->
                  <div
                    v-if="services[index] && services[index].editing && services[index].editing === true"
                  >test</div>
                  <div v-else>
                    <md-button
                      @click="editServiceDescription(index)"
                      style="color:#301a70"
                      class="pull-right md-fab md-mini md-plain"
                    >
                      <md-icon>edit</md-icon>
                    </md-button>
                  </div>
                  <!-- TESTING -->

                  <md-card-content
                    class="md-scrollbar"
                    style="word-wrap: break-word;"
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
                        <div class="md-title" style="font: 20px Roboto;">{{ subService.title }}</div>

                        <!-- <span
                          style="color:#009624;font-size: 18px;"
                          class="pull-right"
                        >Price: $ {{subService.servicePrice}} .00 /{{ subService.unitType }}</span>
                        <span style="color: #5f5a6d;">
                          <md-icon>access_time</md-icon>
                          Turnaround time : {{ subService.turnAroundTime }} {{ subService.timeUnit }}
                        </span>
                        <br />-->
                        <div class="row">
                          <div class="col-6">
                            <span id="subTime">
                              <md-icon>access_time</md-icon>
                              Turnaround time : {{ subService.turnAroundTime }} {{ subService.timeUnit }}
                            </span>
                            <span
                              id="subNegTime"
                              v-if="subService && subService.serviceNegTime === true"
                            >Negotiable</span>
                          </div>
                          <div class="col-6" style="text-align:right;">
                            <span
                              id="subPrice"
                            >${{subService.servicePrice}} per {{ subService.unitType }}</span>

                            <span
                              id="subNegPrice"
                              v-if="subService && subService.serviceNegPrice === true"
                            >Negotiable</span>
                            <span
                              id="taxable"
                              v-if="subService && subService.serviceTaxable === true"
                            >Taxable</span>
                          </div>
                        </div>
                      </md-card-header>
                      <md-card-content
                        class="md-scrollbar"
                        style="word-wrap: break-word;"
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

                <md-card-actions>
                  <md-button @click="editService(service)" :md-ripple="false">Edit</md-button>
                  <md-button @click="deleteService(service)" class="md-accent">Delete</md-button>
                </md-card-actions>
              </div>
            </div>
          </div>

          <!--  -->

          <!-- Add Service Button -->
          <br />

          <md-button
            class="md-raised pull-right"
            :md-ripple="false"
            style="background-color: yellowgreen;color: white;"
            @click="addService"
          >
            <i class="fas fa-atom" style="color: white;"></i>
            Add Service
          </md-button>
          <!-- TO DO: Add link to public profile -->
          <md-button
            id="publicProfile-link"
            class="pull-right"
            :md-ripple="false"
            @click="previewPublicProfile()"
          >Preview profile</md-button>

          <br />
          <br />
          <br />
        </div>
      </div>
    </body>
  </div>

  <!-- Modal component to add a service with -->

  <modal
    :adaptive="true"
    :resizable="true"
    name="add-service"
    height="auto"
    scrollable
    :clickToClose="false"
    id="add-services"
  >
    <add-service-modal v-on:close-add-service-modal="cleanServiceInput()"></add-service-modal>
    <!-- In here you wanna insert the add service modal component -->
  </modal>

  <!-- this modal is responsible for the live editing of the service description -->
  <modal name="service-live-edit">
    <div class="container" id="gen_inquiry">
      <div class="md-title"></div>

      <form class="md-layout">
        <md-field>
          <md-textarea
            v-if="serviceEdited"
            v-model="serviceEdited.description"
            class="form-control animated"
            placeholder="Enter your service description"
            rows="5"
          ></md-textarea>
        </md-field>
        <md-button
          @click="submitServiceDescriptionEdit()"
          class="md-raised md-primary submit-buttons-md"
          style="margin-top:10px; color: #301a70;"
          type="button"
        >Submit</md-button>
      </form>
    </div>
  </modal>
</div>
</template>

<script src="../scripts/dashboard.js"; >
</script>

<style scoped>
@import "../../../assets/css/dashboard.css";
@import "../../../assets/css/forms.css";
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
</style>
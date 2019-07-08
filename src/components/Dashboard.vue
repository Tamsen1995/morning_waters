
<template>
<div id="app">
  <dashboard-header />

  <div class="responsive-component" v-responsive="{
        small: el => el.width < 860
        }">
    <body class="dashboard">
      <div class="container" id="dashboard">
        <!-- This section is reserved for the profile information -->
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
              <!-- <transition-expand>
              <div v-if="expanded">-->
              <p style="text-align:left">{{ this.about }}</p>
              <!-- </div> -->
              <!-- </transition-expand>
              <button @click="expanded = !expanded">
                {{ expanded ? `Shrink` : `Expand` }}
              </button>-->
            </div>
          </div>
        </div>

        <br />
        <br />

        <!-- Stats Cards -->
        <div id="stats">
          <div class="card-group">
            <div class="card" style="min-width: 30%;">
              <!-- <img src="..." class="card-img-top" alt="..."> -->
              <div class="card-body">
                <h4 class="card-title">Page Views:</h4>
                <p class="card-text">{{ this.pageViews }}</p>
                <p class="card-text">
                  <small class="text-muted">Last updated 3 mins ago</small>
                </p>
              </div>
            </div>
            <div class="card" style="min-width: 30%;">
              <!-- <img src="..." class="card-img-top" alt="..."> -->
              <div class="card-body">
                <h4 class="card-title">Leads:</h4>
                <p class="card-text">{{ this.leads }}</p>
                <!-- <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> -->
                <b-button block variant="outline-success" @click="redirectToInbox()">
                  <h6>View Leads</h6>
                </b-button>
              </div>
            </div>
            <div class="card" style="min-width: 30%;">
              <!-- <img src="..." class="card-img-top" alt="..."> -->
              <div class="card-body">
                <h4 class="card-title">Pending Orders:</h4>
                <p class="card-text">{{ this.credits }}</p>
                <b-button block variant="outline-success" @click="redirectToPendingOrders()">
                  <h6>View Orders</h6>
                </b-button>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />

        <div class="services" id="services">
          <br />
          <h2>Services:</h2>
          <br />
          <!-- Beginning of cards -->
          <div v-for="(service, index) in this.services" :key="index" id="service-card">
            <!-- <md-card></md-card> -->

            <div v-if="service.isSubService === false">
              <md-card-area md-inset>
                <md-card-header>
                  <!-- <h2 class="md-title"></h2> -->
                  <!-- <md-icon>play_for_work</md-icon> -->
                  <i class="fas fa-atom" id="service_logo"></i>
                  <span class="md-title">{{ service.title }}</span>

                  <md-card-content>
                    <div class="card-reservation pull-right">
                      <div class="md-button-group">Price: {{service.servicePrice}} $</div>
                    </div>
                  </md-card-content>

                  <div class="md-subhead">
                    <md-icon>access_time</md-icon>
                    <span>Turnaround time : {{ service.turnAroundTime }}</span>
                  </div>
                </md-card-header>

                <md-card-content>{{ service.description }}</md-card-content>
                <div>
                  <md-chip
                    class="md-primary md-accent"
                    style="background-color: black; color: white;"
                    v-for="chip in service.tags"
                    :key="chip"
                  >{{ chip.tag }}</md-chip>
                </div>
              </md-card-area>

              <div v-for="(subService, index) in services" :key="index">
                <md-card
                  style="width: 80%; margin-left: auto; margin-right: auto; "
                  v-if="(subService.isSubService === true) && (subService.parentServiceId === service.id)"
                >
                  <md-card-area>
                    <md-card-header>
                      <i class="fas fa-dna"></i>
                      <div class="md-title" style="background-color: #63d154">{{ subService.title }}</div>
                      <div class="md-subhead">
                        <md-icon>access_time</md-icon>
                        <span>Turnaround time : {{ subService.turnAroundTime }}</span>
                      </div>
                    </md-card-header>

                    <md-card-content>{{ subService.description }}</md-card-content>
                  </md-card-area>

                  <md-card-actions md-alignment="left">
                    <md-button>Price : {{subService.servicePrice}}</md-button>
                  </md-card-actions>
                </md-card>
              </div>

              <md-card-actions>
                <md-button class="md-raised" :md-ripple="false">Edit</md-button>
                <md-button @click="deleteService(service)" class="md-raised md-accent">Delete</md-button>
              </md-card-actions>
            </div>
            <br />
          </div>

          <!--  -->

          <!-- Add Service Button -->
          <br />
          <md-button
            class="md-raised pull-right"
            :md-ripple="false"
            style="background-color: purple;"
            @click="addService"
          >
            Add Service
            <md-icon>note_add</md-icon>
          </md-button>

          <br />
          <br />
          <br />
        </div>
      </div>
    </body>
  </div>

  <!-- Modal component to add a service with -->

  <modal
    name="add-service"
    height="auto"
    scrollable="true"
    style="padding-top:80px"
    :clickToClose="false"
  >
    <div class="container" style="padding:50px">
      <div class="row">
        <div class="col-12">
          <h4 class="heading">
            <!-- <strong>Add</strong> Service -->
          </h4>
          <br />
          <form id="add-service">
            <div class="container" style="min-width: 500px;">
              <!-- Service Title -->
              <div class="form-group row">
                <label for="serviceTitle" class="col-sm .col-form-label-xsm">
                  <p></p>
                </label>
                <md-field>
                  <label>Service Title:</label>
                  <md-input type="text" v-model="serviceTitle" style="border-bottom: 1px inset"></md-input>
                </md-field>
              </div>
              <!-- Service Description -->
              <div class="form-group row">
                <!-- <div class="col-sm-10">
                  <textarea
                    v-model="serviceDescription"
                    type="text"
                    rows="5"
                    class="form-control animated"
                    placeholder="Enter service description"
                  ></textarea>
                </div>-->

                <md-field>
                  <label>General Service Description:</label>
                  <md-textarea v-model="serviceDescription" style="border-bottom: 1px inset"></md-textarea>
                </md-field>
              </div>
              <br />
              <br />

              <md-field>
                <label>Price Per Unit:</label>
                <md-input type="text" v-model="servicePrice" style="border-bottom: 1px inset"></md-input>
              </md-field>

              <md-field>
                <label>Turn Around Time:</label>
                <md-input type="text" v-model="turnAroundTime" style="border-bottom: 1px inset"></md-input>
              </md-field>

              <br />

              <label>Tags</label>

              <md-field>
                <md-chips
                  v-model="tags"
                  md-placeholder="Add tags"
                  style="border-bottom: 1px inset;"
                ></md-chips>
                <!-- <md-textarea type="text" v-model="serviceTags" style="border-bottom: 1px inset"></md-textarea> -->
              </md-field>

              <!-- The sub services form -->
              <!-- <div v-for="(item, index) in this.order" v-bind:key="index"> -->

              <div v-for="(subservice, index) in this.subServicesToBeAdded" v-bind:key="index">
                <br />
                <br />

                <br />
                <br />
                <!-- Service Title -->

                <div class="form-group row">
                  <label>sub service title:</label>

                  <md-field>
                    <md-input
                      type="text"
                      v-model="subServicesToBeAdded[index].serviceTitle"
                      style="border-bottom: 1px inset"
                    ></md-input>
                  </md-field>
                </div>
                <!-- Service Description -->

                <div class="form-group row">
                  <md-field>
                    <label>General sub service description:</label>
                    <md-textarea
                      v-model="subServicesToBeAdded[index].serviceDescription"
                      style="border-bottom: 1px inset"
                    ></md-textarea>
                  </md-field>
                </div>

                <br />
                <br />

                <div class="form-group row">
                  <!--  -->
                  <md-field>
                    <label>Price Per Unit:</label>
                    <md-input
                      type="text"
                      v-model="subServicesToBeAdded[index].servicePrice"
                      style="border-bottom: 1px inset"
                    ></md-input>
                  </md-field>
                </div>

                <!-- Turn Around Time -->
                <div class="form-group row">
                  <label for="turnAroundTime" class="col-sm col-form-label">
                    <p>Turn Around Time:</p>
                  </label>
                  <div class="col-sm-8">
                    <input
                      v-model="subServicesToBeAdded[index].turnAroundTime"
                      type="text"
                      class="form-control"
                      placeholder="Enter turn around time in weeks"
                    />
                  </div>
                </div>
                <br />

                <!-- Service Tags -->
                <div class="form-group row">
                  <label for="serviceTags" class="col-sm col-form-label">
                    <p>Tags:</p>
                  </label>
                  <div class="col-sm-10">
                    <textarea
                      v-model="subServicesToBeAdded[index].serviceTags"
                      type="text"
                      rows="3"
                      class="form-control animated"
                      placeholder="Enter tags used to describe your service"
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- Add another (plus button) -->

              <md-button
                type="button"
                class="btn btn-default pull-right"
                id="addSubButton"
                @click="addSubService()"
              >
                <strong>
                  <h6>
                    Add Sub-service
                    <span class="glyphicon glyphicon-plus-sign"></span>
                  </h6>
                </strong>
              </md-button>

              <!-- File Input -->
              <div class="form-group row">
                <div class="col">
                  <p>
                    <input type="file" class="form-control-file" id="exampleFormControlFile1" />
                  </p>
                </div>
              </div>

              <md-button
                v-if="this.serviceBeingEdited === true"
                class="md-dense md-raised md-primary"
                style="margin-top:100%"
                type="button"
                @click="submitServiceEdit()"
              >
                <p>Submit Edit</p>
              </md-button>

              <md-button
                v-else
                class="md-dense md-raised md-primary"
                type="button"
                @click="submitService()"
              >Submit</md-button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </modal>
</div>
</template>

<script src="./scripts/dashboard.js"; >
</script>

<style scoped>
@import "../assets/css/dashboard.css";
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
</style>
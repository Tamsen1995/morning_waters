
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

        <md-card class="md-card-example">
          <md-card-area md-inset>
            <md-card-header>
              <h2 class="md-title">Coffee House</h2>
              <div class="md-subhead">
                <md-icon>location_on</md-icon>
                <span>2 miles</span>
              </div>
            </md-card-header>

            <md-card-content>Illy Coffee served with a complimentary Leonidas Belgian Chocolate with all beverages.</md-card-content>
          </md-card-area>

          <md-card-content>
            <h3 class="md-subheading">Today's availability</h3>
            <div class="card-reservation">
              <md-icon>access_time</md-icon>
              <div class="md-button-group">
                <md-button>5:30PM</md-button>
                <md-button>7:30PM</md-button>
                <md-button>9:00PM</md-button>
              </div>
            </div>
          </md-card-content>

          <md-card-actions>
            <md-button class="md-primary">Reserve</md-button>
          </md-card-actions>
        </md-card>

        <md-card>
          <md-card-area>
            <md-card-header>
              <div class="md-title">Actions left aligned</div>
              <div class="md-subhead">Subtitle here</div>
            </md-card-header>

            <md-card-content>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.</md-card-content>
          </md-card-area>

          <md-card-actions md-alignment="left">
            <md-button>Action</md-button>
            <md-button>Action</md-button>
          </md-card-actions>
        </md-card>

        <div class="services" id="services">
          <br />
          <h4>Services:</h4>
          <br />
          <!-- Title -->
          <div v-for="(service, index) in this.services" :key="index">
            <div class="service-block" v-if="service.isSubService === false">
              <div id="service-title">
                <h4 style="text-align:left;">{{ service.title }}</h4>
                <button @click="deleteService(service)">
                  <div style="border: 3px solid red;">X</div>
                </button>
                <h6>
                  <a class="btn pull-right" style="color: black;" @click="editService(service)">Edit</a>
                </h6>
              </div>
              <!-- Service Description -->
              <div class="container" id="service-desc">
                <h5>{{ service.description }}</h5>
              </div>

              <!--  -->
              <!-- sub services will be in this block -->
              <div v-for="(subService, index) in services" :key="index">
                <div
                  class="service-block-sub"
                  v-if="(subService.isSubService === true) && (subService.parentServiceId === service.id)"
                >
                  <div id="service-title">
                    <h4 style="text-align:left;">{{ subService.title }}</h4>
                    <h6></h6>
                  </div>
                  <div class="container" id="service-desc">
                    <h5>{{ subService.description }}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--  -->

          <!-- Add Service Button -->
          <br />
          <button
            type="button"
            class="btn btn-default pull-right btn-add-service"
            @click="addService"
          >
            <strong>
              <h6>
                Add Service
                <span class="glyphicon glyphicon-plus-sign"></span>
              </h6>
            </strong>
          </button>
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
    <div class="container" style="margin:10px">
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

              <md-field>
                <label>Tags</label>
                <md-textarea type="text" v-model="serviceTags" style="border-bottom: 1px inset"></md-textarea>
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
                  <label for="serviceTitle" class="col-sm .col-form-label-xsm">
                    <p>Service Title:</p>
                  </label>
                  <div class="col-sm-10">
                    <input
                      v-model="subServicesToBeAdded[index].serviceTitle"
                      type="text"
                      class="form-control"
                      placeholder="Enter service title"
                    />
                  </div>
                </div>
                <!-- Service Description -->
                <div class="form-group row">
                  <label for="serviceDescription" class="col-sm col-form-label">
                    <p>General Service Description:</p>
                  </label>
                  <div class="col-sm-10">
                    <textarea
                      v-model="subServicesToBeAdded[index].serviceDescription"
                      type="text"
                      rows="5"
                      class="form-control animated"
                      placeholder="Enter service description"
                    ></textarea>
                  </div>
                </div>
                <br />
                <br />

                <div class="form-group row">
                  <label for="price" class="col-sm col-form-label">
                    <p>Price Per Unit:</p>
                  </label>
                  <div class="col-sm-8">
                    <input
                      v-model="subServicesToBeAdded[index].servicePrice"
                      type="text"
                      class="form-control"
                      placeholder="Enter price per unit"
                    />
                  </div>
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

              <button
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
              </button>

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
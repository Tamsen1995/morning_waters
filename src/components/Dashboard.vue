
<template>
<div id="app">
  <dashboard-header/>

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

        <br>
        <br>
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
                <b-button block href="#" variant="outline-success">
                  <h6>View Leads</h6>
                </b-button>
              </div>
            </div>
            <div class="card" style="min-width: 30%;">
              <!-- <img src="..." class="card-img-top" alt="..."> -->
              <div class="card-body">
                <h4 class="card-title">Pending Orders:</h4>
                <p class="card-text">{{ this.credits }}</p>
                <b-button block href="#" variant="outline-success">
                  <h6>View Orders</h6>
                </b-button>
              </div>
            </div>
          </div>
        </div>
        <br>
        <br>
        <br>

        <div class="services" id="services">
          <br>
          <h4>Services:</h4>
          <br>
          <!-- Title -->
          <div v-for="(service, index) in this.services" :key="index">
            <div class="service-block" v-if="service.isSubService === false">
              <div id="service-title">
                <h4 style="text-align:left;">{{ service.title }}</h4>
                <h6>
                  <a href="#" class="btn pull-right">Edit</a>
                </h6>
              </div>
              <!-- Service Description -->
              <div class="container" id="service-desc">
                <h5>{{ service.description }}</h5>
              </div>

              <!--  -->
              <!-- sub services will be in this block -->
              <div v-for="(subService, index) in services" :key="index">
                <div class="service-block-sub" v-if="subService.isSubService === true">
                  <div id="service-title">
                    <h4 style="text-align:left;">{{ subService.title }}</h4>
                    <h6>
                      <a href="#" class="btn pull-right">Edit</a>
                    </h6>
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
          <br>
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
          <br>
          <br>
          <br>
        </div>
      </div>
    </body>
  </div>

  <!-- Modal component to add a service with -->

  <modal name="add-service" height="auto" scrollable="true" style="padding-top:80px">
    <div class="container" style="margin:10px">
      <div class="row">
        <div class="col-12">
          <h4 class="heading">
            <strong>Add</strong> Service
          </h4>
          <br>
          <form id="add-service">
            <div class="container" style="min-width: 500px;">
              <!-- Service Title -->
              <div class="form-group row">
                <label for="serviceTitle" class="col-sm .col-form-label-xsm">
                  <p>Service Title:</p>
                </label>
                <div class="col-sm-10">
                  <input
                    v-model="serviceTitle"
                    type="text"
                    class="form-control"
                    placeholder="Enter service title"
                  >
                </div>
              </div>
              <!-- Service Description -->
              <div class="form-group row">
                <label for="serviceDescription" class="col-sm col-form-label">
                  <p>General Service Description:</p>
                </label>
                <div class="col-sm-10">
                  <textarea
                    v-model="serviceDescription"
                    type="text"
                    rows="5"
                    class="form-control animated"
                    placeholder="Enter service description"
                  ></textarea>
                </div>
              </div>
              <br>
              <br>

              <div class="form-group row">
                <label for="price" class="col-sm col-form-label">
                  <p>Price Per Unit:</p>
                </label>
                <div class="col-sm-8">
                  <input
                    v-model="servicePrice"
                    type="text"
                    class="form-control"
                    placeholder="Enter price per unit"
                  >
                </div>
              </div>
              <!-- Turn Around Time -->
              <div class="form-group row">
                <label for="turnAroundTime" class="col-sm col-form-label">
                  <p>Turn Around Time:</p>
                </label>
                <div class="col-sm-8">
                  <input
                    v-model="turnAroundTime"
                    type="text"
                    class="form-control"
                    placeholder="Enter turn around time in weeks"
                  >
                </div>
              </div>
              <br>

              <!-- Service Tags -->
              <div class="form-group row">
                <label for="serviceTags" class="col-sm col-form-label">
                  <p>Tags:</p>
                </label>
                <div class="col-sm-10">
                  <textarea
                    v-model="serviceTags"
                    type="text"
                    rows="3"
                    class="form-control animated"
                    placeholder="Enter tags used to describe your service"
                  ></textarea>
                </div>
              </div>

              <!-- The sub services form -->
              <!-- <div v-for="(item, index) in this.order" v-bind:key="index"> -->

              <div v-for="(subservice, index) in this.subServicesToBeAdded" v-bind:key="index">
                <br>
                <br>
                <hr>
                <br>
                <br>
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
                    >
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
                <br>
                <br>

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
                    >
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
                    >
                  </div>
                </div>
                <br>

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
                    <input type="file" class="form-control-file" id="exampleFormControlFile1">
                  </p>
                </div>
              </div>
              <button
                class="btn btn-info pull-right"
                style="margin-top:10px"
                type="button"
                @click="submitService"
              >
                <p>Submit</p>
              </button>
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
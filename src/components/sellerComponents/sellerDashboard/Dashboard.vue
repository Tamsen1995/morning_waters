
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
          <about-section></about-section>
        </div>
        <br />
        <br />

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
            <div v-if="service.isSubService === false">
              <div class="service-border">
                <md-card-area md-inset>
                  <md-card-header>
                    <i class="fas fa-atom" id="service_logo"></i>
                    <span class="md-title">{{ service.title }}</span>

                    <md-card-content>
                      <div class="card-reservation">
                        <span
                          class="pull-right"
                          style="color:#1faa00;font-size: 18px;"
                        >Price: {{service.servicePrice}} $</span>

                        <span style="color: #5f5a6d">
                          <md-icon>access_time</md-icon>
                          Turnaround time : {{ service.turnAroundTime }}
                        </span>
                      </div>
                    </md-card-content>
                  </md-card-header>

                  <md-card-content
                    class="md-scrollbar"
                    style="word-wrap: break-word;"
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
                        <div class="md-title" style="font: 20px Roboto;">{{ subService.title }}</div>

                        <span
                          style="color:#009624;font-size: 18px;"
                          class="pull-right"
                        >Price: {{subService.servicePrice}} $</span>
                        <span style="color: #5f5a6d;">
                          <md-icon>access_time</md-icon>
                          Turnaround time : {{ subService.turnAroundTime }}
                        </span>
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
                        v-for="chip in subService.tags"
                        :key="chip"
                      >{{ chip.tag }}</md-chip>
                    </div>
                    <br />
                  </md-card>
                </div>

                <md-card-actions>
                  <md-button @click="editService(service)" class="md-raised" :md-ripple="false">Edit</md-button>
                  <md-button @click="deleteService(service)" class="md-raised md-accent">Delete</md-button>
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

          <br />
          <br />
          <br />
        </div>
      </div>
    </body>
  </div>

  <!-- Modal component to add a service with -->

  <modal name="add-service" height="auto" scrollable="true" :clickToClose="true" id="add-services">
    <div class="container" id="service-form-block">
      <div class="md-title">
        <h2>
          <i class="fas fa-atom" id="service_logo"></i>
          Add Services
        </h2>
      </div>

      <form class="md-layout">
        <div class="container">
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

          <md-field>
            <label>Service Description:</label>
            <md-textarea v-model="serviceDescription" style="border-bottom: 1px inset"></md-textarea>
          </md-field>

          <md-field>
            <label>Tags</label>
            <md-chips
              v-model="tags"
              md-placeholder="Add a tag and click enter"
              style="border-bottom: 1px inset; color: #a558e4;"
            ></md-chips>
          </md-field>

          <!-- Price -->
          <div class="row" id="form-row-border">
            <div class="col-4">
              <md-field>
                <label>Price Per Unit:</label>
                <md-input type="text" v-model="servicePrice" style="border-bottom: 1px inset"></md-input>
              </md-field>
            </div>
            <!-- Unit Type -->
            <div class="col-4">
              <md-field>
                <label>Unit Type:</label>
                <md-input type="text" v-model="unitType" style="border-bottom: 1px inset"></md-input>
              </md-field>
            </div>

            <!-- Price Negotiable? -->
            <div class="col-4">
              <md-checkbox value="priceNegotiable">Negotiable price</md-checkbox>
            </div>
          </div>

          <div class="row" id="form-row-border">
            <!-- Turn Around Time -->
            <div class="col-4">
              <md-field>
                <label>Turn Around Time:</label>
                <md-input type="text" v-model="turnAroundTime" style="border-bottom: 1px inset"></md-input>
              </md-field>
            </div>

            <!-- Time Units -->
            <div class="col-4">
              <md-field>
                <label>Hours/Days/Weeks</label>
                <!-- <md-select name="turnAroundTimeType" v-model="turnAroundTimeType" md-dense>
                  <md-option value="turnAroundTimeType">Days</md-option>
                  <md-option value="turnAroundTimeType">Weeks</md-option>
                </md-select>-->
              </md-field>
            </div>

            <!-- Price Negotiable? -->
            <div class="col-4">
              <md-checkbox value="negotiableTime">Negotiable Turn Around Time</md-checkbox>
            </div>
          </div>

          <br />
          <!-- Listings Table -->
          <table>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Unit</th>
              <th>Turn Around Time</th>
              <!-- <th>No Value</th>
              <th>Object</th>-->
            </tr>

            <tr>
              <td>{{ serviceTitle }}</td>
              <td>{{ servicePrice }}</td>
              <td>{{ unitType }}</td>
              <td>{{ turnAroundTime }} {{ turnAroundTimeType }}</td>
              <!-- <td>{{ novalue }}</td>
              <td>{{ obj }}</td>-->
            </tr>
          </table>
          <br />
        </div>
        <!-- Sub services form -->
        <!-- <div v-for="(item, index) in this.order" v-bind:key="index"> -->
        <div>
          <div
            class="container"
            style="border: 2px rgb(136, 2, 177) dotted;"
            id="subservice-form-block"
            v-for="(subservice, index) in this.subServicesToBeAdded"
            v-bind:key="index"
          >
            <!-- Service Title -->
            <md-field>
              <label>Sub Service Title:</label>
              <md-input
                type="text"
                v-model="subServicesToBeAdded[index].serviceTitle"
                style="border-bottom: 1px inset"
              ></md-input>
            </md-field>

            <!-- Service Description -->
            <md-field>
              <label>Sub Service Description:</label>
              <md-textarea
                v-model="subServicesToBeAdded[index].serviceDescription"
                style="border-bottom: 1px inset"
              ></md-textarea>
            </md-field>

            <!-- Sub Service Tags -->
            <md-field>
              <label>Tags</label>
              <md-chips
                md-placeholder="Add a tag and click enter"
                v-model="subServicesToBeAdded[index].serviceTags"
                style="border-bottom: 1px inset; color: #a558e4;"
              ></md-chips>
            </md-field>

            <div class="row">
              <div class="col-4">
                <md-field>
                  <label>Price Per Unit:</label>
                  <md-input
                    type="text"
                    v-model="subServicesToBeAdded[index].servicePrice"
                    style="border-bottom: 1px inset"
                  ></md-input>
                </md-field>
              </div>

              <!-- Unit Type -->
              <div class="col-4">
                <md-field>
                  <label>Unit Type:</label>
                  <md-input type="text" v-model="unit" style="border-bottom: 1px inset"></md-input>
                </md-field>
              </div>

              <!-- Price Negotiable? -->
              <div class="col-4">
                <md-checkbox value="priceNegotiable">Negotiable Price</md-checkbox>
              </div>
            </div>

            <!-- Turn Around Time -->
            <div class="row">
              <div class="col-4">
                <md-field>
                  <label>Turn Around Time:</label>
                  <md-input
                    type="text"
                    v-model="subServicesToBeAdded[index].turnAroundTime"
                    style="border-bottom: 1px inset"
                  ></md-input>
                </md-field>
              </div>

              <!-- Time Units -->
              <div class="col-4">
                <md-field>
                  <label>Hours/Days/Weeks</label>
                  <md-select name="turnAroundTimeType" v-model="turnAroundTimeType" md-dense>
                    <md-option value="turnAroundTimeType">Days</md-option>
                    <md-option value="turnAroundTimeType">Weeks</md-option>
                  </md-select>
                </md-field>
              </div>

              <!-- Time Negotiable? -->
              <div class="col-4">
                <md-checkbox value="negotiableTime">Negotiable Turn Around Time</md-checkbox>
              </div>
            </div>
            <br />
            <br />
            <!-- Listings Table -->
            <table>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Unit</th>
                <th>Turn Around Time</th>
                <!-- <th>No Value</th>
                <th>Object</th>-->
              </tr>

              <tr>
                <td>{{ serviceTitle }}</td>
                <td>{{ servicePrice }}</td>
                <td>{{ unit }}</td>
                <td>{{ turnAroundTime }} {{ turnAroundTimeType }}</td>
                <!-- <td>{{ novalue }}</td>
                <td>{{ obj }}</td>-->
              </tr>
            </table>
            <br />
            <br />
          </div>

          <!-- Add another (plus button) -->

          <md-button
            type="button"
            class="btn btn-default"
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

          <md-button
            v-if="this.serviceBeingEdited === true"
            class="md-dense md-raised md-primary"
            type="button"
            @click="submitServiceEdit()"
          >Submit Edit</md-button>

          <md-button
            v-else
            class="md-raised md-primary"
            type="button"
            @click="submitService()"
          >Submit</md-button>
        </div>
      </form>
    </div>
  </modal>
</div>
</template>

<script src="../scripts/dashboard.js"; >
</script>

<style scoped>
@import "../../../assets/css/dashboard.css";
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
</style>
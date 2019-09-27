
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
    <md-button
      class="pull-right"
      style=" color: #2d133a; border-style: ridge;"
      @click="cleanServiceInput()"
    >X</md-button>
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
            <label for="serviceTitle" class="col-sm .col-form-label-xsm"></label>
            <div class="error" v-html="error" />
            <md-field>
              <label>Service Title:</label>
              <md-input type="text" v-model="serviceTitle" style="border-bottom: 1px inset"></md-input>
            </md-field>
          </div>

          <!-- TO DO: add editable about input directly on listing, per service - not on add service Modal -->
          <!-- <md-field>
            <label>Service Description:</label>
            <md-textarea v-model="serviceDescription" style="border-bottom: 1px inset"></md-textarea>
          </md-field>-->
          Tags:
          <md-field>
            <input-tag
              style="width:100%;"
              placeholder="Add a tag and press enter / comma"
              v-model="tags"
              :add-tag-on-keys="[13,188]"
            ></input-tag>
          </md-field>

          <!-- Pricing Block -->
          <div class="pricing_block">
            <div class="row" id="form-row-border">
              <!-- Price -->
              <div class="col-4">
                <div class="form-group">
                  <label>
                    <h5>Price Per Unit:</h5>
                  </label>
                  <input
                    type="text"
                    v-model="servicePrice"
                    style="border-bottom: 1px inset"
                    placeholder="$ USD"
                  />
                  <small class="form-text text-muted">$ USD</small>
                </div>
              </div>
              <!-- Unit Type -->
              <div class="col-4">
                <div class="form-group">
                  <label>
                    <h5>Unit:</h5>
                  </label>

                  <select
                    type="text"
                    class="form-control"
                    placeholder="Unit"
                    v-on:keyup.enter="setDone('second', 'third')"
                    v-model="unitType"
                  >
                    <option value selected="selected">Select a unit type</option>
                    <option value="sample">sample</option>
                    <option value="kit">kit</option>
                    <option value="gigabyte">gigabyte</option>
                    <option value="hour">hour</option>
                    <option value="unit">unit</option>
                  </select>
                </div>
              </div>

              <!-- Price Negotiable? -->
              <div class="col-4">
                <div class="form-group form-check" style="padding-top:15px;">
                  <input
                    type="checkbox"
                    v-model="serviceNegPrice"
                    class="form-check-input"
                    id="negPrice"
                  />
                  <label
                    class="form-check-label"
                    value="Negotiable"
                    style="padding-left:15px;"
                    for="serviceNegPrice"
                  >
                    <h5>Price Negotiable</h5>
                  </label>
                </div>
              </div>
            </div>
            <br />

            <div class="row" id="form-row-border">
              <!-- Turn Around Time -->
              <div class="col-4">
                <div class="form-group">
                  <label>
                    <h5>Turn Around Time</h5>
                  </label>
                  <input v-model.number="turnAroundTime" type="number" />
                  <small class="form-text text-muted">ex: 3 days</small>
                </div>
              </div>

              <!-- Time Units -->
              <div class="col-4">
                <div class="form-group">
                  <label for="exampleFormControlSelect1">
                    <h5>Time Unit</h5>
                  </label>
                  <select v-model="timeUnit" class="form-control" id="exampleFormControlSelect1">
                    <option>hours</option>
                    <option>days</option>
                    <option>weeks</option>
                    <option>months</option>
                  </select>
                </div>
              </div>

              <!-- Turn Around Time Negotiable? -->
              <div class="col-4">
                <div class="form-group form-check" style="padding-top:15px;">
                  <input
                    type="checkbox"
                    v-model="serviceNegTime"
                    class="form-check-input"
                    id="negTime"
                  />
                  <label
                    class="form-check-label"
                    svalue="Negotiable"
                    style="padding-left:15px;"
                    for="serviceNegTime"
                  >
                    <h5>Turn Around Time Negotiable</h5>
                  </label>
                </div>
              </div>
            </div>

            <div class="row" id="form-row-border">
              <!-- Taxable? -->
              <!-- TO DO: add taxable var -->
              <div class="col-4">
                <div class="form-group form-check" style="padding-top:15px;">
                  <input
                    type="checkbox"
                    v-model="serviceTaxable"
                    class="form-check-input"
                    id="taxable"
                  />
                  <label
                    class="form-check-label"
                    svalue="Negotiable"
                    style="padding-left:15px;"
                    for="taxable"
                  >
                    <h5>Taxable</h5>
                  </label>
                </div>
              </div>

              <!-- Tax Amount? -->
              <!-- TO DO: add tax amount var -->
              <div class="col-4">
                <div class="form-group">
                  <label>
                    <h5>Tax Amount %</h5>
                  </label>
                  <input type="text" style="border-bottom: 1px inset" placeholder="%" />
                </div>
              </div>
            </div>

            <br />
            <!-- Listings Table -->
            <table>
              <tr>
                <th>Title</th>
                <th>Price per unit</th>
                <th>Turn Around Time</th>
              </tr>

              <tr>
                <td>{{ serviceTitle }}</td>
                <td>{{ servicePrice }} per {{ unitType }}</td>
                <td>{{ turnAroundTime }} {{ timeUnit }}</td>
              </tr>
            </table>
          </div>
          <br />
        </div>
        <!-- Sub services form -->
        <div>
          <div
            class="container"
            style="  border-color: #c9c2d6;
              border-style: solid;
              border-width: 2px;"
            id="subservice-form-block"
            v-for="(subservice, index) in this.subServicesToBeAdded"
            v-bind:key="index"
          >
            <md-button
              @click="deleteSubServiceToBeAdded(index)"
              class="pull-right"
              style="border-width:1px; border-color: #2d133a; color: #2d133a; border-style: ridge;"
            >X</md-button>
            <!-- Service Title -->
            <md-field>
              <label>Sub-Item:</label>
              <md-input
                type="text"
                v-model="subServicesToBeAdded[index].serviceTitle"
                style="border-bottom: 1px inset"
              ></md-input>
            </md-field>

            <!-- Service Description -->
            <!-- <md-field>
              <label>Sub-Item Description:</label>
              <md-textarea
                v-model="subServicesToBeAdded[index].serviceDescription"
                style="border-bottom: 1px inset"
              ></md-textarea>
            </md-field>-->

            <!-- Sub Service Tags -->
            Tags:
            <md-field>
              <input-tag
                style="width:100%;"
                placeholder="Add a tag and press enter / comma"
                v-model="subServicesToBeAdded[index].serviceTags"
                :add-tag-on-keys="[13,188]"
              ></input-tag>
            </md-field>

            <!-- Pricing Block -->
            <div class="sub_pricing_block">
              <div class="row" id="form-row-border">
                <!-- Price -->
                <div class="col-4">
                  <div class="form-group">
                    <label>
                      <h5>Price Per Unit:</h5>
                    </label>
                    <input
                      type="number"
                      v-model.number="subServicesToBeAdded[index].servicePrice"
                      style="border-bottom: 1px inset"
                      placeholder="$ USD"
                    />
                    <small class="form-text text-muted">$ USD</small>
                  </div>
                </div>
                <!-- Unit Type -->
                <div class="col-4">
                  <div class="form-group">
                    <label>
                      <h5>Unit:</h5>
                    </label>
                    <!-- <input
                      type="text"
                      v-model="subServicesToBeAdded[index].unitType"
                      id="turnAroundTimeSelect"
                      placeholder="ex: sample"
                    />-->
                    <select
                      type="text"
                      class="form-control"
                      placeholder="Unit"
                      v-on:keyup.enter="setDone('second', 'third')"
                      v-model="subServicesToBeAdded[index].unitType"
                    >
                      <option value selected="selected">Please select a unit type</option>
                      <option value="sample">sample</option>
                      <option value="kit">kit</option>
                      <option value="gigabyte">gigabyte</option>
                      <option value="hour">hour</option>
                      <option value="unit">unit</option>
                    </select>
                  </div>
                </div>

                <!-- Price Negotiable? -->
                <div class="col-4">
                  <div class="form-group form-check" style="padding-top:15px;">
                    <input
                      type="checkbox"
                      v-model="subServicesToBeAdded[index].serviceNegPrice"
                      class="form-check-input"
                      id="negPrice"
                    />
                    <label class="form-check-label" style="padding-left:15px;" for="negPrice">
                      <h5>Price Negotiable</h5>
                    </label>
                  </div>
                </div>
              </div>
              <br />

              <div class="row" id="form-row-border">
                <!-- Turn Around Time -->
                <div class="col-4">
                  <div class="form-group">
                    <label for="turnAroundTimeSelect">
                      <h5>Turn Around Time</h5>
                    </label>
                    <input
                      type="text"
                      v-model="subServicesToBeAdded[index].turnAroundTime"
                      id="turnAroundTimeSelect"
                    />
                    <small id="emailHelp" class="form-text text-muted">ex: 3 days</small>
                  </div>
                </div>

                <!-- Time Units -->
                <div class="col-4">
                  <div class="form-group">
                    <label for="exampleFormControlSelect1">
                      <h5>Time Unit</h5>
                    </label>
                    <select
                      v-model="subServicesToBeAdded[index].timeUnit"
                      class="form-control"
                      id="exampleFormControlSelect1"
                    >
                      <option>hours</option>
                      <option>days</option>
                      <option>weeks</option>
                      <option>months</option>
                    </select>
                  </div>
                </div>

                <!-- Turn Around Time Negotiable? -->
                <div class="col-4">
                  <div class="form-group form-check" style="padding-top:15px;">
                    <input
                      type="checkbox"
                      v-model="subServicesToBeAdded[index].serviceNegTime"
                      class="form-check-input"
                      id="negTime"
                    />
                    <label class="form-check-label" style="padding-left:15px;" for="negTime">
                      <h5>Turn Around Time Negotiable</h5>
                    </label>
                  </div>
                </div>
              </div>

              <div class="row" id="form-row-border">
                <!-- Taxable? -->
                <!-- TO DO: add taxable var -->
                <div class="col-4">
                  <div class="form-group form-check" style="padding-top:15px;">
                    <input
                      type="checkbox"
                      v-model="subServicesToBeAdded[index].serviceTaxable"
                      class="form-check-input"
                      id="taxable"
                    />
                    <label
                      class="form-check-label"
                      svalue="Negotiable"
                      style="padding-left:15px;"
                      for="taxable"
                    >
                      <h5>Taxable</h5>
                    </label>
                  </div>
                </div>

                <!-- Tax Amount? -->
                <!-- TO DO: add tax amount var -->
                <div class="col-4">
                  <div class="form-group">
                    <label>
                      <h5>Tax Amount %</h5>
                    </label>
                    <input type="text" style="border-bottom: 1px inset" placeholder="%" />
                  </div>
                </div>
              </div>

              <br />
              <!-- Listings Table -->

              <table>
                <tr>
                  <th>Title</th>
                  <th>Price per unit</th>
                  <th>Turn Around Time</th>
                </tr>

                <tr>
                  <td>{{ serviceTitle }}</td>
                  <td>{{ servicePrice }} per {{ unitType }}</td>
                  <td>{{ turnAroundTime }} {{ timeUnit }}</td>
                </tr>
              </table>
            </div>
          </div>

          <!-- Add another (plus button) -->

          <md-button type="button" class="md-primary" id="addSubButton" @click="addSubService()">
            Add Sub-Item
            <span class="glyphicon glyphicon-plus-sign"></span>
          </md-button>

          <md-button
            v-if="this.serviceBeingEdited === true"
            class="md-dense md-raised md-primary"
            type="button"
            @click="submitServiceEdit()"
          >Publish Edit</md-button>

          <md-button
            v-else
            class="md-raised md-primary"
            type="button"
            @click="submitService()"
          >Publish</md-button>
        </div>
      </form>
    </div>
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
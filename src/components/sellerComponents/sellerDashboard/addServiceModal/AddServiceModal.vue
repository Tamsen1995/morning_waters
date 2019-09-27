<template>
  <div>
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
  </div>
</template>

<script>
export default {};
</script>

<style>
@import "../../../../assets/css/dashboard.css";
@import "../../../../assets/css/forms.css";
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
</style>
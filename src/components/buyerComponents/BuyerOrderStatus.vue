<template>
<div class="responsive-component" v-responsive="{
  small: el => el.width < 860
  }">
  <buyer-header></buyer-header>

  <body class="pending_orders">
    <div id="pending_orders_content">
      <div class="container current-order-status">
        <!-- Add tabs to toggle Current Orders/ Pending Orders-->
        <!-- Curent Orders -->
        <br />

        <div class="timeline-dashboard">
          <!-- <div v-for="(pendingOrder, index) in this.pendingOrders" v-bind:key="index"> -->
          <div>
            <div class="row">
              <div class="col-8">
                <!-- TODO -->
                <h3>[Seller Name]</h3>
                <h2>[Seller Lab]</h2>

                <!-- TODO -->
                <h3>[Buyer Name]</h3>
                <h2>[Buyer Lab]</h2>
                <br />
                <h3 style="color:green;">Order Confirmed [Date]</h3>
                <h2 style="color:green;">Charged / Estimated revenue [$$$]</h2>
                <br />

                <!-- TODO : View Order Details, Add expandable Div -->
              </div>
            </div>
            <br />

            <!-- TODO  -->
            <!-- Handle shipping -->

            <button
              v-if="this.orderStatusInt >= 3"
              class="pull-right"
              id="btn-shippo"
              type="submit"
              @click="redirectToShippo"
            >Handle Shipping</button>
            <br />
          </div>

          <hr />
        </div>

        <!-- Step 0 : -->
        <div id="seller-timeline">
          <div class="row timeline-movement">
            <div class="timeline-badge" style="top: 25px;">
              <md-card
                class="md-primary timeline-badge"
                md-theme="green-card"
                style="background-color: green;"
              >
                <md-icon>backup</md-icon>
              </md-card>
            </div>

            <!-- Order Submitted-->
            <div class="col-sm-6 timeline-item">
              <div class="row">
                <div class="col-sm-11">
                  <div class="timeline-panel buyer-side">
                    <ul class="timeline-panel-ul">
                      <li>The order has been placed</li>

                      <li>
                        <p>
                          <small class="text-muted" v-if="this.order">
                            <i class="glyphicon glyphicon-time"></i>
                            placed at : [{{this.order.order.createdAt}}]
                          </small>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--  -->

          <!-- Step 1: Buyer Submits order -->
          <div class="row timeline-movement" v-if="this.orderStatusInt >= 1">
            <div class="timeline-badge" style="top: 25px;">
              <md-card
                class="md-primary timeline-badge"
                md-theme="green-card"
                style="background-color: green;"
              >
                <md-icon>backup</md-icon>
              </md-card>
            </div>

            <!-- Order Submitted-->
            <div class="col-sm-6 timeline-item">
              <div class="row">
                <div class="col-sm-11">
                  <div class="timeline-panel buyer-side">
                    <ul class="timeline-panel-ul">
                      <li>Seller submitted the negotiation for buyer review</li>

                      <li>
                        <p>
                          <small class="text-muted">
                            <i class="glyphicon glyphicon-time"></i> [Timestamp] [Example Date]
                          </small>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--  -->

          <!-- Step 2: Seller Confirms Order -->
          <div class="row timeline-movement" v-if="this.orderStatusInt >= 2">
            <div class="timeline-badge" style="top: 25px;">
              <md-card
                class="md-primary timeline-badge"
                md-theme="green-card"
                style="background-color: green;"
              >
                <md-icon>backup</md-icon>
              </md-card>
            </div>

            <div class="col-sm-6 timeline-item">
              <div class="row">
                <div class="col-sm-11"></div>
              </div>
            </div>

            <!-- Order Confirmed-->
            <div class="col-sm-6 timeline-item">
              <div class="row">
                <div class="col-sm-offset-1 col-sm-11">
                  <div class="timeline-panel seller-side">
                    <!-- Pending Confirmation -->
                    <ul class="timeline-panel-ul">
                      <li>Buyer submitted the negotiation and the order has been submitted</li>

                      <li>
                        <p>
                          <small class="text-muted">
                            <i class="glyphicon glyphicon-time"></i> [TimeStamp] [Example date]
                          </small>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <!--  -->
          </div>

          <!-- Step 3-->
          <div class="row timeline-movement" v-if="this.orderStatusInt >= 3">
            <div class="timeline-badge" style="top: 25px;">
              <md-card
                class="md-primary timeline-badge"
                md-theme="green-card"
                style="background-color: green;"
              >
                <md-icon>local_shipping</md-icon>
              </md-card>
            </div>

            <!-- Seller Side text card-->
            <div class="col-sm-6 timeline-item">
              <div class="row">
                <div class="col-sm-11">
                  <div class="timeline-panel buyer-side">
                    <ul class="timeline-panel-ul">
                      <li>Seller submitted Shipping logistics</li>
                      <li>
                        <p>
                          <small class="text-muted">
                            <i class="glyphicon glyphicon-time"></i>
                            Date of confirmation : [ {{ shipping_confirmed_date }} ]
                          </small>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <!--  -->
            <div
              v-if="shippoOrder.shipping_cost && shippoOrder.shipping_cost_currency && shippoOrder.shipping_method"
            >
              Shipping Cost: {{shippoOrder.shipping_cost}} {{shippoOrder.shipping_cost_currency}}
              Shipping Method: {{shippoOrder.shipping_method}}
            </div>

            <!-- shipping_method": null, "shipping_cost": null, "shipping_cost_currency": null -->
          </div>
          <!-- Here we can insert icons to indicate the shipping status -->

          <div v-if="this.orderStatusInt >= 4">
            <!-- Step 4: Seller Confirms Order -->
            <div
              class="row timeline-movement timeline-movement-top"
              v-for="(transaction, index) in this.shippoOrder.transactions"
              v-bind:key="index"
            >
              <div class="timeline-badge" style="top: 25px;">
                <md-card
                  class="md-primary timeline-badge"
                  md-theme="green-card"
                  style="background-color: green;"
                >
                  <md-icon>local_shipping</md-icon>
                </md-card>
              </div>

              <div class="col-sm-6 timeline-item">
                <div class="row">
                  <div class="col-sm-11"></div>
                </div>
              </div>

              <!-- Order Confirmed-->
              <div class="col-sm-6 timeline-item">
                <div class="row">
                  <div class="col-sm-offset-1 col-sm-11">
                    <div class="timeline-panel seller-side">
                      <!-- Pending Confirmation -->
                      <ul class="timeline-panel-ul">
                        <li>Transaction number : [{{transaction.tracking_number}}]</li>
                        <li>
                          <p>
                            <small class="text-muted">
                              <i class="glyphicon glyphicon-time"></i> [Concept Prototype]
                            </small>
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <!--  -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</div>
</template>

<script src="./scripts/buyerOrderStatus.js">
</script>

<style>
@import "../../assets/css/timeline.css";
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
</style>

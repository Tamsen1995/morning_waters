<template>
<div class="responsive-component" v-responsive="{
  small: el => el.width < 860
  }">
  <dashboard-header></dashboard-header>
  <body class="pending_orders">
    <div id="pending_orders_content">
      <div class="container current-order-status">
        <!-- Add tabs to toggle Current Orders/ Pending Orders-->
        <!-- Curent Orders -->
        <br>
        <div class="timeline-dashboard">
          <!-- <div v-for="(pendingOrder, index) in this.pendingOrders" v-bind:key="index"> -->
          <div>
            <div class="row">
              <div class="col-8">
                <h3>[Buyer Name]</h3>
                <h2>[Buyer Lab]</h2>
                <br>
                <h3 style="color:green;">Order Confirmed [Date]</h3>
                <h2 style="color:green;">Charged [$$$]</h2>
                <br>

                <!-- View Order Details, Add expandable Div -->
                <div id="order_details">
                  <h3>Order ID :</h3>
                  <ol id="item_list">
                    <h3>
                      <li>
                        <!-- {{orderItem.title}}
                          <br>
                          {{orderItem.description}} 
                          <br>
                        {{orderItem.quantity}}-->
                      </li>
                    </h3>
                  </ol>
                  <!-- <a><h3 style="color:purple;"> View Timeline</h3></a>  -->
                </div>
              </div>
              <!-- <div class="col-4">
                  <h3  style="color:green;"> Order Confirmed [Date]</h3>         
                  <h2  style="color:green;"> Charged [$$$]</h2>    
              </div>-->
            </div>
            <br>

            <!-- Handle shipping -->
            <button
              class="pull-right"
              id="btn-shippo"
              type="submit"
              @click="confirmOrder(index)"
            >Handle Shipping</button>
            <br>

            <a class="invoice-link">Download Invoice</a>
          </div>

          <hr>
        </div>

        <div id="seller-timeline">
          <!-- Step 1: Buyer Submits order -->
          <div class="row timeline-movement">
            <div class="timeline-badge" id="status-complete">
              <span style="font-size: 40px;">
                <i class="fas fa-clipboard-list"></i>
              </span>
            </div>

            <!-- Order Submitted-->
            <div class="col-sm-6 timeline-item">
              <div class="row">
                <div class="col-sm-11">
                  <div class="timeline-panel buyer-side">
                    <ul class="timeline-panel-ul">
                      <li>
                        <span class="importo">[Buyer Name], [Lab Name]</span>
                      </li>
                      <li>
                        <span class="importo">Submited Order</span>
                      </li>
                      <li>
                        <p>
                          <small class="text-muted">
                            <i class="glyphicon glyphicon-time"></i> Timestamp
                          </small>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Seller Confirms Order -->
          <div class="row timeline-movement">
            <div class="timeline-badge" id="status-complete">
              <span style="font-size: 40px;">
                <i class="fas fa-clipboard-check"></i>
              </span>
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
                      <li>
                        <span class="importo">You Confirmed Order</span>
                      </li>
                      <li>
                        <span class="importo">Buyer Charged [total billed]</span>
                      </li>
                      <li>
                        <span class="causale">View Invoice</span>
                      </li>
                      <li>
                        <p>
                          <small class="text-muted">
                            <i class="glyphicon glyphicon-time"></i> [TimeStamp]
                          </small>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pre-Delivery Shipping Status-->
          <div class="row timeline-movement">
            <div class="timeline-badge" style="padding:5px;" id="status-incomplete">
              <span style="font-size: 37px; padding-top: 20px;">
                <i class="fas fa-dolly"></i>
              </span>
            </div>

            <div class="col-sm-6 timeline-item">
              <div class="row">
                <div class="col-sm-11"></div>
              </div>
            </div>

            <div class="col-sm-6 timeline-item">
              <div class="row">
                <div class="col-sm-offset-1 col-sm-11">
                  <div class="timeline-panel seller-side">
                    <!-- Before Shippo status updates -->
                    <ul class="timeline-panel-ul">
                      <li>
                        <span class="importo">Need to ship?</span>
                      </li>
                      <li>
                        <span class="causale">Shipping UI Link.</span>
                      </li>
                    </ul>

                    <!-- With Shippo Status updates -->
                    <!-- <ul class="timeline-panel-ul">
                        <li>
                          <span class="importo">[Shipping status]</span>
                        </li>
                        <li>
                          <span class="causale">Tracking Number</span>
                        </li>
                        <li>
                          <p>
                            <small class="text-muted">
                              <i class="glyphicon glyphicon-time"></i> 11/09/2014
                            </small>
                          </p>
                        </li>
                    </ul>-->
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Post-Delivery Status (Replace above block) -->
          <div class="row timeline-movement">
            <div class="timeline-badge" id="status-incomplete" style="top: 25%;">
              <span style="font-size: 40px;">
                <i class="far fa-check-circle"></i>
              </span>
            </div>

            <div class="col-sm-offset-6 col-sm-6 timeline-item">
              <div class="row">
                <div class="col-sm-offset-1 col-sm-11">
                  <div class="timeline-panel seller-side">
                    <ul class="timeline-panel-ul">
                      <li>
                        <span class="importo">[Delivered]</span>
                      </li>
                      <li>
                        <span class="causale">Tracking Number</span>
                      </li>
                      <li>
                        <p>
                          <small class="text-muted">
                            <i class="glyphicon glyphicon-time"></i> 11/09/2014
                          </small>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Buyer Pre-Delivery Shipping Status-->
          <div class="row timeline-movement">
            <div class="timeline-badge" style="padding:5px;" id="status-incomplete">
              <span style="font-size: 37px; padding-top: 20px;">
                <i class="fas fa-dolly"></i>
              </span>
            </div>

            <div class="col-sm-6 timeline-item">
              <div class="row">
                <div class="col-sm-11">
                  <div class="timeline-panel buyer-side">
                    <!-- With Shippo Status updates -->
                    <ul class="timeline-panel-ul">
                      <li>
                        <span class="importo">[Shipping status]</span>
                      </li>
                      <li>
                        <span class="causale">Tracking Number</span>
                      </li>
                      <li>
                        <p>
                          <small class="text-muted">
                            <i class="glyphicon glyphicon-time"></i> 11/09/2014
                          </small>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Buyer Post-Delivery Status (Replace above block) -->
          <div class="row timeline-movement">
            <div class="timeline-badge" id="status-incomplete" style="top: 25%;">
              <span style="font-size: 40px;">
                <i class="far fa-check-circle"></i>
              </span>
            </div>

            <div class="col-sm-6 timeline-item">
              <div class="row">
                <div class="col-sm-11">
                  <div class="timeline-panel buyer-side">
                    <ul class="timeline-panel-ul">
                      <li>
                        <span class="importo">[Delivered]</span>
                      </li>
                      <li>
                        <span class="causale">Tracking Number</span>
                      </li>
                      <li>
                        <p>
                          <small class="text-muted">
                            <i class="glyphicon glyphicon-time"></i> 11/09/2014
                          </small>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br>
          <br>
          <div class="row timeline-movement timeline-movement-top">
            <div class="timeline-badge timeline-future-movement" style="top: 25px;">
              <a href="#">
                <span class="glyphicon glyphicon-plus"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</div>
</template>

<script>
import DashboardHeader from "@/components/DashboardHeader.vue";

export default {
  data() {
    return {
      orderId: ""
    };
  },
  async created() {},
  async mounted() {
    this.orderId = this.$route.params.orderId;
  },
  components: {
    DashboardHeader
  }
};
</script>

<style>
@import "../../assets/css/timeline.css";
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
</style>

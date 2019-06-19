<template>
  <div class="responsive-component" v-responsive= "{
  small: el => el.width < 860
  }">
    <dashboard-header></dashboard-header>
    <body class="pending_orders">
      <div id="pending_orders_content">
        <div class="container current-order-status">
          <!-- Add tabs to toggle Current Orders/ Pending Orders-->
          <!-- Curent Orders -->
          <br>

          <div id="seller-timeline" style="top: 15px;">
            <div class="row timeline-movement">
              <!--In correspondance (Sellers Only) -->
              <div style="margin:0px; padding:0px;">
                <div class="timeline-badge-small" id="status-complete" style="top: 50px;"></div>
              </div>

              <div class="col-sm-6 timeline-item">
                <div class="row">
                  <div class="col-sm-11"></div>
                </div>
              </div>

              <div class="col-sm-6 timeline-item">
                <div class="row">
                  <div class="col-sm-offset-1 col-sm-11">
                    <div class="timeline-panel buyer-side">
                      <ul class="timeline-panel-ul">
                        <li>
                          <span class="importo">In Correspondance</span>
                        </li>
                        <li>
                          <span class="causale">Most Recent message...</span>
                        </li>
                        <li>
                          <span class="causale">View inbox</span>
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

            <!-- Step 1: Buyer Submits order -->
            <div class="row timeline-movement">
              <div class="timeline-badge" id="status-complete">
                <span style="font-size: 40px;">
                  <i class="fas fa-clipboard-list"></i>
                </span>
              </div>

              <div class="col-sm-6 timeline-item">
                <div class="row">
                  <div class="col-sm-11"></div>
                </div>
              </div>

              <!-- Order Submitted-->
              <div class="col-sm-6 timeline-item">
                <div class="row">
                  <div class="col-sm-offset-1 col-sm-11">
                    <div class="timeline-panel buyer-side">
                      <ul class="timeline-panel-ul">
                        <li>
                          <span class="importo">Order Submited</span>
                        </li>
                        <li>
                          <span class="causale">View Order Summary</span>
                        </li>
                        <li>
                          <span
                            class="causale"
                          >You will not be charged until Seller name confirms your order.</span>
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

              <!-- Buyer Charged-->
              <div class="col-sm-6 timeline-item">
                <div class="row">
                  <div class="col-sm-11">
                    <div class="timeline-panel seller-side">
                      <!-- Pending Confirmation -->
                      <ul class="timeline-panel-ul">
                        <li>
                          <span class="importo">[Seller Name] Confirmed Order</span>
                        </li>
                        <li>
                          <span class="importo">Charged [total billed]</span>
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

            <!-- Shipping Decisions/ Shippo UI link -->
            <div class="row timeline-movement">
              <div class="timeline-badge" style="padding:5px;" id="status-incomplete">
                <span style="font-size: 37px; padding-top: 20px;">
                  <i class="fas fa-dolly"></i>
                </span>
              </div>

              <div class="col-sm-6 timeline-item">
                <div class="row">
                  <div class="col-sm-11">
                    <div class="timeline-panel seller-side">
                      <ul class="timeline-panel-ul">
                        <li>
                          <span class="importo">[Company Name] Shipping Selection</span>
                        </li>
                        <li>
                          <span class="causale">View Invoice</span>
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

              <!-- Seller Confirmed Order Charged-->
              <div class="col-sm-6 timeline-item">
                <div class="row">
                  <div class="col-sm-offset-1 col-sm-11">
                    <div class="timeline-panel buyer-side">
                      <ul class="timeline-panel-ul">
                        <li>
                          <span class="importo">Need to ship?</span>
                        </li>
                        <li>
                          <span class="causale">Shipping UI Link.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Shipping Status -->
            <div class="row timeline-movement">
              <div class="timeline-badge-small" id="status-incomplete" style></div>

              <div class="col-sm-offset-6 col-sm-6 timeline-item">
                <div class="row">
                  <div class="col-sm-offset-1 col-sm-11">
                    <div class="timeline-panel buyer-side">
                      <ul class="timeline-panel-ul">
                        <li>
                          <span class="importo">[Label purchased, Shipped]</span>
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

            <!-- Delivery status -->
            <div class="row timeline-movement">
              <div class="timeline-badge" id="status-incomplete" style="top: 25%;">
                <span style="font-size: 40px;">
                  <i class="far fa-check-circle"></i>
                </span>
              </div>

              <div class="col-sm-offset-6 col-sm-6 timeline-item">
                <div class="row">
                  <div class="col-sm-offset-1 col-sm-11">
                    <div class="timeline-panel buyer-side">
                      <ul class="timeline-panel-ul">
                        <li>
                          <span class="importo">[Out for delivery, Delivered]</span>
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

            <!-- Shipping Status -->
            <div class="row timeline-movement">
              <div class="timeline-badge-small" style id="status-incomplete"></div>

              <div class="col-sm-6 timeline-item">
                <div class="row">
                  <div class="col-sm-11">
                    <div class="timeline-panel seller-side">
                      <ul class="timeline-panel-ul">
                        <li>
                          <span class="importo">[Label purchased, Shipped]</span>
                        </li>
                        <li>
                          <span class="causale">Tracking Number</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Delivery Status -->
            <div class="row timeline-movement">
              <div class="timeline-badge" id="status-incomplete" style="top: 25%;">
                <span style="font-size: 40px;">
                  <i class="far fa-check-circle"></i>
                </span>
              </div>

              <div class="col-sm-6 timeline-item">
                <div class="row">
                  <div class="col-sm-11">
                    <div class="timeline-panel seller-side badge-glow">
                      <ul class="timeline-panel-ul">
                        <li>
                          <span class="importo">[Out for delivery, Delivered]</span>
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
          <br>
          <br>
          <br>
          <!-- Invoice Viewer -->
          <div class="container" id="current-order-download" style="padding-top: 25px;">
            <div class="row">
              <div class="container">
                <h4>Download Invoice</h4>
                <div class="card">
                  View grid
                  Download
                </div>
              </div>
            </div>
          </div>
          <br>
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
@import "../assets/css/timeline.css";
@import url('https://fonts.googleapis.com/css?family=Lato|Roboto');
</style>

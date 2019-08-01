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
            <!-- <button
              class="pull-right"
              id="btn-shippo"
              type="submit"
              @click="confirmOrder(index)"
            >Handle Shipping</button>-->
            <br />
          </div>

          <hr />
        </div>

        <div id="seller-timeline">
          <!-- Step 1: Buyer Submits order -->
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
                      <li>Seller submitted the negotiation for buyer review</li>
                      <li>[TEST]</li>
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
                      <li>[TEST]</li>
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

          <!-- This is a  ball -->
          <div class="row timeline-movement timeline-movement-top" v-if="this.orderStatusInt >= 3">
            <div class="timeline-badge" style="top: 25px;">
              <md-card
                class="md-primary timeline-badge"
                md-theme="green-card"
                style="background-color: green;"
              >
                <md-icon>backup</md-icon>
              </md-card>
            </div>

            <!-- Seller Side text card-->
            <div class="col-sm-6 timeline-item">
              <div class="row">
                <div class="col-sm-11">
                  <div class="timeline-panel buyer-side">
                    <ul class="timeline-panel-ul">
                      <li>Seller submitted Shipping logistics</li>
                      <li>[TEST]</li>
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
            <!--  -->
          </div>
          <!-- Here we can insert icons to indicate the shipping status -->
        </div>
      </div>
    </div>
  </body>
</div>
</template>

<script>
import BuyerHeader from "@/components/buyerComponents/BuyerHeader.vue";
import InboxService from "@/services/InboxService";
import UserServices from "@/services/UserServices";
export default {
  data() {
    return {
      orderId: "",
      // This array will hold the 'statusUpdates'
      // necessary in order to populate the status timeline.
      // Each statusUpdate will render a bubble as well as a written update
      // in the timeline
      orderStatusInt: 0
    };
  },
  async created() {},
  async mounted() {
    this.orderId = this.$route.params.orderId;
    this.retrieveOrderStatus(this.orderId);
  },
  methods: {
    async retrieveOrderStatus(orderId) {
      try {
        const order = (await UserServices.getOrder(this.orderId)).data;
        console.log(
          `\nI am printing the response for the order status : ${JSON.stringify(
            order
          )}\n`
        ); // TESTING

        this.orderStatusInt = 2;
        // have a nested if statement
        if (order && order.order && order.order.seller_confirmed) {
          this.orderStatusInt = 1;
        }
        if (order && order.order && order.order.buyer_confirmed) {
          this.orderStatusInt = 2;
        }
        if (order.order.active === true) {
          this.orderStatusInt = 3;
        }
      } catch (error) {
        console.log(`\nThe error in retrieveOrderStatus ${error}\n`); // TESTING
        if (error) throw error;
      }
    }
  },
  components: {
    BuyerHeader
  }
};
</script>

<style>
@import "../../assets/css/timeline.css";
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
</style>

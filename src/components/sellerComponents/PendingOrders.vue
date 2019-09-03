<template>
<div class="responsive-component" v-responsive="{
  small: el => el.width < 860
  }">
  <dashboard-header></dashboard-header>
  <body class="pending_orders">
    <div id="pending_orders_content">
      <h1>Pending Orders</h1>

      <!--  This is where the pending orders md cards are gonna live -->
      <div v-if="this.pendingOrders.length > 0">
        <div v-for="(pendingOrder, index) in this.pendingOrders" v-bind:key="index">
          <md-card style="background-color: white;">
            <md-card-header>
              <div class="md-title">Order ID : [ {{pendingOrder.orderId}} ]</div>
            </md-card-header>

            <md-card-content>
              Order Status: PAID
              <br />Order Confirmed: [DATE]
              <br />
              <br />
              <br />
              <div class="card" style="min-width: 30%;">
                <!-- <img src="..." class="card-img-top" alt="..."> -->
                <div class="card-body">
                  <h4 class="card-title">Order items:</h4>

                  <div
                    v-for="(item, index) in pendingOrder.servicesNegotiated"
                    v-bind:key="index"
                  >{{pendingOrder.orderItems[index].amount}} {{item.title}} - price : {{pendingOrder.orderItems[index].amount * item.servicePrice}} $</div>
                </div>
              </div>
            </md-card-content>

            <md-card-actions>
              <md-button
                v-if="pendingOrder.active === false"
                style="background-color: yellowgreen;"
                @click="confirmOrder(index)"
              >Handle Shipping</md-button>
              <md-button
                v-else
                disabled
                style="background-color: grey; color: white;"
              >Shipping confirmed</md-button>
              <md-button @click="goToOrderStatus(index)">Timeline</md-button>
            </md-card-actions>
          </md-card>
          <br />
        </div>
      </div>
      <div v-else>
        <md-empty-state
          md-icon="devices_other"
          md-label="No Pending Orders"
          md-description="You currently have no pending orders"
        >
          <md-button class="md-primary md-raised">Generate more leads</md-button>
        </md-empty-state>
      </div>
      <!--  -->

      <br />

      <modal name="ask-seller-if-seller-needs-to-ship">
        <div>
          <div>
            Does the seller have to ship samples for this ?
            <br />
            <input type="radio" id="one" value="true" v-model="seller_shipping" />
            <!-- This will push an order into the buyer and seller shippo dashboard -->
            <label for="one">Yes</label>
            <br />
            <input type="radio" id="two" value="false" v-model="seller_shipping" />
            <!-- This will only push an order onto the seller's shippo dashboard -->
            <label for="two">No</label>
            <br />
          </div>

          <br />
          <br />

          <div>
            Does the buyer have to ship samples for this ?
            <br />
            <input type="radio" id="one" value="true" v-model="buyer_shipping" />
            <!-- This will push an order into the buyer and seller shippo dashboard -->
            <label for="one">Yes</label>
            <br />
            <input type="radio" id="two" value="false" v-model="buyer_shipping" />
            <!-- This will only push an order onto the seller's shippo dashboard -->
            <label for="two">No</label>
            <br />
          </div>

          <br />
          <br />
          <!-- <button @click="buyerNeedsToShip(false)">No</button> -->
          <button @click="createOrder()">Submit</button>
        </div>
      </modal>
    </div>
  </body>
</div>
</template>

<script src="./scripts/pendingOrders.js">
</script>

<style scoped>
@import "../../assets/css/orders.css";
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
</style>

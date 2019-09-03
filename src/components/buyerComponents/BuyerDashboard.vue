<template>
<div class="responsive-component" v-responsive="{
  small: el => el.width < 860
  }">
  <buyer-header></buyer-header>
  <body class="pending_orders">
    <div id="pending_orders_content">
      <h1>Pending Orders</h1>

      <br />

      <!--  -->

      <!--  -->

      <!-- Post confirmation ORDER STATUS -->

      <!--  -->

      <div v-if="this.pendingOrders && this.pendingOrders.length > 0">
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
              <md-button @click="goToOrderStatus(index)">Timeline</md-button>
              <md-button
                type="submit"
                style="background-color: rgb(205, 188, 227);"
                @click="downloadInvoice(pendingOrder)"
              >Download Invoice</md-button>
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

      <!-- If Order Confirmed -->

      <!-- IF Order UNCONFIRMED -->
      <!-- <h2 class="status-unconfirmed" style="color:red;">Order Unconfirmed</h2>  -->

      <!-- View Order Details, Add expandable Div -->

      <!-- IF UNCONFIRMED -->
      <!-- <button class="btn-danger" id="btn-confirm-order">Confirm Order</button> -->

      <!-- IF CONFIRMED -->
    </div>
  </body>
</div>
</template>

<script src="./scripts/buyerDashboard.js">
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
@import "../../assets/css/timeline.css";
@import "../../assets/css/dashboard.css";
@import url("https://use.fontawesome.com/releases/v5.8.1/css/all.css");
@import "../../assets/css/orders.css";
.page-container {
  min-height: 270px;
  border: 1px solid black;
  background: #ffffff 0%;
}

.md-drawer {
  border-right: 1px solid black;
  background: #ffffff 0%;
  max-width: 30%;
}
</style>




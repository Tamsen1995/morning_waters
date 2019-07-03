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
      <md-app
        class="page-container"
        v-for="(pendingOrder, index) in this.pendingOrders"
        v-bind:key="index"
        style="background-color: white;"
        :md-elevation="5"
      >
        <md-app-toolbar class="md-primary" style="background-color: rgb(157, 83, 252)">
          <span class="md-title">Order ID : {{pendingOrder.orderId}}</span>
        </md-app-toolbar>

        <md-app-drawer md-permanent="clipped" style="background-color: opacity:1.0">
          <md-list>
            <md-list-item>
              <md-button id="btn-timeline" type="submit" @click="goToOrderStatus(index)">Timeline</md-button>
            </md-list-item>

            <md-list-item>
              <md-button id="btn-shippo" type="submit" @click="goToOrderStatus(index)">Shipping</md-button>
            </md-list-item>

            <md-list-item>
              <md-button
                id="btn-shippo"
                type="submit"
                style="background-color: rgb(205, 188, 227);"
                @click="downloadInvoice(pendingOrder)"
              >Download Invoice</md-button>
            </md-list-item>
          </md-list>
        </md-app-drawer>

        <md-app-content class="md-title">
          Order Status: PAID
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />Order Confirmed: [DATE]
        </md-app-content>
      </md-app>
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




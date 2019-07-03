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

      <div v-for="(pendingOrder, index) in this.pendingOrders" v-bind:key="index">
        <!-- Post confirmation ORDER STATUS -->
        <md-app>
          <md-app-toolbar class="md-primary">
            <span>Order ID : {{pendingOrder.orderId}}</span>
          </md-app-toolbar>

          <md-app-drawer md-permanent="clipped">
            <md-list>
              <md-list-item>
                <md-button
                  class="btn-timeline"
                  id="btn-timeline"
                  type="submit"
                  @click="goToOrderStatus(index)"
                >Timeline</md-button>
                <span class="md-list-item-text"></span>
              </md-list-item>

              <md-list-item>
                <md-icon>send</md-icon>

                <md-button
                  class="btn-timeline"
                  id="btn-timeline"
                  type="submit"
                  @click="goToOrderStatus(index)"
                >Timeline</md-button>

                <span class="md-list-item-text">Shipping</span>
              </md-list-item>
            </md-list>
          </md-app-drawer>

          <md-app-content>Order Status:</md-app-content>
        </md-app>
        <!-- If Order Confirmed -->

        <!-- IF Order UNCONFIRMED -->
        <!-- <h2 class="status-unconfirmed" style="color:red;">Order Unconfirmed</h2>  -->

        <!-- View Order Details, Add expandable Div -->

        <br />

        <!-- IF UNCONFIRMED -->
        <!-- <button class="btn-danger" id="btn-confirm-order">Confirm Order</button> -->

        <!-- IF CONFIRMED -->
        <button
          class="btn-timeline"
          id="btn-timeline"
          type="submit"
          @click="goToOrderStatus(index)"
        >View Timeline</button>

        <!-- Handle shipping -->
        <button id="btn-shippo" type="submit">Shipping</button>

        <a class="invoice-link pull-right" @click="downloadInvoice(pendingOrder)">Download Invoice</a>
      </div>
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
</style>




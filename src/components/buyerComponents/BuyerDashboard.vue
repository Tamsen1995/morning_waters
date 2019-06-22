<template>
<div class="responsive-component" v-responsive="{
  small: el => el.width < 860
  }">
  <buyer-header></buyer-header>
  <body class="pending_orders">
    <div id="pending_orders_content">
      <h1>Pending Orders</h1>

      <br>

      <div
        id="pending-order"
        v-for="(pendingOrder, index) in this.pendingOrders"
        v-bind:key="index"
      >
        <div class="row">
          <div class="col-8">
            <!-- Post confirmation ORDER STATUS -->

            <!-- If Order Confirmed -->
            <h3>Order Status:</h3>
            <h2>Seller purchased shipping label</h2>
            <br>

            <!-- IF Order UNCONFIRMED -->
            <!-- <h2 class="status-unconfirmed" style="color:red;">Order Unconfirmed</h2>  -->

            <!-- View Order Details, Add expandable Div -->
            <div id="order_details">
              <h3>Order ID : {{pendingOrder.orderId}}</h3>
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
          <div class="col-4">
            <!-- IF order CONFIRMED -->
            <h3 class="pull-right" style="color:green;">Order Confirmed [Date]</h3>

            <!-- IF Order UNCONFIRMED -->
            <!--Confirm order links to inbox message-->
            <!-- <h3 class="pull-right" style="color:red;">Order Submitted [Date] </h3> -->
          </div>
        </div>
        <br>

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

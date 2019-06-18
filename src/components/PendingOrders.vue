<template>

  <div class="responsive-component" v-responsive= "{
  small: el => el.width < 860
  }">
  <dashboard-header></dashboard-header>
  <body class="pending_orders">

    <div id="pending_orders_content">

      <h1>Pending Orders</h1>


      <!-- This shall be converted to an actual order array. -->
      <!-- <div
        id="pending-order"
        v-for="(order, index) in orders"
        v-bind:key="index"
        @click="confirmOrder(index)"
      >
        <br>
        <h3>ORDER ID :</h3>
        {{order.orderId}}
        <br>
        <br>
        <div v-for="(orderItem, index) in orderItems" v-bind:key="index">
          <div v-if="orderItem.orderId === order.orderId">
            <h5>Order Item:</h5>
            {{orderItem.title}}
            <br>
            <h5>Description:</h5>
            {{orderItem.description}}
          </div>
        </div>
        <br>
        <br>
      </div>-->

      <div id="pending-order" v-for="(pendingOrder, index) in this.pendingOrders" v-bind:key="index">
        
        <br>
        <h3 class="pull-right" style="color:purple;">Order Submitted [Date] </h3>
        <!-- Confirmation Status -->
        <!-- Add checkbox for confirmed, or span? -->
        <h5 style="color:green;"> Order Confirmed [Date]</h5>
        <!-- <h5 style="color:red;">Order Unconfirmed</h5> -->
         <!--Confirm order links to inbox message-->
        <!-- <button id="confirm_order">Confirm Order</button> -->
        <br>

        <!-- View Order Details, Add expandable Div -->
        <div id="order_details">
          <h2>ORDER ID : {{pendingOrder.orderId}}</h2>
          <h3 >Order Details</h3>         
          
          <ol id="item_list">
            <li> <!-- {{orderItem.title}}
                <br>
                {{orderItem.description}} 
                <br>
                {{orderItem.quantity}}-->
            </li>
          </ol>
          <button type="submit" @click="goToOrderStatus(index)">View Order Timeline</button>
          <br>
        </div>
        <br>
        <!-- View Invoice -->
        
        <button type="submit" @click="confirmOrder(index)">Handle Shipping</button>
        <a class="pull-right">View Invoice</a>
      </div>

      

      <modal name="ask-seller-if-seller-needs-to-ship">
        <div>
          <div>
            Does the seller have to ship samples for this ?
            <br>
            <input type="radio" id="one" value="true" v-model="seller_shipping">
            <!-- This will push an order into the buyer and seller shippo dashboard -->
            <label for="one">Yes</label>
            <br>
            <input type="radio" id="two" value="false" v-model="seller_shipping">
            <!-- This will only push an order onto the seller's shippo dashboard -->
            <label for="two">No</label>
            <br>
          </div>

          <br>
          <br>

          <div>
            Does the buyer have to ship samples for this ?
            <br>
            <input type="radio" id="one" value="true" v-model="buyer_shipping">
            <!-- This will push an order into the buyer and seller shippo dashboard -->
            <label for="one">Yes</label>
            <br>
            <input type="radio" id="two" value="false" v-model="buyer_shipping">
            <!-- This will only push an order onto the seller's shippo dashboard -->
            <label for="two">No</label>
            <br>
          </div>

          <br>
          <br>
          <!-- <button @click="buyerNeedsToShip(false)">No</button> -->
          <button @click="createOrderOnShippo()">Submit</button>
        </div>
      </modal>

      </div>
    </body>
  </div>

</template>

<script src="./scripts/pendingOrders.js">
</script>

<style scoped>
@import "../assets/css/orders.css";
@import url('https://fonts.googleapis.com/css?family=Lato|Roboto');
</style>

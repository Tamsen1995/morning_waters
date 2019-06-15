<template>
  <div class="container">
    <dashboard-header></dashboard-header>

    <h1>Pending orders page</h1>


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

    <div
      id="pending-order"
      v-for="(pendingOrder, index) in this.pendingOrders"
      v-bind:key="index"
      @click="confirmOrder(index)"
    >
      <br>
      <h3>ORDER ID :</h3>
      {{pendingOrder.orderId}}
      <br>
      <br>
    </div>

    <!--  -->
    <br>
    <br>

    <!-- <button @click="sellerNeedsToShip(true)">Yes</button>
      <button @click="sellerNeedsToShip(false)">No</button>


      <div>Does the buyer need to ship something ?</div>
      <button @click="buyerNeedsToShip(true)">Yes</button>
    <button @click="buyerNeedsToShip(false)">No</button>-->

    <!-- <input type="radio" id="one" value="One" v-model="picked">
      <label for="one">One</label>
      <br>
      <input type="radio" id="two" value="Two" v-model="picked">
      <label for="two">Two</label>
      <br>
    <span>Picked: {{ picked }}</span>-->

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
</template>

<script src="./scripts/pendingOrders.js">
</script>

<style>
#pending-order {
  border: solid black 2px;
}

#ask-seller-if-seller-needs-to-ship {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>

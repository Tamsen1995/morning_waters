<template>
<div id="app">
  <buyer-header/>
  <div
    class="responsive-component"
    v-responsive="{
    small: el => el.width < 860 }"
    id="orders-home"
  >
    <body class="orders">
      <div class="container" id="orders">
        <div class="row">
          <div class="card" id="order-process-timeline">
            Buyer Ordered

            Seller Confirmed
            Seller Shipping selected 
            Seller Shipped
              Out for delivery
              Arriving today
            Buyer received 

            Buyer Shipping Selected
            Buyer Shipped
              Out for delivery
              Arriving today
            Seller Received

            Order Complete
          </div>
          <div class="card" id="orders-main">
            <!-- Order Status -->
            <h4>Order Status:</h4>
            <!-- Link to Inbox, most recent message -->
            <h5>In Corrospondance</h5>
              <ul>  
                <li>[Seller Name] sent message on [timestamp]</li><!-- Timestamp of most recent message recieved -->
              </ul>
            <h5> Awaiting Seller Confirmation</h5>
            <h2>[Company Name] should get back to you within 3 business days.</h2>

            <h5> Seller Confirmed [timestamp]</h5>
            <!-- If Seller Confirmed -->
            <h5>
              <ul>
                <li>Billing date [timestamp]</li>
                <li>Amount Billed:</li>
              </ul>

            </h5>
            <h5> [link] view order </h5>
            <br>
          </div>
          <br>

          <!-- Shipping status-->
          <!-- insert shipping timeline -->
          <div class="card" id="shipping-main">
            <h4>Shipping Status:</h4>
            <h5> Seller has s[TimeStamp]</h5>
            <h5> View Seller Shipping Selection</h5> <!-- Shipping invoice download -->
            <br>

            <h5>Need to ship samples?</h5>
              <div class="card">
                Shipping UI
              </div>
          </div>
          <br>
        </div>

        <div class="row">
          <!-- Order History -->
          <div class="card" id="order-history">
            <h4>Order History</h4>

            <h5> <span class="green">Order complete</span> <span class="red">Order incomplete</span></h5>
            <h5>Payment Date [timestamp]</h5>
            <h5>Shippment info [timestamp]</h5>
            <br>
            <h4>Shipping info (link?)</h4>
            <div>order history download (pdf/csv)</div>
          </div>
        </div>
      </div>
    </body>
  </div>
</div>
</template>

<script>
import BuyerHeader from "@/components/buyerComponents/BuyerHeader.vue";
import { ResponsiveDirective } from 'vue-responsive-components';

export default {
  components: {
    BuyerHeader
  },
    directives: {
    responsive: ResponsiveDirective
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
@import "../../assets/css/orders.css";
</style>

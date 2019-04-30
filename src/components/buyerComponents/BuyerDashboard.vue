<template>
  <div id="app">
    <buyer-header/>
    <div class="responsive-component" v-responsive= "{
    small: el => el.width < 430 }" id="orders-home">		
      <body class="orders">
        <div class="container" id="orders">
          <div class="row">
            <div class="col-8" >
              <div class="card" id="orders-main">
                <!-- Order Status -->
                <h4>Order Status [TimeStamp] </h4>
                <h5>In Corrospondance (link to inbox), Awaiting Seller Confirmation, Seller Confirmed [timestamp]</h5>
                
                <h4>If Seller confirmed:</h4>
                <h5>
                  <ul>
                    <li>Billing date [timestamp]</li>
                    <li>Amount Billed: </li>
                    <li>Shipping status</li>

                  </ul>
                </h5>
              <br>

                <!-- Cart -->
                <div>Shopping Cart component</div>
                <div>invoice download (pdf/csv)</div>
              </div>
              <br>

              <!-- Shipping -->
              <div id="shipping-main">
                <h4>Shipping Status</h4>
                <h5>Awaiting Seller Confirmation, Seller Confirmed [timestamp]</h5>
                <br>

                <h4>Shipping UI</h4>
                <h5>Need to ship samples? </h5>
              </div>
              <br>
              <!-- Order History -->
              <div id="order-history">
                <h4>Order History</h4>
                <h5>Payment Date [timestamp]</h5>
                <h5>Shippment sent by [Company Name or Buyer Name] [timestamp]</h5>
                <br>
                <h4>Shipping info (link?)</h4>
                <div>order history download (pdf/csv)</div>
              </div>

            </div>
          </div>


        </div>
      </body>
    </div>
  </div>
</template>

<script>
import BuyerHeader from "@/components/buyerComponents/BuyerHeader.vue";

export default {
  components: {
    BuyerHeader
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lato|Roboto');
@import '../../assets/css/settings.css';
</style>

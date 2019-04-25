<template>
<div id="app">
  <buyer-header></buyer-header>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>

  <h1>Buyer Checkout</h1>

  <body>
    <div class="grid-container">
      <div class="grid-item">
        <div v-if="this.customerDefaultSource !== null" class="default-source">
          <div class="change-preference">
            <router-link class="nav-link" to="/dashboard/changeDefaultSource">Change Preference</router-link>
          </div>
          <br>
          <div class="default-payment-card">
            Default Payment Method:
            <pre>{{ this.customerDefaultSource.brand }} ending in	{{ this.customerDefaultSource.last4 }} </pre>
            <pre> expires : {{ this.customerDefaultSource.exp_month }} / {{ this.customerDefaultSource.exp_year }}</pre>
          </div>
        </div>

        <div v-else>No default payment method</div>

        <br>
        <br>
        <!-- make input for card -->
      </div>
    </div>

    <div id="stripeCard">
      <div ref="card"></div>
    </div>

    <input
      v-if="this.shoppingCart.length > 0 && this.quoteRequestsCart.length"
      type="submit"
      value="Send Order"
      class="checkout-btn"
      @click="sendOrderAndOrInquiries()"
    >

    <input
      v-if="this.shoppingCart.length > 0 && this.quoteRequestsCart.length === 0"
      type="submit"
      value="Purchase shopping cart"
      class="checkout-btn"
      @click="sendShoppingCart()"
    >

    <input
      v-if="this.quoteRequestsCart.length > 0 && this.shoppingCart.length === 0"
      type="submit"
      value="Send Inquires"
      class="checkout-btn"
      @click="sendQuoteRequests()"
    >

    <br>
    <br>
    <br>
    <br>
    <shopping-cart v-if="this.shoppingCart.length > 0"></shopping-cart>

    <br>
    <request-quote-cart v-if="this.quoteRequestsCart.length > 0"></request-quote-cart>
  </body>

  <br>
  <br>

  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <div></div>
</div>
</template>

<script src="./scripts/buyerCheckout.js">
</script>

<style scoped>
#stripeCard {
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  width: 30%;
}
.change-preference {
  position: absolute;
  left: 210px;
  font-size: 80%;
}
.default-payment-card {
  width: 300px;
  border: 2px solid purple;
  padding: 20px;
  margin-left: 10px;
}

.add-payment-button {
  position: relative;
  margin: 25px;
  bottom: 0;
  right: 0;
}

.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  background-color: #2196f3;
  padding: 10px;
}
.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 2px;
  font-size: 15px;
  text-align: center;
}
</style>

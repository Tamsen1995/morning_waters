<template>
<div id="app">
  <buyer-header></buyer-header>
  <div class="responsive-component" v-responsive="{
      small: el => el.width < 860
      }">
    <body class="buyer-checkout">
      <div
        class="container"
        style="max-width:800px; display: block;
          margin-left: auto;
          margin-right: auto;"
      >
        <h5 style="text-align:center;">Request Checkout</h5>
        <br />

        <md-card md-with-hover style="background-color: white;">
          <div>
            <md-card-content>
              <div v-if="this.customerDefaultSource !== null" class="default-source">
                <div class="change-preference">
                  <router-link
                    class="nav-link"
                    to="/dashboard/changeDefaultSource"
                  >Change Preference</router-link>
                </div>
                <br />
                <div class="default-payment-card">
                  Default Payment Method:
                  <pre>{{ this.customerDefaultSource.brand }} ending in	{{ this.customerDefaultSource.last4 }} </pre>
                  <pre> expires : {{ this.customerDefaultSource.exp_month }} / {{ this.customerDefaultSource.exp_year }}</pre>
                </div>
              </div>

              <div v-else>No default payment method</div>

              <br />
              <br />
              <br />
              <!-- make input for card -->
            </md-card-content>
            <div id="stripeCard">
              <div ref="card" style="border-bottom: 1px inset black"></div>
            </div>
            <br />
            <br />
          </div>
        </md-card>
        <br />
        <br />
        <h2
          style="text-align:center;color:purple;"
        >You will not be charged until the seller confirms your order.</h2>

        <h3>
          <md-button
            class="checkout-btn md-raised md-accent"
            style="background-color: white; color: #311c63;"
            v-if="this.shoppingCart.length > 0 && this.quoteRequestsCart.length"
            type="submit"
            @click="sendOrderAndOrInquiries()"
          >Send Order</md-button>
        </h3>
        <br />

        <md-button
          class="checkout-btn md-raised md-accent"
          style="background-color: white; color: #311c63;"
          v-if="this.shoppingCart.length === 0 && this.quoteRequestsCart.length > 0"
          @click="sendQuoteRequests()"
        >Send Inquires</md-button>

        <div class="container" id="purchase_content">
          <shopping-cart v-if="this.shoppingCart.length > 0"></shopping-cart>

          <br />
          <request-quote-cart v-if="this.quoteRequestsCart.length > 0"></request-quote-cart>
        </div>

        <button
          v-if="this.shoppingCart.length > 0 && this.quoteRequestsCart.length === 0"
          type="submit"
          class="btn-cart btn-default btn-block"
          @click="sendShoppingCart()"
        >
          <h3>Complete Purchase</h3>
        </button>

        <br />
        <br />
      </div>
    </body>
  </div>
</div>
</template>

<script src="./scripts/buyerCheckout.js">
</script>

<style scoped>
@import "../../assets/css/settings.css";
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");

#stripeCard {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  width: 50%;
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

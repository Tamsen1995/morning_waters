<template>
<div id="app">
  <body>
    <md-card md-with-hover>
      <md-card-content>
        <div v-if="this.customerDefaultSource !== null" class="default-source">
          <div class="change-preference">
            <router-link class="nav-link" to="/dashboard/changeDefaultSource">Change Preference</router-link>
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
        <!-- make input for card -->
        <div id="stripeCard">
          <div ref="card"></div>
        </div>
        <!-- <input type="submit" value="Purchase" class="checkout-btn" @click="submitPaymentMethod"> -->

        <br />
        <br />
        <button type="button" class="add-payment-button" @click="addPaymentMethod">
          <span class="glyphicon glyphicon-plus-sign">
            <strong>Add Card</strong>
          </span>
        </button>
      </md-card-content>
    </md-card>
  </body>

  <br />
  <br />

  <div
    id="subscriptions-billing-tab"
    v-for="subscription in this.subscriptions"
    v-bind:key="subscription"
  >
    Date of purchase : {{ new Date(subscription.created * 1000) }}
    <br />
    <br />
    Last billing date : {{ new Date(subscription.current_period_start * 1000) }}
    <br />
    <br />
    Next billing date : {{ new Date(subscription.current_period_end * 1000) }}
    <br />
    <br />
    Subscription plan : {{ subscription.items.data[0].plan.nickname }}
    <br />
    <br />
  </div>
</div>
</template>

<script src="./scripts/settingsPageBillingTab.js">
</script>

<style scoped>
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

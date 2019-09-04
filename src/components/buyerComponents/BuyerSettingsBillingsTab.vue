<template>
<div id="app">
  <body>
    <md-card>
      <md-card-header>
        <div class="md-title">Billing</div>
        <div class="md-subhead"></div>
      </md-card-header>

      <md-card-content>
        <div v-if="this.customerDefaultSource !== null" class="default-payment-card">
          Default Payment Method:
          <pre>{{ this.customerDefaultSource.brand }} ending in	{{ this.customerDefaultSource.last4 }} </pre>
          <pre> expires : {{ this.customerDefaultSource.exp_month }} / {{ this.customerDefaultSource.exp_year }}</pre>
        </div>
        <br />
        <br />
        <div id="stripeCard">
          <div ref="card"></div>
        </div>
      </md-card-content>

      <md-card-actions>
        <slot v-bind:card="card" v-bind:stripe="stripe">
          <md-button @click="addPaymentMethod()">Add Card</md-button>
        </slot>
        <md-button>Change Preference</md-button>
      </md-card-actions>
    </md-card>
  </body>

  <br />
  <br />
</div>
</template>

<script src="./scripts/buyerSettingsBillingsTab.js">
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

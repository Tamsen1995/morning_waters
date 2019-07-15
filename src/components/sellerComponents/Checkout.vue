<template>
<div id="app">
  <dashboard-header></dashboard-header>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>

  <h1>Checkout</h1>

  <body></body>

  <div id="stripeCard">
    <div ref="card"></div>
  </div>

  <input type="submit" value="Purchase" class="checkout-btn" @click="submitPaymentMethod">
</div>
</template>

<script src="./scripts/checkout.js">
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

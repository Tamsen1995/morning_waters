<template>
<body class="shopping-cart">
  <!-- Service/Price Listings -->
  <div class="container" id="price-chart">
    <p></p>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Item</th>
          <th scope="col">Turn Around Time</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
          <th scope="col">Total</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in this.shoppingCart" v-bind:key="index">
          <th scope="row">{{ item.service.title}}</th>
          <!-- Subservice title -->
          <!-- Turn Around Time & Hours/Days/Weeks-->
          <td>{{ item.service.turnAroundTime }}</td>
          <!-- Add Quantity & Units-->
          <td>{{item.quantity}}</td>
          <!-- Price -->
          <td>${{ item.service.servicePrice }}</td>

          <!-- Total -->
          <td>${{ item.quantity * item.service.servicePrice }}</td>

          <!-- Add delete functionality -->
          <td @click="deleteItemFromShoppingCart(index)">
            <a>X</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
</template>

<script src="./scripts/shoppingCart.js">
</script>

<style>
@import "../../assets/css/header.css";
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
</style>

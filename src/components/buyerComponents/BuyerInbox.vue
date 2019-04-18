<template>
<div id="app">
  <buyer-header></buyer-header>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <body>
    <h1>The Buyer's Inbox</h1>

    <br>
    <br>

    <!-- The entire list of order items -->
    <!-- <div id="orders-list">
      <li
        v-for="(orderItem, index) in buyerOrderItems"
        @click="goToOrderStatus(index)"
        v-bind:key="buyerOrderItems.id"
      >
        <br>
        Order Item : {{ orderItem.title }}
        <br>
        Description : {{ orderItem.description }}
        <br>
        <div v-if="orderItem === true">Order Status : Confirmed</div>
        <div v-else>Order Status : Not Confirmed</div>
      </li>
    </div>-->

    <div id="orders-list">
      <li v-for="(order, index) in orders" @click="goToCorrespondance(index)" v-bind:key="index">
        <br>
        <br>
        {{order}}
        <br>
        <br>
      </li>
    </div>

    <div></div>
  </body>
</div>
</template>

<script src="./scripts/buyerInbox.js">
</script>

<style>
</style>

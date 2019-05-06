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
    <!-- this is for the actually purchased orders -->

    <div id="orders-list">
      <li v-for="(order, index) in orders" @click="goToCorrespondance(index)" v-bind:key="index">
        <br>

        <div v-for="(item, index) in order" v-bind:key="index">
          <div v-if="item.subject">
            <br>
            {{item.message}}
          </div>
          <div v-else>
            Title: {{item.title}}
            <br>
            Description: {{item.description}}
          </div>
        </div>

        <br>
      </li>
    </div>
    <!--  -->

    <!-- This is for the quote requests made by the buyer -->
    <div id="quote-orders-list">
      <li
        v-for="(quoteOrder, index) in quoteOrders"
        @click="goToQuoteCorrespondance(index)"
        v-bind:key="
        index"
      >
        <div v-for="(item, index) in quoteOrder" v-bind:key="index">
          <br>
          {{item}}
          <br>
        </div>
      </li>
    </div>
    <!--  -->
    <div></div>
  </body>
</div>
</template>

<script src="./scripts/buyerInbox.js">
</script>

<style>
</style>

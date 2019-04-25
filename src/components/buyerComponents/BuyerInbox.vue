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

    <div id="orders-list">
      <li v-for="(order, index) in orders" @click="goToCorrespondance(index)" v-bind:key="index">
        <br>
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

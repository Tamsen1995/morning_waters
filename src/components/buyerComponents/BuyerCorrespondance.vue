<template>
<div>
  <buyer-header></buyer-header>
  <body>
    <br>
    <br>
    <br>

    <h1>The correspondance.</h1>

    <br>
    <br>

    <!-- <textarea v-model="message" placeholder="add multiple lines"></textarea> -->
    <div v-for="(item, index) in this.order" v-bind:key="index">
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
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>

    <!-- <li v-for="item in this.shoppingCart" v-bind:key="item">
     
        Item : {{ item.service.title}}
        <br>
        Description : {{ item.service.description }}
        <br>
        Quantity : {{ item.quantity }}
        <br>
        <br>
    </li>-->

    <div id="correspondance">
      <li v-for="(message, index) in this.correspondance" v-bind:key="index">
        <br>
        Message : {{ message.message }}
        <br>
      </li>
    </div>

    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <textarea
      v-model="messageTextBox"
      v-on:keyup.enter="submitMessage()"
      placeholder="Write your message here."
    ></textarea>
    <br>
    ss
    <button v-on:click="submitMessage()">Submit</button>
    <button v-on:click="downloadInvoice()">Download Invoice</button>
  </body>
</div>
</template>

<script src="./scripts/buyerCorrespondance.js">
</script>

<style>
</style>

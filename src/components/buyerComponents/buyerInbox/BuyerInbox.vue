<template>
<div id="app">
  <buyer-header />
  <body class="inbox" id="inbox">
    <div
      class="responsive-component"
      v-responsive="{
        small: el => el.width < 860
        }"
    >
      <div class="container-fluid">
        <div class="row" id="header">
          <div class="col-lg-4">
            <h2>Inbox</h2>
          </div>
        </div>

        <div class="row message-wrapper rounded shadow mb-20">
          <div class="col-lg-3 message-sideleft">
            <!-- <md-card> -->
            <div class="panel-heading">
              <!-- Filter Orders/Quote Requests -->
              <div class="pull-left"></div>

              <div class="clearfix"></div>
            </div>

            <!-- The panels for the orders -->

            <div class="list-group no-margin list-message">
              <md-card
                class="list-group-item request"
                v-for="(order, index) in this.orders"
                v-bind:key="index"
                md-with-hover
                id="unresponded"
              >
                <md-ripple>
                  <div @click="showOrder(order), retrieveOrderOrderItems(order)">
                    <h4 class="list-group-item-heading">
                      <md-avatar class="md-avatar-icon md-primary"></md-avatar>

                      <div v-if="order.locked === true">Buyer ID : {{ order.buyerId }}</div>
                      <div v-else>Buyer ID : {{ order.buyerName }}</div>

                      <small class="pull-right">{{ order.createdAt }}</small>
                      <br />
                      <br />
                      <br />
                    </h4>
                    <p class="list-group-item-text">Order# {{ order.orderId }}:</p>
                    <p>Estimated Revenue:[$$$]</p>
                    <span class="label label-success pull-right">Request</span>
                    <div class="clearfix"></div>
                  </div>
                </md-ripple>
              </md-card>
            </div>

            <!-- The panels for the orders -->
            <!-- The panels for the pending orders -->
            <!-- Unresponded -->
            <div class="list-group no-margin list-message">
              <md-card
                class="list-group-item pending-order"
                v-for="(order, index) in this.pendingOrders"
                v-bind:key="index"
                md-with-hover
                id="unresponded"
              >
                <md-ripple>
                  <div @click="showOrder(order), retrieveOrderOrderItems (order)">
                    <h4 class="list-group-item-heading">
                      <div v-if="order.locked === true">Buyer ID : {{ order.buyerId }}</div>
                      <div v-else>Buyer ID : {{ order.buyerName }}</div>
                      <br />
                      <br />
                      <!-- Charged: {{order.totalPrice}} $ -->
                      <br />
                      <br />
                      <small>Date created : {{ order.createdAt }}</small>
                      <br />
                    </h4>

                    <p class="list-group-item-text">Order# {{ order.orderId }}:</p>

                    <span class="label pull-right" style="background-color:#64489b">Pending Order</span>
                    <div class="clearfix"></div>
                  </div>
                </md-ripple>
              </md-card>
            </div>

            <!-- The panels for the quote requests -->
          </div>

          <!--  -->
          <!--  -->
          <!-- Insert messaging panel here -->
          <messaging-panel
            v-bind:order="this.order"
            v-bind:correspondanceMsgs="this.correspondanceMessages"
            v-bind:buyer="this.buyer"
            v-bind:seller="this.seller"
          ></messaging-panel>
          <!--  -->
          <!--  -->

          <br />
          <!-- Negotation Interface -->
          <!--  -->
          <!--  -->
          <!-- Insert component here -->
          <!--  -->
          <!--  -->
          <!--  -->
        </div>
      </div>
    </div>
  </body>
  <!--  -->

  <modal
    height="auto"
    scrollable="true"
    name="would-you-like-to-submit"
    v-if="this.servicesNegotiated.length > 0"
  >
    <div class="invoice-preview">
      <h1>Order</h1>

      <div v-for="(orderItem, index) in this.orderItems" v-bind:key="index">
        <br />
        {{orderItem.amount}} *
        {{ servicesNegotiated[index].title }}
        $ {{ servicesNegotiated[index].servicePrice * orderItem.amount }}
      </div>

      <hr />
      Total Price: $ {{this.totalPrice}}
      <br />
      <br />
      <div>Would you like to submit this order?</div>
      <md-button @click="submitOrder">Yes</md-button>
      <md-button @click="closeSubmitPrompt">No</md-button>
    </div>
  </modal>
  <!--  -->
</div>
</template>

<script src="../scripts/buyerInbox.js">
</script>

<style scoped>
@import "../../../assets/css/inbox.css";
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
</style>

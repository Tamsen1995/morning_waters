<template>
<div id="app">
  <dashboard-header />
  <body class="inbox" id="inbox">
    <div
      class="responsive-component"
      v-responsive="{
        small: el => el.width < 430
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
            <md-card>
              <div class="panel-heading">
                <!-- Filter Orders/Quote Requests -->
                <div class="pull-left">
                  <div class="btn-group">
                    <button type="button" class="btn btn-success">{{ dropdownVariable }}</button>
                    <button
                      type="button"
                      class="btn btn-success dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      <span class="sr-only">Toggle Dropdown</span>
                    </button>

                    <ul class="dropdown-menu pull-right" role="menu">
                      <li>
                        <a @click="switchMessagesDisplayed('all')">
                          <i class="fa fa-download"></i> All
                        </a>
                      </li>
                      <li>
                        <a @click="switchMessagesDisplayed('orders')">
                          <i class="fa fa-upload"></i> Orders
                        </a>
                      </li>
                      <li>
                        <a @click="switchMessagesDisplayed('quoteRequests')">
                          <i class="fa fa-trash-o"></i> Quote Requests
                        </a>
                      </li>
                      <li class="divider"></li>
                      <li>
                        <a>
                          <i class="fa fa-briefcase"></i> Other
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="clearfix"></div>
              </div>

              <!-- The panels for the orders -->
              <div class="panel-body no-padding">
                <div class="list-group no-margin list-message">
                  <md-card
                    class="list-group-item"
                    v-for="(order, index) in this.orders"
                    v-bind:key="index"
                  >
                    <div @click="showOrder(order), retrieveOrderOrderItems(order)">
                      <h4 class="list-group-item-heading">
                        <md-avatar class="md-avatar-icon md-primary">
                          <md-icon>folder</md-icon>
                        </md-avatar>
                        Buyer ID : {{ order.buyerId }}
                        <br />
                        <br />
                        <small>Date created : {{ order.createdAt }}</small>
                        <br />
                      </h4>
                      <p class="list-group-item-text">Order# {{ order.orderId }}:</p>
                      <span class="label label-success pull-right">Request</span>
                      <div class="clearfix"></div>
                    </div>
                  </md-card>
                </div>
              </div>
              <!-- The panels for the orders -->
              <!-- The panels for the pending orders -->
              <div class="panel-body no-padding">
                <div class="list-group no-margin list-message">
                  <md-card
                    class="list-group-item"
                    v-for="(order, index) in this.pendingOrders"
                    v-bind:key="index"
                  >
                    <div @click="showOrder(order)">
                      <h4 class="list-group-item-heading">
                        Buyer ID : {{ order.buyerId }}
                        <br />
                        <br />
                        <!-- Charged: {{order.totalPrice}} $ -->
                        <br />
                        <br />
                        <small>Date created : {{ order.createdAt }}</small>
                        <br />
                      </h4>

                      <p class="list-group-item-text">Order# {{ order.orderId }}:</p>
                      <span class="label label-success pull-right">Pending Order</span>
                      <div class="clearfix"></div>
                    </div>
                  </md-card>
                </div>
              </div>
            </md-card>
            <!-- The panels for the quote requests -->
          </div>
          <div
            class="col-md-6 message-sideright"
            style="border-right: 1px groove white; border-left: 1px groove white"
          >
            <!-- <v
 
              >
  
            </div>-->

            <div
              class="panel-body"
              v-for="(msg, index) in correspondanceMessages"
              v-bind:key="index"
            >
              <!-- if -->
              <md-card
                v-if="msg && msg.sender && msg.sender === 'buyer'"
                style="width: 75%;"
                class="pull-left"
              >
                <md-content>
                  <h4 class="media-heading pull-right">Date</h4>
                  <md-icon>account_circle</md-icon>
                  {{msg.sender}}
                  <!-- <h4 class="media-heading">{{msg.sender}} :</h4> -->
                  <div class="view_msg">
                    <p class="lead">{{msg.message}}</p>
                  </div>
                </md-content>
              </md-card>
              <!--  -->
              <!-- else -->
              <md-card v-else style="width: 75%;" class="pull-right">
                <md-content>
                  <h4 class="media-heading pull-right">Date</h4>
                  <md-icon>account_circle</md-icon>
                  {{msg.sender}}
                  <!-- <h4 class="media-heading">{{msg.sender}} :</h4> -->
                  <div class="view_msg">
                    <p class="lead">{{msg.message}}</p>
                  </div>
                </md-content>
              </md-card>
              <!--  -->
            </div>

            <hr />
            <!-- /.panel-heading -->
            <div class="panel-body">
              <div class="reply_msg">
                <md-field>
                  <md-field>
                    <!-- <label>Enter your message here</label> -->
                    <md-textarea
                      v-model="message"
                      md-autogrow
                      md-counter="200"
                      v-on:keyup.enter="submitMessage()"
                      placeholder="Enter your message here ..."
                      style="background-color: #FFFFFF;"
                    ></md-textarea>
                  </md-field>
                </md-field>
                <md-button
                  class="md-raised md-primary pull-right"
                  v-on:click="submitMessage()"
                >Submit Message</md-button>
              </div>
            </div>
            <!-- /.panel-body -->
          </div>
          <br />
          <div class="col-md-3 message-sideright">
            <md-card>
              <!-- Negotation Interface -->
              <div
                class="panel-body"
                v-if="this.order !== undefined && this.order.totalPrice === undefined"
              >
                <div v-for="(item, index) in this.servicesNegotiated" v-bind:key="index">
                  <br />

                  <div>
                    <md-field>
                      <input
                        style="background-color: white; width: 10%;"
                        v-model="amtForServicesNegotiated[index]"
                        @change="updateOrderItems(index)"
                        placeholder="amount"
                        type="text"
                      />
                      X
                      {{ item.title }}
                      <p
                        style="color:red;font-size:15px;"
                      >{{ item.servicePrice * amtForServicesNegotiated[index] }} $</p>
                    </md-field>
                  </div>
                </div>
                <hr />
                Total price: {{ this.totalPrice }} $
                <br />
                <br />
                <!-- Negotiation Interface -->
                <md-button
                  @click="submitOrder()"
                  v-if="this.order && this.order.seller_confirmed === false"
                  style="background-color: #12005e; color: white;"
                >Submit Order</md-button>
              </div>
            </md-card>
          </div>
          <!-- /.message-sideright -->
        </div>
      </div>
    </div>
  </body>
</div>
</template>

<script src="./scripts/quoteRequestsScreen.js">
</script>

<style scoped>
@import "../assets/css/inbox.css";
/* @import url("https://fonts.googleapis.com/css?family=Lato|Roboto"); */
</style>

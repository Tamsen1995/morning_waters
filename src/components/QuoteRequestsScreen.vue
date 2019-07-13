<template>
<div id="app">
  <dashboard-header />
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
              <div class="pull-left">
                <div class="btn-group">
                  <button type="button" class="btn btn-success">

                    <h5 style="color:white;">{{ dropdownVariable }}</h5>

                  </button>
                  <button
                    type="button"
                    class="btn btn-success dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <span class="sr-only">Toggle Dropdown</span>
                  </button>

                  <ul class="dropdown-menu pull-right" role="menu">
                    <li>
                      <a @click="switchMessagesDisplayed('orders')">
                        <h5>
                          <i class="fas fa-seedling"></i> Orders
                        </h5>
                      </a>
                    </li>
                    <li>
                      <a @click="switchMessagesDisplayed('quoteRequests')">
                        <h5>
                          <i class="far fa-envelope"></i> Quote Requests
                        </h5>
                      </a>
                    </li>
                    <li class="divider"></li>
                    <!-- <li>
                        <a>
                          <i class="fa fa-briefcase"></i> Other
                        </a>
                    </li>-->
                    <li>
                      <a @click="switchMessagesDisplayed('all')">
                        <h5>
                          <i class="fas fa-inbox"></i> All
                        </h5>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="clearfix"></div>
            </div>

            <!-- The panels for the orders -->

            <!-- Unresponded -->

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
                      <md-avatar class="md-avatar-icon md-primary">
                        <!-- <md-icon>folder</md-icon> -->
                        <i class="fas fa-lock"></i>
                      </md-avatar>
                      Buyer ID : {{ order.buyerId }}
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
            <!-- Responded -->
            <div class="list-group no-margin list-message">
              <md-card
                class="list-group-item request"
                v-for="(order, index) in this.orders"
                v-bind:key="index"
                md-with-hover
                id="responded"

              >
                <md-ripple>
                  <div @click="showOrder(order), retrieveOrderOrderItems(order)">
                    <h4 class="list-group-item-heading">
                      <md-avatar class="md-avatar-icon md-primary">
                        <!-- <md-icon>folder</md-icon> -->
                        <i class="fas fa-lock"></i>
                      </md-avatar>
                      Buyer ID : {{ order.buyerId }}
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
                    <p>Estimated Revenue:[$$$]</p>
                    <span class="label pull-right" style="background-color:#a255ff">Pending Order</span>
                    <div class="clearfix"></div>
                  </div>
                </md-ripple>
              </md-card>
            </div>
            <!-- Responded -->

            <div class="list-group no-margin list-message">
              <md-card
                class="list-group-item pending-order"
                v-for="(order, index) in this.pendingOrders"
                v-bind:key="index"
                md-with-hover

                id="responded"

              >
                <md-ripple>
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
                    <p>Estimated Revenue:[$$$]</p>
                    <span class="label pull-right" style="background-color:#a255ff">Pending Order</span>
                    <div class="clearfix"></div>
                  </div>
                </md-ripple>
              </md-card>
            </div>

            <!-- The panels for the quote requests -->
          </div>
          <div
            class="col-md-6 message-sideright"
            style="background-color: white; border-right: 1px groove white; border-left: 1px groove white"
          >
            <div class="message-header-a">
              <h3>{{buyer.name}}</h3>
              <div class="message-header-b">
                <h4>[Company Name]</h4>
              </div>
            </div>

            <div
              class="panel-body"
              v-for="(msg, index) in correspondanceMessages"
              v-bind:key="index"
            >
              <!-- if -->
              <md-card
                v-if="msg && msg.sender && msg.sender === 'buyer'"
                id="recieve-text-bubble"
                class="pull-left"
              >
                <md-content>
                  <h4 class="media-heading pull-right">Date</h4>
                  <md-icon>account_circle</md-icon>
                  {{buyer.name}}
                  <!-- <h4 class="media-heading">{{msg.sender}} :</h4> -->
                  <div class="view_msg">
                    <p class="lead">{{msg.message}}</p>
                  </div>
                </md-content>
              </md-card>
              <!--  -->
              <!-- else -->
              <md-card v-else class="pull-right" id="response-text-bubble">
                <md-content>
                  <h4 class="media-heading pull-right">Date</h4>
                  <md-icon>account_circle</md-icon>
                  {{seller.companyName}}
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
              <md-card class="reply_msg">
                <md-field>
                  <md-textarea
                    v-model="message"
                    md-autogrow
                    md-counter="500"
                    v-on:keyup.enter="submitMessage()"
                    placeholder="Enter your message here ..."
                    style="background-color: #FFFFFF;"
                  ></md-textarea>
                </md-field>
                <md-button
                  class="md-raised md-primary pull-right"
                  style="background-color: #2fb52b; color: white;"
                  v-on:click="submitMessage()"
                >Send</md-button>
              </md-card>
            </div>
          </div>
          <br />
          <!-- Negotation Interface -->
          <div class="col-md-3 message-sideright card-expansion invoice-generator">
            <md-card md-with-hover>

              <!-- <md-ripple> -->
              <md-card-header style="background-color:#6200ea; color:white;">
                <div class="md-title" style="font-size:20px;">
                  <i class="fas fa-file-invoice" style="font-size:40px;"></i>
                  Custom Invoice Generator
                </div>
                <div class="md-subhead">
                  You can edit orders and send custom invoices here.
                  <br />If you create a custom invoice, your buyer will have to re-purchase the invoice,
                  and you will have ro re-confirm the order before your buyer is charged.
                </div>
              </md-card-header>
              <md-card-expand>
                <md-card-actions md-alignment="space-between">
                  <div>
                    <!-- <md-button>View Order</md-button>
                    <md-button>Edit Invoice</md-button>-->
                  </div>
                  <md-card-expand-trigger>
                    <md-button>
                      Edit Invoice
                      <md-icon>keyboard_arrow_down</md-icon>
                    </md-button>
                  </md-card-expand-trigger>
                </md-card-actions>
                <md-card-expand-content>
                  <md-card-content>
                    <div
                      class="panel-body invoice-editor"
                      v-if="this.order !== undefined && this.order.totalPrice === undefined"
                    >
                      <div v-for="(item, index) in this.servicesNegotiated" v-bind:key="index">
                        <!-- Add New Service (Title + Quantity + Price)-->

                        <!-- Edit Service Title -->
                        <div class="row">
                          <div class="col-6">
                            <md-field>{{ item.title }}</md-field>
                          </div>
                          <div class="col-3">
                            <!-- Edit Quantity -->
                            <md-field>
                              X
                              <md-input
                                style="background-color: white; width: 10%;"
                                v-model="amtForServicesNegotiated[index]"
                                @change="updateOrderItems(index)"
                                placeholder="amount"
                                type="text"
                              />
                            </md-field>
                          </div>
                          <div class="col-3">
                            <!-- Edit Price -->
                            <md-field>
                              <p
                                style="color:red;font-size:15px;"
                              >{{ item.servicePrice * amtForServicesNegotiated[index] }} $</p>
                            </md-field>
                          </div>

                        </div>
                      </div>

                      <hr />
                      Total price: {{ this.totalPrice }} $
                      <br />
                      <br />
                      <!-- Negotiation Interface -->
                      <md-button
                        @click="submitOrderPrompt()"
                        v-if="this.order && this.order.seller_confirmed === false"
                        style="background-color: #12005e; color: white;"
                        class="btn-block"
                      >Preview Invoice</md-button>
                    </div>
                  </md-card-content>
                </md-card-expand-content>
              </md-card-expand>

              <!-- </md-ripple> -->

            </md-card>
          </div>
        </div>
      </div>
    </div>
  </body>

  <!--  -->

  <modal name="would-you-like-to-submit">
    <div class="invoice-preview">
      <h1>Invoice Preview</h1>
      <div>Would you like to submit this order?</div>
      <md-button @click="submitOrder">Yes</md-button>
      <md-button @click="closeSubmitPrompt">No</md-button>
    </div>
  </modal>
  <!--  -->
</div>
</template>

<script src="./scripts/quoteRequestsScreen.js">
</script>

<style scoped>
@import "../assets/css/inbox.css";
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
</style>

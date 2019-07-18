<template>
<div id="app">
  <buyer-header />
  <body class="inbox" id="inbox">
    <div
      class="responsive-component"
      v-responsive="{
        small: el => el.width < 430
        }"
    >
      <div class="container-fluid">
        <div class="row" id="header">
          <div class="col-md-4">
            <h2>Inbox</h2>
          </div>
        </div>
        <div class="row message-wrapper rounded shadow mb-20" style="height: auto;">
          <div class="col-md-4 message-sideleft">
            <md-card style="min-height: 50em;;">
              <div class="panel-heading">
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
              <div
                class="panel-body no-padding"
                v-if="this.dropdownVariable === 'Orders' || this.dropdownVariable === 'All messages'"
              >
                <md-card class="list-group no-margin list-message">
                  <a
                    class="list-group-item"
                    v-for="(order, index) in this.orders"
                    v-bind:key="index"
                    @click="showOrder(order), retrieveOrderOrderItems(order)"
                  >
                    <h4 class="list-group-item-heading">
                      Buyer ID : {{ order.buyerId }}
                      <br />
                      <br />
                      <small>Date created : {{ order.createdAt }}</small>
                      <br />
                    </h4>
                    <p class="list-group-item-text">Order# {{ order.orderId }}</p>
                    <span class="label label-success pull-right">Order</span>
                    <div class="clearfix"></div>
                  </a>
                </md-card>
              </div>
              <!-- The panels for the orders -->

              <!-- The panels for the pending orders -->
              <div
                class="panel-body no-padding"
                v-if="this.dropdownVariable === 'Orders' || this.dropdownVariable === 'All messages'"
              >
                <div class="list-group no-margin list-message">
                  <a
                    class="list-group-item"
                    v-for="(order, index) in this.pendingOrders"
                    v-bind:key="index"
                    @click="showOrder(order)"
                  >
                    <h4 class="list-group-item-heading">
                      Buyer ID : {{ order.buyerId }}
                      <br />
                      <br />
                      <small>Date created : {{ order.createdAt }}</small>
                      <br />
                    </h4>
                    <p class="list-group-item-text">Order# {{ order.orderId }}</p>
                    <span class="label label-success pull-right">Pending Order</span>
                    <div class="clearfix"></div>
                  </a>
                </div>
              </div>
            </md-card>
            <!-- The panels for the quote requests -->
          </div>
          <div class="col-md-5 message-sideright">
            <md-card style="min-height: 50em;">
              <div
                class="panel-body"
                v-for="(msg, index) in correspondanceMessages"
                v-bind:key="index"
              >
                <h4 class="media-heading">{{msg.sender}} :</h4>
                <p class="lead">{{msg.message}}</p>
                <hr />
              </div>
              <!-- /.panel-body -->
              <hr />
              <!-- /.panel-heading -->
              <div class="panel-body">
                <md-field>
                  <md-textarea
                    v-model="message"
                    v-on:keyup.enter="submitMessage()"
                    placeholder="message.."
                    style="border: 1px solid black;"
                  ></md-textarea>
                </md-field>

                <!-- <button v-on:click="submitMessage()">Submit</button> -->
                <md-button class="md-raised md-primary" v-on:click="submitMessage()">Submit Message</md-button>
              </div>
              <!-- /.panel-body -->
            </md-card>
          </div>
          <br />
          <div class="col-md-3 message-sideright">
            <md-card style="min-height: 50em;">
              <div class="panel-body">
                <button
                  v-if="this.order && this.order.seller_confirmed === true"
                  @click="promptForOrderConfirmation()"
                >Submit Order</button>

                <div v-for="(item, index) in this.servicesNegotiated" v-bind:key="index">
                  {{orderItems[index].amount }} X
                  {{item.title}}
                  <p
                    style="color:red;font-size:15px;"
                  >{{ item.servicePrice * orderItems[index].amount }} $</p>
                </div>
              </div>
            </md-card>
          </div>
          <!-- /.message-sideright -->
        </div>
      </div>
    </div>
  </body>

  <modal name="would-you-like-confirm">
    <div>Would you like to confirm this order?</div>
    <md-button @click="confirmOrder()">Yes</md-button>
    <md-button @click="closeConfirmationModal()">No</md-button>
  </modal>

  <modal name="no-buyer-method-detected">
    <div>You do not yet have a payment method. Would you like to add one in order to confirm this order?</div>
    <md-button @click="addPaymentMethod">Yes</md-button>
    <md-button @click="closePaymentMethodModal">No</md-button>
  </modal>

  <modal name="add-payment-method">
    <buyer-settings-billings-tab v-slot:default="slotProps">
      <md-button @click="submitPaymentMethod(slotProps.card, slotProps.stripe)">Add Card</md-button>
    </buyer-settings-billings-tab>
  </modal>
  <!-- BuyerSettingsBillingsTab -->
</div>
</template>

<script src="./scripts/buyerInbox.js">
</script>

<style>
@import "../../assets/css/inbox.css";
</style>

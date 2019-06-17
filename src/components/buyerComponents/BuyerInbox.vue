<template>
<div id="app">
  <buyer-header/>
  <body class="inbox" id="inbox">
    <div
      class="responsive-component"
      v-responsive="{
        small: el => el.width < 430
        }"
    >
      <div class="container">
        <div class="row" id="header">
          <div class="col-md-4">
            <h2>Inbox</h2>
          </div>
        </div>
        <div class="row message-wrapper rounded shadow mb-20">
          <div class="col-md-4 message-sideleft">
            <div class="panel">
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
                <div class="list-group no-margin list-message">
                  <a
                    class="list-group-item"
                    v-for="(order, index) in this.orders"
                    v-bind:key="index"
                    @click="showOrder(order)"
                  >
                    <h4 class="list-group-item-heading">
                      Buyer ID : {{ order.buyerId }}
                      <br>
                      <br>
                      <small>Date created : {{ order.createdAt }}</small>
                      <br>
                    </h4>
                    <p class="list-group-item-text">Order# {{ order.orderId }}</p>
                    <span class="label label-success pull-right">Order</span>
                    <div class="clearfix"></div>
                  </a>
                </div>
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
                      <br>
                      <br>
                      <small>Date created : {{ order.createdAt }}</small>
                      <br>
                    </h4>
                    <p class="list-group-item-text">Order# {{ order.orderId }}</p>
                    <span class="label label-success pull-right">Order</span>
                    <div class="clearfix"></div>
                  </a>
                </div>
              </div>
              <!-- The panels for the pending orders -->

              <!-- The panels for the quote requests -->
              <!-- <div
                class="panel-body no-padding"
                v-if="this.dropdownVariable === 'Quote Requests' || this.dropdownVariable === 'All messages'"
              >
                <div class="list-group no-margin list-message">
                  <a
                    class="list-group-item"
                    v-for=" (request, index) in this.buyerQuoteRequests"
                    v-bind:key="index"
                    @click="showQuoteRequest(request)"
                  >
                    <h4 class="list-group-item-heading">
                      Subject : {{ request.subject }}
                      <br>
                      <br>
                      <small>Date created : {{ request.createdAt }}</small>
                    </h4>

                    <p class="list-group-item-text"></p>
                    <span class="label label-success pull-right">Quote Request</span>
                    <div class="clearfix"></div>
                  </a>
                </div>
              </div>-->
            </div>
            <!-- The panels for the quote requests -->
          </div>
          <div class="col-md-8 message-sideright">
            <div class="panel">
              <!-- <div class="panel-heading">
                <div class="media">
                  <div class="media-body">
                    <h4 class="media-heading">
                      Rebecca Cabean
                      <small>(Sales Manager)</small>
                    </h4>
                    <small>Thursday 5th July 2014-via Intercom</small>
                  </div>
                </div>
              </div>-->
              <!-- /.panel-heading -->
              <div
                class="panel-body"
                v-for="(msg, index) in correspondanceMessages"
                v-bind:key="index"
              >
                <h4 class="media-heading">{{msg.sender}} :</h4>
                <p class="lead">{{msg.message}}</p>
                <hr>
              </div>
              <!-- /.panel-body -->
              <hr>
              <!-- /.panel-heading -->
              <div class="panel-body">
                <textarea
                  v-model="message"
                  v-on:keyup.enter="submitMessage()"
                  placeholder="add multiple lines"
                ></textarea>
                <button v-on:click="submitMessage()">Submit</button>
              </div>
              <!-- /.panel-body -->
            </div>
          </div>
          <!-- /.message-sideright -->
        </div>
      </div>
    </div>
  </body>
</div>
</template>

<script src="./scripts/buyerInbox.js">
</script>

<style>
@import "../../assets/css/inbox.css";
</style>

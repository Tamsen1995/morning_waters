<template>
  <div class="card-expansion invoice-generator" style="border-radius:20px;">
    <md-card md-with-hover style="background-color:#6545c5;">
      <!-- <md-ripple> -->
      <md-card-header style="background-color:#6545c5; color:white;">
        <div class="md-title" style="font-size:20px;">
          <i class="fas fa-file-invoice" style="font-size:25px;"></i>
          Custom Quote Generator
        </div>
        <div class="md-subhead">You can edit orders and send custom quotes here.</div>
      </md-card-header>

      <!-- <md-card-expand> -->
        <!-- <md-card-actions >
          <div></div>

          <md-button
                    class="md-accent"
                    style="background-color: red; color: white;"
                    @click="redirectToOrderStatus()"
          >Status</md-button>

          <md-card-expand-trigger>
            <md-button v-if="order && (order.pending || order.seller_confirmed === true)">
              Invoice
              <md-icon>keyboard_arrow_down</md-icon>
            </md-button>

            <md-button v-else>
              Edit Invoice
              <md-icon>keyboard_arrow_down</md-icon>
            </md-button>
          </md-card-expand-trigger>
        </md-card-actions> -->
        <!-- <md-card-expand-content> -->
        <md-card-content>
          <div class="panel-body invoice-editor" v-if="this.order">

            <div v-for="(item, index) in this.servicesNegotiated" v-bind:key="index">
              <!-- Edit Service Title -->
              <div class="row">
                <div class="col-6">
                  <md-field>{{ item.title }}</md-field>
                </div>
                <div class="col-3">
                  <!-- Edit Quantity -->
                  <md-field>
                    X
                    <!-- TODO : make sure the default of this is set to true on back -->
                    <div
                      v-if="order && (order.pending || order.seller_confirmed === true)"
                    >{{amtForServicesNegotiated[index]}}</div>

                    <md-input
                      v-else
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
                      style="color:red;font-size:12px;"
                    >${{ item.servicePrice * amtForServicesNegotiated[index] }}</p>
                  </md-field>
                </div>
              </div>
            </div>
            <div v-if="this.itemsToBeAdded && this.itemsToBeAdded.length > 0">
              <div v-for="(item, index) in this.itemsToBeAdded" v-bind:key="index">
                <md-field>
                  <md-input
                    @keydown.enter.prevent
                    v-model="item.title"
                    md-autogrow
                    style="background-color: #e3f2fd;"
                  ></md-input>
                </md-field>

                <md-field>
                  <md-input
                    @keydown.enter.prevent
                    v-model="item.quantity"
                    md-autogrow
                    style="background-color: #e3f2fd;"
                  ></md-input>
                </md-field>

                <md-field>
                  <currency-input
                    @keydown.enter.prevent
                    v-model="item.price"
                    style="background-color: #e3f2fd;"
                    currency="USD"
                    locale="us"
                  />Per Unit
                </md-field>
              </div>
            </div>
            <div v-if="this.order && this.order.seller_confirmed === false">
              <md-button
                :md-ripple="false"
                style="background-color: #e0bfe8; color: white;"
                @click="addCustomOrderItemToInvoice()"
              >+ add item</md-button>
              <br />
              <br />
              <div v-if="inboxInvoice">{{inboxInvoice.terms}}</div>
              <md-field>
                <md-textarea
                  @keydown.enter.prevent
                  v-model="terms"
                  md-autogrow
                  placeholder="Modify terms here ... "
                  style="background-color: #e3f2fd;"
                ></md-textarea>
                <br />
              </md-field>
              <md-field v-if="inboxInvoice">
                <label>Tax rate %</label>
                <md-input
                  v-model="inboxInvoice.taxRate"
                  style="background-color: #e3f2fd;"
                  type="number"
                ></md-input>
              </md-field>
              <md-button
                v-if="this.terms !== '' || this.itemsToBeAdded.length > 0"
                class="md-dense md-raised md-primary"
                @click="modifyInboxInvoice()"
              >Save</md-button>
            </div>

            <hr />
            Total price: {{ this.totalPrice }} $
            <br />
            <br />
            <!-- Negotiation Interface -->

            <div v-if="this.order && this.order.seller_confirmed === false">
              <md-button
                @click="submitOrderPrompt()"
                style="background-color: #12005e; color: white;"
                class="btn-block"
              >Submit Order</md-button>
            </div>
          </div>
        </md-card-content>
        <!-- </md-card-expand-content> -->
      <!-- </md-card-expand> -->

      <!-- </md-ripple> -->
    </md-card>

    <!--  -->
    <modal
      v-if="this.servicesNegotiated.length > 0"
      height="auto"
      scrollable
      name="would-you-like-to-submit"
    >
      <div class="invoice-preview">
        <h1>Order</h1>

        <div v-for="(orderItem, index) in this.orderItems" v-bind:key="index">
          <br />
          {{orderItem.amount}} x
          {{ servicesNegotiated[index].title }}
          $ {{ servicesNegotiated[index].servicePrice * orderItem.amount }}
        </div>

        <hr />
        Total Price: $ {{this.totalPrice}}
        <br />
        <br />
        <div>Would you like to submit this order?</div>
        <md-button @click="submitOrder()">Yes</md-button>
        <md-button @click="closeSubmitPrompt()">No</md-button>
      </div>
    </modal>

    <modal height="auto" scrollable name="order-has-been-submitted-message">
      Your order has been submitted and will be confirmed once the buyer submits it from their end.
      <md-button @click="closeConfirmedPrompt">OK</md-button>
    </modal>

    <!--  -->
  </div>
</template>


<script src="./scripts/negotiationInterface.js">
</script>

<style scoped>
@import "../../../assets/css/inbox.css";
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
</style>

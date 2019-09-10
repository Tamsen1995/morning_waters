<template>
  <div class="col-md-3 message-sideright card-expansion invoice-generator">
    <md-card md-with-hover>
      <!-- <md-ripple> -->
      <md-card-header style="background-color:#9474cc; color:white;">
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
      <md-card-expand v-if="this.order">
        <md-card-actions md-alignment="space-between">
          <div></div>

          <!-- <md-button
            class="md-accent"
            style="background-color: red; color: white;"
            @click="redirectToOrderStatus()"
          >Status</md-button>-->

          <md-card-expand-trigger>
            <md-button v-if="order.pending || order.seller_confirmed === true">
              Invoice
              <md-icon>keyboard_arrow_down</md-icon>
            </md-button>

            <md-button v-else>
              Edit Invoice
              <md-icon>keyboard_arrow_down</md-icon>
            </md-button>
          </md-card-expand-trigger>
        </md-card-actions>
        <md-card-expand-content>
          <md-card-content>
            <div class="panel-body invoice-editor" v-if="this.order">
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
                      <!-- TODO : make sure the default of this is set to true on back -->
                      <div>{{amtForServicesNegotiated[index]}}</div>
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
                @click="promptForOrderConfirmation()"
                v-if="this.order && this.order.seller_confirmed === true"
                style="background-color: #12005e; color: white;"
                class="btn-block"
              >Submit Order</md-button>
            </div>
          </md-card-content>
        </md-card-expand-content>
      </md-card-expand>

      <!-- </md-ripple> -->
    </md-card>

    <modal name="no-buyer-method-detected">
      No payment method has been detected. Would you like to add one?
      <br />
      <md-button @click="addPaymentMethod()">Yes</md-button>
      <md-button>No</md-button>
    </modal>

    <modal name="add-payment-method">
      <BuyerSettingsBillingsTab v-slot:default="slotProps">
        <md-button @click="submitPaymentMethod(slotProps.card, slotProps.stripe)">Submit</md-button>
        <!-- v-slot:default="slotProps" -->
      </BuyerSettingsBillingsTab>
    </modal>

    <modal
      height="auto"
      scrollable
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
  </div>
</template>

<script>
import BuyerServices from "@/services/BuyerServices";

import PaymentService from "@/services/PaymentService";
import InboxService from "@/services/InboxService";
import BuyerSettingsBillingsTab from "@/components/buyerComponents/BuyerSettingsBillingsTab";
import SettingsService from "@/services/SettingsService";
import UserServices from "@/services/UserServices";

export default {
  data() {
    return {
      card: null,
      stripe: null
    };
  },
  mounted() {},
  components: {
    BuyerSettingsBillingsTab
  },
  props: {
    order: null,
    servicesNegotiated: null,
    totalPrice: 0.0,
    amtForServicesNegotiated: null,
    orderItems: null
  },
  watch: {
    order: async function test() {
      try {
      } catch (error) {
        if (error) throw error;
      }
    }
  },
  methods: {
    async redirectToOrderStatus() {
      try {
        const orderId = this.order.orderId;

        this.$router.push({
          name: "buyerOrderStatus",
          params: { orderId: orderId }
        });
      } catch (error) {
        if (error) throw error;
      }
    },

    async closeSubmitPrompt() {
      try {
        this.$modal.hide("would-you-like-to-submit");
      } catch (error) {
        if (error) throw error;
      }
    },
    async submitOrder() {
      try {
        console.log(`\n\nThis function is to submit the order\n\n`); // TESTING
        await InboxService.confirmOrder({
          orderId: this.order.orderId,
          user: "buyer"
        });
        await InboxService.submitToPendingOrders({
          orderId: this.order.orderId
        });

        await this.sendMessage("[buyer submits order confirmation]");

        if (this.order && this.order.seller_confirmed === true) {
          this.$router.push({
            name: "buyerDashboard"
          });
        }
      } catch (error) {
        if (error) throw error;
      }
    },
    async sendMessage(text) {
      try {
        var correspondanceMsg = null;

        /// /////////////////////////////////// Testing
        if (this.order !== null) {
          correspondanceMsg = {
            orderId: this.order.orderId,
            buyerId: this.order.buyerId,
            // by userId we mean to say the id of the seller in the db
            userId: this.order.sellerId,
            date: "",
            sender: "buyer",
            message: text
          };
        }

        await BuyerServices.sendCorrespondanceMsg(correspondanceMsg);
        /// ////////////////////////////////////////
      } catch (error) {
        if (error) throw error;
      }
    },
    // this will render the modal to add a payment method with
    async addPaymentMethod() {
      try {
        this.$modal.show("add-payment-method");
        this.$modal.hide("no-buyer-method-detected");
      } catch (error) {
        if (error) throw error;
      }
    },

    async promptForOrderConfirmation() {
      try {
        const buyerExtracted = this.$store.getters.getBuyerInfo;
        const buyerHasPaymentMethod = (await PaymentService.checkForBuyerPaymentMethod(
          buyerExtracted.id
        )).data;

        if (buyerHasPaymentMethod === true) {
          this.$modal.show("would-you-like-to-submit");
        } else {
          this.$modal.show("no-buyer-method-detected");
        }
      } catch (error) {
        if (error) throw error;
      }
    },

    async submitPaymentMethod(card, stripe) {
      try {
        const buyerExtracted = this.$store.getters.getBuyerInfo;
        const buyerId = buyerExtracted.id;
        const stripeCustomerId = buyerExtracted.stripeCustomerId;
        const token = await stripe.createToken(card);
        const sourceToBeAdded = {
          uid: buyerId,
          stripeCustomerId: stripeCustomerId,
          stripeToken: token
        };
        await SettingsService.addPaymentMethod(sourceToBeAdded);

        this.$modal.hide("add-payment-method");
        this.$modal.show("would-you-like-to-submit");
      } catch (error) {
        if (error) throw error;
      }
    }
  }
};
</script>

<style scoped>
@import "../../../assets/css/inbox.css";
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
</style>

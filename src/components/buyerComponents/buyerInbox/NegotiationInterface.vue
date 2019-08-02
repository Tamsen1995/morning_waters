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

          <md-button
            class="md-accent"
            style="background-color: red; color: white;"
            @click="redirectToOrderStatus()"
          >Status</md-button>

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

    <modal name="add-payment-method">add payment method here</modal>
  </div>
</template>

<script>
import PaymentService from "@/services/PaymentService";
import BuyerSettingsBillingsTab from "@/components/buyerComponents/BuyerSettingsBillingsTab";
import SettingsService from "@/services/SettingsService";
import UserServices from "../../../services/UserServices";
export default {
  data() {
    return {};
  },
  props: {
    order: null,
    servicesNegotiated: null,
    totalPrice: 0.0,
    amtForServicesNegotiated: null
  },
  watch: {
    order: async function test() {
      try {
        console.log(`\nMy order being : ${JSON.stringify(this.order)}\n`); // TESTING
      } catch (error) {
        if (error) throw error;
      }
    }
  },
  methods: {
    // this will render the modal to add a payment method with
    async addPaymentMethod() {
      try {
        this.$modal.show("add-payment-method");
        this.$modal.hide("no-buyer-method-detected");
      } catch (error) {
        if (error) throw error;
      }
    },
    // async closePaymentMethodModal() {
    //   try {
    //     this.$modal.hide("no-buyer-method-detected");
    //   } catch (error) {
    //     if (error) throw error;
    //   }
    // },
    async promptForOrderConfirmation() {
      try {
        const buyerExtracted = this.$store.getters.getBuyerInfo;
        const buyerHasPaymentMethod = (await PaymentService.checkForBuyerPaymentMethod(
          buyerExtracted.id
        )).data;

        if (buyerHasPaymentMethod === true) {
          this.$modal.show("would-you-like-confirm");
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
        this.confirmOrder();
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

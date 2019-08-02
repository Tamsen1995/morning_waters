<template>
  <div
    class="col-md-6 message-sideright"
    style="background-color: white; border-right: 1px groove white; border-left: 1px groove white"
  >
    <div>
      <div class="message-header-a">
        <h3 v-if="buyer !== null">{{buyer.name}}</h3>
        <div class="message-header-b">
          <h4>[Company Name]</h4>
        </div>
      </div>

      <div class="panel-body" v-for="(msg, index) in correspondanceMessages" v-bind:key="index">
        <!-- if -->
        <md-card
          v-if="msg && msg.sender && msg.sender === 'seller'"
          id="recieve-text-bubble"
          class="pull-left"
        >
          <md-content>
            <h4 class="media-heading pull-right">Date</h4>
            <md-icon>account_circle</md-icon>
            <span v-if="buyer !== null">{{buyer.name}}</span>
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
            <span v-if="seller !== null">{{seller.companyName}}</span>
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
  </div>
</template>

<script>
import BuyerServices from "@/services/BuyerServices";
import InboxService from "@/services/InboxService";

export default {
  data() {
    return {
      message: "",
      correspondanceMessages: []
    };
  },
  props: {
    order: null,
    buyer: null,
    correspondanceMsgs: [],
    seller: null
  },
  watch: {
    correspondanceMsgs: async function test() {
      try {
        this.correspondanceMessages = this.correspondanceMsgs;
      } catch (error) {
        if (error) throw error;
      }
    }
  },
  methods: {
    async submitMessage() {
      try {
        var correspondanceMsg = null;
        if (this.order !== null) {
          correspondanceMsg = {
            orderId: this.order.orderId,
            buyerId: this.order.buyerId,
            // by userId we mean to say the id of the seller in the db
            userId: this.order.sellerId,
            date: "",
            sender: "buyer",
            message: this.message
          };
        }

        await BuyerServices.sendCorrespondanceMsg(correspondanceMsg);
        const response = await InboxService.retrieveCorrespondance(
          correspondanceMsg.orderId
        );
        this.correspondanceMessages = response.data.correspondance;
        this.message = "";
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

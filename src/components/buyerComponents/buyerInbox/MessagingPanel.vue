<template>
  <div
    v-if="this.order"
    class="col-md-6 message-sideright"
    style="background-color: white; border-right: 1px groove white; border-left: 1px groove white"
  >
    <div>
      <div class="message-header-a">
        <h3 v-if="buyer">{{buyer.name}}</h3>
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
        <md-card
          v-else-if="msg && msg.sender && msg.sender === 'seller-file-attachment'"
          class="pull-left"
          id="recieve-text-bubble"
        >
          <md-content>
            <h4 class="media-heading pull-right">Date</h4>
            <md-icon>account_circle</md-icon>
            <span v-if="seller !== null">{{seller.companyName}}</span>
            <!-- <h4 class="media-heading">{{msg.sender}} :</h4> -->
            <div class="view_msg">
              <p class="lead">
                {{msg.message}}
                <br />
              </p>
              <md-button
                style="background-color: white; color: black;"
                @click="downloadFile(msg.filename)"
              >
                <md-icon>file_copy</md-icon>
                {{msg.filename}}
              </md-button>
            </div>
          </md-content>
        </md-card>
        <!--  -->
        <md-card
          v-else-if="msg && msg.sender && msg.sender === 'buyer-file-attachment'"
          class="pull-right"
          id="response-text-bubble"
        >
          <md-content>
            <h4 class="media-heading pull-right">Date</h4>
            <md-icon>account_circle</md-icon>
            <span v-if="seller !== null">{{seller.companyName}}</span>
            <!-- <h4 class="media-heading">{{msg.sender}} :</h4> -->
            <div class="view_msg">
              <p class="lead">
                {{msg.message}}
                <br />
              </p>
              <md-button
                style="background-color: white; color: black;"
                @click="downloadFile(msg.filename)"
              >
                <md-icon>file_copy</md-icon>
                {{msg.filename}}
              </md-button>
            </div>
          </md-content>
        </md-card>
        <!--  -->

        <md-card
          v-else-if="msg && msg.sender === 'buyer'"
          class="pull-right"
          id="response-text-bubble"
        >
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
        <md-card v-else-if="msg && msg.sender === 'seller_submit'">
          <b-alert variant="success" show>{{seller.companyName}} has submitted the order ...</b-alert>
        </md-card>
        <md-card v-else-if="msg && msg.sender === 'buyer_submit'">
          <b-alert show>You have submitted the order ...</b-alert>
        </md-card>
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
            v-if="file ===''"
            class="md-raised md-primary pull-right"
            style="background-color: #2fb52b; color: white;"
            v-on:click="submitMessage()"
          >Send</md-button>

          <md-button
            v-else
            class="md-raised md-primary pull-right"
            style="background-color: blue; color: white;"
            v-on:click="sendFile()"
          >Send</md-button>

          <form enctype="multipart/form-data">
            <div class="field">
              <input type="file" @change="selectFile" ref="file" style="display: none" />

              <md-button @click="$refs.file.click()" class="md-icon-button md-raised pull-right">
                <md-icon>attach_file</md-icon>
              </md-button>
            </div>
          </form>
        </md-card>
      </div>
    </div>
  </div>

  <div
    class="col-md-6 message-sideright"
    style="background-color: white; border-right: 1px groove white; border-left: 1px groove white"
    v-else
  >
    <md-empty-state md-icon="message" md-description="No message selected"></md-empty-state>
    <md-field>
      <md-field>
        <label>Select a correspondence to chat ...</label>
        <md-input disabled></md-input>
        <md-button
          class="md-dense md-raised md-primary"
          style="background-color: #c8e6c9; color: white;"
          disabled
        >
          <md-icon>block</md-icon>
        </md-button>
      </md-field>
    </md-field>
  </div>
</template>

<script>
import BuyerServices from "@/services/BuyerServices";
import InboxService from "@/services/InboxService";

export default {
  data() {
    return {
      message: "",
      correspondanceMessages: [],
      file: ""
    };
  },

  props: {
    order: null,
    buyer: null,
    correspondanceMsgs: null,
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
    selectFile() {
      this.file = this.$refs.file.files[0];
    },
    async downloadFile(filename) {
      try {
        const fileKey = filename;
        const response = await InboxService.downloadFile(fileKey);
        const url = response.data.url;
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileKey); // or any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        if (error) throw error;
      }
    },
    async sendFile() {
      try {
        // send a message indicating in the sender var
        // that it is an inbox attachment sent by the buyer
        var correspondanceMsg = null;
        if (this.order !== null) {
          correspondanceMsg = {
            orderId: this.order.orderId,
            buyerId: this.order.buyerId,
            userId: this.order.sellerId,
            date: "",
            sender: "buyer-file-attachment",
            message: this.message,
            filename: `file-${this.file.name}`
          };
        }

        // sending the message and refreshing the current inbox
        await BuyerServices.sendCorrespondanceMsg(correspondanceMsg);
        const response = await InboxService.retrieveCorrespondance(
          correspondanceMsg.orderId
        );
        this.correspondanceMessages = response.data.correspondance;
        this.message = "";

        console.log(`${this.order.orderId}`); // TESTING
        // uploading the actual file
        const formData = new FormData();
        formData.append("file", this.file);
        console.log(formData); // TESTING
        await InboxService.uploadFile(formData);
        this.file = "";
      } catch (error) {
        if (error) throw error;
      }
    },

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

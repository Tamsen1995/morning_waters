<template>
  <div
    class="col-md-6 message-sideright"
    style="background-color: white; border-right: 1px groove white; border-left: 1px groove white"
  >
    <div v-if="this.order">
      <div class="message-header-a">
        <h3 v-if="buyer !== null">{{buyer.name}}</h3>
        <div class="message-header-b">
          <h4>[Company Name]</h4>
        </div>
      </div>

      <div class="panel-body" v-for="(msg, index) in correspondanceMessages" v-bind:key="index">
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
        <md-card
          v-else-if="msg && msg.sender && msg.sender === 'buyer-file-attachment'"
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
                {{msg.filename}}
                <br />
              </p>
              <md-button
                style="background-color: black; color: white;"
                @click="downloadFile(msg.filename)"
              >Download</md-button>
            </div>
          </md-content>
        </md-card>
        <!--  -->
        <md-card
          v-else-if="msg && msg.sender && msg.sender === 'seller-file-attachment'"
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
                {{msg.filename}}
                <br />
              </p>
              <md-button
                style="background-color: black; color: white;"
                @click="downloadFile(msg.filename)"
              >Download</md-button>
            </div>
          </md-content>
        </md-card>
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
    <div v-else>
      <md-empty-state md-icon="message" md-description="No message selected"></md-empty-state>
    </div>
  </div>
</template>

<script>
import InboxService from "@/services/InboxService";
import BuyerServices from "@/services/BuyerServices";

export default {
  data() {
    return {
      file: "",
      // this array shows up in the inbox to the left
      correspondanceMessages: [],
      message: ""
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
        console.log(`\n\nThat's fine ${fileKey}\n\n`); // TESTING
        const response = await InboxService.downloadFile(fileKey);
        const url = response.data.url;
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileKey);
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        if (error) throw error;
      }
    },

    async sendFile() {
      try {
        // // send a message indicating in the sender var
        var correspondanceMsg = null;
        if (this.order !== null) {
          correspondanceMsg = {
            orderId: this.order.orderId,
            buyerId: this.order.buyerId,
            userId: this.order.sellerId,
            date: "",
            sender: "seller-file-attachment",
            message: this.message,
            filename: `file-${this.file.name}`
          };
        }

        // // sending the message and refreshing the current inbox
        await BuyerServices.sendCorrespondanceMsg(correspondanceMsg);
        const response = await InboxService.retrieveCorrespondance(
          correspondanceMsg.orderId
        );
        this.correspondanceMessages = response.data.correspondance;
        this.message = "";

        // console.log(`${this.order.orderId}`); // TESTING
        // // uploading the actual file
        const formData = new FormData();
        formData.append("file", this.file);
        await InboxService.uploadFile(formData);
        this.file = "";
      } catch (error) {
        if (error) throw error;
      }
    },
    /// ///////////////////////////////////////for sending file attachments above

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
            sender: "seller",
            message: this.message
          };
        }
        this.message = "";

        await BuyerServices.sendCorrespondanceMsg(correspondanceMsg);
        const response = await InboxService.retrieveCorrespondance(
          correspondanceMsg.orderId
        );
        this.correspondanceMessages = response.data.correspondance;
      } catch (error) {
        if (error) throw error;
      }
    },

    // This function also sets the clicked on variable
    // of the message
    async retrieveCorrespondance(orderId) {
      try {
        const response = await InboxService.retrieveCorrespondance(orderId);
        this.correspondanceMessaes = response.data.correspondance;
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
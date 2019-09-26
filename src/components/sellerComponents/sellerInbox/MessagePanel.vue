<template>
  <div class="message-sideright">
    <div v-if="this.order">
      <div class="message-header-a">
        <h3 v-if="buyer">{{buyer.firstName}} {{ buyer.lastName }}</h3>
        <div class="message-header-b">
          <h4 v-if="buyer">{{buyer.companyName}}</h4>
        </div>
      </div>

      <div class="panel-body" v-for="(msg, index) in correspondanceMessages" v-bind:key="index">
        <div class="msg-scroll">
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

          <md-card
            v-else-if="msg && msg.sender === 'seller'"
            class="pull-right"
            id="response-text-bubble"
          >
            <md-content>
              <h4 class="media-heading pull-right">Date</h4>
              <md-icon>account_circle</md-icon>
              {{seller.companyName}}
              <!-- <h4 class="media-heading">{{msg.sender}} :</h4> -->
              <div class="view_msg">
                <p class="lead" style="white-space: pre-wrap;">{{msg.message}}</p>
              </div>
            </md-content>
          </md-card>
          <md-card v-else-if="msg && msg.sender === 'seller_submit'">
            <b-alert variant="success" show>You have submitted the order ...</b-alert>
          </md-card>
          <md-card v-else-if="msg && msg.sender === 'buyer_submit'">
            <b-alert show>{{buyer.firstName}} has submitted the order ...</b-alert>
          </md-card>
        </div>
      </div>

      <hr />
      <!-- /.panel-heading -->
      <div class="panel-body">
        <md-card class="reply_msg">
          <md-field>
            <md-textarea
              contenteditable="true"
              @keydown.enter.prevent
              v-model="message"
              md-autogrow
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
      <md-empty-state md-icon="message" class="icon" md-description="No message selected"></md-empty-state>
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
  </div>
</template>

<script src="./scripts/messagePanel.js">
</script>

<style scoped>
@import "../../../assets/css/inbox.css";
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
</style>
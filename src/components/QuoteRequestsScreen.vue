<template>
<div id="app">
  <dashboard-header/>
  <body class="inbox" id="inbox">
    <div
      class="responsive-component"
      v-responsive="{
        small: el => el.width < 430
        }"
    >
      <b-container>
        <div class="columns" id="mail-app">
          <br>
          <aside class="column is-2 aside hero is-fullheight">
            <div class="main-inbox">
              <!-- Locked -->
              <a title="locked" active @click="getLockedOrders()" class="item">
                <span class="icon">
                  <img src="../assets/css/icons8-lock-24.png">
                </span>
                <span class="name">Locked</span>
              </a>

              <!-- Unlocked -->
              <a title="unlocked" @click="getUnlockedOrders()" class="item">
                <span class="icon">
                  <img src="../assets/css/icons8-unlock-24.png">
                </span>
                <span class="name">Unlocked</span>
              </a>
            </div>
          </aside>

          <div class="column is-4 messages hero is-fullheight" id="message-feed">
            <div
              v-for="(order, index) in this.orders"
              class="card"
              @click="showMessage(order)"
              v-bind:key="index"
            >
              <div class="card-content">
                <div class="msg-header">Order : {{ order.id }}</div>
              </div>
            </div>
          </div>

          <!-- ////////////////////////////// -->
          <!-- Is shown when a locked message on the side is clicked -->
          <div
            class="column is-6 message hero is-fullheight"
            v-if="this.showLockedMessages === true"
          >
            <div class="box message-preview">
              <div>
                <button
                  type="button"
                  class="btn btn-success btn-lg"
                  @click="promptToUnlock()"
                >UNLOCK</button>
              </div>
            </div>
          </div>

          <!-- Is shown when an unlocked message on the side is clicked -->
          <div class="column is-6 message hero is-fullheight">
            <div class="box message-preview">
              <div v-for="(message, index) in this.correspondanceMessages" v-bind:key="index">
                {{message.message}}
                <br>
                <br>
              </div>
            </div>

            <div class="box message-preview">
              <textarea
                class="box message-preview"
                v-model="message"
                placeholder="add multiple lines"
                v-on:keyup.enter="sendMessage()"
              ></textarea>
              <button class="box message-preview" @click="sendMessage()">Submit</button>
            </div>
          </div>

          <!-- ///////////////////////////// -->

          <!-- The modal view which will prompt the user to unlock the message -->
          <div id="unlock-prompt-modal">
            <modal name="unlocking-prompt">
              <div id="prompt-text">
                <br>It will cost you 3 credits
              </div>

              <div id="unlock-button">
                <button type="button" class="btn btn-success btn-lg" @click="unlockOrder()">UNLOCK</button>
              </div>
            </modal>
          </div>
        </div>
      </b-container>
    </div>
  </body>
</div>
</template>

<script src="./scripts/quoteRequestsScreen.js">
</script>

<style scoped>
@import "../assets/css/inbox.css";
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
@import "https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css";
</style>

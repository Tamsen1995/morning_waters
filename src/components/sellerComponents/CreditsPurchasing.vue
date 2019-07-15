<template>
<div id="app">
  <body class="purchase">
    <div class="responsive-component" v-responsive="{
		small: el => el.width < 430
		}">
      <dashboard-header />
      <div
        class="responsive-component"
        v-responsive="{
      	small: el => el.width < 430 }"
        id="credits-home"
      >
        <body class="credits-purchasing">
          <div class="container" id="credits">
            <b-row>
              <b-col cols="12">
                <div id="company-name">
                  <h4>Company :</h4>
                  <h5>{{ this.companyName }}</h5>
                </div>
                <!-- test -->
                <!-- test2 -->
                <br />
                <br />

                <div id="remaining-credits">
                  <h4>Remaining credits :</h4>
                  <h5>{{ this.remainingCredits }}</h5>
                </div>
                <br />
                <br />

                <!-- <div class="panel panel-default"> -->
                <div class="panel-body">
                  <input v-model="creditsToBePurchased" placeholder="Number of credits" />
                  <button type="button" class="btn btn-primary" @click="buyCredits()">Buy credits</button>
                </div>
                <!-- </div> -->

                <button
                  type="button"
                  class="btn btn-primary"
                  @click="buyMonthlySubscription()"
                >Get a monthly subscription</button>
              </b-col>
            </b-row>
          </div>
        </body>
      </div>

      <!-- Prompt to ask the user if they want to buy credit -->
      <modal name="buy-credit-prompt">
        <div class="container" style="margin:75px">
          <div class="row">
            <div class="col-md-4">
              <h4>Would you like to purchase {{this.creditsToBePurchased}} credits ?</h4>

              <button
                class="btn btn-info pull-right"
                style="margin-top:10px"
                type="button"
                @click="purchaseCredit"
              >Submit</button>
            </div>
          </div>
        </div>
      </modal>
      <!--  -->

      <!-- Prompt to ask the user if they want a subscription -->
      <modal name="buy-subscription-prompt">
        <div class="container" style="margin:75px">
          <div class="row">
            <div class="col-md-4">
              <h4>Would you like to purchase a subscription ?</h4>

              <button
                class="btn btn-info pull-right"
                style="margin-top:10px"
                type="button"
                @click="purchaseSubscription"
              >Submit</button>
            </div>
          </div>
        </div>
      </modal>

      <!-- Prompt to ask the user if they want to buy credit -->
      <modal name="buy-credit-prompt">
        <div class="container" style="margin:75px">
          <div class="row">
            <div class="col-md-4">
              <h4>Would you like to purchase {{this.creditsToBePurchased}} credits ?</h4>

              <button
                class="btn btn-info pull-right"
                style="margin-top:10px"
                type="button"
                @click="purchaseCredit"
              >Submit</button>
            </div>
          </div>
        </div>
      </modal>
      <!--  -->

      <!-- Prompt to ask the user if they want a subscription -->
      <modal name="buy-subscription-prompt">
        <div class="container" style="margin:75px">
          <div class="row">
            <div class="col-md-4">
              <h4>Would you like to purchase a subscription ?</h4>

              <button
                class="btn btn-info pull-right"
                style="margin-top:10px"
                type="button"
                @click="purchaseSubscription"
              >Submit</button>
            </div>
          </div>
        </div>
      </modal>
    </div>
  </body>
</div>
</template>

<script src="./scripts/creditsPurchasing.js">
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
@import "../../assets/css/settings.css";
</style>

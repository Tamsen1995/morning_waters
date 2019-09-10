<template>
<div id="app">
  <page-header></page-header>
  <div class="responsive-component" v-responsive="{
      small: el => el.width < 860
      }">
    <body class="help" >
      <div class="help-header">
        <div class="container" >
          <div class="container" id="fig-gure_it_out">
            <div id="fig-logo-white">
              <img
                src="../assets/css/TINY_LOGO_WHITE.png"
                alt="FIG ANALYTICS"
                class="center"
                id="login-logo"
              />
            </div>
            <br />

          </div>
          <h1>Help Center</h1>
        </div>
      </div>
      <div id="help-page">
        <!-- Tabs -->
        <md-tabs>
          <!-- Payout -->
          <md-tab id="tab-buyer" md-label="Buyer help">
            <hr>
            <h2>Recommended for you</h2>

            <div class="container">
              <div class="row">
                <div class="col">
                  <div class="container" id="help-topic">
                    <h3>Charges and cancelations</h3>
                    <div class="row" id="help-topic-sub">
                      <h4>How do I change or cancel an order?</h4>
                    </div>
                    <div class="row" id="help-topic-sub">
                      <h4>What happens if my seller cancels my reservation?</h4>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="container" id="help-topic" >
                    <h3>Paying for an order</h3>
                    <div class="row" id="help-topic-sub">
                      <h4>What methods of payment does Fig Analytics accept?</h4>
                    </div>  
                    <div class="row" id="help-topic-sub">
                      <h4>How do I edit or remove a payment method?</h4>
                    </div>   
                    <div class="row" id="help-topic-sub">
                      <h4>When am I charged for a reservation?</h4>
                    </div>             
                  </div>
                </div>
                <div class="col">
                  <div class="container" id="help-topic">
                    <h3>Trust and safety</h3>
                    <div class="row" id="help-topic-sub">
                      <h4>What should I do if someone asks me to pay outside of the Fig Analytics website?</h4>
                    </div> 
                  </div>
                </div>
              </div>
            </div>
            <br>
            <hr>
            <h2>All topics</h2>
            <div class="container">
              <div class="row">
                <div class="col">
                  <div class="container" id="help-topic">
                    <!-- Buyer -->
                    <h3>Getting Started</h3>
                    <div class="row" id="help-topic-sub">
                      <h4>Finding a service</h4>
                    </div>
                    <div class="row" id="help-topic-sub">
                      <h4>Couldn't find the right service?</h4>
                    </div> 
                    <div class="row" id="help-topic-sub">
                      <h4>Ordering with confidence</h4>
                    </div> 
                  </div>
                </div>
                <div class="col">
                  <div class="container" id="help-topic">                
                    <h3>Submitting a quote request</h3>
                    <div class="row" id="help-topic-sub">
                      <h4>What happens after I submit a quote request?</h4>
                    </div> 
                    <div class="row" id="help-topic-sub">
                      <h4>How do I negotiate with a seller about their listing?</h4>
                    </div>
                    <div class="row" id="help-topic-sub">
                      <h4>Can sellers offer services even if they aren't listed?</h4>
                    </div> 
                    <div class="row" id="help-topic-sub">
                      <h4>What happens if a seller doesn't offer the service I am looking for?</h4>
                    </div>  
                  </div>
                </div>
                <div class="col">
                  <div class="container" id="help-topic">
                    <h3>Submiting an order</h3>
                    <div class="row" id="help-topic-sub">
                      <h4>What happens after I submit an order?</h4>
                    </div> 
                    <div class="row" id="help-topic-sub">
                      <h4>Negotiating with a seller</h4>
                    </div> 
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="container" id="help-topic">
                    <h3>Payment</h3>
                    <div class="row" id="help-topic-sub">
                      <h4>Paying for your reservation</h4>
                    </div> 
                    <div class="row" id="help-topic-sub">
                      <h4>Pricing & fees</h4>
                    </div> 
                    <div class="row" id="help-topic-sub">
                      <h4>Payment methods</h4>
                    </div>
                    <div class="row" id="help-topic-sub">
                      <h4>Coupons & Credits</h4>
                    </div>  
                  </div>
                </div>
                <div class="col">
                  <div class="container" id="help-topic">
                    <h3>Become a seller</h3>
                    <div class="row" id="help-topic-sub">
                      <h4>Becoming a seller</h4>
                    </div> 
                    <div class="row" id="help-topic-sub">
                      <h4>Becoming a seller</h4>
                    </div> 
                  </div>
                </div>
                <div class="col">
                  <div class="container" id="help-topic">
                    <h3>Your account</h3>
                    <div class="row" id="help-topic-sub">
                      <h4>Your Profile</h4>
                    </div> 
                    <div class="row" id="help-topic-sub">
                      <h4>Account Security</h4>
                    </div>
                    <div class="row" id="help-topic-sub">
                      <h4>Reviews</h4>
                    </div>  
                  </div>
                </div>
              </div>
            </div>
          </md-tab>

          <md-tab id="tab-seller" md-label="Seller help">
            <br>
            <hr>
            <!-- Seller -->
            <h2>Recommended for you</h2>
            <div class="container">
              <div class="row">
                <div class="col">
                  <div class="container" id="help-topic">
                    <h3>Cancelations</h3>
                    <div class="row" id="help-topic-sub">
                      <h4>How do I cancel a reservation as a host?</h4>
                    </div>
                    <div class="row" id="help-topic-sub">
                      <h4>What happens if my buyer cancels?</h4>
                    </div>
                    <div class="row" id="help-topic-sub">
                      <h4>Are there exceptions to the seller cancellation penalties?</h4>
                    </div>   
                  </div>
                </div>
                <div class="col">
                  <div class="container" id="help-topic">                      
                    <h3>Payouts and taxes</h3>
                    <div class="row" id="help-topic-sub">
                      <h4>How do I change my payout method?</h4>
                    </div> 
                    <div class="row" id="help-topic-sub">
                      <h4>When will I get my payout</h4>
                    </div>  
                  </div>
                </div>
                <div class="col">
                  <div class="container" id="help-topic">   
                    <h3>Trust and safety</h3>
                  </div>
                </div>
              </div>
            </div>
            <hr>
            <h2>All topics</h2>
            <div class="container">
              <div class="row">
                <div class="col">
                  <div class="container" id="help-topic">            
                    <h3>Getting started</h3>
                    <div class="row" id="help-topic-sub">
                      <h4>Deciding to sell</h4>
                    </div>
                    <div class="row" id="help-topic-sub">
                      <h4>List your services</h4>
                    </div> 
                    <div class="row" id="help-topic-sub">
                      <h4>Top seller questions</h4>
                    </div>  
                  </div>
                </div>
                <div class="col">
                  <div class="container" id="help-topic">  
                    <h3>Orders</h3>
                    <div class="row" id="help-topic-sub">
                      <h4>Pending orders</h4>
                    </div> 
                  </div>
                </div>
                <div class="col">
                  <div class="container" id="help-topic">  
                    <h3>Quote requests</h3>
                    <div class="row" id="help-topic-sub">
                      <h4>Pending quote requests</h4>
                    </div> 
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="container" id="help-topic">  
                    <h3>Your listing</h3>
                    <div class="row" id="help-topic-sub">
                      <h4>Updating your listing</h4>
                    </div> 
                    <div class="row" id="help-topic-sub">
                      <h4>Service tag guidelines</h4>
                    </div> 
                  </div>
                </div>
                <div class="col">
                  <div class="container" id="help-topic">  
                    <h3>How payouts work</h3>
                    <div class="row" id="help-topic-sub">
                      <h4>Getting paid</h4>
                    </div> 
                    <div class="row" id="help-topic-sub">
                      <h4>Adding payout info</h4>
                    </div>
                    <div class="row" id="help-topic-sub">
                      <h4>Your payout status</h4>
                    </div>
                    <div class="row" id="help-topic-sub">
                      <h4>Taxes</h4>
                    </div>   
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="container" id="help-topic">  
                    <h3>Your account</h3>
                    <div class="row" id="help-topic-sub">
                      <h4>Your Profile</h4>
                    </div> 
                    <div class="row" id="help-topic-sub">
                      <h4>Account Security</h4>
                    </div> 
                    <div class="row" id="help-topic-sub">
                      <h4>Reviews</h4>
                    </div> 
                  </div>
                </div>
              </div>
            </div>
          </md-tab>

        </md-tabs>
      </div>

      <div class="help_footer">
        <div class="row">
          <div class="col">
            <a>Give feedback</a>
          </div>  
          <div class="col">
            <p>Still need help?</p>
            <button>Contact Us</button>
          </div>
        </div>
      </div>
    
            

    </body>

  </div>
</div>
</template>

<script>
import PageHeader from "@/components/Header.vue";

export default {
  components: {
    PageHeader
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");

#fig-logo-white{
  width:200px;
  height:auto;
}
.help-header{
  /* background-color: rgb(232, 223, 240); */
  background: linear-gradient(to bottom right, rgb(245, 238, 252) 0%,  rgb(208, 188, 224) 100%);
  padding-top:30px;
  padding-left:20px;
  padding-bottom:30px;
  padding-right:0px;
}
.help_page{
  background-color:white;
}
.help_footer{
  background-color:rgb(232, 223, 240);
  margin-top:10px;
  height:200px;
  padding: 10px;
}
.help h1{
  color:white;
  letter-spacing: 2px;
  font: 60px 'Roboto';
  padding-left:10px;
  padding-top:20px;
}

.help h2{
  color: #361555;
  /* letter-spacing: 1px; */
  font: 35px 'Roboto';
  padding-left:0px;
  padding-top:20px;
}

.help h3{
  color: #361555;
  font: 25px 'Roboto';
}

.help h4{
  /* color: #361555; */
  font: 15px 'Roboto';
}

#help-topic{
  min-width: 300px;
  padding-top:30px;
  padding-left:0px;
}

#help-topic-sub{
  padding:15px;
}

#help-nav {
  border-bottom: 2px solid #29105b;
}

#help-page {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
}

#help-page .tabs {
  position: relative;
  margin: 0 auto;
}


#help-page .tabs__item:first-child {
  margin-left: 0;
}

#help-page .tabs__item:last-child {
  margin-right: 0;
}

#help-page .tabs__active-line {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  /* background-color: black; */
  transition: transform 0.4s ease, width 0.4s ease;
}
</style>

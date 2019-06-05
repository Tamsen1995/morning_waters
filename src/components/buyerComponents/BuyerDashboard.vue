<template>
<div id="app">
  <buyer-header/>
  <div
    class="responsive-component"
    v-responsive= "{
    small: el => el.width < 860 }"
  >
    <body class="orders">


      <div class="page-header">
        <!-- <div id="settings-nav">
          <br>
          <tabs
            :tabs="tabs"
            :currentTab="currentTab"
            :wrapper-class="'default-tabs'"
            :tab-class="'default-tabs__item'"
            :tab-active-class="'default-tabs__item_active'"
            :line-class="'default-tabs__active-line'"
            @onClick="handleClick"
          />
        </div> -->
        <ul class="nav nav-tabs">

          <li class="nav-item dropdown active">
            <h3>
              <a class="nav-link dropdown-toggle" data-toggle="tab" href="#current-order-1" role="button" aria-haspopup="true" aria-expanded="false">Active Orders</a>
              <!-- <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#current-order-1">Company Name [Timestamp]</a></li>
                <a class="dropdown-item" href="#">Company Name [Timestamp]</a>
                <a class="dropdown-item" href="#">Company Name [Timestamp]</a>
              </ul> -->
            </h3>
          </li>
          <li class="nav-item">
            <h3>
            <a class="nav-link" data-toggle="tab" href="#order-history">Order History</a>
            </h3>
          </li> 

        </ul>

        <div class="tab-content">

          <div class="tab-pane active" id="current-order-1">
            <div class="container current-order-status">
            <!-- Add tabs to toggle Current Orders/ Pending Orders-->
            <!-- Curent Orders -->
            <br>
            
              
              <div id="seller-timeline" style="top: 15px;">
              
                <div class="row timeline-movement">
              
                  <!--In correspondance (Sellers Only) -->
                  <div style="margin:0px; padding:0px;">
                    <div class="timeline-badge-small" id="status-complete" style="top: 50px;">
                    </div>
                  </div>

                  <div class="col-sm-6  timeline-item">
                    <div class="row">
                      <div class="col-sm-11">

                      </div>
                    </div>
                  </div>

                  <div class="col-sm-6  timeline-item">              
                    <div class="row">
                      <div class="col-sm-offset-1 col-sm-11">

                        <div class="timeline-panel buyer-side">
                          <ul class="timeline-panel-ul">
                              <li><span class="importo">In Correspondance</span></li>
                              <li><span class="causale">Most Recent message...</span> </li>
                              <li><span class="causale">View inbox</span> </li>
                              <li><p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> Timestamp</small></p> </li>
                          </ul>
                        </div>
                        
                      </div>
                    </div>
                  </div>

                </div>

                <!-- Step 1: Buyer Submits order -->
                <div class="row timeline-movement">
                  
                  <div class="timeline-badge" id="status-complete">
                    <span style="font-size: 40px;">
                      <i class="fas fa-clipboard-list"></i>
                    </span>
                  </div>

                  <div class="col-sm-6  timeline-item">
                    <div class="row">
                      <div class="col-sm-11">

                      </div>
                    </div>
                  </div>

                  <!-- Order Submitted-->
                  <div class="col-sm-6  timeline-item">
                    <div class="row">
                      <div class="col-sm-offset-1 col-sm-11">
                        
                        <div class="timeline-panel buyer-side">
                          <ul class="timeline-panel-ul">
                              <li><span class="importo">Order Submited</span></li>
                              <li><span class="causale">View Order Summary</span> </li>
                              <li><span class="causale">You will not be charged until Seller name confirms your order.</span> </li>
                              <li><p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> Timestamp</small></p> </li>
                          </ul>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Step 2: Seller Confirms Order -->
                <div class="row timeline-movement">

                  <div class="timeline-badge" id="status-complete">
                    <span style="font-size: 40px;">
                      <i class="fas fa-clipboard-check"></i>
                    </span>
                  </div>

                  <!-- Buyer Charged-->
                  <div class="col-sm-6  timeline-item">
                    <div class="row">
                      <div class="col-sm-11">

                        <div class="timeline-panel seller-side">

                          <!-- Pending Confirmation -->
                          <ul class="timeline-panel-ul">
                            <li><span class="importo">[Seller Name] Confirmed Order </span></li>
                            <li><span class="importo">Charged [total billed]</span></li>
                            <li><span class="causale">View Invoice</span> </li>
                            <li><p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> [TimeStamp]</small></p> </li>
                          </ul>
                        </div>

                      </div>
                    </div>
                  </div>
                  
                </div>
                
                <!-- Shipping Decisions/ Shippo UI link -->
                <div class="row timeline-movement">

                
                  <div class="timeline-badge" style="padding:5px;" id="status-incomplete">
                    <span style="font-size: 37px; padding-top: 20px;">
                      <i class="fas fa-dolly"></i>
                    </span>
                  </div>


                  <div class="col-sm-6  timeline-item">
                    <div class="row">
                      <div class="col-sm-11">

                        <div class="timeline-panel seller-side">
                          <ul class="timeline-panel-ul">
                            <li><span class="importo"> [Company Name] Shipping Selection</span></li>
                            <li><span class="causale">View Invoice</span> </li>
                            <li><p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> 11/09/2014</small></p> </li>
                          </ul>
                        </div>

                      </div>
                    </div>
                  </div>

                  <!-- Seller Confirmed Order Charged-->
                  <div class="col-sm-6  timeline-item">
                    <div class="row">
                      <div class="col-sm-offset-1 col-sm-11">
                        
                        <div class="timeline-panel buyer-side">
                          <ul class="timeline-panel-ul">
                            <li><span class="importo">Need to ship?</span></li>
                            <li><span class="causale">Shipping UI Link. </span> </li>
                          </ul>
                        </div>

                      </div>
                    </div>
                  </div>

                </div>

                <!-- Shipping Status -->
                <div class="row timeline-movement">

                  <div class="timeline-badge-small" id="status-incomplete" style="">
                  </div>

                  <div class="col-sm-offset-6 col-sm-6  timeline-item">
                    <div class="row">
                      <div class="col-sm-offset-1 col-sm-11">
                        <div class="timeline-panel buyer-side">
                          <ul class="timeline-panel-ul">
                            
                            <li><span class="importo">[Label purchased, Shipped]</span></li>
                            <li><span class="causale">Tracking Number</span> </li>
                            <li><p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> 11/09/2014</small></p> </li>
                          </ul>
                        </div>

                      </div>
                    </div>
                  </div>

                </div>

                <!-- Delivery status -->
                <div class="row timeline-movement">
                  
                  <div class="timeline-badge" id="status-incomplete" style= "top: 25%;">
                    <span style="font-size: 40px;" >
                      <i class="far fa-check-circle"></i>
                    </span>
                  </div>

                  <div class="col-sm-offset-6 col-sm-6  timeline-item">
                    <div class="row">
                      <div class="col-sm-offset-1 col-sm-11">
                        <div class="timeline-panel buyer-side">
                          <ul class="timeline-panel-ul">
                            
                            <li><span class="importo">[Out for delivery, Delivered]</span></li>
                            <li><span class="causale">Tracking Number</span> </li>
                            <li><p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> 11/09/2014</small></p> </li>
                          </ul>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Shipping Status -->
                <div class="row timeline-movement">
                  <div class="timeline-badge-small" style="" id="status-incomplete">
                  </div>

                  <div class="col-sm-6  timeline-item">
                    <div class="row">
                      <div class="col-sm-11">
                        <div class="timeline-panel seller-side">

                          <ul class="timeline-panel-ul">
                            <li><span class="importo">[Label purchased, Shipped]</span></li>
                            <li><span class="causale">Tracking Number</span> </li>
                          </ul>

                        </div>

                      </div>
                    </div>
                  </div>

                </div>

                <!-- Delivery Status -->
                <div class="row timeline-movement">
                  
                  <div class="timeline-badge" id="status-incomplete" style= "top: 25%;">
                    <span style="font-size: 40px;" >
                      <i class="far fa-check-circle"></i>
                    </span>
                  </div>

                  <div class="col-sm-6  timeline-item">
                    <div class="row">
                      <div class="col-sm-11">
                        <div class="timeline-panel seller-side badge-glow">
                          <ul class="timeline-panel-ul">
                            
                            <li><span class="importo">[Out for delivery, Delivered]</span></li>
                            <li><span class="causale">Tracking Number</span> </li>
                            <li><p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> 11/09/2014</small></p> </li>
                          </ul>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <br>
                <br>
                <div class="row timeline-movement timeline-movement-top">
                  <div class="timeline-badge timeline-future-movement" style= "top: 25px;" >
                    <a href="#">
                      <span class="glyphicon glyphicon-plus"></span>
                    </a>
                  </div>
                </div>
              </div>
              <br>
              <br>
              <br>
              <!-- Invoice Viewer -->
              <div class="container" id="current-order-download" style= "padding-top: 25px;">
                <div class="row">
                  <div class="container" >
                    <h4> Download Invoice</h4>
                      <div class="card">
                        View grid

                        Download
                      </div>
                  </div>
                </div>
              </div>
              <br>
            </div>
          </div>


          <!-- Order History Timeline -->
          <div id="order-history" class="tab-pane">

							<!-- Timeline -->
							<div class="container current-order-status">
                <div class="row">
                  <div class="col-12">
                    <h6>
                      Order history
                    </h6>
                    <br>
                    <ul class="oh_timeline">
                      
                      <li v-for="payment in paymentHistory" v-bind:key="payment">
                        <div class="row">
                          <div class="col">
                            <h6 class="float-left"> Confirmed Sale: {{ payment.product_purchased }} </h6>
                          </div>
                          <div class="col">
                            <p class="float-right"> {{ payment.time_of_purchase }} </p>
                          </div>
                        </div>
                   
                        <div class="container">
                          <div class="row">
                            <div class="col-4">
                              <div class="float-left">
                                <p> 
                               
                                  Lead Price:
                                </p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="col">
                              <div class="float-left">
                                <p> 
                              
                                  Shipping Info
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <br>
                      </li>
                      <br>
                    </ul>
                  </div>
                </div>
							 
              
							
						</div>

          </div>



        </div>

        <br>
      </div>

      <!-- Shipping UI-->
      <div class="container" id="shippo-ui">
        <div class="row">
          <br>
          <div class="container" id="shipping_ui">
            <h4>Shipping UI</h4>
              <div class="card">
                Shippo Shit
              </div>
          </div>
          <br>
        </div>
      </div>


    </body>

  </div>
</div>
</template>

<script>
import BuyerHeader from "@/components/buyerComponents/BuyerHeader.vue";
import { ResponsiveDirective } from 'vue-responsive-components';

export default {
  components: {
    BuyerHeader
  },
    directives: {
    responsive: ResponsiveDirective
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
@import "../../assets/css/orders.css";
@import url("https://use.fontawesome.com/releases/v5.8.1/css/all.css");
</style>

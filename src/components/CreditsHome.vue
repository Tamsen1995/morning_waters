<template>
	<div id="app">
		<dashboard-header/>
		<div class="responsive-component" v-responsive= "{
      small: el => el.width < 430 }" id="orders-home">		
		<body class="orders">
			<b-container id="orders">
				<b-row>
          <b-col cols="8">
						<div id="orders-main">
							<div id="company-name">
								<h4> Company: </h4>
								<h5>{{ this.companyName }}</h5>
							</div>
							<br>
							<br>

							<!-- View Leads -->
							<div id="company-name">
								<h4> Locked Leads:</h4><h5>{{ this.remainingCredits }}</h5>
							</div>
							
							<button type="button" class="btn btn-default" @click="goToCreditsPurchasingScreen">
								<span class="glyphicon glyphicon-plus-sign"><strong> View Leads </strong></span>
							</button>
							<br>
							<br>

							<!-- View Orders -->							
							<div id="company-name">
								<h4> Pending Orders:</h4><h5>{{ this.remainingCredits }}</h5>
							</div>

							<button type="button" class="btn btn-default" @click="goToCreditsPurchasingScreen">
								<span class="glyphicon glyphicon-plus-sign"><strong> View Orders </strong></span>
							</button>


						<br>
						<br>
						<br>
						</div>
						<br>
						<br>
						<br>
						<br>
						<br>
						<div id="order-history">
							<!-- Timeline -->
							<!-- <div class="container mt-5 mb-5"> -->
							<b-row>
								<b-col cols="12">
									<h6>
										Order history
									</h6>
									<br>
									<ul class="timeline">
										
										<li v-for="payment in paymentHistory" v-bind:key="payment">
											<b-row>
												<b-col>
													<h6 class="float-left"> Confirmed Sale: {{ payment.product_purchased }} </h6>
												</b-col>
												<b-col>
													<p class="float-right"> {{ payment.time_of_purchase }} </p>
												</b-col>
											</b-row>
											<!-- <br> -->
											<b-container >
												<b-row>
													<b-col cols="4">
														<div class="float-left">
															<p> 
																<!-- Add lead cost-->
																Lead Price:
															</p>
														</div>
													</b-col>
												</b-row>
												<b-row>
													<b-col>
														<div class="float-left">
															<p> 
																<!-- Add Link to shipping info -->
																Shipping Info
															</p>
														</div>
													</b-col>
												</b-row>
											</b-container>
											<br>
										</li>
										<br>
									</ul>
								</b-col>
							</b-row>
							<!-- </div>   -->
							
						</div>
          </b-col>
				</b-row>
			</b-container>


		</body>
		</div>
	</div>
</template>

<script src="./scripts/creditsHome.js">
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato|Roboto');
@import '../assets/css/settings.css';
</style>

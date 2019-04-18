<template>
	<div id="app">
		<h1>Request quote here !</h1>

		<div id="quote-request-input-form"> 

			<div class="email-address-input">
				<b-form-input v-model="emailAddress"
					type="text"
					placeholder="Please enter your email address"></b-form-input>
			</div>

			<br>

			<div class="email-address-input">
				<b-form-input v-model="name"
					type="text"
					placeholder="Please enter your name"></b-form-input>
			</div>
				
			<br>

			<div class="request-description">
				<b-form-textarea id="textarea1"
								v-model="description"
								placeholder="Enter description"
								:rows="6"
								:max-rows="6">
				</b-form-textarea>
			</div>

			<br>
			<b-button type="submit" variant="primary" @click="submitQuoteRequest">Submit Request</b-button>
		</div>


	</div>
</template>

<script src="./scripts/quoteRequestForm.js">
</script>

<style scoped>
	.email-address-input {
		width: 40%;
		margin-left: auto;
		margin-right: auto;
	}

	.request-description {
		width: 50%;
		margin-left: auto;
		margin-right: auto;
	}
</style>

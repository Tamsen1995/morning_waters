<template>
<div id="app">
  <dashboard-header />
  <div class="responsive-component" v-responsive="{
      small: el => el.width < 430
      }">
    <body class="settings">
      <div id="settings-page">
        <div id="settings-nav">
          <h3>Settings</h3>
          <br />
        </div>

        <md-tabs>
          <md-tab id="tab-profile" md-label="Profile">
            <md-card md-with-hover>
              <md-ripple>
                <md-card-content>
                  <!-- Edit Profile info -->
                  <div>
                    <h4>Edit Main Profile Info:</h4>
                    <p>(Services information can be added & edited directly on your profile.)</p>
                    <br />
                  </div>
                  <!-- input for Name -->
                  <div class="form-row">
                    <md-field>
                      <label>Name:</label>
                      <md-input v-model="name"></md-input>
                    </md-field>
                  </div>

                  <!-- input for email address -->
                  <div class="form-row">
                    <md-field>
                      <label>Email:</label>
                      <md-input v-model="email"></md-input>
                    </md-field>
                  </div>

                  <!-- input your phone number -->
                  <div class="form-row">
                    <md-field>
                      <label>Phone Number:</label>
                      <md-input v-model="number"></md-input>
                    </md-field>
                  </div>

                  <!-- Input for Job title -->
                  <div class="form-row">
                    <md-field>
                      <label>Job Title:</label>
                      <md-input v-model="jobTitle"></md-input>
                    </md-field>
                  </div>

                  <!-- Input for Company Name -->
                  <div class="form-row">
                    <md-field>
                      <label>Company name:</label>
                      <md-input v-model="companyName"></md-input>
                    </md-field>
                  </div>
                  <!-- Company Website -->
                  <div class="form-row">
                    <md-field>
                      <label>Company Website:</label>
                      <md-input v-model="companyWebsite"></md-input>
                    </md-field>
                  </div>
                  <!-- Input for Billing Address -->
                  <!-- Add more formatting to this section: Maybe even map app -->
                  <div class="form-row">
                    <md-field>
                      <label>Billing Address:</label>
                      <md-input v-model="billingAddress"></md-input>
                    </md-field>
                  </div>
                  <!-- Input for About -->
                  <div class="form-group row">
                    <md-field>
                      <label>About:</label>
                      <md-textarea v-model="about" class="form-control"></md-textarea>
                    </md-field>
                  </div>

                  <br />

                  <md-button
                    @click="updateProfile"
                    class="md-raised md-primary"
                  >Submit profile edits</md-button>
                </md-card-content>
              </md-ripple>
            </md-card>
          </md-tab>
          <md-tab id="tab-billing" md-label="Billing">
            <billing-tab></billing-tab>
          </md-tab>
          <md-tab id="tab-password" md-label="Password">
            <h4>Edit Password:</h4>
            <br />
            <br />
            <!-- Input old password -->
            <div class="form-row">
              <label horizontal for="billingAddress" class="col-sm col-form-label">Old Password:</label>
              <div class="col-8">
                <input
                  v-model="billingAddress"
                  class="form-control"
                  type="text"
                  placeholder="Enter your old password"
                  description="Edit your billing address."
                />
              </div>
            </div>
            <!-- input for new password -->
            <div class="form-row">
              <label horizontal for="newPass" class="col-sm col-form-label">New Password:</label>
              <div class="col-8">
                <input
                  v-model="newPass"
                  class="form-control"
                  type="password"
                  placeholder="Enter your new password"
                />
              </div>
            </div>
            <!-- Confirm new password -->
            <div class="form-row">
              <label
                horizontal
                for="confirmNewPass"
                class="col-sm col-form-label"
              >Confirm new password:</label>
              <div class="col-8">
                <input
                  v-model="confirmNewPass"
                  class="form-control"
                  type="password"
                  placeholder="Re-enter your new password please"
                />
              </div>
            </div>

            <br />
            <button class="btn btn-outline btn-xl pull-right" @click="updatePassword">
              <p>Update Password</p>
            </button>
          </md-tab>
        </md-tabs>
      </div>
    </body>
  </div>
</div>
</template>

<script src="./scripts/settingsPage.js">
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
@import "../assets/css/settings.css";

.tabs {
  position: relative;
  margin: 0 auto;
}

.tabs__item {
  display: inline-block;
  margin: 0 5px;
  padding: 10px;
  padding-bottom: 8px;
  font-size: 18px;
  letter-spacing: 0.8;
  color: rgb(94, 94, 94);
  text-decoration: none;
  border: none;
  background-color: transparent;
  /* border-bottom: 2px solid white; */
  cursor: pointer;
  transition: all 0.25s;
}

.tabs__item_active {
  color: #29105b;
}

.tabs__item:hover {
  border-bottom: 2px solid #ffffff;
  color: #29105b;
}

.tabs__item:focus {
  outline: none;
  border-bottom: 3px solid #ffffff;
  color: #29105b;
}

.tabs__item:first-child {
  margin-left: 0;
}

.tabs__item:last-child {
  margin-right: 0;
}

.tabs__active-line {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  /* background-color: black; */
  transition: transform 0.4s ease, width 0.4s ease;
}
</style>

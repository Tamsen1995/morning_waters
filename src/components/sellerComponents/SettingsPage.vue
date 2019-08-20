<template>
<div id="app">
  <dashboard-header />
  <div class="responsive-component" v-responsive="{
      small: el => el.width < 860
      }">
    <body class="settings">
      <div id="settings-page">
        <div id="settings-nav">
          <h3>Settings</h3>
          <br />
        </div>

        <md-tabs>
          <md-tab id="tab-personal" md-label="Personal">
            <md-card md-with-hover>
              <md-card-content>
                <!-- input for First Name -->
                <div class="form-row">
                  <md-field>
                    <label>First Name:</label>
                    <md-input v-model="name"></md-input>
                  </md-field>
                </div>
                <!-- input for Last Name -->
                <div class="form-row">
                  <md-field>
                    <label>Last Name:</label>
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

                <md-button class="md-raised md-primary" @click="updateProfile()">Submit</md-button>
              </md-card-content>
            </md-card>
          </md-tab>

          <md-tab id="tab-profile" md-label="Profile">
            <md-card md-with-hover>
              <md-card-content>
                <!-- Edit Profile info -->
                <div>
                  <h4>Edit Main Profile Info:</h4>
                  <p>(Services information can be added & edited directly on your profile.)</p>
                  <br />
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
                <!-- Input for About -->
                <div class="form-group row">
                  <md-field>
                    <label>About:</label>
                    <md-textarea v-model="about" class="form-control"></md-textarea>
                  </md-field>
                </div>

                <br />
                <md-button @click="updateProfile()" class="md-raised md-primary">Publish</md-button>
              </md-card-content>
            </md-card>
          </md-tab>

          <!-- Payout -->
          <md-tab id="tab-payout" md-label="Payout">
            <md-card md-with-hover>
              <md-card-content>
                <p style="color:#880599" v-if="user && user.stripeConnectAcctInfo !== ''">
                  You can access your Stripe dashboard here
                  <br />
                  <md-button
                    class="md-raised md-primary"
                    @click="goToStripeConnectDashboard()"
                  >Go to Stripe Dashboard</md-button>
                </p>
                <p v-else>
                  <md-button class="md-raised md-primary" @click="addPayoutInfo()">Submit</md-button>
                </p>
              </md-card-content>
            </md-card>
          </md-tab>

          <!-- Payment -->
          <md-tab id="tab-billing" md-label="Payment">
            <md-card md-with-hover>
              <md-card-content>
                <p style="color:#880599">Bank information for Fig payments.</p>
                <billing-tab></billing-tab>Billing Address
                <br />
                <!-- Street -->
                <div class="form-group row">
                  <div class="col-sm-12">
                    <md-field>
                      <md-input
                        v-model="address.street"
                        type="text"
                        placeholder="Enter your street"
                      ></md-input>
                    </md-field>
                  </div>
                </div>

                <!-- City -->
                <div class="form-group row">
                  <div class="col-sm-12">
                    <md-field>
                      <md-input v-model="address.city" type="text" placeholder="Enter your city"></md-input>
                    </md-field>
                  </div>
                </div>

                <!-- State -->
                <div class="form-group row">
                  <div class="col-sm-12">
                    <md-field>
                      <md-input v-model="address.state" type="text" placeholder="Enter your state"></md-input>
                    </md-field>
                  </div>
                </div>

                <!-- Zip -->
                <div class="form-group row">
                  <div class="col-sm-12">
                    <md-field>
                      <md-input v-model="address.zip" type="text" placeholder="Enter your zip code"></md-input>
                    </md-field>
                  </div>
                </div>

                <!-- Country -->
                <div class="form-group row">
                  <div class="col-sm-12">
                    <md-field>
                      <md-input
                        v-model="address.country"
                        type="text"
                        placeholder="Enter your country"
                      ></md-input>
                    </md-field>
                  </div>
                </div>
                <md-button class="md-raised md-primary" @click="updateProfile()">Submit</md-button>
              </md-card-content>
            </md-card>
          </md-tab>

          <md-tab id="tab-password" md-label="Password">
            <md-card>
              <md-card-content>
                <h4>Edit Password:</h4>
                <br />
                <br />
                <!-- Input old password -->

                <md-field>
                  <label>Old Password:</label>
                  <md-input placeholder="Enter your old password" type="password" v-model="oldPass"></md-input>
                </md-field>

                <!-- input for new password -->

                <md-field>
                  <label>New Password:</label>
                  <md-input placeholder="Enter your old password" type="password" v-model="newPass"></md-input>
                </md-field>

                <!-- Confirm new password -->
                <md-field>
                  <label>Confirm New Password:</label>
                  <md-input
                    placeholder="Enter your old password"
                    type="password"
                    v-model="confirmNewPass"
                  ></md-input>
                </md-field>
                <md-button class="md-raised md-primary" @click="updatePassword()">Update Password</md-button>
              </md-card-content>
            </md-card>
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
@import "../../assets/css/settings.css";

#settings-page .tabs {
  position: relative;
  margin: 0 auto;
}

#settings-page .tabs__item {
  display: inline-block;
  margin: 0 5px;
  padding: 10px;
  padding-bottom: 8px;
  font-size: 18px;
  letter-spacing: 0.8;
  color: rgb(94, 94, 94);
  text-decoration: none;
  border: none;
  /* border-bottom: 2px solid white; */
  cursor: pointer;
  transition: all 0.25s;
}

#settings-page .md-card {
  background-color: white;
}

#settings-page .tabs__item_active {
  color: #29105b;
}

#settings-page .tabs__item:hover {
  border-bottom: 2px solid #ffffff;
  color: #29105b;
}

#settings-page .tabs__item:focus {
  outline: none;
  border-bottom: 3px solid #ffffff;
  color: #29105b;
}

#settings-page .tabs__item:first-child {
  margin-left: 0;
}

#settings-page .tabs__item:last-child {
  margin-right: 0;
}

#settings-page .tabs__active-line {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  /* background-color: black; */
  transition: transform 0.4s ease, width 0.4s ease;
}
</style>

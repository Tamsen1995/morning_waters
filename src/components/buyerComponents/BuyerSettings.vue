<template>
<div id="app">
  <buyer-header />
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
          <md-tab id="tab-profile" md-label="Profile">
            <!--  -->
            <!--  -->
            <md-card>
              <md-card-header>
                <div class="md-title">Edit Main Profile Info:</div>
                <div
                  class="md-subhead"
                >(Services information can be added & edited directly on your profile.)</div>
              </md-card-header>

              <md-card-content>
                <br />
                <!-- Edit Profile info -->
                <!-- <div class="form-row">
                    <md-field>
                      <label>Name:</label>
                      <md-input v-model="name"></md-input>
                    </md-field>
                </div>-->
                <div class="form-row">
                  <md-field>
                    <label>First Name:</label>
                    <md-input v-model="firstName"></md-input>
                  </md-field>
                </div>
                <div class="form-row">
                  <md-field>
                    <label>Last Name:</label>
                    <md-input v-model="lastName"></md-input>
                  </md-field>
                </div>
                <div class="form-row">
                  <md-field>
                    <label>Email:</label>
                    <md-input v-model="email"></md-input>
                  </md-field>
                </div>
              </md-card-content>

              <md-button
                class="md-raised md-primary"
                @click="updateProfileInfo()"
              >Submit profile edits</md-button>
            </md-card>
            <!--  -->
            <!--  -->

            <br />
            <!-- <button class="btn btn-default btn-xl pull-right" @click="updateProfile">Update Profile</button> -->
          </md-tab>
          <md-tab id="tab-billing" md-label="Billing">
            <billing-tab></billing-tab>
          </md-tab>
          <md-tab id="tab-password" md-label="Password">
            <md-card>
              <md-card-header>
                <div class="md-title">Edit Password:</div>
              </md-card-header>

              <br />
              <br />
              <md-card-content>
                <!-- Input old password -->
                <div class="form-row">
                  <!-- <label horizontal for="oldPass" class="col-sm col-form-label"></label>
                  <div class="col-8">
                    <input
                      v-model="oldPass"
                      class="form-control"
                    />
                  </div>-->

                  <md-field>
                    <label>Old Password:</label>
                    <md-input
                      placeholder="Enter your old password"
                      type="password"
                      v-model="oldPass"
                    ></md-input>
                  </md-field>
                </div>
                <!-- input for new password -->
                <md-field>
                  <label>New Password:</label>
                  <md-input v-model="newPass" type="password" placeholder="Enter your new password"></md-input>
                </md-field>

                <md-field>
                  <label>Confirm new password:</label>
                  <md-input
                    v-model="confirmNewPass"
                    type="password"
                    placeholder="Re-enter your new password please"
                  ></md-input>
                </md-field>

                <br />
                <md-button @click="updatePassword" class="md-raised md-primary">Update Password</md-button>
              </md-card-content>
            </md-card>
          </md-tab>
        </md-tabs>
      </div>
    </body>
  </div>
</div>
</template>

<script src="./scripts/buyerSettings.js">
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
@import "../../assets/css/settings.css";

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

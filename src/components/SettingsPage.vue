<template>
<div id="app">
  <dashboard-header/>
  <div class="responsive-component" v-responsive= "{
      small: el => el.width < 430
      }">
    <body class="settings">
      <div id="settings-page">
        <div id="settings-nav">
          <h3>Settings</h3>
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
        </div>

        <div class="settings-content">
          <br>
          <div v-show="currentTab === 'profile1'">
            <br>
            <!-- Edit Profile info -->
            <div>
              <h4>Edit Main Profile Info:</h4>
              <p>(Services information can be added & edited directly on your profile.)</p>
              <br>
            </div>
            <!-- input for Name -->
            <div class="form-row">
              <label horizontal for="name" class="col-sm col-form-label">Name:</label>
              <div class="col-8">
                <input v-model="name" class="form-control" type="text" placeholder="Edit your name">
              </div>
            </div>

            <!-- input for email address -->
            <div class="form-row">
              <label horizontal for="email" class="col-sm col-form-label">Email:</label>
              <div class="col-8">
                <input
                  v-model="email"
                  class="form-control"
                  type="email"
                  placeholder="Edit your email"
                >
              </div>
            </div>

            <!-- input your phone number -->
            <div class="form-row">
              <label horizontal for="name" class="col-sm col-form-label">Phone Number:</label>
              <div class="col-8">
                <input
                  v-model="number"
                  class="form-control"
                  type="number"
                  placeholder="Edit your phone number"
                >
              </div>
            </div>

            <!-- Input for Job title -->
            <div class="form-row">
              <label horizontal for="name" class="col-sm col-form-label">Job Title:</label>
              <div class="col-8">
                <input
                  v-model="jobTitle"
                  class="form-control"
                  type="text"
                  placeholder="Edit your job title"
                >
              </div>
            </div>
            <br>

            <!-- Input for Company Name -->
            <div class="form-row">
              <label horizontal for="name" class="col-sm col-form-label">Company Name:</label>
              <div class="col-8">
                <input
                  v-model="companyName"
                  class="form-control"
                  type="text"
                  placeholder="Edit your company name"
                >
              </div>
            </div>
            <!-- Company Website -->
            <div class="form-row">
              <label horizontal for="name" class="col-sm col-form-label">Company Website:</label>
              <div class="col-8">
                <input
                  v-model="companyWebsite"
                  class="form-control"
                  type="text"
                  placeholder="Edit your company's website"
                >
              </div>
            </div>
            <!-- Input for Billing Address -->
            <!-- Add more formatting to this section: Maybe even map app -->
            <div class="form-row">
              <label horizontal for="name" class="col-sm col-form-label">Billing Address:</label>
              <div class="col-8">
                <input
                  v-model="billingAddress"
                  class="form-control"
                  type="text"
                  placeholder="Edit your billing address"
                  description="Edit your billing address."
                >
              </div>
            </div>
            <!-- Input for About -->
            <div class="form-group row">
              <label for="About" class="col-sm col-form-label">About:</label>
              <div class="col-sm-12">
                <textarea
                  v-model="about"
                  class="form-control"
                  placeholder="Tell us about your company"
                ></textarea>
              </div>
            </div>

            <br>
            <button class="btn btn-default btn-xl pull-right" @click="updateProfile">Update Profile</button>
          </div>

          <div v-if="currentTab === 'billing3'">
            <billing-tab></billing-tab>
          </div>
          <div v-show="currentTab === 'password4'">
            <h4>Edit Password:</h4>
            <br>
            <br>
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
                >
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
                >
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
                >
              </div>
            </div>

            <br>
            <button class="btn btn-outline btn-xl pull-right" @click="updatePassword">
              <p>Update Password</p>
            </button>
          </div>
        </div>
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

<template>
<div id="app">
  <page-header></page-header>
  <div class="responsive-component" v-responsive="{
      small: el => el.width < 860
      }">
    <body>
      <div class="fixed-horizontal-center">
        <!-- Loadng animation -->
        <div class="loader" v-if="loadingFlag== 2">Loading...</div>

        <!-- Form -->
        <md-card id="register">
          <md-card-header>
            <h2 style="text-align:center; color:#361555;">Seller Sign Up</h2>
          </md-card-header>

          <md-card-content>
            <!-- Form -->
            <form>
              <div class="error" v-html="error" />
              <md-steppers :md-active-step.sync="active" md-vertical>
                <!-- First Name -->
                <md-step
                  id="first"
                  :md-done.sync="first"
                  md-label="Step 1: Personal Info"
                  md-description="Required"
                >
                  <div class="form-group row">
                    <!-- CHANGE TO FIRST NAME -->
                    <md-card style="background-color:#e7ff8c;">
                      <label
                        for="name"
                        class="col-sm col-form-label"
                        style="text-align: center"
                      >Beta key</label>

                      <div class="col-sm-12">
                        <input
                          v-model="betaKey"
                          type="text"
                          class="form-control"
                          placeholder="Enter your beta key"
                          v-on:keyup.enter="setDone('first', 'second')"
                        />
                      </div>
                      <br />
                      <br />
                      <br />
                    </md-card>
                  </div>

                  <div class="form-group row">
                    <!-- CHANGE TO FIRST NAME -->
                    <label for="name" class="col-sm col-form-label">First Name:</label>
                    <div class="col-sm-12">
                      <input
                        v-model="firstName"
                        type="text"
                        class="form-control"
                        placeholder="Enter your first name"
                        v-on:keyup.enter="setDone('first', 'second')"
                      />
                    </div>
                  </div>
                  <!-- ADD LAST NAME -->
                  <div class="form-group row">
                    <label for="name" class="col-sm col-form-label">Last Name:</label>
                    <div class="col-sm-12">
                      <input
                        v-model="lastName"
                        type="text"
                        class="form-control"
                        placeholder="Enter your last name"
                        v-on:keyup.enter="setDone('first', 'second')"
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="email" class="col-sm col-form-label">Email:</label>
                    <div class="col-sm-12">
                      <input
                        v-model="email"
                        type="email"
                        class="form-control"
                        placeholder="Enter your email"
                        v-on:keyup.enter="setDone('first', 'second')"
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="inputPassword" class="col-sm col-form-label">Password:</label>
                    <div class="col-sm-12">
                      <!-- ADD PASSWORD RESTRICTIONS (length, characters, numbers) -->
                      <input
                        v-model="password"
                        type="password"
                        class="form-control"
                        placeholder="Must be at least 7 characters long with at least one digit."
                        v-on:keyup.enter="setDone('first', 'second')"
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="inputPassword" class="col-sm col-form-label">Confirm Password:</label>
                    <div class="col-sm-12">
                      <input
                        v-model="passwordConfirm"
                        type="password"
                        class="form-control"
                        placeholder="Re-enter your password"
                        v-on:keyup.enter="setDone('first', 'second')"
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="inputPhoneNumber" class="col-sm col-form-label">Phone Number:</label>
                    <div class="col-sm-12">
                      <input
                        v-model="number"
                        type="number"
                        class="form-control"
                        placeholder="Enter your phone number"
                        v-on:keyup.enter="setDone('first', 'second')"
                      />
                    </div>
                  </div>

                  <!-- Job Title -->
                  <div class="form-group row">
                    <label for="inputPhoneNumber" class="col-sm col-form-label">Role:</label>
                    <div class="col-sm-12">
                      <input
                        v-model="jobTitle"
                        type="text"
                        class="form-control"
                        placeholder="Enter your job title"
                        v-on:keyup.enter="setDone('first', 'second')"
                      />
                    </div>
                  </div>
                  <md-button
                    style="border-radius:15px;"
                    class="md-raised md-primary"
                    @click="setDone('first', 'second')"
                  >Continue</md-button>
                </md-step>

                <!--Organization Info -->
                <md-step
                  id="second"
                  :md-done.sync="second"
                  md-label="Step 2: Organization Info"
                  md-description="Required"
                >
                  <!-- MANDATORY -->
                  <!-- Org Name -->
                  <div class="form-group row">
                    <label for="inputCompanyName" class="col-sm col-form-label">Organization Name:</label>
                    <div class="col-sm-12">
                      <input
                        v-model="companyName"
                        type="text"
                        class="form-control"
                        placeholder="Enter the name of your organization"
                        v-on:keyup.enter="setDone('second', 'third')"
                      />
                    </div>
                  </div>

                  <!-- NON MANDATORY -->
                  <!-- Company Website -->
                  <div class="form-group row">
                    <label for="inputCompanyWebsite" class="col-sm col-form-label">Website:</label>
                    <div class="col-sm-12">
                      <input
                        v-model="companyWebsite"
                        type="text"
                        class="form-control"
                        placeholder="Enter your organization's website"
                        v-on:keyup.enter="setDone('second', 'third')"
                      />
                    </div>
                  </div>
                  <!-- MANDATORY -->
                  <!-- About -->
                  <!-- <div class="form-group row">
                    <label for="About" class="col-sm col-form-label">About:</label>
                    <div class="col-sm-12">
                      <textarea
                        v-model="about"
                        rows="10"
                        class="form-control"
                        placeholder="Tell us about your organization's work"
                        v-on:keyup.enter="setDone('second', 'third')"
                      ></textarea>
                    </div>
                  </div> -->
                  <!-- Institution Type -->
                  <!-- TO DO: plug in vmodal for institution type -->
                  <div class="form-group row">
                    <label for="Institution-type" class="col-sm col-form-label">Institution type:</label>
                      <div class="col-sm-12">
                        <select
                          type="text"
                          class="form-control"
                          placeholder="Enter your insitution Type"
                          v-on:keyup.enter="setDone('second', 'third')"
                        >
                          <option value selected="selected">Please select an institution type</option>
                          <option value="Large">Large Biotech Company</option>
                          <option value="Mid">Mid-sized Biotech Company</option>
                          <option value="Small">Small Biotech Company</option>
                          <option value="CRO">CRO (Contract Research Organization)</option>
                          <option value="CMO">CMO (Contract Manufacturing Organization)</option>
                          <option value="university">University</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                  </div>
                  <br>
                  <div>
                    Shipping Address
                    <br />
                    <!-- Street -->
                    <div class="form-group row">
                      <label for="inputStreet" class="col-sm col-form-label">Address line 1:</label>
                      <div class="col-sm-12">
                        <input
                          v-model="address.street"
                          type="text"
                          class="form-control"
                          placeholder="Address line 1"
                          v-on:keyup.enter="setDone('second', 'third')"
                        />
                      </div>
                    </div>

                    <!-- Street line 2 -->
                    <div class="form-group row">
                      <label for="inputStreet" class="col-sm col-form-label">Address line 2:</label>
                      <div class="col-sm-12">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Address line 1"
                          v-on:keyup.enter="setDone('second', 'third')"
                        />
                      </div>
                    </div>

                    <!-- City -->
                    <div class="form-group row">
                      <label for="inputCity" class="col-sm col-form-label">City:</label>
                      <div class="col-sm-12">
                        <input
                          v-model="address.city"
                          type="text"
                          class="form-control"
                          placeholder="City"
                          v-on:keyup.enter="setDone('second', 'third')"
                        />
                      </div>
                    </div>

                    <!-- State -->
                    <div class="form-group row">
                      <label
                        for="inputState"
                        class="col-sm col-form-label"
                      >State / Province / Region:</label>
                      <div class="col-sm-12">
                        <input
                          v-model="address.state"
                          type="text"
                          class="form-control"
                          placeholder="State / Province / Region"
                          v-on:keyup.enter="setDone('second', 'third')"
                        />
                      </div>
                    </div>

                    <!-- Zip -->
                    <div class="form-group row">
                      <label for="inputZip" class="col-sm col-form-label">Zip / Postal code:</label>
                      <div class="col-sm-12">
                        <input
                          v-model="address.zip"
                          type="text"
                          class="form-control"
                          placeholder="Zip / Postal code"
                          v-on:keyup.enter="setDone('second', 'third')"
                        />
                      </div>
                    </div>

                    <!-- Country -->
                    <div class="control-group row">
                      <label for="inputCountry" class="col-sm col-form-label">Country:</label>
                      <!-- <div class="col-sm-12">
                        <input
                          v-model="address.country"
                          type="text"
                          class="form-control"
                          placeholder="Enter your country"
                          v-on:keyup.enter="setDone('second', 'third')"
                        />
                      </div>-->

                      <div class="col-sm-12">
                        <select
                          v-model="address.country"
                          type="text"
                          class="form-control"
                          placeholder="Enter your country"
                          v-on:keyup.enter="setDone('second', 'third')"
                        >
                          <option value selected="selected">(please select a country)</option>
                          <option value="AF">Afghanistan</option>
                          <option value="AL">Albania</option>
                          <option value="DZ">Algeria</option>
                          <option value="AS">American Samoa</option>
                          <option value="AD">Andorra</option>
                          <option value="AO">Angola</option>
                          <option value="AI">Anguilla</option>
                          <option value="AQ">Antarctica</option>
                          <option value="AG">Antigua and Barbuda</option>
                          <option value="AR">Argentina</option>
                          <option value="AM">Armenia</option>
                          <option value="AW">Aruba</option>
                          <option value="AU">Australia</option>
                          <option value="AT">Austria</option>
                          <option value="AZ">Azerbaijan</option>
                          <option value="BS">Bahamas</option>
                          <option value="BH">Bahrain</option>
                          <option value="BD">Bangladesh</option>
                          <option value="BB">Barbados</option>
                          <option value="BY">Belarus</option>
                          <option value="BE">Belgium</option>
                          <option value="BZ">Belize</option>
                          <option value="BJ">Benin</option>
                          <option value="BM">Bermuda</option>
                          <option value="BT">Bhutan</option>
                          <option value="BO">Bolivia</option>
                          <option value="BA">Bosnia and Herzegowina</option>
                          <option value="BW">Botswana</option>
                          <option value="BV">Bouvet Island</option>
                          <option value="BR">Brazil</option>
                          <option value="IO">British Indian Ocean Territory</option>
                          <option value="BN">Brunei Darussalam</option>
                          <option value="BG">Bulgaria</option>
                          <option value="BF">Burkina Faso</option>
                          <option value="BI">Burundi</option>
                          <option value="KH">Cambodia</option>
                          <option value="CM">Cameroon</option>
                          <option value="CA">Canada</option>
                          <option value="CV">Cape Verde</option>
                          <option value="KY">Cayman Islands</option>
                          <option value="CF">Central African Republic</option>
                          <option value="TD">Chad</option>
                          <option value="CL">Chile</option>
                          <option value="CN">China</option>
                          <option value="CX">Christmas Island</option>
                          <option value="CC">Cocos (Keeling) Islands</option>
                          <option value="CO">Colombia</option>
                          <option value="KM">Comoros</option>
                          <option value="CG">Congo</option>
                          <option value="CD">Congo, the Democratic Republic of the</option>
                          <option value="CK">Cook Islands</option>
                          <option value="CR">Costa Rica</option>
                          <option value="CI">Cote d'Ivoire</option>
                          <option value="HR">Croatia (Hrvatska)</option>
                          <option value="CU">Cuba</option>
                          <option value="CY">Cyprus</option>
                          <option value="CZ">Czech Republic</option>
                          <option value="DK">Denmark</option>
                          <option value="DJ">Djibouti</option>
                          <option value="DM">Dominica</option>
                          <option value="DO">Dominican Republic</option>
                          <option value="TP">East Timor</option>
                          <option value="EC">Ecuador</option>
                          <option value="EG">Egypt</option>
                          <option value="SV">El Salvador</option>
                          <option value="GQ">Equatorial Guinea</option>
                          <option value="ER">Eritrea</option>
                          <option value="EE">Estonia</option>
                          <option value="ET">Ethiopia</option>
                          <option value="FK">Falkland Islands (Malvinas)</option>
                          <option value="FO">Faroe Islands</option>
                          <option value="FJ">Fiji</option>
                          <option value="FI">Finland</option>
                          <option value="FR">France</option>
                          <option value="FX">France, Metropolitan</option>
                          <option value="GF">French Guiana</option>
                          <option value="PF">French Polynesia</option>
                          <option value="TF">French Southern Territories</option>
                          <option value="GA">Gabon</option>
                          <option value="GM">Gambia</option>
                          <option value="GE">Georgia</option>
                          <option value="DE">Germany</option>
                          <option value="GH">Ghana</option>
                          <option value="GI">Gibraltar</option>
                          <option value="GR">Greece</option>
                          <option value="GL">Greenland</option>
                          <option value="GD">Grenada</option>
                          <option value="GP">Guadeloupe</option>
                          <option value="GU">Guam</option>
                          <option value="GT">Guatemala</option>
                          <option value="GN">Guinea</option>
                          <option value="GW">Guinea-Bissau</option>
                          <option value="GY">Guyana</option>
                          <option value="HT">Haiti</option>
                          <option value="HM">Heard and Mc Donald Islands</option>
                          <option value="VA">Holy See (Vatican City State)</option>
                          <option value="HN">Honduras</option>
                          <option value="HK">Hong Kong</option>
                          <option value="HU">Hungary</option>
                          <option value="IS">Iceland</option>
                          <option value="IN">India</option>
                          <option value="ID">Indonesia</option>
                          <option value="IR">Iran (Islamic Republic of)</option>
                          <option value="IQ">Iraq</option>
                          <option value="IE">Ireland</option>
                          <option value="IL">Israel</option>
                          <option value="IT">Italy</option>
                          <option value="JM">Jamaica</option>
                          <option value="JP">Japan</option>
                          <option value="JO">Jordan</option>
                          <option value="KZ">Kazakhstan</option>
                          <option value="KE">Kenya</option>
                          <option value="KI">Kiribati</option>
                          <option value="KP">Korea, Democratic People's Republic of</option>
                          <option value="KR">Korea, Republic of</option>
                          <option value="KW">Kuwait</option>
                          <option value="KG">Kyrgyzstan</option>
                          <option value="LA">Lao People's Democratic Republic</option>
                          <option value="LV">Latvia</option>
                          <option value="LB">Lebanon</option>
                          <option value="LS">Lesotho</option>
                          <option value="LR">Liberia</option>
                          <option value="LY">Libyan Arab Jamahiriya</option>
                          <option value="LI">Liechtenstein</option>
                          <option value="LT">Lithuania</option>
                          <option value="LU">Luxembourg</option>
                          <option value="MO">Macau</option>
                          <option value="MK">Macedonia, The Former Yugoslav Republic of</option>
                          <option value="MG">Madagascar</option>
                          <option value="MW">Malawi</option>
                          <option value="MY">Malaysia</option>
                          <option value="MV">Maldives</option>
                          <option value="ML">Mali</option>
                          <option value="MT">Malta</option>
                          <option value="MH">Marshall Islands</option>
                          <option value="MQ">Martinique</option>
                          <option value="MR">Mauritania</option>
                          <option value="MU">Mauritius</option>
                          <option value="YT">Mayotte</option>
                          <option value="MX">Mexico</option>
                          <option value="FM">Micronesia, Federated States of</option>
                          <option value="MD">Moldova, Republic of</option>
                          <option value="MC">Monaco</option>
                          <option value="MN">Mongolia</option>
                          <option value="MS">Montserrat</option>
                          <option value="MA">Morocco</option>
                          <option value="MZ">Mozambique</option>
                          <option value="MM">Myanmar</option>
                          <option value="NA">Namibia</option>
                          <option value="NR">Nauru</option>
                          <option value="NP">Nepal</option>
                          <option value="NL">Netherlands</option>
                          <option value="AN">Netherlands Antilles</option>
                          <option value="NC">New Caledonia</option>
                          <option value="NZ">New Zealand</option>
                          <option value="NI">Nicaragua</option>
                          <option value="NE">Niger</option>
                          <option value="NG">Nigeria</option>
                          <option value="NU">Niue</option>
                          <option value="NF">Norfolk Island</option>
                          <option value="MP">Northern Mariana Islands</option>
                          <option value="NO">Norway</option>
                          <option value="OM">Oman</option>
                          <option value="PK">Pakistan</option>
                          <option value="PW">Palau</option>
                          <option value="PA">Panama</option>
                          <option value="PG">Papua New Guinea</option>
                          <option value="PY">Paraguay</option>
                          <option value="PE">Peru</option>
                          <option value="PH">Philippines</option>
                          <option value="PN">Pitcairn</option>
                          <option value="PL">Poland</option>
                          <option value="PT">Portugal</option>
                          <option value="PR">Puerto Rico</option>
                          <option value="QA">Qatar</option>
                          <option value="RE">Reunion</option>
                          <option value="RO">Romania</option>
                          <option value="RU">Russian Federation</option>
                          <option value="RW">Rwanda</option>
                          <option value="KN">Saint Kitts and Nevis</option>
                          <option value="LC">Saint LUCIA</option>
                          <option value="VC">Saint Vincent and the Grenadines</option>
                          <option value="WS">Samoa</option>
                          <option value="SM">San Marino</option>
                          <option value="ST">Sao Tome and Principe</option>
                          <option value="SA">Saudi Arabia</option>
                          <option value="SN">Senegal</option>
                          <option value="SC">Seychelles</option>
                          <option value="SL">Sierra Leone</option>
                          <option value="SG">Singapore</option>
                          <option value="SK">Slovakia (Slovak Republic)</option>
                          <option value="SI">Slovenia</option>
                          <option value="SB">Solomon Islands</option>
                          <option value="SO">Somalia</option>
                          <option value="ZA">South Africa</option>
                          <option value="GS">South Georgia and the South Sandwich Islands</option>
                          <option value="ES">Spain</option>
                          <option value="LK">Sri Lanka</option>
                          <option value="SH">St. Helena</option>
                          <option value="PM">St. Pierre and Miquelon</option>
                          <option value="SD">Sudan</option>
                          <option value="SR">Suriname</option>
                          <option value="SJ">Svalbard and Jan Mayen Islands</option>
                          <option value="SZ">Swaziland</option>
                          <option value="SE">Sweden</option>
                          <option value="CH">Switzerland</option>
                          <option value="SY">Syrian Arab Republic</option>
                          <option value="TW">Taiwan, Province of China</option>
                          <option value="TJ">Tajikistan</option>
                          <option value="TZ">Tanzania, United Republic of</option>
                          <option value="TH">Thailand</option>
                          <option value="TG">Togo</option>
                          <option value="TK">Tokelau</option>
                          <option value="TO">Tonga</option>
                          <option value="TT">Trinidad and Tobago</option>
                          <option value="TN">Tunisia</option>
                          <option value="TR">Turkey</option>
                          <option value="TM">Turkmenistan</option>
                          <option value="TC">Turks and Caicos Islands</option>
                          <option value="TV">Tuvalu</option>
                          <option value="UG">Uganda</option>
                          <option value="UA">Ukraine</option>
                          <option value="AE">United Arab Emirates</option>
                          <option value="GB">United Kingdom</option>
                          <option value="US">United States</option>
                          <option value="UM">United States Minor Outlying Islands</option>
                          <option value="UY">Uruguay</option>
                          <option value="UZ">Uzbekistan</option>
                          <option value="VU">Vanuatu</option>
                          <option value="VE">Venezuela</option>
                          <option value="VN">Viet Nam</option>
                          <option value="VG">Virgin Islands (British)</option>
                          <option value="VI">Virgin Islands (U.S.)</option>
                          <option value="WF">Wallis and Futuna Islands</option>
                          <option value="EH">Western Sahara</option>
                          <option value="YE">Yemen</option>
                          <option value="YU">Yugoslavia</option>
                          <option value="ZM">Zambia</option>
                          <option value="ZW">Zimbabwe</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <br />
                  <md-button
                    style="border-radius:15px;"
                    class="md-raised md-primary"
                    @click="goBack('second', 'first')"
                  >Back</md-button>
                  <md-button
                    style="border-radius:15px;"
                    class="md-raised md-primary"
                    @click="setDone('second', 'third')"
                  >Continue</md-button>
                </md-step>

                <md-step
                  id="third"
                  :md-done.sync="third"
                  md-label="Step 3: Terms & Conditions"
                  md-description="Required"
                >
                  <iframe
                      width="570"
                      :src="'https://app.termly.io/document/terms-of-use-for-online-marketplace/5c4ca188-e4a8-4d86-b760-1a88ff2915f8'"
                      frameborder="1"
                      style="height:400px;"
                    />
                    <br>
                  <div class="form-check">

                    <input
                      v-model="acceptTerms"
                      type="checkbox"
                      class="form-check-input"
                      id="termsCheck"
                    />
                    <label
                      class="form-check-label"
                      for="termsCheck"
                      style="padding-left:20px;"
                    >Accept</label>
                  </div>
                  <br />
                  <md-button
                    style="border-radius:15px;"
                    class="md-raised md-primary"
                    @click="goBack('third', 'second')"
                  >Back</md-button>
                  <md-button
                    style="border-radius:15px;"
                    class="md-raised md-primary"
                    @click="setDone('third', 'fourth')"
                  >Continue</md-button>
                </md-step>

                <md-step
                  id="fourth"
                  :md-done.sync="fourth"
                  md-label="Step 4: Privacy"
                  md-description="Required"
                >
                  <div class="row">
                    <div class="col">
                      <iframe
                        width="570"
                        style="height:400px;"
                        :src="'https://app.termly.io/document/privacy-policy/a291c868-81c5-4419-81c8-735597b64d86'"
                        frameborder="1"
                      />
                    </div>
                  </div>

                  <!-- Mandatory -->
                  <br>
                  <div class="form-check">

                    <input
                      v-model="acceptPrivacy"
                      type="checkbox"
                      class="form-check-input"
                      id="privacyCheck"
                    />
                    <label
                      class="form-check-label"
                      for="privacyCheck"
                      style="padding-left:20px;"
                    >Accept</label>
                  </div>
                  <br />
                  <md-button
                    style="border-radius:15px;"
                    class="md-raised md-primary"
                    @click="goBack('fourth', 'third')"
                  >Back</md-button>
                  <md-button
                    style="border-radius:15px;"
                    class="md-raised md-primary"
                    @click="setDone('fourth', 'fifth')"
                  >Continue</md-button>
                </md-step>

                <!-- Shippo -->
                <md-step
                  id="fifth"
                  :md-done.sync="fifth"
                  md-label="Step 5: Shipping"
                  md-description="Optional"
                >
                  <div class="row">
                    <div class="col">
                      <img src="../../assets/css/shippo_logo.jpg" alt="Shippo" class="center" />
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="col"
                      style="text-align:center;"
                    >Shippo is our trusted partner for all things shipping, including: expedited shipping, insurrance and dry ice.</div>
                  </div>
                  <br />
                  <br />On
                  <span style="background-color:purple; color:white;">Submit</span> you will redirected to create an account with Shippo
                  to seamlessly manage shipping logistics on our platform.
                  <br />
                  <br />(Not mandatory, but highly recommended!)
                  <br />
                  <br />

                  <md-button
                    class="md-raised md-primary center"
                    style="height:40px; background-color: white; color: purple;"
                    id="btn-login"
                    @click="register()"
                  >Skip Shippo & Sign Up</md-button>

                  <md-button
                    class="md-raised md-primary center"
                    style="height:40px;"
                    id="btn-login"
                    @click="register(), makeShippoApiToken()"
                  >Submit</md-button>
                  <div class="error" v-html="error" />
                </md-step>
              </md-steppers>
            </form>
          </md-card-content>
        </md-card>

        <!-- Footer -->
        <div class="container" id="form-footer">
          <a href="#" id="legal-links">Terms and Conditions</a>
          <br />
          <a
            href="https://app.termly.io/document/privacy-policy/a291c868-81c5-4419-81c8-735597b64d86"
          >Privacy</a>
          <br />
          <hr />
          <p style="text-align:center">Fig Analytics is a certified C Corporation.</p>
          <p style="text-align:center">&copy; FIG 2018. All Rights Reserved.</p>
        </div>
      </div>
    </body>
  </div>
</div>
</template>

<script src="./scripts/register.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/forms.css";
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
</style>

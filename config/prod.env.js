'use strict'
// The client id for both of these hard coded and are also the testing keys
module.exports = {
  NODE_ENV: '"production"',
  stripe_public_key: '"pk_test_CLMSL40and9mdJdOgCRMbLfs"',
  SHIPPO_TEST_API_TOKEN: '"shippo_test_c78b517b07062943d690bbc5791e2ee0943ae929"',
  SHIPPO_CLIENT_ID: '"6c0b60adaeb84bf497bb66c8d522f806"', // the real one
  SHIPPO_CLIENT_SECRET: '"YpiEp5kiqN9J_NVt4Z4iZACX-yT2Zq0Y5rdrMCnTXek"',
  SHIPPO_OAUTH_LINK: "'https://goshippo.com/oauth/authorize?response_type=code&client_id=6c0b60adaeb84bf497bb66c8d522f806&scope=*&state='",
  STRIPE_CONNECT_OAUTH_LINK: "'https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://stripe.com/connect/default/oauth/test&client_id=ca_Fa3eRugg6XNzKWW7TYf3OXyY9p59fn0n&state='"
}

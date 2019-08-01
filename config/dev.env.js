'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  stripe_public_key: '"pk_test_CLMSL40and9mdJdOgCRMbLfs"',
  SHIPPO_TEST_API_TOKEN: '"shippo_test_c78b517b07062943d690bbc5791e2ee0943ae929"',
  SHIPPO_CLIENT_ID: '"6c0b60adaeb84bf497bb66c8d522f806"', // the real one
  SHIPPO_CLIENT_SECRET: '"YpiEp5kiqN9J_NVt4Z4iZACX-yT2Zq0Y5rdrMCnTXek"',
  SHIPPO_OAUTH_LINK: "'https://goshippo.com/oauth/authorize?response_type=code&client_id=6c0b60adaeb84bf497bb66c8d522f806&scope=*&state='"
})

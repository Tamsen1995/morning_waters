'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  stripe_public_key: '"pk_test_CLMSL40and9mdJdOgCRMbLfs"',
  // SHIPPO_CLIENT_ID: '"shippo_test_cec19a3a037d7f159dc021f6b4db26407c0fcb38"',
  SHIPPO_CLIENT_ID: '"6c0b60adaeb84bf497bb66c8d522f806"', // the real one
  SHIPPO_CLIENT_SECRET: '"YpiEp5kiqN9J_NVt4Z4iZACX-yT2Zq0Y5rdrMCnTXek"'

})

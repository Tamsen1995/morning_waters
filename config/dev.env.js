'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  stripe_public_key: '"pk_test_CLMSL40and9mdJdOgCRMbLfs"',
  SHIPPO_CLIENT_ID: '"6c0b60adaeb84bf497bb66c8d522f806"'
})

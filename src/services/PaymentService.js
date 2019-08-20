import Api from '@/services/Api'

export default {
  goToStripeConnectDashboard (stripeConnectAcctInfo) {
    console.log(`\n${JSON.stringify(stripeConnectAcctInfo)}\n`) // TESTING
    return Api().get('seller/payment/stripe_connect/auth/redirect_to_dashboard', {
      params: { stripeConnectAcctInfo }
    })
  },
  makeStripeConnectAccount (userExtracted) {
    var randomString =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)

    window.open(`${process.env.STRIPE_CONNECT_OAUTH_LINK}${randomString}&stripe_user[business_type]=company&stripe_user[email]=${userExtracted.email}`)
  },
  generateSellerStripeConnectClientId (stripeConnectClientIdRequest) {
    return Api().get('seller/payment/stripe_connect/auth/generate_client_id', {
      params: {
        request: stripeConnectClientIdRequest
      }
    })
  },
  checkForBuyerPaymentMethod (buyerId) {
    return Api().get('buyer/payment/checkForPaymentMethod', {
      params: {
        buyerId: buyerId
      }
    })
  },
  chargeBuyerForOrder (orderId) {
    return Api().get('seller/orders/chargeBuyerForOrder', {
      params: {
        orderId: orderId
      }
    })
  },
  getStripeUserInfo (stripeCustomerId) {
    return Api().get('getStripeUserInfo', {
      params: {
        stripeCustomerId: stripeCustomerId
      }
    })
  },

  processPayment (stripeToken) {
    console.log('\nInside of processPayment\n')
    return Api().post('processPayment', stripeToken)
  }

}

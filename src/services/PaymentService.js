import Api from '@/services/Api'

export default {
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

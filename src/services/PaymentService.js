import Api from '@/services/Api'

export default {
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
  },
  getAmountOfCredits (userId) {
    return Api().get('getAmountOfCredits', {
      params: {
        userId: userId
      }
    })
  },
  addSubscription (purchaseSubInfo) {
    return Api().post('addSubscription', purchaseSubInfo)
  }
}

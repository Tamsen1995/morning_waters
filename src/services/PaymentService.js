import Api from '@/services/Api';

export default {
  getStripeUserInfo (stripeCustomerId) {
    return Api().get('getStripeUserInfo', {
      params: {
        stripeCustomerId: stripeCustomerId
      }
    })
  },
  getPaymentHistory (userId) {
    return Api().get('getPaymentHistory', {
      params: {
        userId: userId
      }
    })
  },
  writePaymentHistoryEntry (paymentHistoryEntry) {
    return Api().post('writePaymentHistoryEntry', paymentHistoryEntry)
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
  subtractCredits (uid, amount) {
    const credChargeInfo = {
      uid: uid,
      amount: amount
    }
    return Api().post('subtractCredits', credChargeInfo)
  },
  addCredits (purchaseInfo) {
    // This function will add credits onto the
    // user account of the given userId
    return Api().post('addCredits', purchaseInfo)
  },
  addSubscription (purchaseSubInfo) {
    return Api().post('addSubscription', purchaseSubInfo)
  }
}

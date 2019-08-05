import Api from '@/services/Api'

export default {
  updateDefaultSource (updateDefaultSourceInfo) {
    return Api().post('updateDefaultSource', updateDefaultSourceInfo)
  },
  addPaymentMethod (sourceToBeAdded) {
    return Api().post('addPaymentMethod', sourceToBeAdded)
  },
  updateProfile (uid, newProfileInfo) {
    return Api().get('updateProfile', {
      params: {
        userId: uid,
        newProfileInfo: newProfileInfo
      }
    })
  },
  updatePassword (updatePassInfo) {
    return Api().post('updatePassword', updatePassInfo)
  },
  getStripeUserInfo (userExtracted) {
    const stripeCustomerId = userExtracted.stripeCustomerId
    return Api().get('getStripeUserInfo', {
      params: {
        stripeCustomerId: stripeCustomerId
      }
    })
  }
}

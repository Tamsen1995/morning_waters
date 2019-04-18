import Api from '@/services/Api';

export default {
  unlockOrder (orderId) {
    console.log(`orderId being : ${orderId}`) // TESTING
    return Api().post('/unlockOrder', { orderId })
  },
  getLockedOrders (sellerId) {
    return Api().get('getLockedOrders', {
      params: {
        sellerId: sellerId
      }
    })
  },
  checkForSubscriptionCharge (uid) {
    console.log(`\nI am checking for the subscription charge period\n`) // TESTING
    return Api().get('checkForSubscriptionCharge', {
      params: {
        userId: uid
      }
    })
  },
  getUserInfo () {
    const token = localStorage.getItem('id_token')
    console.log(`\nThe user's token is ${token}\n`)
    return Api().get('dashboard', token)
  },
  searchUser (searchedAfter) {
    return Api().get('searchUsers', {
      params: {
        search: searchedAfter
      }
    })
  },
  getPublicProfileInfo (uid) {
    return Api().get('publicProfileInfo', {
      params: {
        userId: uid
      }
    })
  },
  getContactLists (user) {
    return Api().get('contactLists', {
      params: {
        user: user
      }
    })
  },
  sendQuoteRequest (quoteRequest) {
    return Api().post('postQuoteRequest', { quoteRequest })
  },
  getInboxMessages (userId) {
    return Api().get('getInboxMessages', {
      params: {
        userId: userId
      }
    })
  },
  unlockInboxMsg (quoteIdToBeUnlocked) {
    return Api().post('unlockInboxMsg', { quoteIdToBeUnlocked })
  }
}

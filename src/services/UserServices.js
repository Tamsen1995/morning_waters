import Api from '@/services/Api'

export default {
  getSellerPendingOrders (sellerId) {
    return Api().get('/getSellerPendingOrders', {
      params: {
        sellerId: sellerId
      }
    })
  },
  getSellersOrderItems (sellerId) {
    return Api().get('/getSellersOrderItems', {
      params: {
        sellerId: sellerId
      }
    })
  },
  unlockOrder (orderId) {
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

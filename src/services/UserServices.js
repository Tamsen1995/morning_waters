import Api from '@/services/Api'

export default {

  addSellerAboutSection (aboutInfo) {
    return Api().post('seller/update/about_section', { aboutInfo })
  },
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
  // this function will retrieve either an order
  // order pending order from the back
  // depending on what this pertains to.
  getOrder (orderId) {
    return Api().get('orders/getOrder', {
      params: {
        orderId: orderId
      }
    })
  },
  unlockOrder (orderId) {
    return Api().post('/unlockOrder', { orderId })
  },
  getPendingOrders (sellerId) {
    return Api().get('getPendingOrders', {
      params: {
        sellerId: sellerId
      }
    })
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

    return Api().get('dashboard', token)
  },
  searchUser (searchedAfter) {
    return Api().get('searchUsers', {
      params: {
        search: searchedAfter
      }
    })
  },
  retrieveSellerProfile (sellerId) {
    return Api().get('seller/retrieve', {
      params: {
        sellerId: sellerId
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

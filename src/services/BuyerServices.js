import Api from '@/services/Api'

// TODO : Potentially rename this to BuyerServices

export default {
  createPendingOrder (pendingOrder) {
    return Api().post('createPendingOrder', pendingOrder)
  },
  createOrder (order) {
    return Api().post('createOrder', order)
  },
  sendCorrespondanceMsg (correspondanceMsg) {
    return Api().post('sendCorrespondanceMsg', correspondanceMsg)
  },
  purchaseShoppingCart (purchaseInfo) {
    return Api().post('purchaseShoppingCart', purchaseInfo)
  },
  sendQuoteRequestsCart (purchaseInfo) {
    return Api().post('sendQuoteRequestsCart', purchaseInfo)
  },
  getBuyersQuoteRequests (buyerId) {
    return Api().get('getBuyersQuoteRequests', {
      params: {
        buyerId: buyerId
      }
    })
  },
  getPendingOrders (buyerId) {
    return Api().get('buyer/getPendingOrders', {
      params: {
        buyerId: buyerId
      }
    })
  },
  getBuyersOrders (buyerId) {
    return Api().get('getBuyersOrders', {
      params: {
        buyerId: buyerId
      }
    })
  },
  getBuyerProfileInfo (buyerId) {
    return Api().get('getBuyerProfileInfo', { params: { buyerId: buyerId } })
  },
  updateBuyerPassword (updatePassInfo) {
    return Api().post('updateBuyerPassword', updatePassInfo)
  },
  createUniqueOrderId () {
    return Api().get('createUniqueOrderId')
  }
}

import Api from '@/services/Api'

export default {
  markOrderAsRead (user, orderId) {
    return Api().get('orders/markAsRead', {
      params: {
        // user determines whether it's coming from the buyer or seller side
        user: user,
        orderId: orderId
      }
    })
  },
  // '/inbox/files/download'
  downloadFile (filename) {
    return Api().get('inbox/files/download', {
      params: {
        filename: filename
      }
    })
  },
  uploadFile (file) {
    return Api().post('inbox/upload', file, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  // checks to see if a relationship
  // between buyer and seller is unlocked
  relationshipUnlocked (sellerId, buyerId) {
    return Api().get('seller/orders/isRelationshipUnlocked', {
      params: {
        sellerId: sellerId,
        buyerId: buyerId
      }
    })
  },
  // unlocks a relationship between a buyer and a seller
  unlockRelationship (sellerId, buyerId) {
    return Api().get('seller/orders/unlockRelationship', {
      params: {
        sellerId: sellerId,
        buyerId: buyerId
      }
    })
  },
  submitToPendingOrders (orderId) {
    return Api().post('orders/submitToPendingOrders', orderId)
  },
  confirmOrder (orderConfirm) {
    return Api().post('orders/confirmOrder', orderConfirm)
  },
  updateOrderItem (orderItem) {
    return Api().post('seller/orders/updateOrderItem', { orderItem })
  },
  retrieveServicesNegotiated (orderItems) {
    return Api().get('seller/orders/retrieveServicesNegotiated', {
      params: {
        orderItems: orderItems
      }
    })
  },
  retrieveOrderOrderItems (orderId) {
    return Api().get('orders/retrieveOrderOrderItems', {
      params: {
        orderId: orderId
      }
    })
  },
  retrieveOrderInvoice (orderId) {
    return Api().get('retrieveOrderInvoice', {
      responseType: 'arraybuffer',
      params: {
        orderId: orderId
      }
    })
  },
  generateInvoice (order) {
    return Api().post('generateInvoice', order)
  },
  retrieveCorrespondance (orderId) {
    return Api().get('retrieveCorrespondance', {
      params: {
        orderId: orderId
      }
    })
  },
  sendInquiryToUserInbox (req) {
    return Api().post('sendInquiryToUserInbox', req)
  },
  relayEmail (req) {
    return Api().post('relayEmail', {
      inboxMessageId: req.quoteIdToBeUnlocked,
      email: req.userEmail
    })
  }
}

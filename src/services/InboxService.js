import Api from '@/services/Api'

export default {

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

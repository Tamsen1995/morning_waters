import Api from '@/services/Api'

export default {
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

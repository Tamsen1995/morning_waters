import Api from '@/services/Api';

export default {
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

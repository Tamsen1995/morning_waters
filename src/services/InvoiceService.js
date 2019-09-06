import Api from '@/services/Api'

export default {
  makeInboxInvoice (invoiceInfo) {
    return Api().post('inbox/generateInboxInvoice', invoiceInfo)
  },
  retrieveInboxInvoice (orderId) {
    return Api().get('inbox/retrieveInboxInvoice', {
      params: {
        orderId: orderId
      }
    })
  },
  // takes a complete new invoice and will replace the
  // invoice with the same order id
  // in the back
  modifyInboxInvoice (inboxInvoice) {
    return Api().post('inbox/modifyInboxInvoice', inboxInvoice)
  }
}

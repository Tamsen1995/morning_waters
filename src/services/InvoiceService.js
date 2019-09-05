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
  }
}

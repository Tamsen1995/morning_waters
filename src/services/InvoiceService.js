import Api from '@/services/Api'

export default {
  makeInboxInvoice (invoiceInfo) {
    return Api().post('inbox/generateInboxInvoice', invoiceInfo)
  },
  retrieveInboxInvoice (orderId) {
    return Api().post('inbox/retrieveInboxInvoice', orderId)
  }
}

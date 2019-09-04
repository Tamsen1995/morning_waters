import Api from '@/services/Api'

export default {
  makeInboxInvoice (invoiceInfo) {
    return Api().post('inbox/generateInboxInvoice', invoiceInfo)
  }
}

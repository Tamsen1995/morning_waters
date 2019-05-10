import Api from '@/services/Api'

// TODO : Potentially rename this to BuyerServices

export default {
  appendShippingToOrder (shippingStatus) {
    return Api().put('appendShippingToOrder', shippingStatus)
  },
  generateSellerApiToken (shippoAPItokenRequest) {
    console.log(`\nSSeller : ${shippoAPItokenRequest}\n`) // TESTING
  },
  generateBuyerApiToken (shippoAPItokenRequest) {
    console.log(`\nBuyer : ${shippoAPItokenRequest}\n`) // TESTING
  }

}

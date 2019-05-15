import Api from '@/services/Api'

// TODO : Potentially rename this to BuyerServices

export default {
  appendShippingToOrder (shippingStatus) {
    return Api().put('appendShippingToOrder', shippingStatus)
  },
  generateSellerApiToken (shippoAPItokenRequest) {
    console.log(`\nIls tombent comme domino\n`) // TESTING
    return Api().get('seller/shipping/auth/generateAPItoken', {
      params: {
        sellerId: shippoAPItokenRequest.sellerId,
        client_id: shippoAPItokenRequest.client_id,
        client_secret: shippoAPItokenRequest.client_secret,
        code: shippoAPItokenRequest.code,
        state: shippoAPItokenRequest.state,
        grant_type: shippoAPItokenRequest.grant_type
      }
    })
  },
  generateBuyerApiToken (shippoAPItokenRequest) {
    console.log(`\nBuyer : ${shippoAPItokenRequest}\n`) // TESTING
  }

}

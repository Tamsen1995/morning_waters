import Api from '@/services/Api'

// TODO : Potentially rename this to BuyerServices

export default {
  appendShippingToOrder (shippingStatus) {
    return Api().put('appendShippingToOrder', shippingStatus)
  },
  createOrderOnShippo (orderLogistics) {
    return Api().post('seller/shipping/orders/create_order', orderLogistics)
  },
  generateSellerApiToken (shippoAPItokenRequest) {
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
    return Api().get('buyer/shipping/auth/generateAPItoken', {
      params: {
        buyerId: shippoAPItokenRequest.buyerId,
        client_id: shippoAPItokenRequest.client_id,
        client_secret: shippoAPItokenRequest.client_secret,
        code: shippoAPItokenRequest.code,
        state: shippoAPItokenRequest.state,
        grant_type: shippoAPItokenRequest.grant_type
      }
    })
  }

}

import Api from '@/services/Api'

// TODO : Potentially rename this to BuyerServices

export default {

  // a function which generates a shippo api token
  // for either buyer or seller
  makeShippoApiToken () {
    // Testing if I can just append the shippo flow like so
    var randomString =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)

    window.open(`${process.env.SHIPPO_OAUTH_LINK}${randomString}`)
    // Testing if I can just append the shippo flow like so
  },

  retrieveOrderFromShippo (orderId) {
    return Api().get('seller/shipping/orders/retrieve', {
      params: {
        orderId: orderId
      }
    })
  },
  appendShippingToOrder (shippingStatus) {
    return Api().put('appendShippingToOrder', shippingStatus)
  },
  // This will activate an order after shipping
  // logistics have been ruled out
  activateOrder (orderId) {
    return Api().post('seller/shipping/orders/activateOrder', orderId)
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

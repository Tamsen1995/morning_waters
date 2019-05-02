import Api from '@/services/Api';

// TODO : Potentially rename this to BuyerServices

export default {
  appendShippingToOrder (buyerHasToShipSamples) {
    return Api().put('appendShippingToOrder', buyerHasToShipSamples)
  }
}

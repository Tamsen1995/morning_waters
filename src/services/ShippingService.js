import Api from '@/services/Api';

// TODO : Potentially rename this to BuyerServices

export default {
  appendShippingToOrder (shippingStatus) {
    return Api().put('appendShippingToOrder', shippingStatus)
  }
}

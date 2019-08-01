import BuyerHeader from '@/components/buyerComponents/BuyerHeader.vue'
import InboxService from '@/services/InboxService'
import UserServices from '@/services/UserServices'
import ShippingService from '@/services/ShippingService'

export default {
  data () {
    return {
      orderId: '',
      // 1 seller side confirmed
      // 2 buyer side confirmed
      // 3 seller side shipping confirmed
      orderStatusInt: 0,
      // if the pending order's shipping has been confirmed,
      // that means we can render this variable
      shipping_confirmed_date: '',

      shippoOrder: null
    }
  },
  async created () {

  },
  async mounted () {
    this.orderId = this.$route.params.orderId
    this.retrieveOrderStatus(this.orderId)
    this.retrieveOrderStatusFromShippo(this.orderId)
  },
  methods: {
    async redirectToShippo () {
      try {
        console.log(`\n\nTODO : Here the user will be redirected to shippo\n`) // TESTING
        var url = 'https://apps.goshippo.com/orders'
        window.location = url
      } catch (error) {
        if (error) throw error
      }
    },
    async retrieveOrderStatusFromShippo (orderId) {
      try {
        // the order id will be represented as the order number in Shippo
        this.shippoOrder = (await ShippingService.retrieveOrderFromShippo(orderId)).data
        console.log(`\n\nThe shippo order is : ${JSON.stringify(this.shippoOrder)}\n\n`) // TESTING
      } catch (error) {
        if (error) throw error
      }
    },
    async retrieveOrderStatus (orderId) {
      try {
        const order = (await UserServices.getOrder(this.orderId)).data

        if (order && order.order && order.order.seller_confirmed) {
          this.orderStatusInt = 1
        }
        if (
          order &&
          order.order &&
          (order.order.buyer_confirmed || order.order.active === false)
        ) {
          this.orderStatusInt = 2
        }

        if (order && order.order && order.order.active === true) {
          this.orderStatusInt = 3
          this.shipping_confirmed_date = order.order.shipping_confirmed
        }
      } catch (error) {
        console.log(`\nThe error in retrieveOrderStatus ${error}\n`) // TESTING
        if (error) throw error
      }
    }
  },
  components: {
    BuyerHeader
  }
}

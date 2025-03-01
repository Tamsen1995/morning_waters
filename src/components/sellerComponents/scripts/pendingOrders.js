import DashboardHeader from '@/components/sellerComponents/DashboardHeader.vue'
import ShippingService from '@/services/ShippingService'
import PaymentService from '@/services/PaymentService'
import UserServices from '@/services/UserServices'
import InboxServices from '@/services/InboxService'
import { ResponsiveDirective } from 'vue-responsive-components'

export default {
  data () {
    return {
      orderToBeConfirmed: null,
      // this will upon the call of the modal be
      // turned into an array then used to hold the individual shipping logistics
      // for the order which was called upon
      //   orders: null,
      pendingOrders: null,
      shippoOrders: [],
      orderItems: null,
      seller_shipping: false,
      buyer_shipping: false
    }
  },
  async created () {
    await this.getSellerPendingOrders()
    await this.getBuyerPendingOrdersOrderItems()
    this.pendingOrders.reverse()
  },
  mounted () {
  },
  components: {
    DashboardHeader
  },
  directives: {
    responsive: ResponsiveDirective
  },
  methods: {

    async getSellerPendingOrders () {
      try {
        this.shippoOrders = []
        const userExtracted = this.$store.getters.getUserInfo

        const response = await UserServices.getSellerPendingOrders(
          userExtracted.id
        )
        this.pendingOrders = response.data
      } catch (error) {
        if (error) throw error
      }
    },

    async getBuyerPendingOrdersOrderItems () {
      try {
        for (var i = 0; i < this.pendingOrders.length; i++) {
          var response = await InboxServices.retrieveOrderOrderItems(this.pendingOrders[i].orderId)

          const response2 = await InboxServices.retrieveServicesNegotiated(response.data.orderItems)
          this.pendingOrders[i].servicesNegotiated = response2.data

          this.pendingOrders[i].orderItems = response.data.orderItems
        }

        var tmp = this.pendingOrders
        this.pendingOrders = []
        this.pendingOrders = tmp
        console.log(`\n\nIn here we wanna get the buyer pending orders order items : ${JSON.stringify(this.pendingOrders)}\n`) // TESTING
      } catch (error) {
        if (error) throw error
      }
    },
    async goToOrderStatus (index) {
      try {
        const pendingOrder = this.pendingOrders[index]

        this.$router.push({
          name: 'pendingOrderStatus',
          params: { orderId: pendingOrder.orderId }
        })
      } catch (error) {
        if (error) throw error
      }
    },
    async createOrder () {
      try {
        // retrieving order items in order to calculate full price
        var orderItems = (await InboxServices.retrieveOrderOrderItems(this.orderToBeConfirmed.orderId)).data.orderItems
        var totalPriceCharged = 0
        for (var i = 0; i < orderItems.length; i++) {
          totalPriceCharged = totalPriceCharged + (orderItems[i].price * orderItems[i].amount)
        }

        // sending the total price and orderid to the web server
        await PaymentService.chargeBuyerForOrder({
          orderId: this.orderToBeConfirmed.orderId,
          totalPriceCharged: totalPriceCharged
        })
        await ShippingService.activateOrder({ orderId: this.orderToBeConfirmed.orderId })
        await ShippingService.createOrderOnShippo({
          orderId: this.orderToBeConfirmed.orderId,
          seller_shipping: this.seller_shipping,
          buyer_shipping: this.buyer_shipping
        })
        this.$modal.hide('ask-seller-if-seller-needs-to-ship')
      } catch (error) {
        //
        if (error) throw error
      }
    },
    async confirmOrder (index) {
      try {
        this.orderToBeConfirmed = this.pendingOrders[index]
        ShippingService.makeShippoApiToken() // This might be relocated to somewhere else
        this.$modal.show('ask-seller-if-seller-needs-to-ship')
      } catch (error) {
        console.log(`\nAn error occurred in confirmOrder ${error}\n`) // TESTING
        if (error) throw error
      }
    }
  }
}

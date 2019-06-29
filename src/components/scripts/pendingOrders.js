import DashboardHeader from '@/components/DashboardHeader.vue'
import PageHeader from '@/components/Header.vue'
import AuthenticationService from '@/services/AuthenticationService'
import ShippingService from '@/services/ShippingService'
import PaymentService from '@/services/PaymentService'
import UserServices from '@/services/UserServices'
import Api from '@/services/Api'
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
      orderItems: null,
      seller_shipping: false,
      buyer_shipping: false
    }
  },
  async created () {
    await this.getSellerPendingOrders()
    await this.retrieveOrdersFromShippo()

    // await this.getSellerOrders()
    // await this.getSellerOrderItems();
  },
  mounted () {
  },
  components: {
    DashboardHeader
  },
  directives: {},
  methods: {
    async retrieveOrdersFromShippo () {
      try {
        const userExtracted = this.$store.getters.getUserInfo
        const sellerId = userExtracted.id
        const response = await ShippingService.retrieveOrdersFromShippo(sellerId)

        const shippoOrders = response.data.results
        console.log(`\nresponse : JSON.str ${JSON.stringify(shippoOrders)}\n`) // TESTIN
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
    async getSellerPendingOrders () {
      try {
        const userExtracted = this.$store.getters.getUserInfo

        const response = await UserServices.getSellerPendingOrders(
          userExtracted.id
        )
        this.pendingOrders = response.data
      } catch (error) {
        if (error) throw error
      }
    },
    async createOrderOnShippo () {
      try {
        // We can charge the buyer here for now
        await PaymentService.chargeBuyerForOrder(this.orderToBeConfirmed.orderId)
        await ShippingService.activateOrder({ orderId: this.orderToBeConfirmed.orderId })
        await ShippingService.createOrderOnShippo({
          orderId: this.orderToBeConfirmed.orderId,
          seller_shipping: this.seller_shipping,
          buyer_shipping: this.buyer_shipping
        })
        this.$modal.hide('ask-seller-if-seller-needs-to-ship')
      } catch (error) {
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

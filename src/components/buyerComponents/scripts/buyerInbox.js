import BuyerHeader from '@/components/buyerComponents/BuyerHeader'
import MessagingPanel from '@/components/buyerComponents/buyerInbox/MessagingPanel'
import NegotiationInterface from '@/components/buyerComponents/buyerInbox/NegotiationInterface'
import BuyerServices from '@/services/BuyerServices'
import InboxService from '@/services/InboxService'
import { ResponsiveDirective } from 'vue-responsive-components'

export default {
  data () {
    return {
      orders: [],
      companyName: '',
      pendingOrders: [],
      buyer: null,
      seller: null,

      quoteRequest: null,
      order: null,
      orderItems: [],
      amtForServicesNegotiated: [],
      servicesNegotiated: [],
      // orders:[] is an array holding several objects, each representing an order
      totalPrice: 0.0,
      quoteOrders: [],
      dropdownVariable: 'All messages',
      correspondanceMessages: [],
      message: ''
    }
  },
  async created () {
    await this.getBuyersOrders()
    await this.getBuyersPendingOrders()
    if (this.orders.length > 0) {
      this.showOrder(this.orders[0])
      this.retrieveOrderOrderItems(this.orders[0])
    } else if (this.pendingOrders.length > 0) {
      this.showOrder(this.pendingOrders[0])
    }
  },
  async mounted () {
  },
  components: {
    BuyerHeader,
    MessagingPanel,
    NegotiationInterface
  },
  directives: {
    responsive: ResponsiveDirective
  },
  methods: {
    async redirectToOrderStatus () {
      try {
        const orderId = this.order.orderId

        this.$router.push({
          name: 'buyerOrderStatus',
          params: { orderId: orderId }
        })
      } catch (error) {
        if (error) throw error
      }
    },

    async closeConfirmationModal () {
      try {
        this.$modal.hide('would-you-like-confirm')
      } catch (error) {
        if (error) throw error
      }
    },

    async closeSubmitPrompt () {
      try {
        this.$modal.hide('would-you-like-to-submit')
      } catch (error) {
        if (error) throw error
      }
    },
    async submitOrder () {
      try {
        console.log(`\n\nThis function is to submit the order\n\n`) // TESTING
        await InboxService.confirmOrder({
          orderId: this.order.orderId,
          user: 'buyer'
        })
        await InboxService.submitToPendingOrders({ orderId: this.order.orderId })
        if (this.order && this.order.seller_confirmed === true) {
          this.$router.push({
            name: 'buyerDashboard'
          })
        }
      } catch (error) {
        if (error) throw error
      }
    },
    async retrieveOrderOrderItems (order) {
      try {
        const orderId = order.orderId
        const response = await InboxService.retrieveOrderOrderItems(orderId)
        const servicesNegotiated = (await InboxService.retrieveServicesNegotiated(response.data.orderItems)).data

        this.orderItems = null
        this.orderItems = response.data.orderItems
        this.amtForServicesNegotiated = []
        this.totalPrice = 0.0
        for (var i = 0; i < this.orderItems.length; i++) {
          this.amtForServicesNegotiated.push(this.orderItems[i].amount)
          this.totalPrice = this.totalPrice + this.orderItems[i].price
        }
        this.servicesNegotiated = []
        this.servicesNegotiated = servicesNegotiated
      } catch (error) {
        console.log(`\nError in retrieveOrderOrderItems\n`) // TESTING
        if (error) throw error
      }
    },
    async showOrder (order) {
      try {
        const orderId = order.orderId
        const response = await InboxService.retrieveCorrespondance(orderId)

        this.servicesNegotiated = []
        this.order = order
        this.buyer = (await BuyerServices.getBuyerProfileInfo(order.buyerId)).data.buyer
        this.seller = (await UserServices.getUserInfo(order.sellerId)).data
        this.correspondanceMessages = response.data.correspondance
      } catch (error) {
        if (error) throw error
      }
    },
    async getBuyersPendingOrders () {
      try {
        const buyerExtracted = this.$store.getters.getBuyerInfo

        const buyerId = buyerExtracted.id
        const response = await BuyerServices.getPendingOrders(buyerId)
        this.pendingOrders = response.data.pendingOrders
      } catch (error) {
        if (error) throw error
      }
    },
    async getBuyersOrders () {
      try {
        const buyerExtracted = this.$store.getters.getBuyerInfo
        const response = await BuyerServices.getBuyersOrders(buyerExtracted.id)

        this.orders = response.data.orders
      } catch (error) {
        if (error) throw error
      }
    }

  }
}

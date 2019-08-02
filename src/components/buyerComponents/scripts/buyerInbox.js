import BuyerHeader from '@/components/buyerComponents/BuyerHeader'
import MessagingPanel from '@/components/buyerComponents/buyerInbox/MessagingPanel'
import NegotiationInterface from '@/components/buyerComponents/buyerInbox/NegotiationInterface'
import BuyerServices from '@/services/BuyerServices'
import InboxService from '@/services/InboxService'
import UserServices from '@/services/UserServices'
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
      this.retrieveOrderOrderItems(this.pendingOrders[0])
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

    async closeConfirmationModal () {
      try {
        this.$modal.hide('would-you-like-confirm')
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

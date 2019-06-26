import BuyerHeader from '@/components/buyerComponents/BuyerHeader'
import BuyerServices from '@/services/BuyerServices'
import InboxService from '@/services/InboxService'
import UserServices from '../../../services/UserServices'

export default {
  data () {
    return {
      orders: [],
      pendingOrders: [],

      buyerQuoteRequests: null,
      quoteRequest: null,
      order: null,
      orderItems: [],
      servicesNegotiated: [],
      // orders:[] is an array holding several objects, each representing an order
      quoteOrders: [],
      dropdownVariable: 'All messages',
      correspondanceMessages: [],
      message: ''
    }
  },
  async created () {
    await this.getBuyersOrders()
    await this.getBuyersPendingOrders()
    if (this.buyerQuoteRequests.length > 0) {
      this.segmentBuyerQuoteRequests()
    }
  },
  async mounted () {
  },
  components: {
    BuyerHeader
  },
  methods: {
    async confirmOrder () {
      try {
        await InboxService.confirmOrder({
          orderId: this.order.orderId,
          user: 'buyer'
        })

        await InboxService.submitToPendingOrders({ orderId: this.order.orderId })

        // const response = await InboxService.checkIfOrderIsConfirmed({ orderId: this.order.orderId })
        if (this.order && this.order.seller_confirmed === true) {
          this.$router.push({
            name: 'buyerDashboard'
          })
        }
      } catch (error) {
        console.log(`\nAn error occurred inside of confirmOrder\n`) // TESTING
        if (error) throw error
      }
    },
    async submitMessage () {
      try {
        console.log(`\norder : ${JSON.stringify(this.order)}\n`) // TESTING
        var correspondanceMsg = null
        if (this.order !== null) {
          correspondanceMsg = {
            orderId: this.order.orderId,
            buyerId: this.order.buyerId,
            // by userId we mean to say the id of the seller in the db
            userId: this.order.sellerId,
            date: '',
            sender: 'buyer',
            message: this.message
          }
        } else if (this.quoteRequest !== null) {
          correspondanceMsg = {
            orderId: this.quoteRequest.orderId,
            buyerId: this.quoteRequest.buyerId,
            userId: this.quoteRequest.sellerId,
            date: 'nothing for now',
            sender: 'buyer',
            message: this.message
          }
        }

        await BuyerServices.sendCorrespondanceMsg(correspondanceMsg)
        const response = await InboxService.retrieveCorrespondance(correspondanceMsg.orderId)
        this.correspondanceMessages = response.data.correspondance
        this.message = ''
        if (this.order !== null) {
          this.showOrder(this.order)
        } else if (this.quoteRequest !== null) {
          this.showQuoteRequest(this.quoteRequest)
        }
        // this.showMessage(this.order)
      } catch (error) {
        if (error) throw error
      }
    },

    async showQuoteRequest (request) {
      try {
        this.quoteRequest = request
        this.order = null
        const orderId = request.orderId
        const response = await InboxService.retrieveCorrespondance(orderId)
        this.correspondanceMessages = response.data.correspondance
      } catch (error) {
        if (error) throw error
      }
    },
    async retrieveOrderOrderItems (order) {
      try {
        const response = await InboxService.retrieveOrderOrderItems(order.orderId)
        const response2 = await InboxService.retrieveServicesNegotiated(response.data.orderItems)

        this.orderItems = response.data.orderItems
        this.servicesNegotiated = response2.data
      } catch (error) {
        console.log(`\nError in retrieveOrderOrderItems\n`) // TESTING
        if (error) throw error
      }
    },
    async showOrder (order) {
      try {
        this.order = order
        this.quoteRequest = null
        const orderId = order.orderId

        const response = await InboxService.retrieveCorrespondance(orderId)
        this.correspondanceMessages = response.data.correspondance
      } catch (error) {
        if (error) throw error
      }
    },
    async switchMessagesDisplayed (messagesDisplayed) {
      try {
        if (messagesDisplayed === 'all') {
          this.dropdownVariable = 'All messages'
        } else if (messagesDisplayed === 'orders') {
          this.dropdownVariable = 'Orders'
          this.getLockedOrders()
        } else if (messagesDisplayed === 'quoteRequests') {
          this.dropdownVariable = 'Quote Requests'
        }
      } catch (error) {
        console.log(`\n\nAn error occurred in switchMessagesDisplayed : ${error}\n`) // TESTING
        if (error) throw error
      }
    },

    async getBuyersQuoteRequests () {
      try {
        const buyerExtracted = this.$store.getters.getBuyerInfo
        const response = await BuyerServices.getBuyersQuoteRequests(
          buyerExtracted.id
        )
        this.buyerQuoteRequests = response.data.buyerQuoteRequests
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

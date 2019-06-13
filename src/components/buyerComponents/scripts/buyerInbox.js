import BuyerHeader from '@/components/buyerComponents/BuyerHeader'
import BuyerServices from '@/services/BuyerServices'
import InboxService from '@/services/InboxService'

export default {
  data () {
    return {
      orders: [],
      buyerQuoteRequests: null,
      quoteRequest: null,
      order: null,
      // orders:[] is an array holding several objects, each representing an order
      quoteOrders: [],
      dropdownVariable: 'All messages',
      correspondanceMessages: [],
      message: ''
    }
  },
  async created () {
    await this.getBuyersOrders()
    await this.getBuyersQuoteRequests()
    // if (this.buyerOrderItems.length > 0) {
    //   this.segmentOrderItems()
    // }
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
        console.log(`\n\n\nThe correspondenceMessages for buyer : ${this.correspondanceMessages}\n`) // TESTING
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
    async goToQuoteCorrespondance (index) {
      try {
        console.log(`\nWe're gonna be different ${index}\n`) // TESTING
      } catch (error) {
        if (error) throw error
      }
    },
    async goToCorrespondance (index) {
      try {
        this.$store.dispatch('setObjectToBeSent', this.orders[index])
        this.$router.push({
          name: 'buyerCorrespondance'
        })
      } catch (error) {
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
    async getBuyersOrders () {
      try {
        const buyerExtracted = this.$store.getters.getBuyerInfo
        const response = await BuyerServices.getBuyersOrders(buyerExtracted.id)

        this.orders = response.data.orders
        console.log(`\nThe stars will not align : ${JSON.stringify(response.data.orders)}\n`) // TESTING

        // const buyerOrderItems = response.data.orderItems

        // this.buyerOrderItems = buyerOrderItems
      } catch (error) {
        if (error) throw error
      }
    }
  }
}

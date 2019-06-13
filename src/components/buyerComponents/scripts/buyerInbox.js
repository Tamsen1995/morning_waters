import BuyerHeader from '@/components/buyerComponents/BuyerHeader'
import BuyerServices from '@/services/BuyerServices'

export default {
  data () {
    return {
      buyerOrderItems: null,
      buyerQuoteRequests: null,
      // orders:[] is an array holding several objects, each representing an order
      orders: [],
      quoteOrders: [],
      dropdownVariable: 'All messages'

    }
  },
  async created () {
    await this.getBuyersOrders()
    await this.getBuyersQuoteRequests()
    if (this.buyerOrderItems.length > 0) {
      this.segmentOrderItems()
    }
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

    async segmentBuyerQuoteRequests () {
      try {
        // Filtering out the orderIds
        var currentOrderId = this.buyerQuoteRequests[0].orderId
        var orderIds = []
        orderIds.push(currentOrderId)
        for (var i = 0; i < this.buyerQuoteRequests.length; i++) {
          if (this.buyerQuoteRequests[i].orderId !== currentOrderId) {
            orderIds.push(this.buyerQuoteRequests[i].orderId)
            currentOrderId = this.buyerQuoteRequests[i].orderId
          }
        }
        // Filtering out the orderIds

        //

        // creating an array with the different quote requests in them
        for (var k = 0; k < orderIds.length; k++) {
          var array = []
          array = this.buyerQuoteRequests.filter(quoteRequest => quoteRequest.orderId === orderIds[k])
          this.quoteOrders.push(array)
        }
        // creating an array with the different quote requests in them
      } catch (error) {
        if (error) throw error
      }
    },
    async segmentOrderItems () {
      try {
        var previousOrderId = this.buyerOrderItems[0].orderId
        var order = []
        // iterates through the buyer order items and segments all the orders into their
        // respective order ids
        for (var i = 0; i < this.buyerOrderItems.length; i++) {
          if (previousOrderId === this.buyerOrderItems[i].orderId) {
            order.push(this.buyerOrderItems[i])

            if (this.buyerOrderItems.length === i + 1) {
              this.orders.push(order)
              order = []
              previousOrderId = this.buyerOrderItems[i].orderId
            }
          } else {
            this.orders.push(order)
            order = []
            previousOrderId = this.buyerOrderItems[i].orderId
          }
        }
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

        const buyerOrderItems = response.data.orderItems
        this.buyerOrderItems = buyerOrderItems
      } catch (error) {
        if (error) throw error
      }
    }
  }
}

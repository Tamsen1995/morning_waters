import BuyerHeader from '@/components/buyerComponents/BuyerHeader';
import BuyerServices from '@/services/BuyerServices';

export default {
  data () {
    return {
      buyerOrderItems: null,
      buyerQuoteRequests: null,
      // orders:[] is an array holding several objects, each representing an order
      orders: []
    }
  },
  async created () {
    await this.getBuyersOrders()
    await this.getBuyersQuoteRequests()
    await this.compileOrders()
  },
  async mounted () {},
  components: {
    BuyerHeader
  },
  methods: {
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
    // This takes all the orders according to their order id
    // and compiles them into individual orders/correspondances
    async compileOrders () {
      try {
        if (this.buyerOrderItems.length > 0) {
          this.segmentOrderItems()
          this.consolidateQuoteRequests()
        }
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
    async consolidateQuoteRequests () {
      try {
        for (var i = 0; i < this.orders.length; i++) {
          for (var indx = 0; indx < this.buyerQuoteRequests.length; indx++) {
            if (
              this.orders[i][0].orderId ===
              this.buyerQuoteRequests[indx].orderId
            ) {
              this.orders[i].push(this.buyerQuoteRequests[indx])
            }
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

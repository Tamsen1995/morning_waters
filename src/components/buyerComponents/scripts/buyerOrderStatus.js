import BuyerHeader from '@/components/buyerComponents/BuyerHeader.vue'
import InboxService from '@/services/InboxService'
import UserServices from '@/services/UserServices'
export default {
  data () {
    return {
      orderId: '',
      // This array will hold the 'statusUpdates'
      // necessary in order to populate the status timeline.
      // Each statusUpdate will render a bubble as well as a written update
      // in the timeline
      orderStatusInt: 0,

      // if the pending order's shipping has been confirmed,
      // that means we can render this variable
      shipping_confirmed_date: ''
    }
  },
  async created () { },
  async mounted () {
    this.orderId = this.$route.params.orderId
    this.retrieveOrderStatus(this.orderId)
  },
  methods: {
    async retrieveOrderStatus (orderId) {
      try {
        const order = (await UserServices.getOrder(this.orderId)).data
        console.log(
          `\nI am printing the response for the order status : ${JSON.stringify(
            order
          )}\n`
        ) // TESTING

        // this.orderStatusInt = 2; // TESTING
        // have a nested if statement
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

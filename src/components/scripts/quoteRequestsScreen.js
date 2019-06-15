import UserServices from '@/services/UserServices'
import InboxService from '@/services/InboxService'
import PaymentService from '@/services/PaymentService'
import BuyerServices from '@/services/BuyerServices'
import DashboardHeader from '@/components/DashboardHeader.vue'
import { ResponsiveDirective } from 'vue-responsive-components'

var $ = require('jQuery')

export default {
  data () {
    return {
      // this array shows up in the inbox to the left
      correspondanceMessages: [],
      message: '',
      orders: [],
      pendingOrders: [],
      quoteRequests: null,
      order: null,
      quoteRequest: null,
      complete: true,
      stripeOptions: {},
      credits: 0,
      orderIdClickedOn: '',
      showLockedMessages: true,

      // the variable which is shown on the dropdown menu
      dropdownVariable: 'All messages'
    }
  },
  components: {
    DashboardHeader
  },
  directives: {
    responsive: ResponsiveDirective
  },
  async mounted () {
    await this.getLockedOrders()
    await this.getPendingOrders()
    await this.getInboxMessages()
  },
  methods: {

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
    async generateInvoice () {
      try {
        InboxService.generateInvoice(this.order)
        console.log(`\nThis button should ideally generate an invoice\n`) // TESTING
      } catch (error) {
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
            sender: 'seller',
            message: this.message
          }
        } else if (this.quoteRequest !== null) {
          correspondanceMsg = {
            orderId: this.quoteRequest.orderId,
            buyerId: this.quoteRequest.buyerId,
            userId: this.quoteRequest.sellerId,
            date: 'nothing for now',
            sender: 'seller',
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
    async getPendingOrders () {
      try {
        const userExtracted = this.$store.getters.getUserInfo
        const userId = userExtracted.id
        const response = await UserServices.getPendingOrders(userId)
        console.log(`\nthe response for pending orders is : ${JSON.stringify(response)}\n`) // TESTING
      } catch (error) {
        if (error) throw error
      }
    },
    // Loads the locked quote requests into the inbox view on the left
    async getLockedOrders () {
      try {
        const userExtracted = this.$store.getters.getUserInfo
        const userId = userExtracted.id

        const response = await UserServices.getLockedOrders(userId)
        this.orders = response.data.orders
        var filtered = this.orders.filter(function (elem) {
          if (elem.locked === true) {
            return true
          } else {
            return false
          }
        })
        this.orders = filtered
        console.log(`\nThe orders found are - > ${JSON.stringify(this.orders)}\n`) // TESTING
        if (this.orders !== undefined || this.orders.length > 0) {
          this.orders = filtered

          this.showOrder(this.orders[0])
        }
      } catch (error) {
        if (error) throw error
      }
    },

    // This function also sets the clicked on variable
    // of the message
    async retrieveCorrespondance (orderId) {
      try {
        const response = await InboxService.retrieveCorrespondance(orderId)
        this.correspondanceMessages = response.data.correspondance
      } catch (error) {
        if (error) throw error
      }
    },

    async getInboxMessages () {
      try {
        const sellerExtracted = this.$store.getters.getUserInfo
        const response = await UserServices.getInboxMessages(sellerExtracted.id)

        this.quoteRequests = response.data.inboxMessages
        console.log(`\n\n\n\nThe response I get is  -- >: ${JSON.stringify(this.quoteRequests)}\n`) // TESTING
      } catch (error) {
        if (error) throw error
      }
    }
  }

}

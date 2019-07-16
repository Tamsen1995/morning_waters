import UserServices from '@/services/UserServices'
import InboxService from '@/services/InboxService'
import PaymentService from '@/services/PaymentService'
import BuyerServices from '@/services/BuyerServices'
import DashboardHeader from '@/components/sellerComponents/DashboardHeader.vue'
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
      orderItems: null,
      servicesNegotiated: null,
      amtForServicesNegotiated: [],
      order: null,
      buyer: null,
      seller: null,
      totalPrice: 0.0,
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
    await this.getPendingOrders()
    await this.getLockedOrders()
    await this.discernLockedCorrespondences()
  },
  methods: {
    // goes through the array of orders and pending orders
    // finds the order with the appropiate order id
    // and then displays that order with the showOrder function
    async showOrderWithOrderId (orderId) {
      try {
        for (var k = 0; k < this.orders.length; k++) {
          if (this.orders[k].orderId === orderId) {
            this.showOrder(this.orders[k])
            break
          }
        }
      } catch (error) {
        if (error) throw error
      }
    },
    async unlockRelationship () {
      try {
        await InboxService.unlockRelationship(this.order.sellerId, this.order.buyerId)
        await this.getPendingOrders()
        await this.getLockedOrders()
        await this.discernLockedCorrespondences()
      } catch (error) {
        if (error) throw error
      }
    },

    async discernLockedCorrespondences () {
      try {
        // checking if orders are is unlocked or not so we can block the seller
        // from  interaction when it's locked
        if (this.pendingOrders && this.pendingOrders.length > 0) {
          for (var k = 0; k < this.pendingOrders.length; k++) {
            this.pendingOrders[k].locked = (await InboxService.relationshipUnlocked(this.pendingOrders[k].sellerId, this.pendingOrders[k].buyerId)).data
          }
          this.showOrder(this.pendingOrders[0])
        }

        if (this.orders && this.orders.length > 0) {
          for (var i = 0; i < this.orders.length; i++) {
            this.orders[i].locked = (await InboxService.relationshipUnlocked(this.orders[i].sellerId, this.orders[i].buyerId)).data
          }

          this.showOrder(this.orders[0])
          this.retrieveOrderOrderItems(this.orders[0])
        }
      } catch (error) {
        if (error) throw error
      }
    },
    async getPendingOrders () {
      try {
        const userExtracted = this.$store.getters.getUserInfo
        const userId = userExtracted.id
        const response = await UserServices.getPendingOrders(userId)
        // console.log(`\nthe response for pending orders is : ${JSON.stringify(response.data)}\n`) // TESTING
        this.pendingOrders = response.data
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
      } catch (error) {
        if (error) throw error
      }
    },
    // whenever a change occurrs in the negotiation
    // interface, this dynamically modifies the values of the orderitems in the back
    async updateOrderItems (index) {
      try {
        this.orderItems[index].amount = this.amtForServicesNegotiated[index]
        this.orderItems[index].price = this.servicesNegotiated[index].servicePrice * this.amtForServicesNegotiated[index]
        await InboxService.updateOrderItem(this.orderItems[index])
        this.retrieveOrderOrderItems(this.order)
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
        console.log(`\nThe error found in retrieveOrderOrderItems : ${error}\n`) // TESTING
        if (error) throw error
      }
    },

    async showOrder (order) {
      try {
        // emptying this arr in case order is a pending order
        this.servicesNegotiated = []
        this.order = order
        this.buyer = (await BuyerServices.getBuyerProfileInfo(order.buyerId)).data.buyer
        this.seller = this.$store.getters.getUserInfo

        const orderId = order.orderId
        this.orderItems = null

        // retrieving the correspondence itself (the conversation)
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
    async closeSubmitPrompt () {
      try {
        this.$modal.hide('would-you-like-to-submit')
      } catch (error) {
        if (error) throw error
      }
    },
    async submitOrderPrompt () {
      try {
        this.$modal.show('would-you-like-to-submit')
      } catch (error) {
        if (error) throw error
      }
    },
    async submitOrder () {
      try {
        const orderId = this.order.orderId
        // set the order confirmed on the seller side to true
        await InboxService.confirmOrder({
          orderId: orderId,
          user: 'seller'
        })
        await this.getLockedOrders()
        await this.getPendingOrders()
        this.showOrderWithOrderId(orderId)
        this.$modal.hide('would-you-like-to-submit')
      } catch (error) {
        console.log(`\nThe error occurred in submitOrder : ${error}\n`) // TESTING
        if (error) throw error
      }
    },
    async submitMessage () {
      try {
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
        }

        await BuyerServices.sendCorrespondanceMsg(correspondanceMsg)
        const response = await InboxService.retrieveCorrespondance(correspondanceMsg.orderId)
        this.correspondanceMessages = response.data.correspondance
        this.message = ''
        if (this.order !== null) {
          this.showOrder(this.order)
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
        this.correspondanceMessaes = response.data.correspondance
      } catch (error) {
        if (error) throw error
      }
    }
  }

}

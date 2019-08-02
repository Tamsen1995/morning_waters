import BuyerHeader from '@/components/buyerComponents/BuyerHeader'
import BuyerServices from '@/services/BuyerServices'
import InboxService from '@/services/InboxService'
import PaymentService from '@/services/PaymentService'
import BuyerSettingsBillingsTab from '@/components/buyerComponents/BuyerSettingsBillingsTab'
import SettingsService from '@/services/SettingsService'
import UserServices from '../../../services/UserServices'
// let stripe = Stripe(process.env.stripe_public_key)

export default {
  data () {
    return {
      orders: [],
      companyName: '',
      pendingOrders: [],
      buyer: null,
      seller: null,
      buyerQuoteRequests: null,
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
    BuyerSettingsBillingsTab
  },
  methods: {
    async redirectToOrderStatus () {
      try {
        console.log(`\ndirect the focus\n`) // TESTING
      } catch (error) {
        if (error) throw error
      }
    },
    async submitPaymentMethod (card, stripe) {
      try {
        const buyerExtracted = this.$store.getters.getBuyerInfo
        const buyerId = buyerExtracted.id
        const stripeCustomerId = buyerExtracted.stripeCustomerId
        const token = await stripe.createToken(card)
        const sourceToBeAdded = {
          uid: buyerId,
          stripeCustomerId: stripeCustomerId,
          stripeToken: token
        }
        await SettingsService.addPaymentMethod(sourceToBeAdded)

        this.$modal.hide('add-payment-method')
        this.confirmOrder()
      } catch (error) {
        if (error) throw error
      }
    },
    // this will render the modal to add a payment method with
    async addPaymentMethod () {
      try {
        this.$modal.show('add-payment-method')
        this.$modal.hide('no-buyer-method-detected')
      } catch (error) {
        if (error) throw error
      }
    },
    async closePaymentMethodModal () {
      try {
        this.$modal.hide('no-buyer-method-detected')
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
    async promptForOrderConfirmation () {
      try {
        const buyerExtracted = this.$store.getters.getBuyerInfo
        const buyerHasPaymentMethod = (await PaymentService.checkForBuyerPaymentMethod(buyerExtracted.id)).data

        if (buyerHasPaymentMethod === true) {
          this.$modal.show('would-you-like-confirm')
        } else {
          this.$modal.show('no-buyer-method-detected')
        }
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
        console.log(`\n\nThis function is to submit the order\n\n`) // TESTING
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
          this.retrieveOrderOrderItems(this.order)
        }
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

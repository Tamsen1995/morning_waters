import InboxService from '@/services/InboxService'
import InvoiceService from '@/services/InvoiceService'
import UserServices from '@/services/UserServices'
import BuyerServices from '@/services/BuyerServices'

export default {
  data () {
    return {
      terms: '',
      itemsToBeAdded: [],
      taxRate: 0.0
    }
  },
  props: {
    order: null,
    servicesNegotiated: null,
    totalPrice: 0.0,
    amtForServicesNegotiated: null,
    orderItems: null,
    inboxInvoice: null
  },

  methods: {
    addCustomOrderItemToInvoice () {
      this.itemsToBeAdded.push({
        title: 'service title',
        quantity: 0,
        price: 0
      })
      console.log(`push an item into the orderitems to be pushed array`) // TESTING
    },
    async createCustomOrderItems () {
      try {
        const userExtracted = this.$store.getters.getUserInfo
        const itemsToBeAdded = this.itemsToBeAdded

        const response = await UserServices.createCustomOrderItems({
          orderId: this.order.orderId,
          buyerId: this.order.buyerId,
          sellerId: userExtracted.id,
          serviceTableId: userExtracted.serviceTableId,
          itemsToBeAdded: itemsToBeAdded
        })
        this.itemsToBeAdded = []
        console.log(`created custom orderitem : ${JSON.stringify(response)}`) // TESTING
      } catch (error) {
        if (error) throw error
      }
    },
    async modifyInboxInvoice () {
      try {
        console.log(`\n\nThe terms being :  ${this.terms} , ${JSON.stringify(this.order)}\n`) // TESTING
        // send modification to the back
        var modifiedInboxInvoice = this.inboxInvoice
        modifiedInboxInvoice.terms = this.terms
        modifiedInboxInvoice.taxRate = this.inboxInvoice.taxRate
        this.terms = ''

        const response = await InvoiceService.modifyInboxInvoice(modifiedInboxInvoice)

        this.createCustomOrderItems()

        this.$emit('update-inbox-invoice')
        this.$emit('update-order-items')
        // emit event, forcing parent component to update invoice and thus the prop bound to the component
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
    async closeConfirmedPrompt () {
      try {
        this.$modal.hide('order-has-been-submitted-message')
      } catch (error) {
        if (error) throw error
      }
    },
    async sendMessage (text) {
      try {
        var correspondanceMsg = null

        /// /////////////////////////////////// Testing
        if (this.order !== null) {
          correspondanceMsg = {
            orderId: this.order.orderId,
            buyerId: this.order.buyerId,
            // by userId we mean to say the id of the seller in the db
            userId: this.order.sellerId,
            date: '',
            sender: 'seller_submit',
            message: text
          }
        }

        await BuyerServices.sendCorrespondanceMsg(correspondanceMsg)
        /// ////////////////////////////////////////
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

        this.$modal.hide('would-you-like-to-submit')
        this.$modal.show('order-has-been-submitted-message')

        this.sendMessage('[seller submits order confirmation]')
        this.$emit('update-correspondence')
      } catch (error) {
        console.log(`\nThe error occurred in submitOrder : ${error}\n`) // TESTING
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
    async updateOrderItems (index) {
      try {
        this.orderItems[index].amount = this.amtForServicesNegotiated[index]
        this.orderItems[index].price =
          this.servicesNegotiated[index].servicePrice *
          this.amtForServicesNegotiated[index]
        await InboxService.updateOrderItem(this.orderItems[index])
        this.$emit('update-order-items')
      } catch (error) {
        if (error) throw error
      }
    }
  }
}

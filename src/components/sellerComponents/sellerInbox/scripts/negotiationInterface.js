import UserServices from '@/services/UserServices'
import InboxService from '@/services/InboxService'
import PaymentService from '@/services/PaymentService'
import BuyerServices from '@/services/BuyerServices'
import DashboardHeader from '@/components/sellerComponents/DashboardHeader.vue'
import MessagePanel from '@/components/sellerComponents/sellerInbox/MessagePanel.vue'
import NegotiationInterface from '@/components/sellerComponents/sellerInbox/NegotiationInterface.vue'
import { ResponsiveDirective } from 'vue-responsive-components'

export default {
  data () {
    return {

      terms: ''
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
  async created () {
    await this.retrieveInboxInvoice()
  },
  methods: {
    async retrieveInboxInvoice () {
      try {

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
            sender: 'seller',
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

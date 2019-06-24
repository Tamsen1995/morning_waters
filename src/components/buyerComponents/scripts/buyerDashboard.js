import BuyerHeader from '@/components/buyerComponents/BuyerHeader.vue'
import { ResponsiveDirective } from 'vue-responsive-components'
import InboxServices from '@/services/InboxService'
import BuyerServices from '@/services/BuyerServices'

export default {
  data () {
    return {
      pendingOrders: null
    }
  },
  async mounted () {
    this.checkGeneralInquiry()
    this.getBuyerPendingOrders()
  },
  components: {
    BuyerHeader
  },
  directives: {
    responsive: ResponsiveDirective
  },
  methods: {
    async downloadInvoice (pendingOrder) {
      try {
        const response = await InboxServices.retrieveOrderInvoice(pendingOrder.orderId)

        const responseBuffer = response.data

        const pdfBlob = new Blob([responseBuffer], {
          type: 'application/pdf'
        })

        const url = URL.createObjectURL(pdfBlob)

        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'file.pdf') // or any other extension
        document.body.appendChild(link)
        link.click()
        link.remove()
      } catch (error) {
        if (error) throw error
      }
    },
    async goToOrderStatus (index) {
      try {
        const pendingOrder = this.pendingOrders[index]

        this.$router.push({
          name: 'buyerOrderStatus',
          params: { orderId: pendingOrder.orderId }
        })
        console.log(`\n\npendingOrder : ${JSON.stringify(pendingOrder)}\n`) // TESTING
      } catch (error) {
        if (error) throw error
      }
    },
    async getBuyerPendingOrders () {
      try {
        const buyerExtracted = this.$store.getters.getBuyerInfo
        const buyerId = buyerExtracted.id

        const response = await BuyerServices.getPendingOrders(buyerId)

        this.pendingOrders = response.data.pendingOrders
      } catch (error) {
        console.log(`\nThe error in getBuyerPendingOrders : ${error}\n`) // TESTING
        if (error) throw error
      }
    },
    async checkGeneralInquiry () {
      try {
        // after log in check if there is any GI.
        // If so then submit it and reset it to null in the store.
        const storedGeneralInquiry = this.$store.getters.getGeneralInquiry
        if (storedGeneralInquiry !== null) {
          const buyerExtracted = this.$store.getters.getBuyerInfo

          const generalInquiry = {
            buyerId: buyerExtracted.id,
            uid: storedGeneralInquiry.uid,
            inquiryText: storedGeneralInquiry.inquiryText
          }

          await InboxService.sendInquiryToUserInbox(generalInquiry)
          this.$store.dispatch('setGeneralInquiry', null)
        }
      } catch (error) {
        if (error) throw error
      }
    }
  }

}

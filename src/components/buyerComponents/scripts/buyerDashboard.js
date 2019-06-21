import BuyerHeader from '@/components/buyerComponents/BuyerHeader.vue'
import { ResponsiveDirective } from 'vue-responsive-components'
import InboxService from '@/services/InboxService'
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

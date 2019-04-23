import BuyerHeader from '@/components/buyerComponents/BuyerHeader';
import BuyerServices from '@/services/BuyerServices';
import InboxServices from '@/services/InboxService';

export default {
  data () {
    return {
      orderId: '',
      order: null,
      messageTextBox: '',
      // correspondance, an array containing the correspondance messages
      correspondance: []
    }
  },
  async created () {
    await this.getOrder()
  },
  async mounted () {
    this.retrieveCorrespondance()
  },
  components: {
    BuyerHeader
  },
  methods: {
    async downloadInvoice () {
      try {
        const response = await InboxServices.retrieveOrderInvoice(this.orderId)
        console.log(
          `\nTodo: This button should intiate a download ${response}\n`
        ) // TESTING
      } catch (error) {
        if (error) throw error
      }
    },
    async retrieveCorrespondance () {
      try {
        const response = await InboxServices.retrieveCorrespondance(
          this.orderId
        )
        this.correspondance = response.data.correspondance
      } catch (error) {
        if (error) throw error
      }
    },
    async submitMessage () {
      try {
        const buyerExtracted = this.$store.getters.getBuyerInfo
        const sellerExtracted = this.$store.getters.getUserInfo

        const correspondanceMsg = {
          orderId: this.orderId,
          buyerId: buyerExtracted.id,
          // by userId we mean to say the id of the seller in the db
          userId: sellerExtracted.user.id,
          date: '',
          subject: '',
          message: this.messageTextBox
        }
        this.messageTextBox = '';
        await BuyerServices.sendCorrespondanceMsg(correspondanceMsg)
        this.retrieveCorrespondance()
      } catch (error) {
        if (error) throw error
      }
    },
    async getOrder () {
      try {
        this.order = this.$store.getters.getObjectToBeSent
        if (this.order.length > 0) {
          this.orderId = this.order[0].orderId
        }
      } catch (error) {
        if (error) throw error
      }
    }
  }
}

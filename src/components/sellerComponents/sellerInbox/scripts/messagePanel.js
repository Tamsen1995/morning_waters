import InboxService from '@/services/InboxService'
import BuyerServices from '@/services/BuyerServices'

export default {
  data () {
    return {
      file: '',
      // this array shows up in the inbox to the left
      correspondanceMessages: [],
      message: ''
    }
  },

  props: {
    order: null,
    buyer: null,
    correspondanceMsgs: null,
    seller: null
  },
  watch: {
    correspondanceMsgs: async function test () {
      try {
        this.correspondanceMessages = this.correspondanceMsgs
      } catch (error) {
        if (error) throw error
      }
    }
  },

  methods: {
    selectFile () {
      this.file = this.$refs.file.files[0]
    },

    async downloadFile (filename) {
      try {
        const fileKey = filename
        console.log(`\n\nThat's fine ${fileKey}\n\n`) // TESTING
        const response = await InboxService.downloadFile(fileKey)
        const url = response.data.url
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', fileKey)
        document.body.appendChild(link)
        link.click()
        link.remove()
      } catch (error) {
        if (error) throw error
      }
    },

    async sendFile () {
      try {
        // // send a message indicating in the sender var
        var correspondanceMsg = null
        if (this.order !== null) {
          correspondanceMsg = {
            orderId: this.order.orderId,
            buyerId: this.order.buyerId,
            userId: this.order.sellerId,
            date: '',
            sender: 'seller-file-attachment',
            message: this.message,
            filename: `file-${this.file.name}`
          }
        }

        // // sending the message and refreshing the current inbox
        await BuyerServices.sendCorrespondanceMsg(correspondanceMsg)
        const response = await InboxService.retrieveCorrespondance(
          correspondanceMsg.orderId
        )
        this.correspondanceMessages = response.data.correspondance
        this.message = ''

        // console.log(`${this.order.orderId}`); // TESTING
        // // uploading the actual file
        const formData = new FormData()
        formData.append('file', this.file)
        await InboxService.uploadFile(formData)
        this.file = ''
      } catch (error) {
        if (error) throw error
      }
    },
    /// ///////////////////////////////////////for sending file attachments above

    async submitMessage () {
      try {
        if (this.message !== '') {
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
          const response = await InboxService.retrieveCorrespondance(
            correspondanceMsg.orderId
          )
          this.message = ''

          this.correspondanceMessages = response.data.correspondance
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

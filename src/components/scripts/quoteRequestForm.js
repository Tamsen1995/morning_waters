import UserServices from '@/services/UserServices'

export default {
  data () {
    return {
      userId: 0,
      serviceTableId: 0,
      serviceId: 0,

      // The input relevant for the quote request
      emailAddress: '',
      name: '',
      description: ''
    }
  },
  created () {
    this.getServiceQuoteToBeRequested()
  },
  mounted () {
  },
  methods: {
    async getServiceQuoteToBeRequested () {
      const service = this.$store.getters.getQuoteToBeRequested

      this.userId = service.userId
      this.serviceId = service.id
      this.serviceTableId = service.tableId
    },
    async submitQuoteRequest () {
      const quoteRequest = {
        userId: this.userId,
        serviceId: this.serviceId,
        serviceTableId: this.serviceTableId,
        emailAddress: this.emailAddress,
        name: this.name,
        description: this.description
      }
      await UserServices.sendQuoteRequest(quoteRequest)
      this.$store.dispatch('setQuoteToBeRequested', null)
      this.$router.push({
        name: 'requestsScreen'
        // TODO : Insert the quote request email into the requestsScreen component
      })
    }

  }
}

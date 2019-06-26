import PaymentService from '@/services/PaymentService'
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      user: null,
      credits: 0
    }
  },
  mounted () {
    this.getAmountOfCredits()
  },
  methods: {
    async logout () {
      try {
        localStorage.clear()
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.$store.dispatch('setQuoteToBeRequested', null)
        this.$store.dispatch('setSidebarHighlight', '')
        await AuthenticationService.logout()
      } catch (error) {
        if (error) throw error
      }
    },
    async getAmountOfCredits () {
      try {
        const userExtracted = this.$store.getters.getUserInfo
        const response = await PaymentService.getAmountOfCredits(
          userExtracted.id
        )
        this.credits = response.data.credits
        if (this.credits === null) {
          this.credits = 0
        }
      } catch (error) {
        if (error) throw error
      }
    }
  }
}

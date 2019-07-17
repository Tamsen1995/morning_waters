import PaymentService from '@/services/PaymentService'
import AuthenticationService from '@/services/AuthenticationService'
import Api from '@/services/Api'

export default {
  data () {
    return {
      user: null,
      credits: 0
    }
  },
  mounted () {

  },
  methods: {
    async logout () {
      try {
        localStorage.clear()
        Api().defaults.headers.common['Authorization'] = ''
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setAuthStatus', false)
        this.$store.dispatch('setUser', null)
        this.$store.dispatch('setBuyer', null)
        this.$store.dispatch('setQuoteToBeRequested', null)
        this.$store.dispatch()
        await AuthenticationService.logout()
        ()
      } catch (error) {
        if (error) throw error
      }
    }

  }
}

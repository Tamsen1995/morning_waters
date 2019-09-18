import BuyerHeader from '@/components/buyerComponents/BuyerHeader.vue'
import AuthenticationService from '@/services/AuthenticationService'
import Api from '@/services/Api'
import { ResponsiveDirective } from 'vue-responsive-components'

export default {
  data () {
    return {
      name: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip: '',
        country: ''
      },
      number: '',
      contactListTableId: '',
      error: null,
      loadingFlag: 0,
      active: 'first',
      first: false,
      second: false,
      third: false,
      fourth: false,
      secondStepError: null,

      // accept vars
      acceptTerms: false,
      acceptPrivacy: false
    }
  },
  components: {
    BuyerHeader
  },
  directives: {
    responsive: ResponsiveDirective
  },
  methods: {
    // Prefills registration
    // info if it was provided on the homepage
    setDone (id, index) {
      this[id] = true

      this.secondStepError = null

      if (index) {
        this.active = index
      }
    },
    setError () {
      this.secondStepError = 'This is an error!'
    },
    async register () {
      try {
        if (this.acceptPrivacy === true && this.acceptTerms) {
          const response = await AuthenticationService.buyerRegister({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            passwordConfirm: this.passwordConfirm,
            address: JSON.stringify(this.address),
            number: this.number
          })
          if (response) {
            this.loadingFlag = 2
          }
          localStorage.setItem('id_token', response.data.token)
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setBuyer', response.data.buyer)
          Api().defaults.headers.common[
            'Authorization'
          ] = AuthenticationService.getAuthHeader()

          const shoppingCartFlag = this.$store.getters.getShoppingCartFlag

          if (shoppingCartFlag == true) {
            console.log(`\nRedirecting onto buyer checkout\n`) // TESTING
            this.$router.push({
              name: 'buyerCheckout'
            })
          } else {
            console.log(`\nRedirecting onto buyer dashboard\n`) // TESTING
            this.$router.push({
              name: 'buyerDashboard'
            })
          }
        } else {
          this.error = 'Please accept the terms & conditions as well as the privacy agreement.'
        }
      } catch (error) {
        console.log(`\nAn error occurred in register ${error}\n`) // TESTING
        this.error = error.response.data.error
        if (error) throw error
      }
    }
  }
}

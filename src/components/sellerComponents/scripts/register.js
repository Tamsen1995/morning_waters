import PageHeader from '@/components/Header.vue'
import AuthenticationService from '@/services/AuthenticationService'
import ShippingService from '@/services/ShippingService'
import Api from '@/services/Api'
import { ResponsiveDirective } from 'vue-responsive-components'

export default {
  data () {
    return {
      betaKey: '',
      firstName: '',
      lastName: '',
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      number: '',
      jobTitle: '',
      companyName: '',
      companyWebsite: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip: '',
        country: ''
      },
      contactListTableId: '',
      serviceTableId: '',
      about: '',
      error: null,
      loadingFlag: 0,
      active: 'first',
      first: false,
      second: false,
      third: false,
      fourth: false,
      fifth: false,
      sixth: false,
      secondStepError: null,

      // accept vars
      acceptTerms: false,
      acceptPrivacy: false
    }
  },
  mounted () {
    this.insertPrefilledInfo()
  },
  components: {
    PageHeader
  },
  directives: {
    responsive: ResponsiveDirective
  },
  methods: {
    async goToTerms () {
      try {
        window.open(`href="https://app.termly.io/document/terms-of-use-for-online-marketplace/5c4ca188-e4a8-4d86-b760-1a88ff2915f8`)
      } catch (error) {
        if (error) throw error
      }
    },
    setDone (id, index) {
      this[id] = true

      this.secondStepError = null

      if (index) {
        this.active = index
      }
    },
    goBack (id, index) {
      this[id] = true

      if (index) {
        this.active = index
      }
    },
    setError () {
      this.secondStepError = 'This is an error!'
    },
    // Prefills registration
    // info if it was provided on the homepage
    async insertPrefilledInfo () {
      this.companyName = this.$store.getters.getCompanyName
      this.email = this.$store.getters.getEmailAddress
      this.$store.dispatch('setCompanyName', '')
      this.$store.dispatch('setEmailAddress', '')
    },

    async makeShippoApiToken () {
      try {
        ShippingService.makeShippoApiToken()
      } catch (error) {
        if (error) throw error
      }
    },
    async register () {
      try {
        this.error = ''
        if (this.acceptTerms === true && this.acceptPrivacy === true) {
          const response = await AuthenticationService.register({
            betaKey: this.betaKey,
            name: `${this.firstName} ${this.lastName}`, // this might be legacy code
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            passwordConfirm: this.passwordConfirm,
            number: this.number,
            jobTitle: this.jobTitle,
            companyName: this.companyName,
            companyWebsite: this.companyWebsite,
            address: JSON.stringify(this.address),
            serviceTableId: this.serviceTableId,
            about: this.about,
            credits: 0
          })

          localStorage.setItem('id_token', response.data.token)
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          Api().defaults.headers.common['Authorization'] = AuthenticationService.getAuthHeader()

          this.$router.push({
            name: 'dashboard'
          })
        } else {
          this.error = 'Please accept the terms & conditions as well as the privacy agreement.'
        }
      } catch (error) {
        console.log(`\nAn error occurred in register ${JSON.stringify(error)}\n`) // TESTING
        this.error = error.response.data.error
        if (error) throw error
      }
    }
  }
}

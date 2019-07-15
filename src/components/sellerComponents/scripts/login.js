import PageHeader from '@/components/Header.vue'
import AuthenticationService from '@/services/AuthenticationService'
import Api from '@/services/Api'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null,
      errorMessage: '',
      loadingFlag: 0
    }
  },
  components: {
    PageHeader
  },
  methods: {
    async redirectToSignup () {
      try {
        this.$router.push({
          name: 'register'
        })
      } catch (error) {
        if (error) throw error
      }
    },
    async login () {
      try {
        this.errorMessage = ''
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        if (response) {
          this.loadingFlag = 2
        }

        localStorage.setItem('id_token', response.data.token)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)

        // setting a global header for the jwt token
        Api().defaults.headers.common['Authorization'] = AuthenticationService.getAuthHeader()

        // redirecting to dashboard
        this.$router.push({
          name: 'dashboard'
        })
      } catch (error) {
        const status = error.response.status
        console.log(`An error occured in the login component ${error.response.status}`) // TESTING
        if (status === 403) {
          this.errorMessage = 'login information was incorrect'
        }
      }
    }
  }
}

import PageHeader from '@/components/Header.vue'
import AuthenticationService from '@/services/AuthenticationService'
import Api from '@/services/Api'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null,
      loadingFlag: 0
    }
  },
  components: {
    PageHeader
  },
  methods: {
    async login () {
      try {
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
        console.log(`An error occured in the login component ${error}`) // TESTING
      }
    }
  }
}

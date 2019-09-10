import AuthenticationService from '@/services/AuthenticationService'
import _ from 'lodash'
import { EventBus } from '@/event-bus.js'

export default {
  data () {
    return {
      search: '',
      user: null,
      divToScrollTo: '',
      productionMode: false

    }
  },
  mounted () {
    this.verifyUser()
  },
  updated () {
    this.verifyUser()
  },
  created () {
    this.verifyUser()
    if (process.env.NODE_ENV === 'production') {
      this.productionMode = true
    }
  },
  watch: {
    search: _.debounce(async function (value) {
      const route = {
        name: 'userSearchResults'
      }
      if (this.search !== '' && this.search) {
        route.query = {
          search: this.search
        }
        this.$router.push(route)
      }
    }, 700),
    '$route.query.search': {
      immediate: true,
      handler (value) {
        this.search = value
      }
    },
    '$route': {
      immediate: true,
      handler () {
        this.$forceUpdate()
      }
    },
    user: {
      immediate: true,
      handler () {
        this.$forceUpdate()
      }
    }
  },

  // The UserSearchResults is the
  // child component of the Header and will be used
  // to pass the search result into it
  methods: {
    scrollToDiv (div) {
      EventBus.$emit('scroll-on-homepage', div)
    },
    redirectUser () {
      if (this.dashLink === 'Register') {
        this.$router.push({
          name: 'register'
        })
      } else if (this.dashLink === 'Dashboard') {
        this.$router.push({
          name: 'dashboard'
        })
      }
    },
    async redirectTo (routeString) {
      try {
        if (routeString === 'Login') {
          this.$router.push({ name: 'login' })
        } else if (routeString === 'Signup') {
          this.$router.push({ name: 'register' })
        }
      } catch (error) {
        if (error) throw error
      }
    },
    async verifyUser () {
      // if the user has officially logged out
      // the state of the store should get cleaned out
      // inside of the checkAuth function
      AuthenticationService.checkAuth()

      // if so the userExtracted will equal to null, thus invalidating the user
      this.user = this.$store.getters.getUserInfo
    },
    async logout () {
      console.log('\n\nremoving the jwt token\n\n') // TESTING
      localStorage.clear()
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      await AuthenticationService.logout

      this.$router.push({
        name: 'root'
      })
    },
    async login () {
      this.$router.push({
        name: 'login'
      })
    },
    async register () {
      this.$router.push({
        name: 'register'
      })
    },
    async goToDashboard () {
      this.$router.push({
        name: 'dashboard'
      })
    }
  }
}

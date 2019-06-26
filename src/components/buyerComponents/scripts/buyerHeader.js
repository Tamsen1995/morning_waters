import ShoppingCart from '@/components/buyerComponents/ShoppingCart'
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      buyerLoggedIn: false,
      dropdownMenu: false
    }
  },
  mounted () {
    this.getBuyerAuthStatus()
  },
  components: {
    ShoppingCart
  },
  methods: {
    async buyerLogout () {
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
    async manifestModalShowCart () {
      try {
        this.$modal.show('view-cart')
      } catch (error) {
        if (error) throw error
      }
    },
    async redirectOntoBuyerDashboard () {
      try {
        this.$router.push({
          name: 'buyerDashboard'
        })
      } catch (error) {
        if (error) throw error
      }
    },
    async display_menu () {
      try {
      } catch (error) {
        if (error) throw error
      }
    },
    async getBuyerAuthStatus () {
      try {
        const buyerExtracted = this.$store.getters.getBuyerInfo
        const isBuyerLoggedIn = this.$store.getters.userLoggedIn

        if (buyerExtracted != null && isBuyerLoggedIn === true) {
          this.buyerLoggedIn = true
        } else {
          this.buyerLoggedIn = false
        }
      } catch (error) {
        if (error) throw error
      }
    },
    async redirectToBillings () {
      try {
        this.$router.push({
          name: 'buyerBillings'
        })
      } catch (error) {
        if (error) throw error
      }
    },
    async redirectToSignUp () {
      try {
        this.$router.push({
          name: 'buyerRegister'
        })
      } catch (error) {
        if (error) throw error
      }
    },
    async redirectToLogin () {
      try {
        this.$store.dispatch('setShoppingCartFlag', false)
        this.$router.push({
          name: 'buyerLogin'
        })
      } catch (error) {
        if (error) throw error
      }
    },
    async redirectToInbox () {
      try {
        this.$router.push({
          name: 'buyer_inbox'
        })
      } catch (error) {
        if (error) throw error
      }
    },
    async redirectToSettings () {
      try {
        this.$router.push({
          name: 'buyerSettings'
        })
      } catch (error) {
        if (error) throw error
      }
    },
    async redirectToProfile () {
      try {
        this.$router.push({
          name: 'buyerDashboard'
        })
      } catch (error) {
        if (error) throw error
      }
    },
    async goToBuyersCart () {
      try {
        const userLoggedIn = this.$store.getters.userLoggedIn
        this.$router.push({
          name: 'buyersCarts'
        })
      } catch (error) {
        if (error) throw error
      }
    }
  },
  computed: {
    itemsInCart () {
      let cart = this.$store.getters.getShoppingCartItems
      if (cart) {
        var ret = cart.length
      } else {
        var ret = 0
      }
      return ret
    }
  }
}

import PageHeader from '@/components/Header.vue'
import { EventBus } from '../../event-bus.js'
import { ResponsiveDirective } from 'vue-responsive-components'
import AuthenticationService from '@/services/AuthenticationService'
import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'HelloWorld',
  data () {
    return {
      scrolled: false,
      companyName: '',
      emailAddress: '',
      msg: 'Fig Analytics Homepage'
    }
  },
  mounted () {
    localStorage.clear()
    this.$store.dispatch('setToken', null)
    this.$store.dispatch('setAuthStatus', false)
    this.$store.dispatch('setUser', null)
    this.$store.dispatch('setBuyer', null)
    this.$store.dispatch('setQuoteToBeRequested', null)
    this.$store.dispatch()
    this.$store.dispatch('setSidebarHighlight', '')
    this.logout()
  },
  components: {
    PageHeader,
    Carousel,
    Slide
  },
  directives: {
    responsive: ResponsiveDirective
  },
  methods: {
    async logout () {
      try {
        await AuthenticationService.logout
      } catch (error) {
        if (error) throw error
      }
    },
    async continueOntoRegisterForm () {
      this.$store.dispatch('setCompanyName', this.companyName)
      this.$store.dispatch('setEmailAddress', this.emailAddress)
      this.$router.push({
        name: 'register'
      })
    }
  }
}

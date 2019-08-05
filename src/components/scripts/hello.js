import PageHeader from '@/components/Header.vue'
import Api from '@/services/Api'

import { ResponsiveDirective } from 'vue-responsive-components'
import AuthenticationService from '@/services/AuthenticationService'
import { Carousel, Slide } from 'vue-carousel'
import TransitionExpand from '@/components/TransitionExpand'

export default {
  name: 'HelloWorld',
  data () {
    return {
      scrolled: false,
      companyName: '',
      emailAddress: '',
      msg: 'Fig Analytics Homepage',
      expanded: false
    }
  },
  mounted () {
    localStorage.clear()
    Api().defaults.headers.common['Authorization'] = ''
    this.$store.dispatch('setToken', null)
    this.$store.dispatch('setAuthStatus', false)
    this.$store.dispatch('setUser', null)
    this.$store.dispatch('setBuyer', null)
    this.$store.dispatch('setQuoteToBeRequested', null)

    this.logout()
  },
  components: {
    PageHeader,
    Carousel,
    Slide,
    TransitionExpand
  },
  directives: {
    responsive: ResponsiveDirective
  },
  methods: {
    async continueOntoComingSoonPage () {
      try {
        this.$router.push({
          name: 'comingSoon'
        })
      } catch (error) {
        if (error) throw error
      }
    },
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

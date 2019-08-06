import PageHeader from '@/components/Header.vue'
import Api from '@/services/Api'

import { ResponsiveDirective } from 'vue-responsive-components'
import AuthenticationService from '@/services/AuthenticationService'
import { Carousel, Slide } from 'vue-carousel'
import TransitionExpand from '@/components/TransitionExpand'
import { EventBus } from '@/event-bus.js'

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

    // event bus
    EventBus.$on('scroll-on-homepage', div => {
      // so if an event is received here we will scroll on the homepage
      if (div === 'services') {
        console.log(`\n\nthis.refszzz : ${JSON.stringify(this.$refs['our-services'].offsetTop)}`) // TESTING
        window.scrollTo(0, this.$refs['our-services'].offsetTop)
      } else if (div === 'about') {
        window.scrollTo(0, this.$refs['about'].offsetTop)

        console.log(`\n\nthis.refsss : ${JSON.stringify(this.$refs['about'].offsetTop)}`) // TESTING
      }
    })

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

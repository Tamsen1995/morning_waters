import DashboardHeader from '@/components/DashboardHeader.vue'
import PaymentService from '@/services/PaymentService'
import SettingsService from '@/services/SettingsService'
import TimeConversion from '@/components/scripts/helpers/timeConverter'

let stripe = Stripe(process.env.stripe_public_key) // TODO : Replace this with the live api key
let elements = stripe.elements()
let card = null

function getDefaultSource (customerDefaultSourceID, customerSources) {
  var customerSourcesLength = customerSources.length
  for (var i = 0; i < customerSourcesLength; i++) {
    if (customerSources[i].id === customerDefaultSourceID) {
      return customerSources[i]
    }
  }
  return null
}

export default {
  data () {
    return {
      creditsToBePurchased: 0,
      fullname: '',
      expMonth: 0,
      expYear: 0,
      cardNumber: 0,
      cvc: 0,
      customerDefaultSource: null
    }
  },
  components: {
    DashboardHeader
  },
  methods: {
    async getStripeUserInfo () {
      try {
        const userExtracted = this.$store.getters.getUserInfo
        const stripeUserInfo = await SettingsService.getStripeUserInfo(
          userExtracted
        )
        this.subscriptions = stripeUserInfo.data.subscriptions.data
        const customerDefaultSourceID =
          stripeUserInfo.data.stripeCustomer.default_source
        const customerDefaultSource = getDefaultSource(
          customerDefaultSourceID,
          stripeUserInfo.data.stripeCustomer.sources.data
        )
        this.customerDefaultSource = customerDefaultSource
      } catch (error) {
        console.log(`\nAn error occurred in getStripeUserInfo ${error}\n`)
        if (error) throw error
      }
    }
  },
  beforeDestroy () {
    card.destroy(this.$refs.card)
  },
  mounted () {
    console.log(`\n\nthis refs card : ${this.$refs.card}\n\n`) // TESTING

    this.getStripeUserInfo()
    card = elements.create('card')
    card.mount(this.$refs.card)
  }
}

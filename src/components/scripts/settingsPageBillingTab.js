import SettingsService from '@/services/SettingsService';

let stripe = Stripe(`pk_test_CLMSL40and9mdJdOgCRMbLfs`)
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
      customerDefaultSource: null,
      subscriptions: [] // holds the subscriptions
    }
  },
  beforeDestroy () {
    card.destroy(this.$refs.card)
  },
  mounted () {
    card = elements.create('card')
    card.mount(this.$refs.card)
    this.getStripeUserInfo()
  },
  methods: {
    async addPaymentMethod () {
      try {
        const userExtracted = this.$store.getters.getUserInfo
        const userId = userExtracted.id
        const stripeCustomerId = userExtracted.stripeCustomerId
        const token = await stripe.createToken(card)
        // effectuate the purchase
        const sourceToBeAdded = {
          uid: userId,
          stripeCustomerId: stripeCustomerId,
          stripeToken: token
        }
        await SettingsService.addPaymentMethod(sourceToBeAdded)
        this.getStripeUserInfo()
        card.clear(this.$refs.card)
      } catch (error) {
        console.log(`\nThe error in the billing settings: \n`)
        if (error) throw error
      }
    },

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
  components: {}
}

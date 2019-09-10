import SettingsService from '@/services/SettingsService'
import PaymentService from '@/services/PaymentService'

let stripe = Stripe(process.env.stripe_public_key)
let elements = stripe.elements()

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

      card: null,
      stripe: null
    }
  },
  beforeDestroy () {
    this.card.destroy(this.$refs.card)
  },
  async created () {
    await this.getStripeUserInfo()
  },
  async mounted () {
    this.card = elements.create('card')
    this.card.mount(this.$refs.card)
    this.stripe = stripe
  },
  methods: {
    async addPaymentMethod () {
      try {
        const buyerExtracted = this.$store.getters.getBuyerInfo
        const buyerId = buyerExtracted.id
        const stripeCustomerId = buyerExtracted.stripeCustomerId
        const token = await stripe.createToken(this.card)
        const sourceToBeAdded = {
          uid: buyerId,
          stripeCustomerId: stripeCustomerId,
          stripeToken: token
        }
        await SettingsService.addPaymentMethod(sourceToBeAdded)
        this.getStripeUserInfo()
        this.card.clear(this.$refs.card)
      } catch (error) {
        console.log(`\nThe error in the billing settings: \n`)
        if (error) throw error
      }
    },

    async getStripeUserInfo () {
      try {
        const buyerExtracted = this.$store.getters.getBuyerInfo
        const stripeCustomerId = buyerExtracted.stripeCustomerId
        const stripeUserInfo = await PaymentService.getStripeUserInfo(
          stripeCustomerId
        )

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

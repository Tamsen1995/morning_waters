import DashboardHeader from '@/components/DashboardHeader.vue';
import PaymentService from '@/services/PaymentService';
import SettingsService from '@/services/SettingsService';
import TimeConversion from '@/components/scripts/helpers/timeConverter';

let stripe = Stripe(`pk_test_CLMSL40and9mdJdOgCRMbLfs`) // TODO : Replace this with the live api key
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
    async submitCreditsPurchase () {
      const userExtracted = this.$store.getters.getUserInfo
      const userId = userExtracted.id
      const stripeCustomerId = userExtracted.stripeCustomerId
      const token = await stripe.createToken(card)

      // effectuate the purchase
      const purchaseInfo = {
        uid: userId,
        stripeCustomerId: stripeCustomerId,
        stripeToken: token,
        creditsToBePurchased: this.creditsToBePurchased,
        fullname: this.fullname
      }
      const responseOfCharge = await PaymentService.addCredits(purchaseInfo)

      // write entry into payment history
      var amountCharged = responseOfCharge.data.chargeReport.amount
      amountCharged = amountCharged / 100
      const timestamp = responseOfCharge.data.chargeReport.created
      const time = await TimeConversion.timestampToDate(timestamp)
      const paymentHistoryEntry = {
        uid: userId,
        amount_charged: amountCharged,
        time_of_purchase: time,
        product_purchased: this.creditsToBePurchased
      }
      await PaymentService.writePaymentHistoryEntry(paymentHistoryEntry)
      this.$router.push({
        name: 'creditsHome'
      })
    },
    async submitSubscriptionPurchase () {
      try {
        const userExtracted = this.$store.getters.getUserInfo
        const userId = userExtracted.id
        const stripeCustomerId = userExtracted.stripeCustomerId

        const token = await stripe.createToken(card)

        const purchaseSubInfo = {
          uid: userId,
          stripeCustomerId: stripeCustomerId,
          stripeToken: token,
          subscription: 'Sub1',
          fullname: this.fullname
        }
        this.$store.dispatch('setSubscription', '')

        const responseOfCharge = await PaymentService.addSubscription(
          purchaseSubInfo
        )

        var amountCharged =
          responseOfCharge.data.subscription.items.data[0].plan.amount
        amountCharged = amountCharged / 100
        const timestamp =
          responseOfCharge.data.subscription.items.data[0].created

        const time = await TimeConversion.timestampToDate(timestamp)

        const paymentHistoryEntry = {
          uid: userId,
          amount_charged: amountCharged,
          time_of_purchase: time,
          product_purchased: 'Monthly Subscription'
        }
        await PaymentService.writePaymentHistoryEntry(paymentHistoryEntry)

        this.$router.push({
          name: 'creditsHome'
        })
      } catch (error) {
        console.log(
          `\nAn error occurred inside of submitSubsctiptionPurchase ${error}\n`
        )
        if (error) throw error
      }
    },
    async submitPaymentMethod () {
      const subscription = this.$store.getters.getSubscription

      // TODO : Refactor this
      if (subscription === '') {
        await this.submitCreditsPurchase()
      } else if (subscription === 'Sub1') {
        console.log(`\ninitiating the subscription flow\n`) // TESTING
        await this.submitSubscriptionPurchase()
      }

      // TODO : Figure out how to display error messages in the front
    },
    async getCreditsToBePurchased () {
      try {
        this.creditsToBePurchased = this.$store.getters.getCreditsToBePurchased
        this.creditsToBePurchased = parseInt(this.creditsToBePurchased)
      } catch (error) {
        console.log(`\nError in getCreditsToBePurchased\n`) // TESTING
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
  beforeDestroy () {
    card.destroy(this.$refs.card)
  },
  mounted () {
    console.log(`\n\nthis refs card : ${this.$refs.card}\n\n`) // TESTING

    this.getStripeUserInfo()
    card = elements.create('card')
    card.mount(this.$refs.card)
    this.getCreditsToBePurchased()
  }
}

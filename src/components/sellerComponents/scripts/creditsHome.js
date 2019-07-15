import DashboardHeader from '@/components/sellerComponents/DashboardHeader.vue'
import PaymentService from '@/services/PaymentService'
import UserServices from '@/services/UserServices'
import { ResponsiveDirective } from 'vue-responsive-components'

export default {
  data () {
    return {
      complete: true,
      stripeOptions: {},
      companyName: '',
      remainingCredits: 0,
      creditsToBePurchased: 0,
      paymentHistory: []
    }
  },
  components: {
    DashboardHeader
  },
  directives: {
    responsive: ResponsiveDirective
  },
  mounted () {
    this.getPaymentHistory()
    this.getCompanyName()
    this.checkForSubscriptionCharge()
    this.getRemainingCredits()
  },
  methods: {
    async checkForSubscriptionCharge () {
      try {
        const userExtracted = this.$store.getters.getUserInfo
        const uid = userExtracted.id

        await UserServices.checkForSubscriptionCharge(uid)
      } catch (error) {
        console.log(
          `\nAn error occurred inside of the checkForSubscriptionCharge: ${error}\n`
        )
        if (error) throw error
      }
    },
    async getCompanyName () {
      const userExtracted = this.$store.getters.getUserInfo
      this.companyName = userExtracted.companyName
    },
    async getRemainingCredits () {
      try {
        const userExtracted = this.$store.getters.getUserInfo
        const userInfo = await UserServices.getPublicProfileInfo(
          userExtracted.id
        )
        this.remainingCredits = userInfo.data.user.credits
        if (this.remainingCredits === null) {
          this.remainingCredits = 0
        }
      } catch (error) {
        console.log(`\nAn error occurred in the getRemainingCredits func\n`)
        if (error) throw error
      }
    },
    async goToCreditsPurchasingScreen () {
      try {
        this.$router.push({
          name: 'pendingOrders'
        })
      } catch (error) {
        if (error) throw error
      }
    },
    async getPaymentHistory () {
      try {
        const userExtracted = this.$store.getters.getUserInfo
        const userId = userExtracted.id
        const paymentHistory = await PaymentService.getPaymentHistory(userId)
        this.paymentHistory = paymentHistory.data.paymentHistory
      } catch (error) {
        if (error) {
          console.log(`\nAn error occurred in getPaymentHistory ${error}\n`) // TESTING
        }
        if (error) throw error
      }
    }
  }
}

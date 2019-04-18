import DashboardHeader from '@/components/DashboardHeader.vue'
import UserServices from '@/services/UserServices'
import { ResponsiveDirective } from 'vue-responsive-components'

export default {
  data () {
    return {
      complete: true,
      stripeOptions: {
      },
      companyName: '',
      remainingCredits: 0,
      creditsToBePurchased: 0
    }
  },
  components: {
    DashboardHeader
  },
  directives: {
    responsive: ResponsiveDirective
  },
  mounted () {
    this.getProfileData()
  },
  methods: {
    async buyMonthlySubscription () {
      this.$modal.show('buy-subscription-prompt')
      this.$store.dispatch('setSubscription', 'Sub1')
    },
    async buyCredits () {
      this.$modal.show('buy-credit-prompt')
    },
    async purchaseCredit () {
      this.$modal.hide('buy-credit-prompt')
      this.$store.dispatch('setCreditsToBePurchased', this.creditsToBePurchased)
      this.$router.push({
        name: 'checkout'
      })
    },
    async purchaseSubscription () {
      this.$modal.hide('buy-subscription-prompt')

      this.$router.push({
        name: 'checkout'
      })
    },
    // TESTING This function will be removed
    // once inserted into the production environment
    async getProfileData () {
      const userExtracted = this.$store.getters.getUserInfo
      this.companyName = userExtracted.companyName
      const userInfo = await UserServices.getPublicProfileInfo(userExtracted.id)

      this.remainingCredits = userInfo.data.user.credits
      if (this.remainingCredits === null) {
        this.remainingCredits = 0
      }
    }

  }
}

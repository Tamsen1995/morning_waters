import DashboardHeader from '@/components/sellerComponents/DashboardHeader.vue'
import BillingTab from '@/components/sellerComponents/SettingsPageBillingTab.vue'
import UserServices from '@/services/UserServices'
import PaymentService from '@/services/PaymentService'
import SettingsService from '@/services/SettingsService'

import Tabs from 'vue-tabs-with-active-line'
import { ResponsiveDirective } from 'vue-responsive-components'

export default {
  data () {
    return {
      name: '',
      email: '',
      number: '',
      jobTitle: '',
      companyName: '',
      companyWebsite: '',
      billingAddress: '',
      about: '',
      // This address is used for the changing of the address in the settings
      address: {
        street: '',
        city: '',
        state: '',
        zip: '',
        country: ''
      },
      tabs: [
        { title: 'Profile', value: 'profile1' },
        { title: 'Billing', value: 'billing3' },
        { title: 'Password', value: 'password4' }
      ],
      currentTab: 'profile1',
      user: null,
      oldPass: '',
      newPass: '',
      confirmNewPass: ''
    }
  },
  directives: {
    responsive: ResponsiveDirective
  },
  mounted () {
    this.retrieveProfileInfo()
  },
  methods: {
    handleClick (newTab) {
      this.currentTab = newTab
    },
    // opens up new tab for stripe connect
    async goToStripeConnectDashboard () {
      try {
        if (this.user && this.user.stripeConnectAcctInfo !== '') {
          const response = await PaymentService.goToStripeConnectDashboard(this.user.stripeConnectAcctInfo)
          window.open(response.data)
        } else {
          console.log(`error in goToStripeConnectDashboard()`) // TESTING
        }
      } catch (error) {
        if (error) throw error
      }
    },
    async addPayoutInfo () {
      try {
        const userExtracted = this.$store.getters.getUserInfo

        PaymentService.makeStripeConnectAccount()
      } catch (error) {
        if (error) throw error
      }
    },
    async updatePassword () {
      try {
        const userExtracted = this.$store.getters.getUserInfo

        const updatePassInfo = {
          userId: userExtracted.id,
          oldPass: this.oldPass,
          newPass: this.newPass,
          confirmNewPass: this.confirmNewPass
        }

        console.log(`\n\n$${JSON.stringify(updatePassInfo)}\n`) // TESTING

        const response = await SettingsService.updatePassword(updatePassInfo)
        console.log(`\nThe password response ${JSON.stringify(response)}\n`) // TESTING
      } catch (error) {
        console.log(`\nThe error caught in update password ${error}\n`) // TESTING
        if (error) throw error
      }
    },
    invokeSubmittedProfilePrompt () {
      this.$modal.show('profile-updates-have-been-submitted')
    },
    closeSubmittedProfilePrompt () {
      this.$modal.hide('profile-updates-have-been-submitted')
    },
    async updateProfile () {
      try {
        const userExtracted = this.$store.getters.getUserInfo
        const newProfileInfo = {
          name: this.name,
          email: this.email,
          number: this.number,
          jobTitle: this.jobTitle,
          companyName: this.companyName,
          companyWebsite: this.companyWebsite,
          address: this.address,
          about: this.about
        }
        const response = await SettingsService.updateProfile(
          userExtracted.id,
          newProfileInfo
        )
      } catch (error) {
        console.log(`\nThe is inside of updateProfile : ${error}\n`) // TESTING
        if (error) throw error
      }
    },
    async retrieveProfileInfo () {
      try {
        const userExtracted = this.$store.getters.getUserInfo
        const userInfo = await UserServices.getPublicProfileInfo(
          userExtracted.id
        )
        this.user = userInfo.data.user

        this.name = userInfo.data.user.name
        this.email = userInfo.data.user.email
        this.number = userInfo.data.user.number
        this.jobTitle = userInfo.data.user.jobTitle
        this.companyName = userInfo.data.user.companyName
        this.companyWebsite = userInfo.data.user.companyWebsite
        this.address = JSON.parse(userInfo.data.user.address)
        this.about = userInfo.data.user.about
      } catch (error) {
        console.log(
          `\nThe error message inside of the retrieveProfileInfo: ${error}\n`
        )
        if (error) throw error
      }
    }
  },
  components: {
    Tabs,
    DashboardHeader,
    BillingTab
  }
}

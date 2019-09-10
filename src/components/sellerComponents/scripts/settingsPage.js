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
      firstName: '',
      lastName: '',
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

        if (response && response.status === 200) {
          this.$modal.show('profile-updates-have-been-submitted')
        }
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
          firstName: this.firstName,
          lastName: this.lastName,
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

        this.firstName = this.user.firstName
        this.lastName = this.user.lastName
        this.email = this.user.email
        this.number = this.user.number
        this.jobTitle = this.user.jobTitle
        this.companyName = this.user.companyName
        this.companyWebsite = this.user.companyWebsite
        this.address = JSON.parse(this.user.address)
        this.about = this.user.about
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

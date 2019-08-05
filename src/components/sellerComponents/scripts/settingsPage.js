import DashboardHeader from '@/components/sellerComponents/DashboardHeader.vue'
import BillingTab from '@/components/sellerComponents/SettingsPageBillingTab.vue'
import UserServices from '@/services/UserServices'

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
    async updatePassword () {
      try {
        const userExtracted = this.$store.getters.getUserInfo

        const updatePassInfo = {
          email: userExtracted.email,
          oldPass: this.oldPass,
          newPass: this.newPass,
          confirmNewPass: this.confirmNewPass
        }

        const response = await SettingsService.updatePassword(updatePassInfo)
      } catch (error) {
        console.log(`\nThe error caught in update password ${error}\n`) // TESTING
        if (error) throw error
      }
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

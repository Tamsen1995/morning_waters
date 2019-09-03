import BuyerHeader from '@/components/buyerComponents/BuyerHeader'
import BuyerServices from '@/services/BuyerServices'
import BillingTab from '@/components/buyerComponents/BuyerSettingsBillingsTab.vue'
import Tabs from 'vue-tabs-with-active-line'
import { ResponsiveDirective } from 'vue-responsive-components'

export default {
  data () {
    return {
      name: '',
      email: '',
      number: '',
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
  mounted () {
    this.retrieveProfileInfo()
  },
  directives: {
    responsive: ResponsiveDirective
  },
  components: {
    Tabs,
    BuyerHeader,
    BillingTab
  },
  methods: {
    async retrieveProfileInfo () {
      try {
        const buyerExtracted = this.$store.getters.getBuyerInfo
        const response = await BuyerServices.getBuyerProfileInfo(
          buyerExtracted.id
        )
        const buyerInfo = response.data.buyer
        this.name = buyerInfo.name
        this.email = buyerInfo.email
      } catch (error) {
        if (error) throw error
      }
    },
    async handleClick (newTab) {
      try {
        console.log(`\nThe new tab is : ${newTab}\n`) // TESTING
        this.currentTab = newTab
      } catch (error) {
        if (error) throw error
      }
    },
    async updatePassword () {
      try {
        const buyerExtracted = this.$store.getters.getBuyerInfo

        const updatePassInfo = {
          email: buyerExtracted.email,
          oldPass: this.oldPass,
          newPass: this.newPass,
          confirmNewPass: this.confirmNewPass
        }

        const response = await BuyerServices.updateBuyerPassword(
          updatePassInfo
        )

        console.log(`\nBaby baby yes ! ${JSON.stringify(response)}\n`) // TESTING

        // this.confirmNewPass = "TESTING";
      } catch (error) {
        if (error) throw error
      }
    }
  }
}

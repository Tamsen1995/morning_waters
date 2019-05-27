import DashboardHeader from '@/components/DashboardHeader.vue'
// import AuthenticationService from '@/services/AuthenticationService'
import UserServices from '@/services/UserServices'
import DashboardServices from '@/services/DashboardServices'
import { ResponsiveDirective } from 'vue-responsive-components'
var $ = require('jQuery')

export default {
  name: 'Dashboard',
  data () {
    return {
      services: [],
      serviceTitle: '',
      serviceDescription: '',
      servicePrice: 0.0,
      serviceSubtitle: '',
      unitType: '',
      price: '',
      turnAroundTime: '',
      user: null,
      companyName: '',
      companyLocation: '',
      about: '',
      credits: 0,
      leads: 0,
      pageViews: 0
    }
  },
  components: {
    DashboardHeader
  },
  directives: {
    responsive: ResponsiveDirective
  },
  methods: {
    async submitService () {
      try {
        // get the service table id from the user
        const userExtracted = this.$store.getters.getUserInfo
        const serviceTableId = userExtracted.serviceTableId

        const service = {
          userId: userExtracted.id,
          tableId: serviceTableId,
          title: this.serviceTitle,
          description: this.serviceDescription,
          servicePrice: this.servicePrice
        }

        console.log(`\nThe service being : ${JSON.stringify(service)}\n`) // TESTING

        // TODO : the reponse object doesn't return anything. Fix that in a little bit
        await DashboardServices.pushServiceOntoDb(service)
        this.$modal.hide('add-service')

        this.getServices()
        this.serviceTitle = ''
        this.serviceDescription = ''
        this.servicePrice = 0.0
      } catch (error) {
        if (error) {
          console.log(
            `An error occurred inside of the dashboard.js submitService method : ${error}`
          ) // TESTING
        }
      }
    },
    addService () {
      this.$modal.show('add-service')
      // $('#myModal').modal('show')
    },

    async getServices () {
      try {
        console.log(`\n\nInside of getting the services\n`) // TESTING
        // query onto the database for the user's services in the services table.
        const userExtracted = this.$store.getters.getUserInfo
        const serviceTableId = userExtracted.serviceTableId
        const response = await DashboardServices.queryForUsersServices(
          serviceTableId
        )
        // have an array in which the services of the user are
        const userServicesArray = response.data.usersServices
        this.services = userServicesArray
      } catch (error) {
        console.log(
          `An error occurred inside of the dashboard.js getServices method : ${error}`
        ) // TESTING
        if (error) throw error
      }
    },
    async getUserInfo () {
      // TODO : Make a request for the public user info into the backend
      try {
        const userExtracted = this.$store.getters.getUserInfo
        const userId = userExtracted.id
        const response = (await UserServices.getPublicProfileInfo(userId)).data
        this.user = response.user
        this.companyName = this.user.companyName
        this.about = this.user.about
        this.credits = this.user.credits
        if (this.credits === null) {
          this.credits = 0
        }
      } catch (error) {
        if (error) throw error
      }
    },
    async inserDummyData () {
      // The goal is to replace every variable in this method with
      // a live fetched variable

      this.companyLocation = 'New York, New York, US'

      // Credits

      console.log(`this.credits ${this.credits}`) // TESTING

      // Leads
      this.leads = 75015
      // Page Views
      this.pageViews = 714
    }
  },
  mounted () {
    this.inserDummyData() // TESTING
    this.getServices()
    this.getUserInfo()
  }
}

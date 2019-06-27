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
      subServices: [],
      serviceTitle: '',
      serviceDescription: '',
      servicePrice: 0.0,
      turnAroundTime: '',
      serviceTags: '',
      unitType: '',
      price: '',
      user: null,
      companyName: '',
      companyLocation: '',
      about: '',
      credits: 0,
      leads: 0,
      pageViews: 0,

      // The variable which will determine if
      // the section for adding a sub service will be shown
      // addSubService: false
      // these are the subservicesToBeAdded to be added
      subServicesToBeAdded: []
    }
  },
  components: {
    DashboardHeader
  },
  directives: {
    responsive: ResponsiveDirective
  },
  methods: {
    // compares the given service to all
    // other services and determines if there any
    // subservices present

    // async manifestModalInquiry() {
    //   try {
    //     this.$modal.show('general-inquiry-modal')
    //   } catch (error) {
    //     console.log(`\nError in manifestModalInquiry : ${error}\n`) // TESTING
    //     if (error) throw error
    //   }
    // },

    // get the service id of the service clicked on
    // ddeclare the service with the service id the main service
    // iteratively add all the services with the same public id into an array
    //

    // this.$modal.hide('add-service')
    //     this.serviceTitle = ''
    //     this.serviceDescription = ''
    //     this.servicePrice = 0.0
    //     this.turnAroundTime = ''
    //     this.subServicesToBeAdded = []

    async deleteService (service) {
      try {
        // delete the service
        await DashboardServices.deleteService(service.id)

        this.getServices()
        // reload the services into the dashboard
      } catch (error) {
        if (error) throw error
      }
    },
    async editService (service) {
      try {
        console.log(`\nIm editing the services : ${JSON.stringify(service)}\n`) // TESTING

        this.serviceTitle = service.title
        this.serviceDescription = service.description
        this.servicePrice = service.servicePrice
        this.turnAroundTime = service.turnAroundTime

        this.subServicesToBeAdded = []
        for (var i = 0; i < this.services.length; i++) {
          if (this.services[i].parentServiceId === service.id) {
            console.log(`\nthis.services[i] : ${this.services[i]}\n`) // TESTING
            this.subServicesToBeAdded.push({
              serviceTitle: this.services[i].title,
              serviceDescription: this.services[i].description,
              servicePrice: this.services[i].servicePrice,
              turnAroundTime: this.services[i].turnAroundTime
            })
          }
        }

        // delete service with the underlying service id

        this.$modal.show('add-service')
      } catch (error) {
        if (error) throw error
      }
    },

    async addSubService () {
      try {
        const userExtracted = this.$store.getters.getUserInfo

        this.subServicesToBeAdded.push({
          userId: userExtracted.id,
          serviceTitle: '',
          serviceDescription: '',
          servicePrice: 0.0,
          turnAroundTime: '',
          serviceTags: ''
        })
      } catch (error) {
        if (error) throw error
      }
    },
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
          servicePrice: this.servicePrice,
          turnAroundTime: this.turnAroundTime
        }

        // console.log(`\nThe service being : ${JSON.stringify(service)}\n`) // TESTING

        // TODO : the reponse object doesn't return anything. Fix that in a little bit
        await DashboardServices.pushServiceOntoDb(service)
        await this.getServices()

        const serviceId = this.services[this.services.length - 1].id
        if (this.subServicesToBeAdded.length > 0) {
          await DashboardServices.addSubServices({
            parentServiceId: serviceId,
            serviceTableId: serviceTableId,
            subServices: this.subServicesToBeAdded
          })
        }
        await this.getServices()
        this.$modal.hide('add-service')
        this.serviceTitle = ''
        this.serviceDescription = ''
        this.servicePrice = 0.0
        this.turnAroundTime = ''
        this.subServicesToBeAdded = []
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

        this.services = response.data.usersServices
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
    }
  },
  mounted () {
    this.getServices()
    this.getUserInfo()
  }
}

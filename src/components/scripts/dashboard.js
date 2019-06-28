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
      subServicesToBeAdded: [],
      serviceBeingEdited: false,
      serviceEdited: null
    }
  },
  components: {
    DashboardHeader
  },
  directives: {
    responsive: ResponsiveDirective
  },
  methods: {

    async deleteService (serviceId) {
      try {
        // delete the service
        await DashboardServices.deleteService(serviceId)

        // reload the services into the dashboard
        this.getServices()
      } catch (error) {
        if (error) throw error
      }
    },
    async editService (service) {
      try {
        this.serviceBeingEdited = true
        this.serviceTitle = service.title
        this.serviceDescription = service.description
        this.servicePrice = service.servicePrice
        this.turnAroundTime = service.turnAroundTime
        this.serviceEdited = service

        this.subServicesToBeAdded = []
        for (var i = 0; i < this.services.length; i++) {
          if (this.services[i].parentServiceId === service.id) {
            this.subServicesToBeAdded.push({
              serviceId: this.services[i].id,
              serviceTitle: this.services[i].title,
              serviceDescription: this.services[i].description,
              servicePrice: this.services[i].servicePrice,
              turnAroundTime: this.services[i].turnAroundTime
            })
          }
        }

        this.$modal.show('add-service')
      } catch (error) {
        if (error) throw error
      }
    },

    // sends an updated service with subservices to the back
    // and updates the db with the updated services.
    async submitServiceEdit () {
      try {
        this.serviceEdited.title = this.serviceTitle
        this.serviceEdited.description = this.serviceDescription
        this.serviceEdited.servicePrice = this.servicePrice
        this.serviceEdited.turnAroundTime = this.turnAroundTime

        // all the info needed to modify a service and its subservices in the data base
        const serviceEdit = {
          service: this.serviceEdited,
          subServices: this.subServicesToBeAdded
        }

        console.log(`\n\nJSON.string : ${JSON.stringify(this.subServicesToBeAdded)}\n`) // TESTING

        await DashboardServices.editService(serviceEdit)

        this.$modal.hide('add-service')
        this.serviceTitle = ''
        this.serviceDescription = ''
        this.servicePrice = 0.0
        this.turnAroundTime = ''

        this.subServicesToBeAdded = []
        this.serviceBeingEdited = false
        this.serviceEdited = null
        this.getServices()
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

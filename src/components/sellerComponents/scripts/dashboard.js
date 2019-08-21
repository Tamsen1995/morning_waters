import DashboardHeader from '@/components/sellerComponents/DashboardHeader.vue'
import StatsCards from '@/components/sellerComponents/sellerDashboard/StatsCards.vue'
import AboutSection from '@/components/sellerComponents/sellerDashboard/AboutSection.vue'
import ProgressBar from '@/components/sellerComponents/sellerDashboard/ProgressBar.vue'
import UserServices from '@/services/UserServices'
import DashboardServices from '@/services/DashboardServices'
import { ResponsiveDirective } from 'vue-responsive-components'
var $ = require('jQuery')

export default {
  name: 'Dashboard',
  data () {
    return {
      error: null,
      services: [],
      subServices: [],
      serviceTitle: '',
      serviceDescription: '',
      servicePrice: 0.0,
      turnAroundTime: '',
      turnAroundTimeType: '',
      unitType: '',
      price: '',
      user: null,

      // The variable which will determine if
      // the section for adding a sub service will be shown
      // addSubService: false
      // these are the subservicesToBeAdded to be added
      subServicesToBeAdded: [],
      tags: [],
      serviceBeingEdited: false,
      serviceEdited: null

      // progress bar vars

    }
  },
  mounted () {
    this.getServices()
    this.getUserInfo()
  },
  components: {
    DashboardHeader,
    StatsCards,
    AboutSection,
    ProgressBar
  },
  directives: {
    responsive: ResponsiveDirective
  },
  methods: {
    async updateAboutSection () {
      try {
        console.log(`listen !`) // TESTING
        // re-evaluateo onboarding status
        var child = this.$refs.aboutSection
        child.getUserInfo()
      } catch (error) {
        if (error) throw error
      }
    },
    async redirectToInbox () {
      try {
        this.$router.push({
          name: 'quoteRequestsScreen'
        })
      } catch (error) {
        if (error) throw error
      }
    },
    async redirectToPendingOrders () {
      try {
        this.$router.push({
          name: 'pendingOrders'
        })
      } catch (error) {
        if (error) throw error
      }
    },
    async deleteService (service) {
      try {
        const serviceId = service.id
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

        // Iteratively push the service tags into the array
        for (var k = 0; k < service.tags.length; k++) {
          this.tags.push(service.tags[k].tag)
        }

        this.subServicesToBeAdded = []
        for (var i = 0; i < this.services.length; i++) {
          if (this.services[i].parentServiceId === service.id) {
            var subServiceTags = []

            // Iteratively push the sub service tags into the array
            for (var counter = 0; counter < this.services[i].tags.length; counter++) {
              subServiceTags.push(this.services[i].tags[counter].tag)
            }

            this.subServicesToBeAdded.push({
              serviceId: this.services[i].id,
              serviceTitle: this.services[i].title,
              serviceDescription: this.services[i].description,
              servicePrice: this.services[i].servicePrice,
              turnAroundTime: this.services[i].turnAroundTime,
              serviceTags: subServiceTags
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
        this.serviceEdited.tags = this.tags

        // all the info needed to modify a service and its subservices in the data base
        const serviceEdit = {
          service: this.serviceEdited,
          subServices: this.subServicesToBeAdded
        }

        await DashboardServices.editService(serviceEdit)

        this.$modal.hide('add-service')
        this.serviceTitle = ''
        this.serviceDescription = ''
        this.servicePrice = 0.0
        this.turnAroundTime = ''

        this.subServicesToBeAdded = []
        this.tags = []
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
          serviceTags: []
        })
      } catch (error) {
        if (error) throw error
      }
    },
    // this function determines if the
    // servcice form has been filled out
    serviceFormFilledOut: function () {
      if (this.serviceTitle === '') {
        this.error = 'No service title'
        return false
      } else if (this.serviceDescription === '') {
        this.error = 'No service description'
        return false
      } else if (this.turnAroundTime === '') {
        this.error = 'Please indicate a turnaround time'
        return false
      } else if (this.tags.length <= 0) {
        this.error = 'Please enter some tags / keywords'
        return false
      } else if (this.unitType === '') {
        this.error = 'The unit type needs to be indicated'
        return false
      } else {
        return true
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
          turnAroundTime: `${this.turnAroundTime} ${this.turnAroundTimeType}`,
          unitType: this.unitType,
          tags: this.tags
        }

        // If the service fields are empty then don't execute everything below this
        if (this.serviceFormFilledOut() === true) {
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
          this.tags = []
          this.subServicesToBeAdded = []

          // re-evaluateo onboarding status
          var child = this.$refs.progressBar
          child.determineOnboardingStatus()
        }
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
  }

}

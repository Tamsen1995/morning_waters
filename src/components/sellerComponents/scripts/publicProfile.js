import UserServices from '@/services/UserServices'
import InboxService from '@/services/InboxService'
import DashboardServices from '@/services/DashboardServices'
import BuyerHeader from '@/components/buyerComponents/BuyerHeader'
import ShoppingCart from '@/components/buyerComponents/ShoppingCart'
import RequestQuoteCart from '@/components/buyerComponents/RequestQuoteCart'
import AddItemToShoppingCartModal from '@/components/buyerComponents/modals/AddItemToShoppingCartModal'
import { ResponsiveDirective } from 'vue-responsive-components'
import TransitionExpand from '@/components/TransitionExpand'

export default {
  data () {
    return {
      userId: 0,
      companyName: '',
      about: '',
      companyLocation: '',
      services: null,
      subServices: null,
      serviceTableIdChosen: 0,
      serviceIdChosen: 0,
      pickedQuantityService: [],
      // modal form data
      inquiryText: '',
      pickedQuantityQuoteRequest: 1,
      itemChosen: null,
      expanded: false,

      // error message var
      error: ''
    }
  },
  components: {
    BuyerHeader,
    ShoppingCart,
    RequestQuoteCart,
    AddItemToShoppingCartModal,
    TransitionExpand
  },
  directives: {
    responsive: ResponsiveDirective
  },
  async created () {
    this.userId = this.$route.params.id
    await this.getUserData()
  },
  async mounted () {

  },
  methods: {

    subServicesPresent (service) {
      const serviceId = service.id
      for (var i = 0; i < this.services.length; i++) {
        if (this.services[i].parentServiceId === serviceId) {
          return true
        }
      }
      return false
    },

    async getUserData () {
      try {
        const userInfo = (await UserServices.getPublicProfileInfo(this.userId))
          .data
        const serviceTableId = userInfo.user.serviceTableId

        const response = await DashboardServices.queryForUsersServices(
          serviceTableId
        )
        const userServicesArray = response.data.usersServices
        this.services = userServicesArray
        this.companyName = userInfo.user.companyName
        this.about = userInfo.user.about
        this.$store.dispatch('setUser', userInfo)
      } catch (error) {
        if (error) throw error
      }
    },
    async redirectToCheckoutOrLogin () {
      try {
        this.$store.dispatch('setShoppingCartFlag', true)

        const isUserLoggedIn = this.$store.getters.userLoggedIn
        if (isUserLoggedIn === true) {
          this.$router.push({
            name: 'buyerCheckout'
          })
        } else {
          this.$router.push({
            name: 'buyerLogin'
          })
        }
      } catch (error) {
        console.log(`\nError in redirectToCheckoutOrLogin : ${error}\n`) // TESTING
        if (error) throw error
      }
    },
    async manifestModalInquiry () {
      try {
        this.$modal.show('general-inquiry-modal')
      } catch (error) {
        console.log(`\nError in manifestModalInquiry : ${error}\n`) // TESTING
        if (error) throw error
      }
    },
    async submitInquiryText () {
      try {
        const isUserLoggedIn = this.$store.getters.userLoggedIn

        var generalInquiry = {
          uid: this.userId,
          inquiryText: this.inquiryText
        }
        if (isUserLoggedIn === true) {
          const buyerExtracted = this.$store.getters.getBuyerInfo
          generalInquiry = {
            buyerId: buyerExtracted.id,
            uid: this.userId,
            inquiryText: this.inquiryText
          }
          await InboxService.sendInquiryToUserInbox(generalInquiry)
        } else {
          // store general inquiry in store here
          this.$store.dispatch('setGeneralInquiry', generalInquiry)
          this.$router.push({
            name: 'buyerLogin'
          })
        }
      } catch (error) {
        console.log(`\nThe error occurred in submitInquiryText ${error}\n`) // TESTING
        if (error) throw error
      }
    },
    // shows the modal form used to add item to cart
    async manifestModalForm (service) {
      try {
        this.itemChosen = service

        this.$modal.show('request-quote-modal')
      } catch (error) {
        if (error) throw error
      }
    },
    async manifestAddToCartModal (service) {
      try {
        this.$modal.show('add-to-cart-modal')
        this.itemChosen = service
      } catch (error) {
        if (error) throw error
      }
    },
    async submitQuoteRequest () {
      try {
        const quoteRequestForService = {
          orderId: '',
          inquiryText: this.inquiryText,
          serviceId: this.itemChosen.id,
          sellerId: this.itemChosen.userId,
          serviceTitle: this.itemChosen.title,
          serviceDescription: this.itemChosen.description,
          quantity: this.pickedQuantityQuoteRequest, // I'm not sure why we would need this. Clarify with Stef
          price: this.pickedQuantityQuoteRequest * this.itemChosen.servicePrice
        }
        this.$store.dispatch('addQuoteRequestToCart', quoteRequestForService)
        this.$modal.hide('request-quote-modal')
        this.inquiryText = ''
      } catch (error) {
        if (error) throw error
      }
    },
    async addServiceToCart () {
      try {
        if (this.pickedQuantityService > 0) {
          const shoppingCartItem = {
            orderId: '',
            quantity: this.pickedQuantityService,
            service: this.itemChosen
          }
          this.$store.dispatch('addServiceToCart', shoppingCartItem)
          this.$modal.hide('add-to-cart-modal')
          this.pickedQuantityService = 0
          this.itemChosen = null
          this.error = ''
        } else {
          // TODO : implement this
          this.error = 'please pick a quantity'
        }
      } catch (error) {
        console.log(`\nAn error occurred in addServiceToCart\n`) // TESTING
        if (error) throw error
      }
    }

    // the user id of the SELLER will also
    // need a spot in the store

  }
}

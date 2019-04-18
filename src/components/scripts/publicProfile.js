import UserServices from '@/services/UserServices';
import InboxService from '@/services/InboxService';
import DashboardServices from '@/services/DashboardServices';
import BuyerHeader from '@/components/buyerComponents/BuyerHeader';
import ShoppingCart from '@/components/buyerComponents/ShoppingCart';
import RequestQuoteCart from '@/components/buyerComponents/RequestQuoteCart';
import AddItemToShoppingCartModal from '@/components/buyerComponents/modals/AddItemToShoppingCartModal';
import { ResponsiveDirective } from 'vue-responsive-components';

export default {
  data () {
    return {
      userId: 0,
      companyName: '',
      about: '',
      location: '',
      services: [],
      serviceTableIdChosen: 0,
      serviceIdChosen: 0,
      pickedQuantityService: [],
      // modal form data
      inquiryText: '',
      pickedQuantityQuoteRequest: 0,
      itemChosen: null
    }
  },
  components: {
    BuyerHeader,
    ShoppingCart,
    RequestQuoteCart,
    AddItemToShoppingCartModal
  },
  directives: {
    responsive: ResponsiveDirective
  },
  created () {
    this.userId = this.$route.params.id
  },
  mounted () {
    this.getUserData()
  },
  methods: {
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
        const response = await InboxService.sendInquiryToUserInbox({
          uid: this.userId,
          inquiryText: this.inquiryText
        })
      } catch (error) {
        console.log(`\nThe error occurred in submitInquiryText ${error}\n`) // TESTING
        if (error) throw error
      }
    },
    // shows the modal form used to add item to cart
    async manifestModalForm (service) {
      try {
        this.itemChosen = service
        // this.pickedQuantityQuoteRequest

        this.$modal.show('request-quote-modal')
        console.log(
          `\nWhat is this item chosen : ${JSON.stringify(this.itemChosen)}\n`
        ) // TESTING

        // set a picked item when manifesting this modal
        // this.modal = true
        // this.itemChosen = service
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
          quantity: this.pickedQuantityQuoteRequest // I'm not sure why we would need this. Clarify with Stef
        }

        this.$store.dispatch('addQuoteRequestToCart', quoteRequestForService)
        this.$modal.hide('request-quote-modal')
        this.inquiryText = '';
      } catch (error) {
        if (error) throw error
      }
    },
    async addServiceToCart (service, index) {
      try {
        const shoppingCartItem = {
          orderId: '',
          quantity: this.quantity, // this.pickedQuantityService[index],
          service: service
        }
        this.$store.dispatch('addServiceToCart', shoppingCartItem)
        this.quantity = 0
      } catch (error) {
        console.log(`\nAn error occurred in addServiceToCart\n`) // TESTING
        if (error) throw error
      }
    },
    // the user id of the SELLER will also
    // need a spot in the store
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
        const testingUser = this.$store.getters.getUserInfo
        console.log(
          `\nI am watching the user : ${JSON.stringify(testingUser)}\n`
        ) // TESTING
      } catch (error) {
        if (error) throw error
      }
    }
  }
}

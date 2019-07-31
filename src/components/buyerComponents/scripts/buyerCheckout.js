import ShoppingCart from '@/components/buyerComponents/ShoppingCart' // TODO : Remove
import RequestQuoteCart from '@/components/buyerComponents/RequestQuoteCart' // TODO : Remove
import BuyerHeader from '@/components/buyerComponents/BuyerHeader'

import BuyerServices from '@/services/BuyerServices'
import ShippingService from '@/services/ShippingService'

let stripe = Stripe(process.env.stripe_public_key) // TODO : Replace this with the live api key
let elements = stripe.elements()
let card = null

export default {
  data () {
    return {
      // This order id will be sent to
      // the back to identify an order comprised of
      // shopping cart items and quote requests
      orderId: '',
      creditsToBePurchased: 0,
      fullname: '',
      expMonth: 0,
      expYear: 0,
      cardNumber: 0,
      cvc: 0,
      customerDefaultSource: null,
      shoppingCart: [],
      quoteRequestsCart: null
    }
  },
  beforeDestroy () {
    card.destroy(this.$refs.card)
  },
  created () {
    this.getCartItemsFromStore()
    this.getQuoteRequestsCartFromStore()
  },
  mounted () {
    this.createUniqueOrderId()

    card = elements.create('card')
    card.mount(this.$refs.card)
    this.$store.dispatch('setShoppingCartFlag', false)
  },
  components: {
    ShoppingCart,
    RequestQuoteCart,
    BuyerHeader
  },
  methods: {
    // This function redirects to the correct flow
    // FLOWS:
    // shippo oauth flow
    // direct order confirmation page.
    async redirectToProperFlow () {
      try {
        var randomString =
          Math.random()
            .toString(36)
            .substring(2, 15) +
          Math.random()
            .toString(36)
            .substring(2, 15)

        window.open(`${process.env.SHIPPO_OAUTH_LINK}${randomString}`)
        this.$router.push({
          name: 'orderConfirm'
        })
      } catch (error) {
        if (error) throw error
      }
    },
    async sendShoppingCart () {
      try {
        console.log(`\nhere?\n`) // TESTING
        const token = await stripe.createToken(card)
        if (!token.error) {
          const buyerExtracted = this.$store.getters.getBuyerInfo
          const buyerId = buyerExtracted.id
          const stripeCustomerId = buyerExtracted.stripeCustomerId
          const shoppingCartItems = this.shoppingCart
          const sellerId = shoppingCartItems[0].service.userId

          const purchaseInfo = {
            uid: buyerId,
            sellerId: sellerId,
            stripeCustomerId: stripeCustomerId,
            stripeToken: token,
            shoppingCartItems: shoppingCartItems
          }

          await BuyerServices.purchaseShoppingCart(
            purchaseInfo
          )
          this.$store.dispatch('setShoppingCart', [])
          const response = await BuyerServices.createPendingOrder({
            buyerId: buyerExtracted.id,
            sellerId: sellerId,
            orderId: this.orderId
          })

          this.redirectToProperFlow()
        }
      } catch (error) {
        console.log(`\nThe error seen in sendShoppingCart : ${error}\n`)
        if (error) throw error
      }
    },
    // The function to comprise all the necessary info
    // on the frontend to be sent into the backend
    async sendQuoteRequests () {
      try {
        const buyerExtracted = this.$store.getters.getBuyerInfo
        const sellerExtracted = this.$store.getters.getUserInfo
        const quoteRequestsCart = this.quoteRequestsCart
        const purchaseInfo = {
          seller: sellerExtracted,
          buyer: buyerExtracted,
          quoteRequestsCart: quoteRequestsCart
        }
        this.$store.dispatch('setQuoteRequestCart', [])

        this.redirectToProperFlow()

        await BuyerServices.sendQuoteRequestsCart(purchaseInfo)
        await BuyerServices.createOrder({
          buyerId: buyerExtracted.id,
          sellerId: sellerExtracted.user.id,
          orderId: this.orderId
        })
      } catch (error) {
        console.log(`\nAn error occurred in sendQuoteRequests: ${error}\n`) // TESTING
        if (error) throw error
      }
    },
    async sendOrderAndOrInquiries () {
      try {
        // sending shopping cart to back
        const token = await stripe.createToken(card)
        if (!token.error) {
          const buyerExtracted = this.$store.getters.getBuyerInfo
          const sellerExtracted = this.$store.getters.getUserInfo
          const quoteRequestsCart = this.quoteRequestsCart

          const buyerId = buyerExtracted.id
          const stripeCustomerId = buyerExtracted.stripeCustomerId
          const shoppingCartItems = this.shoppingCart

          const purchaseInfo = {
            seller: sellerExtracted,
            buyer: buyerExtracted,
            quoteRequestsCart: quoteRequestsCart
          }

          const purchaseInfoTwo = {
            uid: buyerId,
            sellerId: sellerExtracted.user.id,
            stripeCustomerId: stripeCustomerId,
            stripeToken: token,
            shoppingCartItems: shoppingCartItems
          }

          await BuyerServices.sendQuoteRequestsCart(purchaseInfo)
          await BuyerServices.purchaseShoppingCart(purchaseInfoTwo)

          await BuyerServices.createOrder({
            buyerId: buyerId,
            sellerId: sellerExtracted.user.id,
            orderId: this.orderId
          })
          this.$store.dispatch('setQuoteRequestCart', [])
          this.$store.dispatch('setShoppingCart', [])
          this.redirectToProperFlow()
        }
      } catch (error) {
        console.log(
          `\nan error occurred in sendOrderAndOrInquiries : ${error}\n`
        ) // TESTING
        if (error) throw error
      }
    },
    async createUniqueOrderId () {
      try {
        const response = await BuyerServices.createUniqueOrderId()
        const orderId = response.data.orderId
        this.orderId = orderId

        // making sure all the items which can be sent through
        // an order will have an order id attached to them.
        for (var i = 0; i < this.shoppingCart.length; i++) {
          this.shoppingCart[i].orderId = this.orderId
        }
        for (var v = 0; v < this.quoteRequestsCart.length; v++) {
          this.quoteRequestsCart[v].orderId = this.orderId
        }
      } catch (error) {
        console.log(`\nError in createUniqueOrderId\n`) // TESTING
        if (error) throw error
      }
    },
    async getQuoteRequestsCartFromStore () {
      try {
        const quoteRequestsCart = this.$store.getters.getQuoteRequestsCart

        if (quoteRequestsCart) {
          this.quoteRequestsCart = JSON.parse(JSON.stringify(quoteRequestsCart))
        } else {
          this.quoteRequestsCart = []
        }
      } catch (error) {
        if (error) throw error
      }
    },
    async getCartItemsFromStore () {
      try {
        const cartItems = this.$store.getters.getShoppingCartItems
        if (cartItems) {
          this.shoppingCart = JSON.parse(JSON.stringify(cartItems))
        } else {
          this.shoppingCart = []
        }
      } catch (error) {
        if (error) throw error
      }
    }
  }
}

// import BuyerCheckout from "@/components/buyerComponents/BuyerCheckout";

export default {
  data () {
    return {
      shoppingCart: null
    }
  },
  mounted () {
    this.getCartItemsFromStore()
  },
  methods: {

    async deleteItemFromShoppingCart (index) {
      try {
        this.$store.dispatch('deleteServiceFromShoppingCart', index)
        this.getCartItemsFromStore()
      } catch (error) {
        if (error) throw error
      }
    },
    async getCartItemsFromStore () {
      try {
        const shoppingCartItems = this.$store.getters.getShoppingCartItems

        //  BUILDING ...

        if (shoppingCartItems) {
          this.shoppingCart = shoppingCartItems
        } else {
          this.shoppingCart = []
        }
      } catch (error) {
        console.log(`\nAn error occurred in getCartItemsFromStore\n`) // TESTING
        if (error) throw error
      }
    }
  }
}

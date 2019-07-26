// import BuyerCheckout from "@/components/buyerComponents/BuyerCheckout";

export default {
	data() {
		return {
			shoppingCart: null
		};
	},
	mounted() {
		this.getCartItemsFromStore();
		// set store here
	},
	methods: {
		// TESTING
		async deleteItemFromShoppingCart(index) {
			try {
				this.$store.dispatch("deleteServiceFromShoppingCart", index);
				this.getCartItemsFromStore();
			} catch (error) {
				if (error) throw error;
			}
		},
		async getCartItemsFromStore() {
			try {
				const shoppingCartItems = this.$store.getters.getShoppingCartItems;

				console.log(
					`\nThe shopping cart items : ${JSON.stringify(shoppingCartItems)}\n`
				); // TESTING

				//  BUILDING ...

				if (shoppingCartItems) {
					this.shoppingCart = shoppingCartItems;
				} else {
					this.shoppingCart = [];
				}
			} catch (error) {
				console.log(`\nAn error occurred in getCartItemsFromStore\n`); // TESTING
				if (error) throw error;
			}
		}
	}
};
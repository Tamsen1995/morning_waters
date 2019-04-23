<template>
  <body class="shopping-cart">
    <!-- <div> -->
      <h3>Shopping Cart</h3>
        <!-- Service/Price Listings -->
        <br>
        <br>
        <div class="container" id="price-chart">
          <p>
            <table class="table table-hover" >
            <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Description</th>
                  <th scope="col">Turn Around Time</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Total</th>
                </tr>
            </thead>
            <tbody>
              <tr v-for="item in this.shoppingCart" v-bind:key="item">
                <th scope="row">Service 1</th>
                <td>{{ item.service.title}}</td>
                <td>{{ item.service.description }}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
            </table>
          </p>
        </div>                      
      <br>
      <br>
    <!-- </div> -->
  </body>
</template>

<script>
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
    async testingDelete() {
      try {
        this.$store.dispatch("clearShoppingCart");
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
</script>

<style>
@import "../../assets/css/settings.css";
@import url('https://fonts.googleapis.com/css?family=Lato|Roboto');
</style>

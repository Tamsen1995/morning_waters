<template>
<body class="shopping-cart">
  <!-- Service/Price Listings -->
  <div class="container" id="price-chart">
    <p></p>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Item</th>
          <th scope="col">Description</th>
          <th scope="col">Turn Around Time</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
          <th scope="col">Total</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in this.shoppingCart" v-bind:key="index">
          <th scope="row">{{ item.service.title}}</th>
          <td>{{ item.service.description }}</td>
          <td></td>

          <!-- Add edit quantity functionality -->
          <td></td>
          <td></td>
          <td></td>
          <td></td>

          <!-- Add delete functionality -->
          <td @click="deleteItemFromShoppingCart(index)">X</td>
        </tr>
      </tbody>
    </table>
  </div>
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
</script>

<style>
@import "../../assets/css/header.css";
@import url("https://fonts.googleapis.com/css?family=Lato|Roboto");
</style>

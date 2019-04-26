<template>
  <div>
    <h1>Shopping Cart</h1>

    <ul class="timeline">
      <li v-for="item in this.shoppingCart" v-bind:key="item">
        <!-- { "quantity": "21", "service": { "id": 11, "userId": 1, "tableId": "1serviceList", "title": "extra small", "description": "tkt j'au mon business", "createdAt": "2019-03-25T20:27:27.000Z", "updatedAt": "2019-03-25T20:27:27.000Z" } } -->
        Item : {{ item.service.title}}
        <br>
        Description : {{ item.service.description }}
        <br>
        Quantity : {{ item.quantity }}
        <br>
        <br>
      </li>
      <br>
    </ul>
    <br>
    <br>
    <br>
    <br>
    <br>

    <br>
    <br>
    <br>
    <br>
    <br>
    <!--  -->
    <h1 @click="testingDelete()">Testing only please delete</h1>
    <!--  -->
  </div>
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
</style>

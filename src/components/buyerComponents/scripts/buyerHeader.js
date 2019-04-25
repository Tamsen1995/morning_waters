export default {
  data () {
    return {
      buyerLoggedIn: false,
      dropdownMenu: false
    }
  },
  mounted () {
    this.getBuyerAuthStatus()
  },
  methods: {
    // display_menu: function() {
    //   var body = document.getElementsByTagName("body")[0];
    //   (!body.classList.contains("display_menu")) ? body.classList.add("display_menu") : body.classList.remove("display_menu");
    // },
    async toggleDropdownMenu () {
      try {
        if (this.dropdownMenu === false) {
          this.dropdownMenu = true
        } else {
          this.dropdownMenu = false
        }
      } catch (error) {
        if (error) throw error
      }
    },
    async display_menu () {
      try {
      } catch (error) {
        if (error) throw error
      }
    },
    async getBuyerAuthStatus () {
      try {
        console.log(`\nMounting the buyer header\n`) // TESTING
        const buyerExtracted = this.$store.getters.getBuyerInfo
        const isBuyerLoggedIn = this.$store.getters.userLoggedIn

        if (buyerExtracted != null && isBuyerLoggedIn === true) {
          this.buyerLoggedIn = true
        } else {
          this.buyerLoggedIn = false
        }
      } catch (error) {
        console.log(`\nerror in getBuyerAuthStatus\n`) // TESTING
        if (error) throw error
      }
    },
    async redirectToBillings () {
      try {
        this.$router.push({
          name: 'buyerBillings'
        })
      } catch (error) {
        if (error) throw error
      }
    },
    async redirectToSignUp () {
      try {
        this.$router.push({
          name: 'buyerRegister'
        })
      } catch (error) {
        if (error) throw error
      }
    },
    async redirectToLogin () {
      try {
        this.$store.dispatch('setShoppingCartFlag', false)
        this.$router.push({
          name: 'buyerLogin'
        })
      } catch (error) {
        if (error) throw error
      }
    },
    async redirectToInbox () {
      try {
        this.$router.push({
          name: 'buyer_inbox'
        })
      } catch (error) {
        console.log(`\nError in redirectToCurrentOrderStatus\n`) // TESTING
        if (error) throw error
      }
    },
    async redirectToSettings () {
      try {
        this.$router.push({
          name: 'buyerSettings'
        })
      } catch (error) {
        if (error) throw error
      }
    },
    async redirectToProfile () {
      try {
        this.$router.push({
          name: 'buyerDashboard'
        })
      } catch (error) {
        if (error) throw error
      }
    },
    async goToBuyersCart () {
      try {
        const userLoggedIn = this.$store.getters.userLoggedIn
        this.$router.push({
          name: 'buyersCarts'
        })
      } catch (error) {
        if (error) throw error
      }
    }
  },
  async manifestModalShowCart () {
    try {
      this.$modal.show('view-cart')
    } catch (error) {
      console.log(`\nError in manifestModalShowCart : ${error}\n`) // TESTING
      if (error) throw error
    }
  },
  computed: {
    itemsInCart () {
      let cart = this.$store.getters.getShoppingCartItems
      console.log(`\nthe cart is  : ${cart}\n`) // TESTING
      if (cart) {
        var ret = cart.length
      } else {
        var ret = 0
      }
      console.log(`\nWhat is ret ${ret}\n`) // TESTING
      return ret
    }
  }
}

// methods: {

//   display_drop_menu: function() {
//     var drop_menu = event.target.parentElement.getElementsByClassName("drop_menu")[0];
//     var drop_menus = document.getElementsByClassName("drop_menu");

//     Array.from(drop_menus).forEach(function (e) {
//       if (e != drop_menu) {
//         e.classList.remove("display");
//       }
//     });
//     var lis = document.getElementById("menu").getElementsByTagName("li");
//     Array.from(lis).forEach(function (e) {
//       e.style.marginTop = 0;
//     });
//     (!drop_menu.classList.contains("display")) ? drop_menu.classList.add("display") : drop_menu.classList.remove("display");
//     if (window.innerWidth < 660 && drop_menu.classList.contains("display")) {
//       event.target.parentElement.nextSibling.nextSibling.style.marginTop = drop_menu.clientHeight + "px";
//     }
//   },
//   loaded: function() {
//     document.getElementsByTagName("body")[0].style.overflowY = "hidden";
//     console.log('t');
//     (this.load) ? this.load = false : this.load = true;
//   }
// }
// });
// function close_all_menu() {
//   var lis = document.getElementById("menu").getElementsByTagName("li");
//   Array.from(lis).forEach(function (e) {
//     e.style.marginTop = 0;
//   });
//   var drop_menus = document.getElementsByClassName("drop_menu");
//   Array.from(drop_menus).forEach(function (e) {
//     e.classList.remove("display");
//   });
// }

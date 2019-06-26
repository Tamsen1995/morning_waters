import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import CreditsPurchasing from '@/components/CreditsPurchasing'
import QuoteRequestsScreen from '@/components/QuoteRequestsScreen'
import PublicProfile from '@/components/PublicProfile'
import Checkout from '@/components/Checkout'
import CreditsHome from '@/components/CreditsHome'
import SettingsPage from '@/components/SettingsPage'
import SettingsChangeDefaultSource from '@/components/SettingsChangeDefaultSource'
import PendingOrders from '@/components/PendingOrders'
import PendingOrderStatus from '@/components/PendingOrderStatus'
import AuthenticationService from '@/services/AuthenticationService'

// Buyer routes
import BuyerRegister from '@/components/buyerComponents/BuyerRegister'
import BuyerLogin from '@/components/buyerComponents/BuyerLogin'
import BuyerDashboard from '@/components/buyerComponents/BuyerDashboard'
import BuyerOrderStatus from '@/components/buyerComponents/BuyerOrderStatus'
import ShoppingCart from '@/components/buyerComponents/ShoppingCart'
import BuyerCheckout from '@/components/buyerComponents/BuyerCheckout'
import BuyersCarts from '@/components/buyerComponents/BuyersCarts'
import OrderConfirm from '@/components/buyerComponents/OrderConfirm'
import CurrentOrderStatus from '@/components/buyerComponents/CurrentOrderStatus'
import BuyerInbox from '@/components/buyerComponents/BuyerInbox'
import BuyerSettings from '@/components/buyerComponents/BuyerSettings'
import BuyerBillings from '@/components/buyerComponents/BuyerBillings'
import BuyerCorrespondance from '@/components/buyerComponents/BuyerCorrespondance'

// Shippo routes
import DashboardShippoRegister from '@/components/DashboardShippoRegister'

Vue.use(Router)
function routingAuthentication (to, from, next) {
  try {
    const authToken = window.localStorage.getItem('id_token')
    AuthenticationService.routingAuthentication(authToken)
      .then(response => {
        const auth = response.data.auth
        if (auth === true) {
          next()
        } else {
          // TODO :
          console.log(`\n TODO : The user needs to be redirected\n`) // TESTING
        }
      })
      .catch(error => {
        if (error) throw error
      })
  } catch (error) {
    console.log(`\nThe error guard of index component : ${error}\n`) // TESTING
    if (error) throw error
  }
}

export default new Router({
  routes: [
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
      beforeEnter: (to, from, next) => {
        routingAuthentication(to, from, next)
      }
    },
    {
      path: '/publicProfile/:id',
      name: 'publicProfile',
      component: PublicProfile
    },
    {
      path: '/pendingOrder/status/:orderId',
      name: 'pendingOrderStatus',
      component: PendingOrderStatus
    },
    {
      path: '/',
      name: 'root',
      component: Hello
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        routingAuthentication(to, from, next)
      }
    },
    {
      path: '/dashboard/creditsScreen',
      name: 'creditsHome',
      component: CreditsHome,
      beforeEnter: (to, from, next) => {
        routingAuthentication(to, from, next)
      }
    },
    {
      path: '/dashboard/creditsScreen/creditsPurchasing',
      name: 'creditsPurchasing',
      component: CreditsPurchasing,
      beforeEnter: (to, from, next) => {
        routingAuthentication(to, from, next)
      }
    },
    {
      path: '/dashboard/quoteRequestsScreen',
      name: 'quoteRequestsScreen',
      component: QuoteRequestsScreen
    },
    {
      path: '/dashboard/settings',
      name: 'settings',
      component: SettingsPage,
      beforeEnter: (to, from, next) => {
        routingAuthentication(to, from, next)
      }
    },
    {
      path: '/dashboard/changeDefaultSource',
      name: 'changeDefaultSource',
      component: SettingsChangeDefaultSource,
      beforeEnter: (to, from, next) => {
        routingAuthentication(to, from, next)
      }
    },
    {
      path: '/dashboard/pending_orders',
      name: 'pendingOrders',
      component: PendingOrders,
      beforeEnter: (to, from, next) => {
        routingAuthentication(to, from, next)
      }
    },
    // /dashboard/shippo / oauth / register
    {
      path: '/dashboard/shippo/oauth/register/:state/:code',
      name: 'dashboardRegisterShippoAccountRedirect',
      component: DashboardShippoRegister,
      beforeEnter: (to, from, next) => {
        routingAuthentication(to, from, next)
      }
    },

    // Buyer Routes below
    {
      path: '/buyerRegistration',
      name: 'buyerRegister',
      component: BuyerRegister
    },
    {
      path: '/buyerLogin',
      name: 'buyerLogin',
      component: BuyerLogin
    },
    {
      path: '/buyerDashboard',
      name: 'buyerDashboard',
      component: BuyerDashboard
    },
    {
      path: '/buyerDashboard/orders/status/:orderId',
      name: 'buyerOrderStatus',
      component: BuyerOrderStatus

    },
    {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: ShoppingCart
    },
    {
      path: '/buyerCheckout',
      name: 'buyerCheckout',
      component: BuyerCheckout
    },
    {
      path: '/buyersCarts',
      name: 'buyersCarts',
      component: BuyersCarts
    },
    {
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: OrderConfirm
    },
    {
      path: '/currentOrderStatus',
      name: 'currentOrderStatus',
      component: CurrentOrderStatus
    },
    {
      path: '/buyer_inbox',
      name: 'buyer_inbox',
      component: BuyerInbox
    },
    {
      path: '/buyerSettings',
      name: 'buyerSettings',
      component: BuyerSettings
    },
    {
      path: '/buyerBillings',
      name: 'buyerBillings',
      component: BuyerBillings
    },
    {
      path: '/orderHistory/correspondance',
      name: 'buyerCorrespondance',
      component: BuyerCorrespondance
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Register from '@/components/sellerComponents/Register'
import Login from '@/components/sellerComponents/Login'
import Dashboard from '@/components/sellerComponents/sellerDashboard/Dashboard'
import CreditsPurchasing from '@/components/sellerComponents/CreditsPurchasing'
import QuoteRequestsScreen from '@/components/sellerComponents/sellerInbox/QuoteRequestsScreen'
import PublicProfile from '@/components/sellerComponents/PublicProfile'
import Checkout from '@/components/sellerComponents/Checkout'
import CreditsHome from '@/components/sellerComponents/CreditsHome'
import SettingsPage from '@/components/sellerComponents/SettingsPage'
import SettingsChangeDefaultSource from '@/components/sellerComponents/SettingsChangeDefaultSource'
import PendingOrders from '@/components/sellerComponents/PendingOrders'
import PendingOrderStatus from '@/components/sellerComponents/PendingOrderStatus'
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
import BuyerInbox from '@/components/buyerComponents/buyerInbox/BuyerInbox'
import BuyerSettings from '@/components/buyerComponents/BuyerSettings'
import BuyerBillings from '@/components/buyerComponents/BuyerBillings'
import BuyerCorrespondance from '@/components/buyerComponents/BuyerCorrespondance'

// Shippo routes
import DashboardShippoRegister from '@/components/sellerComponents/DashboardShippoRegister'
import DashboardStripeConnectRegister from '@/components/sellerComponents/DashboardStripeConnectRegister'

// misc routes
import ComingSoon from '@/components/ComingSoon'
import FaqPage from '@/components/FaqPage'

Vue.use(Router)

// Used to block of all routes in development from production env
function isInDevelopEnv(to, from, next) {
  try {
    // Releasing the beta would simply mean removing this guard from the routes to be released
    // or releasing everything by just invoking the next method in this and removing everything else
    // if (process.env.NODE_ENV === 'development') {
    next()
    // } else {
    // redirecting the user back to where they came from
    // next(from)
    // }
    // testing
  } catch (error) {
    if (error) throw error
  }
}

function routingAuthentication(to, from, next) {
  try {
    const authToken = window.localStorage.getItem('id_token')
    AuthenticationService.routingAuthentication(authToken)
      .then(response => {
        const auth = response.data.auth
        if (auth === true) {
          next()
        } else {
          // redirecting the user back to where they came from
          next(from)
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
  mode: 'history',
  routes: [
    {
      path: '/coming_soon',
      name: 'comingSoon',
      component: ComingSoon

    },
    {
      path: '/FAQ',
      name: 'faqPage',
      component: FaqPage
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
      beforeEnter: (to, from, next) => {
        routingAuthentication(to, from, next)
        isInDevelopEnv(to, from, next)
      }
    },
    {
      path: '/publicProfile/:id',
      name: 'publicProfile',
      component: PublicProfile,
      beforeEnter: (to, from, next) => {
        isInDevelopEnv(to, from, next)
      }
    },
    {

      path: '/pendingOrder/status/:orderId',
      name: 'pendingOrderStatus',
      component: PendingOrderStatus,
      beforeEnter: (to, from, next) => {
        routingAuthentication(to, from, next)
        isInDevelopEnv(to, from, next)
      }
    },
    {
      path: '/',
      name: 'root',
      component: Hello
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: (to, from, next) => {
        isInDevelopEnv(to, from, next)
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        isInDevelopEnv(to, from, next)
      }
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
      component: QuoteRequestsScreen,
      beforeEnter: (to, from, next) => {
        routingAuthentication(to, from, next)
        isInDevelopEnv(to, from, next)
      }
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
    {
      path: '/dashboard/stripe_connect/oauth/register/:state/:code',
      name: 'dashboardRegisterStripeConnectRedirect',
      component: DashboardStripeConnectRegister
    },

    // Buyer Routes below
    {
      path: '/buyerRegistration',
      name: 'buyerRegister',
      component: BuyerRegister,
      beforeEnter: (to, from, next) => {
        isInDevelopEnv(to, from, next)
      }
    },
    {
      path: '/buyerLogin',
      name: 'buyerLogin',
      component: BuyerLogin,
      beforeEnter: (to, from, next) => {
        isInDevelopEnv(to, from, next)
      }
    },
    {
      path: '/buyerDashboard',
      name: 'buyerDashboard',
      component: BuyerDashboard,
      beforeEnter: (to, from, next) => {
        routingAuthentication(to, from, next)
        isInDevelopEnv(to, from, next)
      }
    },
    {
      path: '/buyerDashboard/orders/status/:orderId',
      name: 'buyerOrderStatus',
      component: BuyerOrderStatus,
      beforeEnter: (to, from, next) => {
        routingAuthentication(to, from, next)
        isInDevelopEnv(to, from, next)
      }

    },
    {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: ShoppingCart,
      beforeEnter: (to, from, next) => {
        isInDevelopEnv(to, from, next)
      }
    },
    {
      path: '/buyerCheckout',
      name: 'buyerCheckout',
      component: BuyerCheckout,
      beforeEnter: (to, from, next) => {
        isInDevelopEnv(to, from, next)
      }
    },
    {
      path: '/buyersCarts',
      name: 'buyersCarts',
      component: BuyersCarts,
      beforeEnter: (to, from, next) => {
        isInDevelopEnv(to, from, next)
      }
    },
    {
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: OrderConfirm,
      beforeEnter: (to, from, next) => {
        routingAuthentication(to, from, next)
        isInDevelopEnv(to, from, next)
      }
    },
    {
      path: '/currentOrderStatus',
      name: 'currentOrderStatus',
      component: CurrentOrderStatus,
      beforeEnter: (to, from, next) => {
        routingAuthentication(to, from, next)
        isInDevelopEnv(to, from, next)
      }
    },
    {
      path: '/buyer_inbox',
      name: 'buyer_inbox',
      component: BuyerInbox,
      beforeEnter: (to, from, next) => {
        routingAuthentication(to, from, next)
        isInDevelopEnv(to, from, next)
      }
    },
    {
      path: '/buyerSettings',
      name: 'buyerSettings',
      component: BuyerSettings,
      beforeEnter: (to, from, next) => {
        routingAuthentication(to, from, next)
        isInDevelopEnv(to, from, next)
      }
    },
    {
      path: '/buyerBillings',
      name: 'buyerBillings',
      component: BuyerBillings,
      beforeEnter: (to, from, next) => {
        routingAuthentication(to, from, next)
        isInDevelopEnv(to, from, next)
      }
    },
    {
      path: '/orderHistory/correspondance',
      name: 'buyerCorrespondance',
      component: BuyerCorrespondance,
      beforeEnter: (to, from, next) => {
        routingAuthentication(to, from, next)
        isInDevelopEnv(to, from, next)
      }
    }
  ]
})

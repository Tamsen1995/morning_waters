import Api from '@/services/Api'
import store from '@/store/store'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  },
  routingAuthentication (jwtToken) {
    return Api().post('routingAuthentication', { jwtToken })
  },
  logout (credentials) {
    return Api().get('logout', credentials)
  },
  checkAuth () {
    var jwt = localStorage.getItem('id_token')
    if (!jwt) {
      store.dispatch('setToken', null)
      store.dispatch('setUser', null)
      store.dispatch('setAuthStatus', false)
    } else {
      store.dispatch('setAuthStatus', true)
    }
  },
  // The object to be passed as a header for authenticated requests
  getAuthHeader () {
    return window.localStorage.getItem('id_token')
  },
  // Buyer services below
  buyerLogin (credentials) {
    return Api().post('buyerLogin', credentials)
  },
  buyerRegister (credentials) {
    console.log(`\n\nThe credentials for the buyer register : ${JSON.stringify(credentials)}\n`) // TESTING
    return Api().post('buyerRegister', credentials)
  }
}

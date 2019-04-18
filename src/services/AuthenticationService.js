import Api from '@/services/Api';
import store from '@/store/store';

export default {
  register (credentials) {
    console.log(
      `\n\nInside of the register with credentials: ${JSON.stringify(
        credentials
      )}  \n`
    ) // TESTING
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  },
  routingAuthentication (jwtToken) {
    console.log(`\nThe jwtToken is : ${jwtToken}\n`) // TESTING
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
    return Api().post('buyerRegister', credentials)
  }
}

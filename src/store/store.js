import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
})

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  strict: true,
  state: {
    creditsToBePurchased: 0,
    subscription: '',
    token: null,
    user: null,
    buyer: null,
    isUserLoggedIn: false,
    quoteToBeRequested: null, // The quote to be requested from the stranger profile
    sidebarItem: '',
    // vars for the registration from the homepage
    companyName: '',
    emailAddress: '',
    objectToBeSent: null,
    shoppingCartServices: [],
    quoteRequestsServicesCart: [],

    // the flag which determines the
    // flow from the buyers' perspective
    // if it's set then upon signup the buyer will be redirected
    // to the checkout page directly
    shoppingCartFlag: false,

    // If this general inquiry is set
    // then it will be submitted upon buyer login
    // and then reset again
    generalInquiry: null

  },
  mutations: {
    setShoppingCartFlag (state, flag) {
      state.shoppingCartFlag = flag
    },
    clearShoppingCart (state) {
      state.shoppingCartServices = []
    },
    clearQuoteRequestsCart (state) {
      state.quoteRequestsServicesCart = []
    },
    setSubscription (state, subscription) {
      state.subscription = subscription
    },
    setObjectToBeSent (state, objectToBeSent) {
      state.objectToBeSent = objectToBeSent
    },
    setCreditsToBePurchased (state, creditsToBePurchased) {
      state.creditsToBePurchased = creditsToBePurchased
    },
    setQuoteToBeRequested (state, quoteToBeRequested) {
      state.quoteToBeRequested = quoteToBeRequested
    },
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser (state, user) {
      state.user = user
    },
    setBuyer (state, buyer) {
      state.buyer = buyer
    },
    setAuthStatus (state, status) {
      state.isUserLoggedIn = status
    },
    setSidebarHighlight (state, sidebarItem) {
      state.sidebarItem = sidebarItem
    },
    setCompanyName (state, companyName) {
      state.companyName = companyName
    },
    setEmailAddress (state, emailAddress) {
      state.emailAddress = emailAddress
    },
    addServiceToCart (state, service) {
      var array = state.shoppingCartServices
      array.push(service)
      state.shoppingCartServices = array
    },
    deleteServiceFromShoppingCart (state, index) {
      var array = state.shoppingCartServices
      array.splice(index, 1)
      state.shoppingCartServices = array
    },
    addQuoteRequestToCart (state, quoteRequestForService) {
      var array = state.quoteRequestsServicesCart
      array.push(quoteRequestForService)
      state.quoteRequestsServicesCart = array
    },
    setShoppingCart (state, array) {
      state.shoppingCartServices = array
    },
    setQuoteRequestCart (state, array) {
      state.quoteRequestsServicesCart = array
    },
    setGeneralInquiry (state, generalInquiry) {
      state.generalInquiry = generalInquiry
    }
  },
  actions: {
    setShoppingCartFlag ({ commit }, flag) {
      commit('setShoppingCartFlag', flag)
    },
    clearShoppingCart ({ commit }) {
      commit('clearShoppingCart')
    },
    clearQuoteRequestsCart ({ commit }) {
      commit('clearQuoteRequestsCart')
    },
    setSubscription ({ commit }, subscription) {
      commit('setSubscription', subscription)
    },
    setObjectToBeSent ({ commit }, objectToBeSent) {
      commit('setObjectToBeSent', objectToBeSent)
    },
    setCreditsToBePurchased ({ commit }, creditsToBePurchased) {
      commit('setCreditsToBePurchased', creditsToBePurchased)
    },
    setQuoteToBeRequested ({ commit }, quoteToBeRequested) {
      commit('setQuoteToBeRequested', quoteToBeRequested)
    },
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    setUser ({ commit }, user) {
      commit('setUser', user)
    },
    setBuyer ({ commit }, buyer) {
      commit('setBuyer', buyer)
    },
    setAuthStatus ({ commit }, status) {
      commit('setAuthStatus', status)
    },
    setCompanyName ({ commit }, companyName) {
      commit('setCompanyName', companyName)
    },
    setEmailAddress ({ commit }, emailAddress) {
      commit('setEmailAddress', emailAddress)
    },
    addServiceToCart ({ commit }, service) {
      commit('addServiceToCart', service)
    },
    deleteServiceFromShoppingCart ({ commit }, index) {
      commit('deleteServiceFromShoppingCart', index)
    },
    addQuoteRequestToCart ({ commit }, quoteRequestForService) {
      commit('addQuoteRequestToCart', quoteRequestForService)
    },
    setShoppingCart ({ commit }, array) {
      commit('setShoppingCart', array)
    },
    setQuoteRequestCart ({ commit }, array) {
      commit('setQuoteRequestCart', array)
    },
    setGeneralInquiry ({ commit }, generalInquiry) {
      commit('setGeneralInquiry', generalInquiry)
    }
  },
  getters: {
    getShoppingCartFlag: state => {
      return state.shoppingCartFlag
    },
    getSubscription: state => {
      return state.subscription
    },
    getObjectToBeSent: state => {
      return state.objectToBeSent
    },
    getCreditsToBePurchased: state => {
      return state.creditsToBePurchased
    },
    getUserInfo: state => {
      return state.user
    },
    getBuyerInfo: state => {
      return state.buyer
    },
    getQuoteToBeRequested: state => {
      return state.quoteToBeRequested
    },
    getSidebarHighlight: state => {
      return state.sidebarItem
    },
    getCompanyName: state => {
      return state.companyName
    },
    getEmailAddress: state => {
      return state.emailAddress
    },
    getShoppingCartItems: state => {
      return state.shoppingCartServices
    },
    getQuoteRequestsCart: state => {
      return state.quoteRequestsServicesCart
    },
    getGeneralInquiry: state => {
      return state.generalInquiry
    },
    // NEEDS to be set to true / false everytime auth status
    // changes
    userLoggedIn: state => {
      return state.isUserLoggedIn
    }
  }
})

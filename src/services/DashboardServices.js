import Api from '@/services/Api'

export default {
  addSubServices (subServiceInfo) {
    return Api().post('seller/services/addSubServices', { subServiceInfo })
  },
  pushServiceOntoDb (service) {
    return Api().post('postServiceOntoDb', service)
  },
  queryForUsersServices (serviceTableId) {
    return Api().get('getUsersServices', {
      params: {
        serviceTableId: serviceTableId
      }
    })
  },
  queryForUserSubServices (userId) {
    return Api().get('seller/services/queryForUserSubServices', {
      params: {
        userId: userId
      }
    })
  }
}

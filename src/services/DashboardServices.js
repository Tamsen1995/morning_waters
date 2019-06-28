import Api from '@/services/Api'

export default {
  // takes in a service id
  // and then deletes it
  editService (serviceEdit) {
    return Api().post('seller/services/editService', { serviceEdit })
  },
  deleteService (serviceId) { // TODO implement back for this
    return Api().delete('seller/services/deleteService', {
      data: {
        serviceId: serviceId
      }
    })
  },
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

import Api from '@/services/Api';

export default {
  pushServiceOntoDb (service) {
    return Api().post('postServiceOntoDb', service)
  },
  queryForUsersServices (serviceTableId) {
    return Api().get('getUsersServices', {
      params: {
        serviceTableId: serviceTableId
      }
    })
  }
}

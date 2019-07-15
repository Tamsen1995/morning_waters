export default {
  async timestampToDate (timestamp) {
    var convertedDate = new Date(timestamp * 1000)

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    var year = convertedDate.getFullYear()
    var month = months[convertedDate.getMonth()]
    var date = convertedDate.getDate()
    var hour = convertedDate.getHours()
    var min = convertedDate.getMinutes()
    var sec = convertedDate.getSeconds()
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec
    return time
  }
}

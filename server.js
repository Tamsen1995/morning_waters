const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')
var secure = require('ssl-express-www');

let app = express()
app.use(serveStatic(__dirname + '/dist'))
app.use(secure);


const port = process.env.PORT || 7000
app.listen(port, () => {
  console.log('Listening on port' + port)
})

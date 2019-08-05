const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')

let app = express()
app.use(serveStatic(__dirname + '/dist'))
if (window.location.protocol !== 'https:') window.location.href = 'https://www.fig-analytics.com'

const port = process.env.PORT || 7000
app.listen(port, () => {
  console.log('Listening on port' + port)
})

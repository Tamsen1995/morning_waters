const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')

let app = express()
app.use(history({
  // OPTIONAL: Includes more verbose logging
  verbose: true
}))
app.use(serveStatic(__dirname + '/dist'))


const port = process.env.PORT || 7000
app.listen(port, () => {
  console.log('Listening on port' + port)
})

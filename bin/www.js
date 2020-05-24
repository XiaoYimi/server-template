#!usr/bin/env node

/* Require Project Entry File And Other Source */
const http = require('http')
const app = require('../app')
const config = require('../config')

/* Because the following function will use the internal global variable port, it is declared in front of the function. */
const port = normalizePort(process.env.PORT || config.port)

/* Create HTTP Server */
const server = http.createServer(app.callback())

/* open HTTP Server, and listener for HTTP Server Event */
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/* Normalize Port */
function normalizePort (val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) { return val } /* Pipe */
  if (port >= 0) { return port } /* Port */
  return false
}

/*  Listener for HTTP Server error event;Terminate the current process and return the given code */
function onError (error) {
  if (error.syscall !== 'listen') { throw error }

  const portTip = typeof prot === 'string' ? 'Pipe ' + port : 'Port ' + port

  switch (error.code) {
    case 'EACCES':
      console.error(portTip + ' requires elevated privileges.')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(portTip + ' is aleady in use.')
      process.exit(1)
      break
    default:
      throw error
  }
}

/* Listener for HTTP Server listen event; */
function onListening () {
  const addr = server.address()
  const portTip = typeof addr === 'string' ? 'Pipe ' + addr : 'Port ' + addr.port
  console.log('Listening on ' + portTip)
}

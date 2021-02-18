// require your server and launch it
const server = require('./api/server')

const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`running at http://localhost:${port}`)
})

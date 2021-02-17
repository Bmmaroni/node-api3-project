const express = require('express');
const { logger } = require("./middleware/middleware")
const postsRouter = require('./posts/posts-router')
const usersRouter = require('./users/users-router')

const server = express();

// remember express by default cannot parse JSON in request bodies

server.use(express.json())
server.use(logger)
server.use(postsRouter)
server.use(usersRouter)

// global middlewares and routes need to be connected here

server.use((err, req, res, next) => {
  console.log(err)

  res.status(500).json({
    message: "OOPS something went wrong on our end"
  })
})

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;

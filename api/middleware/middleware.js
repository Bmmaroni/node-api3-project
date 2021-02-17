const users = require("../users/users-model")

function logger(req, res, next) {
  // DO YOUR MAGIC
  const time = new Date().toISOString()

  console.log(`[${time}] ${req.method} ${req.url}`)
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  users.getById(req.params.id)
      .then((user) => {
        if (user) {
          req.user = user
          next()
        } else {
          res.status(404).json({
            message: "User not found"
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          message: "Error finding that user"
        })
      })
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body) {
    res.status(400).json({
      message: "missing user data"
    })
  } else if (!req.body.name) {
    res.status(400).json({
      message: "missing required name field"
    })
  }
  next()
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body) {
    res.status(400).json({
      message: "missing post data"
    })
  } else if (!req.body.text) {
    res.status(400).json({
      message: "missing required text field"
    })
  }
  next()
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
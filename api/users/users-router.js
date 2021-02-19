const express = require('express');
const users = require("./users-model")
const posts = require("../posts/posts-model")
const { validateUserId, validateUser, validatePost } = require("../middleware/middleware");

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  users.get()
      .then(users => {
        res.json(users)
      })
      .catch(err => { next(err)})
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user)
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  users.insert(req.params.id, req.body)
      .then(user => {
        res.status(201).json(user)
      })
      .catch(err => { next(err)})
});

router.put('/:id', validateUser, validateUserId, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  users.update(req.params.id, req.body)
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => { next(err)})
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  users.remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({
            message: "User was removed"
          })
        }
      })
      .catch(err => { next(err)})
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  users.getUserPosts(req.params.id)
      .then(posts => {
        res.status(200).json(posts)
      })
      .catch(err => { next(err)})
});

router.post('/:id/posts', validatePost, validateUserId, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  posts.insert(req.body)
      .then(post => {
        res.status(201).json(post)
      })
      .catch(err => { next(err)})
});

// do not forget to export the router
module.exports = router

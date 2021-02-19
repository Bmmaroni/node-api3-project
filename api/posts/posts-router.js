const express = require('express');
const posts = require("./posts-model")

const router = express.Router();

router.get('/', (req, res) => {
  // DO YOUR MAGIC
  posts.get()
      .then(posts => {
        res.status(200).json(posts)
      })
      .catch(err => { next(err)})
});

router.get('/:id', (req, res) => {
  // DO YOUR MAGIC
  posts.getById(req.params.id)
      .then(post => {
        res.status(200).json(post)
      })
      .catch(err => { next(err)})
});

// do not forget to export the router
module.exports = router

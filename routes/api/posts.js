const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load validation
const validatePostInput = require('../../validation/post')

// Load models
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')

// @route    GET api/posts
// @desc     Get posts
// @access   Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(error => res.status(404).json({ noPosts: 'No posts found' }))
})

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(error => res.status(404).json({ noPostFound: 'No post found with that ID' }))
})

// @route    POST api/posts
// @desc     Create post
// @access   Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body)
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    relatedHandle: req.body.relatedHandle,
    user: req.user.id
  })
  newPost.save().then(post => res.json(post))
})

// @route    DELETE api/posts/:id
// @desc     Delete post
// @access   Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ notAuthorised: 'User not authorised to delete this post' })
          }
          // Delete post
          post.remove().then(() => res.json({ success: true }))
        })
        .catch(error => res.status(404).json({ noPostFound: 'No post found with that ID' }))
    })
    .catch(error => res.status(404).json(error))
})

// @route    POST api/posts/like/:post_id
// @desc     Like a post
// @access   Private
router.post('/like/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.post_id)
        .then(post => {
          // Check to see if user has already liked the post
          if (post.likes.find(like => like.user.toString() === req.user.id) !== undefined) {
            return res.status(401).json({ alreadyLiked: 'Already liked this post' })
          }
          // Add user to the likes array and save to the DB
          post.likes.unshift({ user: req.user.id })
          post.save().then(post => res.json(post))
        })
        .catch(error => res.status(404).json({ noPostFound: 'No post found with that ID' }))
    })
    .catch(error => res.status(404).json(error))
})

// @route    POST api/posts/unlike/:post_id
// @desc     Unlike a post
// @access   Private
router.post('/unlike/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.post_id)
        .then(post => {
          // Check to see if user has already liked the post
          if (post.likes.find(like => like.user.toString() === req.user.id) === undefined) {
            return res.status(401).json({ notLiked: 'You have not liked this post' })
          }
          // Get remove index
          const removeIndex = post.likes
            .map(like => like.user.toString())
            .indexOf(req.user.id)
          // Remove from the like array and save to the DB
          post.likes.splice(removeIndex, 1)
          post.save().then(post => res.json(post))
        })
        .catch(error => res.status(404).json({ noPostFound: 'No post found with that ID' }))
    })
    .catch(error => res.status(404).json(error))
})

// @route    POST api/posts/comment/:post_id
// @desc     Comment on a post
// @access   Private
router.post('/comment/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body)
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }
  Post.findById(req.params.post_id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      }
      // Add to comment array and save to the DB
      post.comments.unshift(newComment)
      post.save().then(post => res.json(post))
    })
    .catch(error => res.status(404).json({ noPostFound: 'No post found with that ID' }))
})

// @route    DELETE api/posts/comment/:post_id/:comment_id
// @desc     Delete a comment from a post
// @access   Private
router.delete('/comment/:post_id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => {
      // Check to see if comment exists
      if (post.comments.find(comment => comment._id.toString() === req.params.comment_id) === undefined) {
        return res.status(404).json({ commentNotFound: 'Comment not found' })
      }
      // Get remove index
      const removeIndex = post.comments
        .map(comment => comment._id.toString())
        .indexOf(req.params.comment_id)
      // Remove from the comments array and save to the DB
      post.comments.splice(removeIndex, 1)
      post.save().then(post => res.json(post))
    })
    .catch(error => res.status(404).json({ noPostFound: 'No post found with that ID' }))
})


module.exports = router
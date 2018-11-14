const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: { type: String, required: true },
  name: { type: String },
  avatar: { type: String },
  relatedHandle: { type: String, required: true },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  date: { type: Date, default: Date.now }
})

module.exports = Post = mongoose.model('post', PostSchema)
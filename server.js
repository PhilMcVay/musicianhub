const express = require('express')
const mongoose = require('mongoose')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express()

// DB config
const db = require('./config/keys').mongoURI

// Connect to DB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(error => console.log(error))

const port = process.env.PORT || 5000

app.get('/', (req, res) => res.send('Hello, World!'))

// Use routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

app.listen(port, () => console.log(`Listening on port ${port}`))
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const orderRoutes = require('./routes/order')
const categoryRoutes = require('./routes/category')
const positionRoutes = require('./routes/position')
const keys = require('./config/keys')
const app = express()

mongoose.connect(keys.mongoURI)
    .then(()=> console.log('MongoDB connected.'))
    .catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(morgan('dev'))
app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/position', positionRoutes)

module.exports = app
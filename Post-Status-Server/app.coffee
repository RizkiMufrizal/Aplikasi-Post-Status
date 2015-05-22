express = require 'express'
expressSession = require 'express-session'
mongoose = require 'mongoose'
bodyParser = require 'body-parser'
methodOverride = require 'method-override'
passport = require 'passport'
LocalStrategy = require('passport-local').Strategy
errorhandler = require 'errorhandler'
logger = require 'morgan'
http = require 'http'
cors = require 'cors'

app = express()
app.set 'port', process.env.PORT || 3000
app.use logger('dev')
app.use cors()
app.use methodOverride()
app.use expressSession(
    resave: true,
    saveUninitialized: true,
    secret: 'uwotm8'
)
app.use bodyParser.json()
app.use bodyParser.urlencoded(
    extended: true
)
app.use passport.initialize()
app.use passport.session()

mongoose.connect 'mongodb://localhost/Aplikasi-Post-Status', (err, res) ->
    if err
        console.log 'koneksi mongodb gagal'
    else
        console.log 'koneksi mongodb berhasil'

if 'development' == app.get('env')
    app.use errorhandler()

#deklarasikan controller
UserController = require('./controller/UserController')
PostController = require('./controller/PostController')

#deklarasikan router url
app.use '/api/user', UserController
app.use '/api/post', PostController

server = http.createServer(app)
server.listen app.get('port'), ->
    console.log 'Server jalan di port : ' + app.get('port')

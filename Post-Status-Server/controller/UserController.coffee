express = require 'express'
router = express.Router()
nodemailer = require 'nodemailer'
passport = require 'passport'
LocalStrategy = require('passport-local').Strategy
User = require('../models/User')

transporter = nodemailer.createTransport(
    service: 'gmail'
    auth:
        user: 'perpustakaanonline2015@gmail.com'
        pass: 'penelitianilmiah'
)

passport.serializeUser (user, done) ->
    done(null, user)

passport.deserializeUser (user, done) ->
    done(null, user)

passport.use new LocalStrategy((username, password, done) ->
    User.findOne { email: username }, (err, user) ->
        return done(err) if err

        unless user
            return done(null, false,
                'pesan': 'email anda salah'
            )
        unless user.password is password
            return done(null, false,
                'pesan': 'password anda salah'
            )
        done null, user
)

router.post '/SignUp', (req, res, next) ->
    user = new User(
        email: req.body.email
        password: req.body.password
    )

    user.save (err) ->
        return res.json(err) if err

        transporter.sendMail(
            from: 'perpustakaanonline2015@gmail.com'
            to: req.body.email
            subject: 'Verifikasi Email'
            html: 'Silahkan verifikasi melalui alamat berikut : <a href="https://www.facebook.com/">Aplikasi Post Status</a>'
        )

        res.json
            success: true
            pesan: 'Anda Berhasil SignUp'

router.post '/Login', (req, res, next) ->
    passport.authenticate('local', (err, user, info) ->
        if err or not user
            return res.json(
                message: 'login failed'
                success: false
            )

        req.logIn user, (err) ->
            return res.json(err) if err
            res.json
                message: 'berhasil login'
                username: user.email
                success: true
    ) req, res

module.exports = router

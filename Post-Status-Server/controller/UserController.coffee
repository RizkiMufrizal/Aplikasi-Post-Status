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
        unless user.enable is true
            return done(null, false,
                'pesan': 'email belum verifikasi'
            )
        done null, user
)

router.post '/SignUp', (req, res, next) ->
    user = new User(
        email: req.body.email
        nama: req.body.nama
        password: req.body.password
    )

    user.save (err) ->
        return res.json(err) if err

        transporter.sendMail(
            from: 'perpustakaanonline2015@gmail.com'
            to: req.body.email
            subject: 'Verifikasi Email'
            html: 'Silahkan verifikasi melalui alamat berikut : <a href="http://localhost:3000/api/user/Verifikasi/' + req.body.email + '">Aplikasi Post Status</a>'
        )

        res.json
            success: true
            pesan: 'Anda Berhasil SignUp'

router.get '/Verifikasi/:email', (req, res, next) ->
    User.findOne { email: req.params.email }, (err, user) ->
        return res.json(err) if err

        user.enable = true
        user.save()

        res.json
            success: true
            pesan: 'Anda berhasil melakukan verifikasi, silahkan gunakan Aplikasi Post Status'

router.post '/Login', (req, res, next) ->
    passport.authenticate('local', (err, user, info) ->
        return res.json(err) if err

        unless user
            return res.json(info)

        req.logIn user, (err) ->
            return res.json(err) if err
            res.json
                message: 'berhasil login'
                username: user.email
                nama: user.nama
                success: true
    ) req, res

module.exports = router

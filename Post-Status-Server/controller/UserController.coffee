express = require 'express'
router = express.Router()
User = require('../models/User')

router.post '/SignUp', (req, res, next) ->
    user = new User(
        email: req.body.email
        password: req.body.password
    )

    user.save (err) ->
        return res.json(err) if err
        res.json
            success: true
            pesan: 'Anda Berhasil SignUp'

module.exports = router

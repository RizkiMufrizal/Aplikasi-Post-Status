express = require 'express'
moment = require 'moment'
router = express.Router()
Post = require('../models/Post')

router.get '/AllPost', (req, res, next) ->
    Post.find({}).sort( { tanggal: 'desc' } ).exec (err, posts) ->
        return res.json(err) if err

        res.json(posts)

router.post '/SavePost', (req, res, next) ->
    post = new Post(
        email: req.body.email
        nama: req.body.nama
        keterangan: req.body.keterangan
        tanggal: moment().format()
    )

    post.save (err) ->
        return res.json(err) if err

        res.json
            success: true
            pesan: 'Data Tersimpan'

router.post '/Comment', (req, res, next) ->
    Post.findOne { email : req.body.email }, (err, post) ->
        return res.json(err) if err

        post.comments.push
            emailComment: req.body.emailComment
            commentDetail: req.body.commentDetail

        post.save()

        res.json
            success: true
            pesan: 'Comment Tersimpan'

router.post '/Like', (req, res, next) ->
    Post.findOne { email: req.body.email }, (err, post) ->
        return res.json(err) if err

        post.likes.push
            emailLike: req.body.emailLike

        post.save()

        res.json
            success: true
            pesan: 'Like Berhasil'

module.exports = router

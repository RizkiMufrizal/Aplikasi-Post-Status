express = require 'express'
router = express.Router()
Post = require('../models/Post')

router.post '/Post', (req, res, next) ->
    post = new Post(
        email: req.body.email
        keterangan: req.body.keterangan
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

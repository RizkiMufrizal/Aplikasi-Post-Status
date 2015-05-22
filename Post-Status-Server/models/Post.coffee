mongoose = require 'mongoose'
Schema = mongoose.Schema

Post = new Schema({
    email:
        type: 'String'
        require: true
    nama:
        type: 'String'
        require: true
    keterangan:
        type: 'String'
        require: true
    tanggal:
        type: 'Date'
        require: true
    comments:
        type: 'array'
        require: false
    likes:
        type: 'array'
        require: false
},collection: 'tb_post')

module.exports = mongoose.model('Post', Post)

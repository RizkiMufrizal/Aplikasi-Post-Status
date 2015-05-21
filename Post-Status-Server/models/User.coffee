mongoose = require 'mongoose'
Schema = mongoose.Schema

User = new Schema({
    email:
        type: 'String'
        require: true
    nama:
        type: 'String'
        require: true
    password:
        type: 'String'
        require: true
    enable:
        type: 'boolean'
        require: true
        default: false
},collection: 'tb_user')

module.exports = mongoose.model('User', User)

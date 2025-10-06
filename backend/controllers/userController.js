const User = require('../models/userModel')
const bcrypt = require('bcrypt')

exports.register = (req, res)=>{
    res.json("register")
}
exports.login = (req, res)=>{
    res.json("login")
}
exports.profile = (req, res)=>{
    res.json("profile")
}
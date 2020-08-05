const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.isAuthenticated = async (req, res, next) => {
    let token
    if (req.header('Authorization')){
        token = req.header('Authorization').replace('Bearer ', '')
    }

    try {
        const data = jwt.decode(token, process.env.JWT_SECRET)
        const user = await User.findOne({_id: data.id})
        if (!user) return res.status(400).json({success: false, data: null, message: "user not found, invalid token"})
        req.user = user
        req.token = token
        next()
        
    } catch (err) {
        return res.status(401).json({success: false, data: null, message: "authorization required"})
    }
}

exports.isAdmin = async(req, res, next) => {
    try {
        const user = await User.findOne({_id: req.user.id})
        if (!user.isAdmin) {
            return res.status(401).json({success: false, data: null, message: "Admin Only"})
        }
        next()
    } catch (err) {
        return res.status(401).json({success: false, data: null, message: "Admin Only"})
    }
}


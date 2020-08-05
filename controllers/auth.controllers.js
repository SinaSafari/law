const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')


exports.register = async (req, res) => {
    try {
        const {fullname, email, password, isAdmin} = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            fullname, 
            email, 
            password:hashedPassword,
            isAdmin: isAdmin ? true : false
        })
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: "7d"})
        const sendingUser = {id: newUser._id, fullname: newUser.fullname, email: newUser.email}
        res.status(201).json({success: true, user: sendingUser, token})
    } catch (err) {
        res.status(401).json({success: false, data: err})
    }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body
        // query fro email
        const user = await User.findOne({email: email})
        if (!user) return res.status(404).json({success: false, data: null, message: "user not found,invalid email"})
        // password matching
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(404).json({success: false, data: null, message: "invalid password"})

        // generate token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"})
        const sendingUser = {id: user._id, fullname: user.fullname, email: user.email}
        res.status(200).json({success: true, data: sendingUser, token: token})

    } catch (err) {
        res.status(400).json({success: false, data: err, message: err.message})
    }
}
const User = require('../models/User')

exports.GetAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({success: true, data: users})
    } catch (err) {
        res.status(400).json({success: false, data: null, message: err.message})
    }
}
const mongoose = require('mongoose')

const DocumentSchema = new mongoose.Schema({
    docID: {
        type: String,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    report: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // user: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    userID: {
        type: String,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Document = mongoose.model('Document', DocumentSchema)

module.exports = Document
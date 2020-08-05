const Documnet = require('../models/Document')


/**
 * @description only admin for seeing all the open cases
 * @access admin
 * @route /api/v1/documents
 * @method GET
 * @param {Express.Response} req 
 * @param {Express.Request} res 
 */
exports.GetAllDocuments = async(req, res) => {
    try {
        if (!req.user.isAdmin){
            res.status(401).json({success: false, data: null, message: "Admin Only [GetAllDocuments]"})
        }
        const documents = await Documnet.find()
        res.status(200).json({success: true, data: documents})
    } catch (err) {
        res.status(400).json({success: false, data: null, err: err.message})
    }
}

/**
 * @description for the admin and the user to see all th cases for a specific user
 * @access admin / logged in user
 * @route /api/v1/documents/:userId
 * @method GET
 * @param {Express.Response} req 
 * @param {Express.Request} res 
 */
exports.GetAllDocumentsForAUser = async(req, res) => {
    try {
        const userId = req.params.userId 
        if (req.user._id !== userId && !req.isAdmin) {
            return res.status(401).json({success: false, data: null, message: "unauthorized"})
        }
        const documents = await Documnet.find({userID: userId})
        res.status(200).json({success: true, data: documents})
    } catch (err) {
        res.status(400).json({success: false, data: null, err: err.message})
    }
}


/**
 * 
 * @description geting a single case for a specific user 
 * @access admin / logged in user
 * @route /api/v1/documents/:userId/:docID
 * @method GET
 * @param {Express.Response} req 
 * @param {Express.Request} res 
 */
exports.GetASingleDocument = async(req, res) => {

    try {
        const userId = req.params.userId
        // if (req.user.id !== userId && !req.isAdmin) {
        //     return res.status(401).json({success: false, data: null, message: "unauthorized"})
        // }
        if (req.user._id !== userId && !req.isAdmin) {
            return res.status(401).json({success: false, data: null, message: "unauthorized"})
        }
        const singleDocument = await Documnet.find({_id: userId})
        if (!singleDocument) return res.status(400).json({success: false, data: null, message: "resource not found"})
        res.status(200).json({success: true, data: singleDocument})
    } catch (err) {
        res.status(400).json({success: false, data: null, err: err.message})
    }
}

/**
 * 
 * @description creating a new document
 * @access admin
 * @route /api/v1/documents/:userId/:docID
 * @method POST
 * @param {Express.Response} req 
 * @param {Express.Request} res 
 */
exports.CreateNewDocument = async(req, res) => {
    // req.body.user = req.user.id
    try {
        const {docID, title, report, userID} = req.body
        const newDocument = await Documnet.create({docID, title, report, userID})
        res.status(201).json({success: true, data: newDocument})
    } catch (err) {
        res.status(400).json({success: false, data: null, err: err.message})
    }

}

/**
 * 
 * @description update a document
 * @access admin
 * @route /api/v1/documents/:userId/:docID
 * @method PUT
 * @param {Express.Response} req 
 * @param {Express.Request} res 
 */
exports.UpdateADocument = async(req, res) => {
    try {
        const id = req.params.id
        
        let document = await Documnet.findById(id)
        if (!document) return res.status(400).json({success: false, data: null, message: "resource not found"})
        const {docID, title, report, user} = req.body
        document = await Documnet.findByIdAndUpdate(id, 
            {
                docID,
                title,
                report,
                user,
                updatedAt: Date.now
            }, 
            {
                new: true,
                runValidators: true
            }
        )
        res.status(200).json({success: true, data: document, message: "resurce updated"})
    } catch (err) {
        res.status(400).json({success: false, data: null, err: err.message})
    }
}

/**
 * 
 * @description delete a document
 * @access admin
 * @route /api/v1/documents/:userId/:docID
 * @method DELETE
 * @param {Express.Response} req 
 * @param {Express.Request} res 
 */
exports.DeleteADocument = async(req, res) => {
    try {
        const id = req.params.id
        const foundDocument = await Documnet.findById(id)
        if (!foundDocument) return res.status(400).json({success: false, data: null, message: "resource not found"})
        await Documnet.remove({_id: id})
        res.status(200).json({success: true, data: null, message: "resurce deleted successfully"})
    } catch (err) {
        res.status(400).json({success: false, data: null, err: err.message})
    }

}
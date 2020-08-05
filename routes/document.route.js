const express = require('express')

const router = express.Router()

const {CreateNewDocument, DeleteADocument,GetASingleDocument,GetAllDocuments,UpdateADocument} = require('../controllers/document.controllers')
const {isAuthenticated ,isAdmin} = require('../middlewares/auth.middlewares')

// router.route("/documents").get(GetAllDocuments).post(CreateNewDocument)
// router.route("/documents/:id").get(GetASingleDocument).put(UpdateADocument).delete(DeleteADocument)

router.get('/documents',isAuthenticated, GetAllDocuments)
router.post('/documents', isAuthenticated, isAdmin, CreateNewDocument)

module.exports = router
const express = require('express')

const router = express.Router()

const {CreateNewDocument, DeleteADocument,GetASingleDocument,GetAllDocuments,UpdateADocument} = require('../controllers/document.controllers')

router.route("/documents").get(GetAllDocuments).post(CreateNewDocument)
router.route("/documents/:id").get(GetASingleDocument).put(UpdateADocument).delete(DeleteADocument)

module.exports = router
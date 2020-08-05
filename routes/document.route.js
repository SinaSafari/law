const express = require('express')

const router = express.Router()

const {
    CreateNewDocument,
    GetAllDocumentsForAUser, 
    DeleteADocument,
    GetASingleDocument,
    GetAllDocuments,
    UpdateADocument
} = require('../controllers/document.controllers')
const {isAuthenticated ,isAdmin} = require('../middlewares/auth.middlewares')


// admin only, get all the documents
router.get('/documents/', GetAllDocuments)

// get all docs for a specific user - admin or logged in user
router.get('/documents/:userId',  GetAllDocumentsForAUser)

// get a single doc for a specific user - admin or logged in user
router.get('/documents/:userId/:docID', GetASingleDocument)

// create a doc - admin 
router.post('/documents', CreateNewDocument)

// update a doc - admin
router.put('/documents/:userId/:docID', UpdateADocument)

// delete a doc - admin
router.delete('/documents/:userId/:docID', DeleteADocument)



// router.post('/documents', isAuthenticated, isAdmin, CreateNewDocument)
// router.get('/documents/:id', isAuthenticated, GetASingleDocument),
// router.put('/documents/:id', isAuthenticated, isAdmin,UpdateADocument)
// router.delete('/documents/:id', isAuthenticated, isAdmin,DeleteADocument)

module.exports = router
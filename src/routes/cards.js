const express = require('express')
const router = express.Router()

// ---------- Controllers ---------- //
const cardsController = require('../controllers/cardsController')

// ---------- Middlewares ---------- //
const upload = require('../middlewares/cardMulterMiddleware')
const mediaValidationData = require('../middlewares/validationMedia')
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware')

// ---------- Create a movie or serie card ---------- //
router.get('/create', adminAuthMiddleware, cardsController.cardsCreate)
router.post(
   '/create',
   upload.single('image'),
   mediaValidationData,
   cardsController.cardsStore
)

// ---------- Edit a movie or serie card ---------- //
router.get('/edit/:id', adminAuthMiddleware, cardsController.cardsEdit)
router.put(
   '/edit/:id',
   upload.single('image'),
   mediaValidationData,
   cardsController.cardsUpdate
)

// ---------- Delete a movie or serie card ---------- //
router.delete('/delete/:id', cardsController.cardsDestroy)

module.exports = router

const express = require('express')
const router = express.Router()
const {signup,signin} = require('./../controllers/authController')
const {checkUserDuplicate}=require('./../midalwaer/auth')
const {check, body} = require('express-validator')
router.post('/signup',checkUserDuplicate,check('username').not().isEmpty().isLength({min:4}).withMessage('username is required'), body('password').not().isEmpty().isLength({min:4}),signup )
router.post('/signin', check('username').not().isEmpty().isLength({min:4}).withMessage('username is required'), body('password').not().isEmpty().isLength({min:4}),signin )

module.exports = router;
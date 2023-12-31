const { body } = require('express-validator')
const path = require('node:path')
const db = require('../database/models')

const registrationValidationRules = [
   body('first_name')
      .notEmpty()
      .withMessage('You must complete the first name form')
      .bail()
      .isLength({ min: 2 })
      .withMessage('The name must have at least two characters')
      .bail()
      .isLength({ max: 50 })
      .withMessage('The name must have a maximum of fifty characters')
      .bail()
      .isAlpha('es-ES', { ignore: ' ' }),
   body('last_name')
      .notEmpty()
      .withMessage('You must complete the last name form')
      .bail()
      .isLength({ min: 2 })
      .withMessage('The last name must have at least two characters')
      .bail()
      .isLength({ max: 50 })
      .withMessage('The last name must have a maximum of fifty characters')
      .bail()
      .isAlpha('es-ES', { ignore: ' ' }),
   body('email')
      .notEmpty()
      .withMessage('You must complete the mail form')
      .bail()
      .isEmail()
      .withMessage('Please enter a valid mail address')
      .bail()
      .isLength({ max: 100 })
      .withMessage('The mail can have a maximum of one hundred characters')
      .bail()
      .custom(async (value, { req }) => {
         const existingUser = await db.User.findOne({
            where: {
               email: value,
            },
         })
         if (existingUser) {
            throw new Error('Email is already in use')
         }
      }),
   body('password')
      .notEmpty()
      .withMessage('You must complete the password form')
      .bail()
      .isLength({ min: 8 })
      .withMessage('Password must be at least eight characters long')
      .bail()
      .isLength({ max: 70 })
      .withMessage('Password is too long'),
   body('confirm_password')
      .notEmpty()
      .withMessage('You must complete the password confirm form')
      .bail()
      .custom((value, { req }) => value === req.body.password)
      .withMessage('Passwords must match'),
   body('image').custom((value, { req }) => {
      let file = req.file
      let acceptedExtensions = ['.jpg', '.png', '.jpeg', '.gif']
      if (file) {
         let fileExtension = path.extname(file.originalname)
         if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error(
               `Extensions accepted ${acceptedExtensions.join(', ')}`
            )
         }
      }
      return true
   }),
]

module.exports = registrationValidationRules

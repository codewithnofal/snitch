import {body, Result, validationResult} from 'express-validator';

export const registerValidator = [
    body("email")
    .exists().withMessage("Email is required").bail()
    .isString().withMessage("Email must be text").bail()
    .trim()
    .isEmail().withMessage("Enter a valid email address").bail()
    .toLowerCase(),

    body('name')
    .exists().withMessage("Name is required").bail()
    .isString().withMessage("Name must be text").bail(),

    body('password')
    .exists().withMessage("Password is required").bail()
    .isString().withMessage("password must be text").bail()
    .custom((value) => value.trim().length > 0)
    .withMessage("Password cannot be empty or only spaces").bail()
    .isLength({min: 6}).withMessage("password must be at least 6 characters"),

    (req, res, next) => {
        const error = validationResult(req);

        if(!error.isEmpty()){
        return res.status(400).json({
        message: "invalid values",
        errors: error.array()
        }) 
    }
    next()

    }
]




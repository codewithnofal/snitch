import {body, validationResult} from 'express-validator'


export const productValidator = [
    body('title')
    .exists().withMessage("title is required").bail()
    .isString().withMessage("title must be string").bail()
    .trim()
    .isLength({min: 2, max:100}).withMessage("title must be between 2 to 100 char").bail()
    .isAlpha('en-US', {ignore: " -"}).withMessage("title only have english small case and capital case character"),

    body("description")
    .exists().withMessage("description is required").bail()
    .isString().withMessage("description must be string").bail()
    .trim()
    .isLength({min: 20, max: 500}).withMessage("description must be between 20 to 500 character long"),

    body("price.amount")
    .exists().withMessage("amount is required").bail()
    .isFloat({min: 0}).withMessage("price amount must be a floating number and must be greater than 0"),

    body("price.currency")
    .exists().withMessage("currency is required").bail()
    .isString().withMessage('currency must be a string value')
    .isIn(["INR", "USD"]).withMessage("currency either be INR or USD"),

    body("sizes")
    .exists().withMessage("size are required").bail()
    .isArray().withMessage("sizes must be an array of object"),

    body("sizes.*.size")
    .exists().withMessage("size must be present in every sizer array").bail()
    .isString().withMessage("size must be a string value").bail()
    .trim()
    .isIn(["XS", "S", "M", "L", "XL", "XXL"]).withMessage("size can be one of these XS, S, M, L, XL, XXL"),

    body("sizes.*.stock")
    .exists().withMessage("stock is required").bail()
    .isInt({min: 0}).withMessage("stock must be an integer value"),

    (req, res, next) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "invalalid request",
                errors: errors.array()
            })
        }
        next()
    }
]

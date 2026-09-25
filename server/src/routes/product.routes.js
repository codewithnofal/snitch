import {Router} from 'express'
import { authanticate } from '../middlewares/auth.middleware.js';
import { createProductController } from '../controllers/product.controller.js';

const router = Router()

router.post('/',authanticate, (req, res, next) => {
    if(req.user.role !== "seller"){
        return res.status(403).json({
            message: "Unauthorized or forbidden"
        })
    }

    next();
},createProductController)


export default router;
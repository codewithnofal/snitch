import {Router} from 'express'
import { getMe, loginController, refreshController, registerController } from '../controllers/auth.controller.js';
import { loginValidator, registerValidator } from '../validators/auth.validator.js';
import { authanticate } from '../middlewares/auth.middleware.js';


const router = Router();

router.post('/register',registerValidator, registerController)
router.post('/login', loginValidator , loginController)
router.get('/me',authanticate,getMe)
router.get('/refresh', refreshController)


export default router;
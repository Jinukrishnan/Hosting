import { Router } from "express";
import { adminHome, adminLogin, adminRegister, emailVerification } from "./adminRequestHandler.js";
import Auth from "./middleware/Auth.js";
const router=Router()

router.route('/adminregister').post(adminRegister)
router.route('/adminlogin').post(adminLogin)
router.route('/adminhome').post(Auth,adminHome)
router.route('/verification').post(emailVerification)



export default router;

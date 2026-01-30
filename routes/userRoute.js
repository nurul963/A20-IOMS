import express from 'express';
import { getAllUsers, loginUser, logoutUser, registerUser } from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { rolebaseAccess } from '../middleware/rolebaseAccess.js';
const router=express.Router();
router.get("/",isAuthenticated,rolebaseAccess('ADMIN') , getAllUsers);
router.post('/register',registerUser)
router.post('/login',loginUser)
router.get("/logout",logoutUser)
export default router
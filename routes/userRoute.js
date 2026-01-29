import express from 'express';
import { getAllUsers, loginUser, logoutUser, registerUser } from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
const router=express.Router();
router.get("/",isAuthenticated, getAllUsers);
router.post('/register',registerUser)
router.post('/login',loginUser)
router.get("/logout",isAuthenticated,logoutUser)
export default router
import express from 'express';
import { signup, signin, google, signout } from '../controllers/auth.controller.js';
const router = express.Router();

//Google Authentication and Authorization with Mongodb
router.post("/signup",signup);
router.post("/signin",signin);
router.get("/signout",signout);

//Google Authentication with firebase
router.post("/google",google);

export default router;
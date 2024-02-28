import express from 'express';
import { usersignup, showuser } from './user-controller/user.js';
const router= express.Router();

router.post('/signup', usersignup);
// router.get('/show',showuser);

export default router;
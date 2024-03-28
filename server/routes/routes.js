import express from 'express';
import { usersignup, showuser, userlogin } from '../user-controller/user.js';
import { jwtauth } from '../middleware/auth.js';
import { authUser } from '../auth.js';
const userRouter= express.Router();

userRouter.post('/signup',usersignup);
userRouter.post('/login', userlogin);
userRouter.get('/show',showuser);
userRouter.get('/auth',authUser)

export default userRouter;
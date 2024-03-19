import express from 'express';
import { usersignup, showuser, userlogin } from '../user-controller/user.js';
const userRouter= express.Router();

userRouter.post('/signup', usersignup);
userRouter.post('/login', userlogin);
userRouter.get('/show',showuser);

export default userRouter;
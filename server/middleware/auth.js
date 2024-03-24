import jwt from "jsonwebtoken";
import { User } from "../model/usermodel.js";

export const JWT_SECRET_KEY = "top secret";
export const jwtauth = async (req, res, next) => {
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({ error: 'Token Not Found' });

    // Extract the jwt token from the request headers
    const token = req.headers['authorization'].split(' ')[1];
    // res.json(token);
    if(!token) return res.status(401).json({ error: 'Unauthorized' });

    try{
        // Verify the JWT token
        const decoded = jwt.verify(token,JWT_SECRET_KEY);

        // Attach user information to the request object
        // req.user = decoded
        next();
    }catch(err){
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
}
export const generatetoken = (data) => {
    const authtoken = jwt.sign(data,JWT_SECRET_KEY);
    return authtoken;

}
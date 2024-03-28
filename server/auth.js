import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from "./middleware/auth.js";
export const authUser = async (req, res) => {
    const authorization = req.cookies
    console.log(authorization);
    if(!authorization) return res.status(401).json({ isauth: false, response: "from header" });

    // Extract the jwt token from the request headers
    const token = req.headers['authorization'].split(' ')[1];
    // res.json(token);
    // if(!token) return res.status(401).json({ isauth: false });

    try{
        // Verify the JWT token
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        if(decoded.id){
            return res.status(200).json({isauth:true});
        }
        else{
            return res.json({isauth:false, response:"from verify"});
        }
        // Attach user information to the request object
        // req.user = decoded
       
    }catch(err){
        console.error(err);
        res.status(401).json({ error: 'Internal server error' });
    }
}
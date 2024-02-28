
import { User } from "../model/usermodel.js";

export const usersignup = async (req, res) => {
 const {name,number}= req.body;
 const user= new User({
  name:name,
  number:number,
 })
//  console.log(name,number);
 try {
  const newuser=await user.save();
     
     return res.json(newuser.name);
 } catch (error) {
  return error;
 }


    // return res.json(name+"registered"); for testing only

}

export const showuser= (req,res)=>{
   
}
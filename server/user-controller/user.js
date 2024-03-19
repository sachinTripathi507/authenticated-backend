import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { User } from "../model/usermodel.js";

const saltRounds = 10;
const JWT_SECRET_KEY= "top secret";
export const usersignup = async (req, res) => {
  const { name, number, password } = req.body;

  const isExist = await User.findOne({ name: name, number: number });
  if (isExist) {
    return res.json("user alredy exist");
  }
  const secpassword = await bcrypt.hash(password, saltRounds);
  // console.log(secpassword);
  const user = new User({
    name: name,
    number: number,
    password: secpassword
  })
  //  console.log(name,number);
  try {
    const newuser = await user.save();

    const data= {
      id: newuser._id,
    }

const authtoken= jwt.sign(data,JWT_SECRET_KEY,{expiresIn:'1h'});
    return res.json(`user ${newuser.name} registered`).cookie(authtoken);
  } catch (error) {
    return error;
  }
  // return res.json(name+"registered"); for testing only
}


export const userlogin = async (req, res) => {
  const { name, password } = req.body;
  try {
    const isExist = await User.findOne({ name: name })
    if (isExist) {

      const iscorrectpassword = await bcrypt.compare(password, isExist.password);
      // console.log(iscorrectpassword); //for testing
      if (iscorrectpassword) {

        return res.status(200).json(`${name} logged in sucessfully!`);
      }
      else {
        return res.status(404).json("incorrect password");
      }
    }

  } catch (error) {
    return res.status(500).json("internal server error");
  }
}

export const showuser = async (req, res) => {
  try {
    const usersdata = await User.find();
    return res.json(usersdata)
  } catch (error) {
return res.status(500).json(error);
  }

}
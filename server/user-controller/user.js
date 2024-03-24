import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { User } from "../model/usermodel.js";
import { generatetoken } from "../middleware/auth.js";


const saltRounds = 10;

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
    // console.log(newuser);
    const data = {
      id: newuser.id,
    }
    const token = generatetoken(data);
    // console.log(token);
    res.cookie('token', token, { httpOnly: true });
    return res.status(200).json("user created");
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
        const data = {
          id: isExist.id,
        }
        const token = generatetoken({ id: data });
        res.cookie('Token', token, { httpOnly: true, maxAge: 360000 });
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
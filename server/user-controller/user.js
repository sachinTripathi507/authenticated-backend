
import { User } from "../model/usermodel.js";

export const usersignup = async (req, res) => {
  const { name, number } = req.body;
  const isExist = await User.findOne({ name: name, number: number });
  if (isExist) {
    return res.json("user alredy exist");
  }
  const user = new User({
    name: name,
    number: number,
  })
  //  console.log(name,number);
  try {
    const newuser = await user.save();

    return res.json(`user ${newuser.name} registered`);
  } catch (error) {
    return error;
  }
// return res.json(name+"registered"); for testing only
}

export const showuser = async(req, res) => {
try {
  const usersdata= await User.find();
  return res.json(usersdata)
} catch (error) {
  
}

}
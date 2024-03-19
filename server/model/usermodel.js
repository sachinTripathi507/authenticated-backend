import mongoose, { Schema } from "mongoose";


const userschema= new Schema({
    name:{
        type:String,
       required: true,
       unique:true
    },
    number:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
        unique: true
    }
})

export const User =  mongoose.model("user",userschema);
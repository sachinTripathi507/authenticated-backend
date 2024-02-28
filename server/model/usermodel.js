import mongoose, { Schema } from "mongoose";


const userschema= new Schema({
    name:{
        type:String,
       required: true,
    },
    number:{
        type:Number,
        required:true,
    }
})

export const User =  mongoose.model("user",userschema);
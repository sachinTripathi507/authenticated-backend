import mongoose from 'mongoose';

const URL="mongodb://localhost:27017/urlshortner";


export const connectdb=()=>{
   return mongoose.connect(URL);
    
}
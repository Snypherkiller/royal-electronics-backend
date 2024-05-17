<<<<<<< HEAD
const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
         type:String,
         required:true   
    },
    userName:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        required:true
    }
});

const User=mongoose.model("User",UserSchema);
module.exports=User;
=======
import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required : [true, "Please provide unique Username"],
        unique: [true, "Username Exist"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique : false,
    },
    email: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: true,
    },
    firstName: { type: String},
    lastName: { type: String},
    mobile : { type : Number},
    address: { type: String},
    profile: { type: String}
});

export default mongoose.model.Users || mongoose.model('User', UserSchema);
>>>>>>> 068cdcef10bae0820f39fb8790f6008be104519b

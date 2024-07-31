import mongoose from "mongoose";


const adminSchema=new mongoose.Schema({
    username:{type:String},
    email:{type:String},
    phone:{type:Number},
    password:{type:String},
    OTP:{type:Number}
})

export default mongoose.model.Admins||mongoose.model("Admin",adminSchema)
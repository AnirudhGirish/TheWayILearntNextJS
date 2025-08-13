import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

export const Admin = mongoose.models.Admin || mongoose.model("Admin",adminSchema);
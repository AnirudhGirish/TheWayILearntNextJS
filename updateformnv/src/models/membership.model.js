import mongoose, {Schema} from "mongoose";

const membershipSchema = new Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"Name is required"]
    },
    number:{
        type:Number,
        unique:true,
        required:[true,"Phone number is required"]
    },
    email:{
        type:String,
    },
    transaction:{
        type:String,
        required:true
    }
},{timestamps:true});

export const Membership = mongoose.models.Membership ||  mongoose.model("Membership", membershipSchema);
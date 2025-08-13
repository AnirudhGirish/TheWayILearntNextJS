import { Admin } from "@/models/admin.model";
import dbConnect from "@/utils/dbconnect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req){
    await dbConnect()
    try {
        const {username, password} = await req.json();
        if(!username && !password){
            console.log("All fields required");
            return Response.json({success:false, message:"Error!! All fields required"},{status:400});
        }
        const user = await Admin.findOne({username: username});
        if(!user){
            return Response.json({success:false, message:"Error!! Admin User dosenot exist"},{status:404});
        }
        const valid = await bcrypt.compare(password, user.password);
        if(!valid){
            return Response.json({success:false, message:"Error!! Incorrect password"},{status:400});
        }

        const payload = {
            id : user._id,
            username: user.username,
            email: user.email
        }
        const token = jwt.sign(payload,process.env.TOKEN_SECRET || "",{expiresIn:'1d'});
        const response = NextResponse.json({success:true, message:"Admin User Sign In successfull"},{status:200});
        response.cookies.set("token", token);
        return response;
    } catch (error) {
        console.error("Error signing in Admin User!! Internal Server Error",error);
        return Response.json({success:false, message:"Error signing in Admin User!! Internal Server Error"},{status:500});
    }
}
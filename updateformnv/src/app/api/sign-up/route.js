import { Admin } from "@/models/admin.model";
import dbConnect from "@/utils/dbconnect";
import bcrypt from "bcryptjs";

export async function POST(req){
    await dbConnect();
    try {
        const {username, email, password} = await req.json();
        if(!username && !email && !password){
            console.error("All fields required");
            return Response.json({success:false, message:"Error !! All fields required"},{status:400});
        }
        const hashedPasword = await bcrypt.hash(password,10);
        const newAdmin = new Admin({username, email, password:hashedPasword});
        await newAdmin.save();
        return Response.json({success:true, message:"Admin registered successfully"},{status:200});
    } catch (error) {
        console.log("Error registring admin! Internal server Error", error);
        return Response.json({success:false, message:"Error registring admin! Internal server Error"},{status:500});
    }
}
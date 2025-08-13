import {connectDB} from "@/dbConnection/dbConfig";
import {User} from "@/models/user.model"
import {NextRequest, NextResponse} from 'next/server';
import { extractTokenData } from "@/helpers/tokenDataExtraction";

connectDB();

export async function GET(request:NextRequest){
    try {
        const userId = extractTokenData(request);
        const user = await User.findById(userId).select("-password -username");
        if(!user){
            return NextResponse.json({message:"User is not available", success:false},{status:500});
        }
        return NextResponse.json({message:"User data fetched successfully",success:true, data:user},{status:200});
    } catch (error:any) {
        return NextResponse.json({error:error.message, success:false},{status:500});
    }
}
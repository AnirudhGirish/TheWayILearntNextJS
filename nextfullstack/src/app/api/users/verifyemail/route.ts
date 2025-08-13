import {User} from '@/models/user.model';
import {NextRequest, NextResponse} from 'next/server';
import {connectDB} from '@/dbConnection/dbConfig';

connectDB();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token);

        if(!token){
            return NextResponse.json({message:"Error verifying token missing",success:false},{status:401});
        }

        const user = await User.findOne({verifyToken:token, verifyTokenExpiry: {$gt: Date.now()}});
        if(!user){
            return NextResponse.json({message:"Error verifying user not found",success:false},{status:400});
        }
        console.log(user);
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({message:"User Email verification successfull",success:true},{status:200});
    } catch (error:any) {
        return NextResponse.json({message:"Verification email not successfull", error:error.message},{status:500});
    }
}
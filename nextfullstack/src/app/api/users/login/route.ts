import {User} from '@/models/user.model';
import {NextRequest, NextResponse} from 'next/server';
import {connectDB} from '@/dbConnection/dbConfig';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectDB();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody);
        
        const user = await User.findOne({email:email});
        if(!user){
            return NextResponse.json({error:"User does not exist", success:false},{status:400});
        }

        console.log("User exists");

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({error:"User password incorrect", success:false},{status:400});
        }

        const tokenPayload = {
            id: user._id,
            username: user.username,
            email:user.email
        }

        // const tokenSecret = process.env.TOKEN_SECRET
        // if(!tokenSecret){
        //     throw new Error('TOKEN_SECRET is not defined in the environment variables');
        // }one way to check if the env is string
        // const tokenSecret = process.env.TOKEN_SECRET || "iudfygbiu"; //way two like fallback if env fails
        // const token = jwt.sign(tokenPayload, tokenSecret, {expiresIn:'1d'});

        const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, {expiresIn:'1d'}); // way three here we say we are sure that a string will be returned and add !

        const response = NextResponse.json({message:"Login in successfull", success:true},{status:200});
        response.cookies.set("token", token, {httpOnly:true, });

        return response;
    } catch (error:any) {
        return NextResponse.json({error:error.message, success:false},{status:500});
    }
}
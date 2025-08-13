import {User} from '@/models/user.model';
import {NextRequest, NextResponse} from 'next/server';
import {connectDB} from '@/dbConnection/dbConfig';
import bcrypt from 'bcryptjs';
import {sendEmail} from '@/helpers/mailer'

connectDB();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        console.log(reqBody);
        const {username, email, password} = reqBody;

        const user = await User.findOne({email:email});
        if(user){
            return NextResponse.json({error:"User with email already exists"},{status:400});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            username,
            email,
            password:hashedPassword
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        //send mail
        await sendEmail({email:email, emailType:"VERIFY", userId: savedUser._id});

        return NextResponse.json({message:"User registered successfully",success:true,savedUser},{status:201},);

    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500});
    }
};
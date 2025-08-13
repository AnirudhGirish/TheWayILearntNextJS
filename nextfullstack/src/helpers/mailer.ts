import { User } from '@/models/user.model';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

interface mailerData{
    email : string,
    emailType: 'VERIFY' | 'FORGOT',
    userId: string
}

export const sendEmail = async({email, emailType, userId}:mailerData) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(),10);
        const tokenExpiry = Date.now() + 3600000;

        if(emailType === "VERIFY"){
            const updatedUser = await User.findByIdAndUpdate(userId,{
                $set:{
                    verifyToken:hashedToken, 
                    verifyTokenExpiry:tokenExpiry
                }
            });
        }
        else if(emailType === "FORGOT"){
            await User.findByIdAndUpdate(userId,{
                $set:{
                    forgotPasswordToken:hashedToken, 
                    forgotPasswordTokenExpiry:tokenExpiry
                }
            });
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "35bd8117d92899",
                pass: "94c3d8a3fe48db"
            }
        });

        const mailOptions = {
            from: 'nextfullstack@one.com',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your Password",
            html: `<b>Hello, ${userId}!</b><br/><p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? 'verify your email address.' : 'reset your password.'} or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`,
        };

        const mailResponse = await transporter.sendMail(mailOptions);

        return mailResponse;
    } catch (error:any) {
        throw new Error(error.message)
    }
}
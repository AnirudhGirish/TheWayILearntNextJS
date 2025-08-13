import { Resend } from 'resend';
import MembershipEmail from '@/email/newEmail';

const resend = new Resend(process.env.RESEND_APIKEY);
export async function resendMail(email, transaction, name){
    try {
        await resend.emails.send({
            from: 'NVPSA@updates.iddeas.site',
            to: email,
            subject: "NVPSA | Membership Confirmation",
            react: MembershipEmail({name, transaction}),
        });
        return {success:true,  message: "Verification email sent successfully"}
    } catch (error) {
        console.log("Error sending email: ", error);
        return {success:false, message: "Failed to to send confirmation email!!"}
    }
}
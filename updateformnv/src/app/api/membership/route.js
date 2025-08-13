import dbConnect from "@/utils/dbconnect";
import { Form } from "@/models/form.model";
import { Membership } from "@/models/membership.model";
import { resendMail } from "@/utils/resend";

export async function POST(req){
    await dbConnect();

    try {
        const {name, number, email, address, aadhar, pass, year, transaction} = await req.json();
        if(!transaction){
            console.error("NO tranascaction ID, please complete the payment to proceed");
            return Response.json({success:false, message:"NO tranascaction ID, please complete the payment to proceed"},{status:400});
        }

        const newMember = new Membership({
            name,
            number,
            email,
            transaction
        });
        await newMember.save();

        const newForm = new Form({
            name, 
            number, 
            email, 
            address, 
            aadhar, 
            pass, 
            year
        });
        await newForm.save();
        
        if(email){
            const emailResponse = await resendMail(email, transaction, name);
            if(!emailResponse.success){
                return Response.json({
                    success:false,
                    message:emailResponse.message,
                },{
                    status:500
                })
            }
        }

        return Response.json({success:true,message:"Membership confirmed and form successfully submitted!!!"},{status:200});
    } catch (error) {
        console.error("Error confirming membership ", error);
        return Response.json({success:false, message:"Error confirming membership"}, {status:500});
    }
}
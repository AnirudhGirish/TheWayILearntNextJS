import dbConnect from "@/utils/dbconnect";
import { Form } from "@/models/form.model";

export async function POST(req){
    await dbConnect();

    try {
        const {name, number, email, address, aadhar, pass, year} = await req.json();
        const dataExists = await Form.findOne({number});
        if(dataExists){
            return Response.json({success:false, message:"User exists with these credentials"},{status:400});
        }
        const newForm = new Form({
            name, number, email, address, aadhar, pass, year
        });
        await newForm.save();
        return Response.json({success:true,message:"Form Submission Successfull!!!"},{status:200});
    } catch (error) {
        console.error("Error submitting the form", error);
        return Response.json({success:false, message:"Submitting form Failed!! Internal Server Error"},{status:500});
    }
}
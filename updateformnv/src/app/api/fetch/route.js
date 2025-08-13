import dbConnect from "@/utils/dbconnect";
import { Form } from "@/models/form.model";

export async function GET(){
    await dbConnect();

    try {
        const responses = await Form.find().sort({ submittedAt: -1 });
        return Response.json({success:true, message:"Data Fetching Successfull!!", responses},{status:200});
    } catch (error) {
        console.error("Error fetching data", error);
        return Response.json({success:false, message:"Data Fetching Failed!! Internal Server Error"},{status:500});
    }
}
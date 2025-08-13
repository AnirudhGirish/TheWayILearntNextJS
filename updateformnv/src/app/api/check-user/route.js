import { Form } from "@/models/form.model";
import dbConnect from "@/utils/dbconnect";

export async function GET(req){
    await dbConnect();
    try {
            const {searchParams} = new URL(req.url);
            const getNumber = {
                number: searchParams.get('number')
            };
            const number = getNumber.number;
            const userFound = await Form.findOne({number});
            if(userFound){
                return Response.json({
                    success:false, 
                    message:"User with these credentials exists"
                },{status: 400})
            }
        
            return Response.json({
                success:true, 
                message:"User is unique"
            },{status: 200})
    } catch (error) {
        console.error("Error checking user uniqueness",error);
        return Response.json({success:false, message:"Error checking user uniqueness"},{status:500});
    }
}
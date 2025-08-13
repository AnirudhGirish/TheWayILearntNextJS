/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import ImageKit from "imagekit";

const imageKit = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY || "",
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY || "",
    urlEndpoint:process.env.IMAGEKIT_API_ENDPOINT || ""
});

export async function GET() {
    try {
        const {userId} = await auth();
        if(!userId){
            return NextResponse.json({error:"Unauthorized"}, {status:401});
        }
        
        const authParams = imageKit.getAuthenticationParameters();

        return NextResponse.json(authParams);
    } catch (error: any) {
        console.log("imagekit-auth-route-error: ",error);
        return NextResponse.json({error:"Failed to generate auth tokens for ImageKit"},{status:504});
    }
}
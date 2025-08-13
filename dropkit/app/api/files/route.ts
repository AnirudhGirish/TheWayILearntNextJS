/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq, isNull } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request :NextRequest){
    try {
        const {userId} = await auth();
        if(!userId){
            return NextResponse.json({error: "Unauthorized"},{status:401});
        }
        const searchParams = request.nextUrl.searchParams;
        const queryUserId = searchParams.get("userId");
        const parentId = searchParams.get("parentId");

        if(!queryUserId || queryUserId !== userId){
            return NextResponse.json({error:"Unauthorized query"},{status:401});
        }
        let userFiles;
        if(parentId){
            await db.select()
        }
    } catch (error: any) {
        console.error("Error in get files route: ",error);
        return NextResponse.json({error: "Error fetching files"},{status:501});
    }
}
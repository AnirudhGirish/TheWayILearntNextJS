/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try {
        const {userId} = await auth();
        if(!userId){
            return NextResponse.json({message:"User not authenticated"},{status:401});
        }
        
        const body = await request.json();
        const {imageKit, userId: bodyUserId} = body;
        
        if(bodyUserId !== userId){
            return NextResponse.json({message:"User not authenticated"},{status:401});
        }
        
        if(!imageKit || !imageKit.url){
            return NextResponse.json({message:"Invalid file upload data"},{status:400});
        }

        const fileData = {
            name: imageKit.name || "untitled",
            path: imageKit.filePath || `/dropkit/${userId}/${imageKit.name}`,
            userId: userId as string,
            size: imageKit.size || 0,
            type: imageKit.fileType || "image",
            fileUrl: imageKit.url,
            thumbnailUrl: imageKit.thumbnailUrl || null,
            parentId: null,
            isFolder: false,
            isStarred: false,
            isTrash: false
        };

        const [newFile] = await db.insert(files).values(fileData).returning();
        return NextResponse.json(newFile)
    } catch (error: any) {
        console.log("Error in upload route: ",error);
        return NextResponse.json({error:"Failed to save info to databasea"},{status:500});
    }
}
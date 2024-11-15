import prisma from "@/app/db";
import { NextResponse } from "next/server";

export async function GET(req:NextResponse){
    const spaceId = req.url.split("?spaceId=")[1].split("&")[0]
    const userId = req.url.split("userId=")[1];
    try{     
        const user = await prisma.spaces.findUnique({
        where:{
            userId:userId,
            spacesId:spaceId
        },  
        })
        console.log(userId,spaceId);
        console.log("user :-")
        console.log(user)
        
        return NextResponse.json({
            user:user
        })

    }catch(e){
        console.log(e)
        return NextResponse.json({
            message:"something went wrong"
        })
    }
    }
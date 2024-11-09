import prisma from "@/app/db"
import { NextRequest, NextResponse } from "next/server"


export const POST = async (req:NextRequest) => {
    const body = await req.json();
    try{
        const space = await prisma.spaces.create({
                        data:{
                            name:body.name,
                            userId:body.userId
                        }
                    })
        console.log(space);
        return NextResponse.json({
            spaceid:space.spacesId  
        })
    }catch(e){
        return NextResponse.json({
            message:"something went wrong",
            error:e
        })
    }
}
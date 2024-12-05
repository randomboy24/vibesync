import prisma from "@/app/db"
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server"


export const POST = async (req:NextRequest) => {
    // const session = await getSession(   )
    // console.log("session:-" +session);
    const body = await req.json();
    console.log(body.userId)
    try{
        const space = await prisma.spaces.create({
                        data:{
                            name:body.name,
                            userId:body.userId
                        }
                    })      
        console.log(space);
        return NextResponse.json({  
            spaceId:space.spacesId  
        })
    }catch(e){
        return NextResponse.json({
            message:"something went wrong",
            error:e
        })
    }
}

export const GET = async (req:NextRequest) => {
    console.log("hey there")
    const userId = req.url.split("userId=")[1];
    console.log(userId)
    const spaces = await prisma.spaces.findMany({
        where:{
            userId:userId
        },
        select:{
            spacesId:true,
            name:true
        }
    })

    console.log("spaces")
    console.log(spaces)

    return NextResponse.json({
        spaces:spaces 
    })
}
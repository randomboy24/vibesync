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

export async function GET(req:NextRequest){
    const spaceId = req.url.split("spaceId=")[1];
    // return NextResponse.json({
    //     message:"hey there"
    // });
    try{
        const songs = await prisma.songs.findMany({
            where:{
                spaceId:spaceId
            }
        })
        return NextResponse.json({
            songs:songs
        })
    }
    catch(err){
        console.log(err)
        return NextResponse.json({
            message:"something went wrong"
        })
    }
}

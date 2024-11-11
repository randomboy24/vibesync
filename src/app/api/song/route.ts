import prisma from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const body = await req.json();
    try{        
        const song = await prisma.songs.create({
            data:{
                spaceId:body.spaceId,   
                url:body.url
            }
        })
        if(song){        
            return NextResponse.json({   
                message:"song entry had been entered in the database successfully."
            })
        }
    }catch(err) {
        console.log("error: "+err)
        return NextResponse.json({
            message:"something went wrong"
        })
    }
}   


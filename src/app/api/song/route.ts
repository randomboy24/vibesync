import prisma from "@/app/db";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const body = await req.json();
    try{
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${body.url}&key=${process.env.YOUTUBE_APIKEY}`)    
        console.log("title is \n")

        const title = response.data.items[0].snippet.title;
        const song = await prisma.songs.create({
            data:{
                spaceId:body.spaceId,   
                url:body.url,
                name:title
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


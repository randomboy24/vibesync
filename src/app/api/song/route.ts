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


export async function GET(req:NextRequest){
    console.log("checking url")
    // console.log(req.url)
    const spaceId = req.url.split("spaceId=")[1].split("&")[0];
    const userId = req.url.split("userId=")[1]

    console.log(spaceId)
    console.log(userId)

    const songRecords = await prisma.songs.findMany({
        where:{
            spaceId:spaceId
        }
    })

    const songWithUpvotes = await Promise.all(songRecords.map(async (song) => {
        const upvoteCount = await prisma.upvotes.count({
            where:{
                SongId:song.songId
            }
        })

        const isUpvoted = await prisma.upvotes.findFirst({
            where:{
                UserId:userId,
                SongId:song.songId
            },
            select:{
                UserId:true
            }
        })
        

        if(isUpvoted){
            return {...song,upvoteCount:upvoteCount,isUpvoted:true}
        }
        else{
            return {...song,upvoteCount:upvoteCount,isUpvoted:false}
        }

        // return {...song,upvoteCount:upvoteCount}
    }))



    console.log(songWithUpvotes)

    return NextResponse.json({
        songs:songWithUpvotes
    })
}



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

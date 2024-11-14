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
    const spaceId = req.url.split("spaceId=")[1].split("}")[0];
    // return NextResponse.json({
    //     message:"hey there"
    // });
    console.log("spaceId = "+spaceId)
    try{
        const songs = await prisma.songs.findMany({
            where:{
                spaceId:spaceId
            }
        })
        const songRecords = await Promise.all(songs.map(async (song) => {
            const upvoteCount = await prisma.upvotes.findMany({
                where:{
                    SpaceId:spaceId,
                    SongId:song.songId
                }   
            })
            return {
                url:song.url,   
                upvoteCount:upvoteCount.length,
                songId:song.songId
            }
        }))
        // console.log(upvotesAndSongUrl)
        console.log("Songs =_ "+songRecords)
        return NextResponse.json({
            songs:songRecords
        })
    }
    catch(err){ 
        console.log(err)
        return NextResponse.json({
            message:"something went wrong"
        })
    }
}

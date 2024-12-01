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
    const spaceId = req.url.split("spaceId=")[1].split("}")[0];
    // return NextResponse.json({
    //     message:"hey there"
    // });
    // const songUpvotesCounts = await prisma.upvotes.groupBy({
    //     by:['SongId'],
    //     where:{
    //         SpaceId:spaceId
    //     },
    //     _count:{    
    //         SongId:true
    //     },
    //     orderBy:{
    //         _count:{
    //             SongId:'desc'
    //         }
    //     }   
    // })      
    // const upvotesWithUrl = await Promise.all(songUpvotesCounts.map(async (song) => {
    //     const url = await prisma.songs.findFirst({
    //         where:{
    //             songId:song.SongId
    //         },
    //         select:{
    //             url:true
    //         }
    //     })

    //     return {songId:song.SongId,url:url?.url,upvoteCount:song._count.SongId}
    // }))


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
        return {...song,upvoteCount:upvoteCount}
    }))



    console.log(songWithUpvotes)

    return NextResponse.json({
        songs:songWithUpvotes
    })
}

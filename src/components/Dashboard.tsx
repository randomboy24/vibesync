"use client"
import { Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player"
import axios from "axios";
import { Songs } from "@prisma/client";
import { useSession } from "next-auth/react";
// import { useSession } from "next-auth/react";

interface videoType{
    songId:string,
    url:string,
    upvotesCount:number,
}

export function Dashboard({spaceId}:{spaceId:string}){
    // const [video,setVideo] = useState<videoType[]>([])
    const [renderedVideos,setRenderedVideos] = useState<videoType[]>([])
    const [inputData,setInputData] = useState("")
    const [socket,setSocket] = useState<WebSocket | null>(null)
    // const [count,setCount] = useState(0);
    const playerRef = useRef(null);
    const session = useSession();

    // useEffect(() => {

    //     setTimeout(() => {
    //         console.log("gawnkgkwjkogaewhigobn")
    //         console.log("session :- "+session.data?.user)
    //     },3000)
    // },[])

    // // Show loading message until session status changes
    // if (status === 'loading') {
    //   return <p>Loading...</p>;
    // }
  
    // // After loading, check if the session is authenticated
    // if (status === 'authenticated') {
    //   console.log(session.user); // session data should be available here
    //   return <div>Welcome, {session.user?.name}</div>;
    // }
    
    async function fetchVideos (){  
        console.log("fetchVideos got called")
        console.table(renderedVideos)
        try{
            const videosFromDatabase = await axios.get(`http://localhost:3000/api/space?spaceId=${spaceId}}`);
            setRenderedVideos([]);
            // console.log(videosFromDatabase.data.songs);
            // const upvoteCount = await axios

            // console.table(videosFromDatabase)
            const songRecords = videosFromDatabase.data.songs
            console.log(songRecords)
            songRecords.forEach((song:any) => {
                setRenderedVideos((video) => {
                    // console.log("gawioriaerngio")
                    // console.log(renderedVideos)      
                    return [...video,{url:song.url,upvotesCount:song.upvoteCount,songId:song.songId}]
                })
            })

            console.log("rendered videos ;- "+renderedVideos)
            return;
        }catch(e){
            console.log(e)
            return;
        }
    }


    // useEffect(() => {
    //     // console.log(renderedVideos)
    // },[renderedVideos])

    useEffect(() => {
        fetchVideos();
        // console.log(renderedVideos)
        const socket = new WebSocket("ws://localhost:8080")

        socket.onopen = () => {
            console.log("connected ")
            setSocket(socket)
        }

        
        // socket.onmessage = (event) => {
        //     const upvoteCount = JSON.parse(event.data);
        //     console.log(event.data)
        //     try{
        //         console.log(renderedVideos.length)
        //         console.log("renderedVideos: \n"+renderedVideos)
        //         let updatedVideos = renderedVideos.map((video) => {
        //             // console.log("ernghjioarnioa5ngiothnhiotsjhims46"+{
        //             //     ...video,
        //             //     upvotesCount:upvoteCount.upvoteCount
        //             // })
        //             console.log("video+"+video)
        //             if(upvoteCount.songId === video.songId){
        //                 return {
        //                     ...video,
        //                     upvotesCount:upvoteCount.upvoteCount
        //                 }
        //             }    
        //             return video;
        //         })  
        //         console.log(renderedVideos)
        //         console.log("received the message\n"+updatedVideos)
        //         // setRenderedVideos(updatedVideos)
        //     }catch(err){
        //         console.log(err)
        //     }    
        // }
        // socket.onmessage = (event) => {
        //     const upvoteCount = JSON.parse(event.data);
        //     console.log("Received WebSocket message:", upvoteCount);
        
        //     setRenderedVideos((prevVideos) =>o
        //         prevVideos.map((video) =>
        //             video.songId === upvoteCount.songId
        //                 ? { ...video, upvotesCount: upvoteCount.upvoteCount }
        //                 : video
        //         )
        //     );
        // };
        
        socket.onmessage = (event) => {
            const upvoteCount = JSON.parse(event.data)
            setRenderedVideos((prevVideo) => 
            prevVideo.map(video => video.songId===upvoteCount.songId?{...video,upvotesCount:upvoteCount.upvoteCount}:video))
        }

        return () => {
            socket.close();
        }
        // db call fetch data
    },[])
    return (
        <div className="flex justify-center w-screen bg-[#111] h-screen">
            <div className="flex md:w-[70%] w-screen md:flex-row flex-col   mt-10 md:px-0 px-4">
                <div className=" text-2xl font-bold basis-[60%]">
                    <div>   
                        Upcoming songs
                    </div>
                    <div className="mt-5">
                    {renderedVideos.map((vid,index) => 
                        <div className="h-36 flex flex-col items-center justify-center  w-[95%] rounded-lg border dark:text-white text-white" key={index}> 
                            <button onClick={() => {
                                console.log(spaceId)
                                socket?.send(JSON.stringify({
                                    spaceId:spaceId,    
                                    songId:vid.songId,
                                    userId:session.data?.userId
                                }))
                            }}>upvote {vid.upvotesCount}</button> 
                            <div>video {index+1}</div>
                        </div>
                    )}
                    </div>
                </div>
                <div className="basis-[40%]">
                    <div className=" flex justify-between ">
                        <div className="text-2xl font-bold">Add a song</div>
                        <button className="flex gap-x-2 h-10  w-24 items-center justify-center rounded-lg -black">
                            <Share2 width={20} height={20} className="mt-1"/>
                            <span className="text-lg font-semibold">Share</span>   
                        </button>        
                    </div>
                    <div className="border border-gray-700 bg-[#111]">
                        <div className="flex flex-col gap-y-2 mt-7">
                            <input type="text" placeholder="paste youtube link here" className="block rounded-lg w-[100%] text-white  h-9 pl-2 bg-[#000]" onChange={(e) => {
                                setInputData(e.target.value)
                            }}/>
                            <button className="block w-[100%] h-10   rounded-lg text-white bg-purple-700" onClick={async () => {
                                // console.log(inputData)
                                const songId = await axios.post("http://localhost:3000/api/song",{
                                    spaceId:spaceId,
                                    url:inputData
                                })
                                // console.log(response.data)
                                // setRenderedVideos([])
                                fetchVideos();
                                // console.log(video)
                            }}>
                                Add to Queue
                            </button>
                        </div>
                        <div className="mt-8 flex flex-col gap-y-2">
                            <div className="text-2xl font-bold">Now Playing</div>
                            <div className="h-72 flex justify-center items-center ">
                                {renderedVideos.length>0?
                               <ReactPlayer ref={playerRef} url={`https://www.youtube.com/watch?v=${renderedVideos[0].url}`} controls playing height="100%" width="100%"  onEnded={() => {
                                setRenderedVideos((prevVideo) => {
                                    return prevVideo.slice(1);
                                })
                                // if(count>=(video.length-1)){
                                //     setVideo([])
                                //     return;
                                // }
                                // setCount(count => ++count)
                               }}/>
                                :
                                <div>    
                                    No videp playing
                                </div>
                                }
                            </div>
                            <div>
                                <button className="w-[100%]  -black flex justify-center items-center h-10 rounded-lg gap-x-1 bg-purple-700 " onClick={() => {
                                    // if(count>(video.length-1)){
                                    //     setVideo([])
                                    //     return;
                                    // }
                                    // setCount(count => ++count)
                                    // @ts-expect-ignore   
                                    // const player = playerRef.current?.getInternalPlayer(); 
                                    // if(player && typeof(player.play()) =='function'){
                                    //     player.play();
                                    // }
                                }}>
                                    <Play height={18} width={18}/>
                                    <span>Play next</span>
                                </button>
                                
                                <button className="text-black bg-blue-500" onClick={() => {
                                    // socket?.send("hello from browser to the nodejs server")
                                }}>
                                    click me now  
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

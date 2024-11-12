"use client"
import { Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player"
import axios from "axios";
import { Songs } from "@prisma/client";

interface videoType{
    id:string,
    upvotesCount:number,
}

export function Dashboard({spaceId}:{spaceId:string}){
    const [video,setVideo] = useState<videoType[]>([])
    const [inputData,setInputData] = useState("")
    const [count,setCount] = useState(0);
    const playerRef = useRef(null);

    async function fetchVideos (){
        console.log(spaceId)
        try{
            const videosFromDatabase = await axios.get(`http://localhost:3000/api/space?spaceId=${spaceId}`)
            console.log(videosFromDatabase.data.songs);
            console.log(typeof [22,32]);
            (videosFromDatabase.data.songs).forEach((song:Songs) => {
                setVideo(video => [...video,{id:song.url,upvotesCount:0}])
            })
            return;
        }catch(e){
            console.log(e)
            return;
        }
        console.log(video)
    }


    useEffect(() => {
        // db call fetch data
        fetchVideos();
    },[])
    return (
        <div className="flex justify-center w-screen">
            <div className="flex md:w-[70%] w-screen md:flex-row flex-col   mt-10 md:px-0 px-4">
                <div className=" text-2xl font-bold basis-[60%]">
                    <div>
                        Upcoming songs
                    </div>
                    <div className="mt-5">
                    {video.map((vid,index) => 
                        <div className="h-36 flex items-center justify-center  w-[95%] rounded-lg border" key={index}> 
                            <button onClick={() => {
                            
                            }}>upvote</button>
                            <div>video {index+1}</div>
                        </div>
                    )}
                    {}
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
                            <input type="text" placeholder="paste youtube link here" className="block rounded-lg w-[100%]  h-9 pl-2 bg-[#000]" onChange={(e) => {
                                setInputData(e.target.value)
                            }}/>
                            <button className="block w-[100%] h-10   rounded-lg text-white bg-purple-700" onClick={async () => {
                                console.log(inputData)
                                const response = await axios.post("http://localhost:3000/api/song",{
                                    spaceId:spaceId,
                                    url:inputData
                                })
                                console.log(response.data)
                                // setVideo([...video,{
                                //     id:inputData,
                                //     upvotesCount:0
                                // }])
                                // console.log(video)
                            }}>
                                Add to Queue
                            </button>
                        </div>
                        <div className="mt-8 flex flex-col gap-y-2">
                            <div className="text-2xl font-bold">Now Playing</div>
                            <div className="h-72 flex justify-center items-center ">
                                {video.length>0?
                               <ReactPlayer ref={playerRef} url={`https://www.youtube.com/watch?v=${video[0].id}`} controls playing height="100%" width="100%"  onEnded={() => {
                                setVideo((prevVideo) => {
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

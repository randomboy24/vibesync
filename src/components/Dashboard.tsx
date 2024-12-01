"use client"
import { Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player"
import axios from "axios";
import { useSession } from "next-auth/react";
// import { useSession } from "next-auth/react";

interface videoType{
    songId:string,
    url:string, 
    upvoteCount:number,
    title?:string
    active:boolean,
    isVoted?:boolean
}


export function Dashboard({spaceId}:{spaceId:string}){
    // const [video,setVideo] = useState<videoType[]>([])
    const [songsList,setSongsList] = useState<videoType[]>([])
    const [inputData,setInputData] = useState("")
    const [isAdmin,setIsAdmin] = useState<boolean | null>(null)
    const [socket,setSocket] = useState<WebSocket | null>(null)
    const playerRef = useRef(null);
    const [currentSong,setCurrentSong] = useState({
        songId:"",
        url:""
    })   
    const session = useSession();
    
    const checkIfAdmin = async () => {
        const userId = session.data?.userId;
        if (!userId) return false;
    
        try {
        const response = await axios.get(`http://localhost:3000/api/user/isAdmin?spaceId=${spaceId}&userId=${userId}`);
        return response.data.isAdmin;
        } catch (error) {
        console.error(error);
        return false;
        }
    };
    
    useEffect(() => {
        const checkAdminStatus = async () => {
        const isAdmin = await checkIfAdmin();
        setIsAdmin(isAdmin);
        };
        checkAdminStatus();
    }, [session.data, spaceId]);
        
        async function fetchVideos (){ 
            try{
                const songsFromDatabase = await axios.get(`http://localhost:3000/api/space?spaceId=${spaceId}}`);
                setSongsList([]);

                const songRecords = songsFromDatabase.data.songs
                songRecords.forEach((song:videoType) => {
                    setSongsList((prevSongs):any => {    
                        if(song.active){
                            setCurrentSong({
                                songId:song.songId,
                                url:song.url
                            })
                        }  
                        
                        
                        return [...prevSongs,{url:song.url,upvoteCount:song.upvoteCount,songId:song.songId,active:song.active,isVoted:false}]
                    })
                })

                return;
            }catch(e){
                
                return;
            }
        }

        const sortVideos = async () => {
            setSongsList((prevVideo) => {
                return prevVideo.toSorted((a,b) => b.upvoteCount -a.upvoteCount);
            })
        }


        useEffect(() => { 
            fetchVideos().then(() => {  
                sortVideos();
            })
        
            const socket = new WebSocket("ws://localhost:8080")

            socket.onopen = () => {
                // 
                setSocket(socket)
            }

            socket.onmessage = (event) => {
                try{    
                    JSON.parse(event.data)
                }
                catch(err){ 
                    
                    return;
                }
                const data = JSON.parse(event.data)
                if(data.type == "active" || data.type == "inactive"){
                    setSongsList((prevSongs) => prevSongs.map(song => song.songId===data.songId?{...song,active:true}:{...song,active:false}))
                    setCurrentSong({
                        songId:data.songId,
                        url:data.url
                }) 
                    return;
                }

                if(data.type == "deleteUpvote"){
                    const promise = new Promise((resolve,reject) => {
                        setSongsList((prevSongs) => prevSongs.map((song) => song.songId===data.songId?{...song,upvoteCount:0}:{...song}))
                        resolve("resolved");
                                
                    })
                    promise.then(() => {
                        sortVideos()
                    })
                    return;
                }
                

                const upvoteCount = JSON.parse(event.data)
                setSongsList((prevVideo) => 
                prevVideo.map(video => video.songId===upvoteCount.songId?{...video,upvoteCount:upvoteCount.upvoteCount}:video))
                sortVideos();
            }

            return () => {
                socket.close();
            }
        },[])
        
        

        function getYoutubeThumbnail(url:string){
            const videoId = url.match("")
        }

        return (
            <div className="flex justify-center w-screen h-screen">
                <div className="flex md:w-[70%] w-screen md:flex-row flex-col   mt-10 md:px-0 px-4">
                    <div className=" text-2xl font-bold basis-[60%]">
                    {isAdmin && <div className="text-black text-5xl font-extrabold">I  am Admin </div>}
                        <div>   
                            Upcoming songs
                        </div>  y
                        <div className="mt-5">
                        {songsList.map((vid,index) => 
                            <div className="h-36 flex flex-row my-4  w-[95%] rounded-xl border border-black  text-black" key={index}> 
                                <div className="h-[120px] w-[180px] my-auto ml-4 rounded-xl"> 
                                    <img src={`https://img.youtube.com/vi/${vid.url}/hqdefault.jpg`} alt="image" className="h-full w-full" />
                                </div>  
                                <div className="flex flex-col gap-y-7 ml-40 items-center">
                                    <button className="" onClick={() => {
                                        // 
                                        socket?.send(JSON.stringify({
                                            spaceId:spaceId,    
                                            songId:vid.songId,
                                            userId:session.data?.userId
                                        }))
                                        setTimeout(() => {
                                            sortVideos();
                                        }, 100);

                                    }}>upvote {vid.upvoteCount}</button>   
                                    {vid.songId == currentSong.songId && "current video "}
                                    <div>video {index+1}</div> 
                                </div>
                            </div>
                        )}
                        </div>
                    </div>
                    <div className="basis-[40%]">    
                        <div className=" flex justify-between ">
                            <div className="text-2xl font-bold md:mt-0 mt-10">Add a song</div>
                            <button className="flex gap-x-2 h-10  w-24 items-center justify-center rounded-lg -black">
                                <Share2 width={20} height={20} className="mt-1"/>
                                <span className="text-lg font-semibold">Share</span>   
                            </button>        
                        </div>
                        <div className="border border-gray-700 bg-[#111]">
                            {isAdmin && <div className="flex flex-col gap-y-2 mt-7">
                                <input type="text" placeholder="paste youtube link here" className="block rounded-lg w-[100%] text-white  h-9 pl-2 bg-[#000]" onChange={(e) => {
                                    setInputData(e.target.value)
                                }}/>
                                <button className="block w-[100%] h-10   rounded-lg text-white bg-purple-700" onClick={async () => {
                                    
                                    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([^&=%\?]{11})/;/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([^&=%\?]{11})/;
                                    if(!youtubeRegex.test(inputData)){
                                        alert("invalid youtube link")
                                        return;
                                    }
                                    const url = inputData.split("v=")[1].split("&")[0]
                                    const songId = await axios.post("http://localhost:3000/api/song",{
                                        spaceId:spaceId,
                                        url:url
                                    })
            
                                    fetchVideos();
                                }}>
                                    Add to Queue
                                </button>
                            </div>}
                            <div className="mt-8 flex flex-col gap-y-2">
                                <div className="text-2xl font-bold dark:text-white">Now Playing</div>   
                                <div className="h-72 flex justify-center items-center ">
                                    {currentSong.songId?
                                    !isAdmin ? 
                                    <img src={`https://img.youtube.com/vi/${currentSong.url}/hqdefault.jpg`} alt="image" className="h-full w-full" />:
                                <ReactPlayer ref={playerRef} url={`https://www.youtube.com/watch?v=${currentSong.url}`} controls playing height="100%" width="100%"  onEnded={async () => {
                                    socket?.send(JSON.stringify({
                                    type:"deleteUpvote",
                                    songId:currentSong.songId
                                    }));

                                    setSongsList((prevSongs) => prevSongs.map((song) => song.songId===currentSong.songId?{...song,upvoteCount:0}:{...song}))
                                
                                    sortVideos().then(() => {
                                        setSongsList((prevSongs) => {
                                            setCurrentSong({songId:prevSongs[0].songId,url:prevSongs[0].url})
                                            return prevSongs
                                        })
                                    })
                                    
                                    const activeSongId = songsList.find((song) => song.active)?.songId

                                    setSongsList((prevSongs) => {
                                        socket?.send(JSON.stringify({
                                            type:'inactive',
                                            prevSongId:activeSongId,
                                            newSongId:prevSongs[0].songId
                                        }))
                                        return prevSongs
                                    })
                                
                                }}/>
                                    :
                                    <div className="text-white">    
                                        No videp playing
                                    </div>  
                                    }
                                </div>
                                {isAdmin && <div>
                                    <button className="w-[100%]  -black flex justify-center items-center h-10 rounded-lg gap-x-1 bg-purple-700 " onClick={() => {
                                            let mostUpvotedSong  = {
                                                songId:"",
                                                url:"",
                                                upvoteCount:0
                                            }
                                            for(const key in songsList){
                                                if(songsList[key].upvoteCount>mostUpvotedSong.upvoteCount){
                                                    mostUpvotedSong = {...songsList[key]}
                                                }
                                            }
                                                
                                            setCurrentSong({songId:mostUpvotedSong.songId,url:mostUpvotedSong.url})
                                            socket?.send(JSON.stringify({
                                                songId:mostUpvotedSong.songId,
                                                type:"active"
                                            }))
                                        }}>
                                        <Play height={18} width={18} className="dark:text-white"/>
                                        <span className="hover:cursor-pointer dark:text-white" >start</span>
                                    </button>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

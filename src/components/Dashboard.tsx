"use client"
import { Play, Share2, ThumbsUp, ThumbsUpIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player"
import axios from "axios";
import { useSession } from "next-auth/react";
// import { useSession } from "next-auth/react";

interface songType{
    songId:string,
    url:string, 
    upvoteCount:number,
    name?:string
    active:boolean,
    isUpvoted?:boolean
}


export function Dashboard({spaceId}:{spaceId:string}){
    // const [video,setVideo] = useState<songType[]>([])
    const [songsList,setSongsList] = useState<songType[]>([])   
    const [inputData,setInputData] = useState("")
    const [isAdmin,setIsAdmin] = useState<boolean | null>(null)
    const [socket,setSocket] = useState<WebSocket | null>(null)
    const playerRef = useRef(null);
    const [currentSong,setCurrentSong] = useState({ 
        songId:"",
        url:""  
    })   
    const session = useSession();
    const [loading,setLoading] = useState(true)
    
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
                if(!session.data?.userId){
                    return;
                }
                const songsFromDatabase = await axios.get(`http://localhost:3000/api/song?spaceId=${spaceId}&userId=${session.data?.userId}`);
                setSongsList([]);

                

                const songRecords = songsFromDatabase.data.songs
                
                songRecords.forEach((song:songType) => {
                    setSongsList((prevSongs):any => {       
                        if(song.active){
                            setCurrentSong({
                                songId:song.songId,
                                url:song.url,
                            })
                        }  
                        
                        
                        return [...prevSongs,{url:song.url,upvoteCount:song.upvoteCount,songId:song.songId,active:song.active,isUpvoted:song.isUpvoted,name:song.name as string}]
                    })
                }).then(() => {
                    // console.log(songsList)
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
                if(data.type == "active" || data.type == "nextSong"){
                    setSongsList((prevSongs) => prevSongs.map(song => song.songId===data.songId?{...song,active:true}:{...song,active:false}))
                    setCurrentSong({
                        songId:data.songId,
                        url:data.url
                }) 
                    return;
                }
                
                if(data.type === "deleteOneUpvote"){

                    setSongsList((prevSongs) => {
                        const prevSongRecord = prevSongs;
                        const newSongRecord  = prevSongRecord.map((song) => {
                            if(song.songId == data.songId){
                                if(session.data?.userId == data.userId){
                                    return {...song,isUpvoted:false,upvoteCount:data.upvoteCount}
                                }
                                return {...song,upvoteCount:data.upvoteCount}
                            }
                            return {...song}
                        });
                        return newSongRecord;
                    })
                    return;
                }

                if(data.type == "deleteUpvote"){
                    const promise = new Promise((resolve,reject) => {
                        setSongsList((prevSongs) => prevSongs.map((song) => song.songId===data.songId?{...song,upvoteCount:0,isUpvoted:false}:{...song,isUpvoted:false}))
                        resolve("resolved");
                                
                    })
                    promise.then(() => {
                        sortVideos()
                    })
                    return;
                }
                

                setSongsList((prevVideo) => 
                prevVideo.map((video) => {
                    if(data.songId == video.songId){    
                        if(session.data?.userId == data.userId){
                            return {...video,isUpvoted:true,upvoteCount:data.upvoteCount}
                        }
                        return {...video,upvoteCount:data.upvoteCount}
                    }
                    return video
                }))
                sortVideos();
            }

            return () => {
                socket.close();
            }
        },[session.data])   
        
        

        return (
            <div className="flex justify-center">
                <div className="flex md:w-[70%] w-screen lg:flex-row flex-col mt-10 md:px-0 px-4">
                    <div className=" text-2xl font-bold basis-[60%]  pl-3">
                    {/* {isAdmin && <div className="te  xt-black text-5xl font-extrabold">I  am Admin </div>} */}
                        <div className="text-black dark:text-white text-2xl">   
                            Upcoming songs
                        </div>  
                        <div className="mt-5">
                        {songsList.map((vid,index) => 
                            <div className={`border border-gray-100 sm:h-36 h-80 flex sm:flex-row flex-col my-4  w-[95%] rounded-xl bg-white transition-all backdrop-blur-sm " ${vid.songId === currentSong.songId?'bg-purple-100/80 dark:bg-purple-900/80 border-2 border-purple-500':'bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-800/90'} hover:bg-purple-100/80 hover:dark:bg-purple-900/80  `} key={index} > 
                                <div className="h-[60%] w-[100%] sm:h-28 sm:w-52 mt-0 sm:my-auto sm:ml-4 ml-0 rounded-xl " > 
                                    <img src={`https://img.youtube.com/vi/${vid.url}/hqdefault.jpg`} alt="image" className="h-full w-full sm:rounded-2xl rounded-xl" />
                                </div>  
                                <div className="flex flex-col justify-between ml-4 mt-3 items-start dark:text-white text-black text-lg">  
                                <span>{vid.name}</span>
                                    <button  className="flex items-center gap-2 px-3 py-2 mb-2 rounded-full bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors" onClick={() => {                    

                                       if(vid.isUpvoted){
                                        socket?.send(JSON.stringify({
                                            type:"deleteOneUpvote",
                                            songId:vid.songId,
                                            userId:session.data?.userId,
                                        }))
                                        return;
                                       }
                                        
                                        socket?.send(JSON.stringify({
                                            spaceId:spaceId,    
                                            songId:vid.songId,
                                            userId:session.data?.userId
                                        }))
                                        setTimeout(() => {
                                            sortVideos();
                                        }, 100);

                                    }}>   
                                        <ThumbsUp size={18} className="text-purple-600 dark:text-purple-400" fill={`${vid.isUpvoted?'white':'transparent'}`}/>
                                        <span className="dark:text-white">{vid.upvoteCount  }</span>  
                                    </button>  
                                    {/* <span> video.isUpvoted = {vid.isUpvoted?'true':'false'}</span>  */}
                                    {/* {vid.songId == currentSong.songId && "current video "} */}
                                    {/* <div>video {index+1}</div>  */}
                                </div>
                            </div>
                        )}
                        </div>
                    </div>
                    <div className="basis-[40%] md:pl-0 pl-3">    
                        <div className=" flex justify-between w-[95%] items-center ">
                            <div className="text-2xl text-black dark:text-white font-bold">Add a song</div>
                            <button className=" flex gap-x-2 h-10 w-24 items-center justify-center rounded-xl bg-purple-500 hover:bg-purple-600 hover:scale-[1.04] text-white">
                                <Share2 width={20} height={20} className=" "/>
                                <span className="text-lg font-semibold ">Share</span>   
                            </button>        
                        </div>
                        <div className=" h-[600px] w-[95%] ">
                            <div className="flex flex-col gap-y-2 mt-7">
                                <input type="text" placeholder="paste youtube link here" className="block rounded-xl border border-gray-600 w-[100%] text-black dark:text-white h-12 pl-2 bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-800/90" onChange={(e) => {
                                    setInputData(e.target.value)
                                }}/>
                                <button className="block w-[100%] h-12 text-white bg-purple-700 rounded-xl font-bold" onClick={async () => {
                                    
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
                            </div>
                            <div className="mt-8 flex flex-col gap-y-2">
                                <div className="text-2xl font-bold dark:text-white">Now Playing</div>   
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
                                    <div className="h-72 flex justify-center items-center ">
                                        {currentSong.songId?
                                        !isAdmin ? 
                                        <img src={`https://img.youtube.com/vi/${currentSong.url}/hqdefault.jpg`} alt="image" className="h-[100%] w-[100%]" />:
                                        <ReactPlayer ref={playerRef} url={`https://www.youtube.com/watch?v=${currentSong.url}`} controls  playing height="100%" width="100%"  onEnded={async () => {
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
                                                type:'nextSong',
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
                                        <button className="w-[100%]  -black flex justify-center items-center h-10 rounded-lg gap-x-1 bg-purple-700 mt-4 " onClick={() => {
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
            </div>
        )
    }

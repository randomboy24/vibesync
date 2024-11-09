export default function Space ({params : { 
    space
}}:{params:{
    space:String[]
}}) {
    return (
        <div>
            <div>
                this  is a space route {space}
            </div>
            <Dashboard/>
        </div>
    )
}

import { Play, Share2 } from "lucide-react"

function Dashboard(){
    return (
        <div className="flex justify-center w-screen">
            <div className="flex md:w-[70%] w-screen md:flex-row flex-col  border mt-10 md:px-0 px-4">
                <div className="border text-2xl font-bold basis-[60%]">
                    <div>
                        Upcoming songs
                    </div>
                    <div className="mt-5">
                        <div className="h-36 flex items-center justify-center border w-[95%] rounded-lg">
                            video box
                        </div>
                    </div>
                </div>
                <div className="basis-[40%]">
                    <div className="border flex justify-between ">
                        <div className="text-2xl font-bold">Add a song</div>
                        <button className="flex gap-x-2 h-10 border w-24 items-center justify-center rounded-lg border-black">
                            <Share2 width={20} height={20} className="mt-1"/>
                            <span className="text-lg font-semibold">Share</span>   
                        </button>        
                    </div>
                    <div className="flex flex-col gap-y-2 mt-7">
                        <input type="text" placeholder="paste youtube link here" className="block rounded-lg w-[100%]  h-9 pl-2 bg-[#000]" />
                        <button className="block w-[100%] h-10 border border-red-700 rounded-lg">
                            Add to Queue
                        </button>
                    </div>
                    <div className="mt-8 flex flex-col gap-y-2">
                        <div className="text-2xl font-bold">Now Playing</div>
                        <div className="h-36 flex justify-center items-center border">
                            <div>
                                No videp playing
                            </div>
                        </div>
                        <div>
                            <button className="w-[100%] border border-black flex justify-center items-center h-10 rounded-lg gap-x-1">
                                <Play height={18} width={18}/>
                                <span>Play next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

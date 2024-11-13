"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
export const Space = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    function Modal() {
        const [spaceName,setSpaceName] = useState("");
        (function generateRandomName(){
            const musicSpaceNames = [
                "Harmony Hub",
                "Rhythm Room",
                "The Soundscape",
                "Melody Haven",
                "Groove Garden",
                "Echo Chamber",
                "Beat Bunker",
                "The Listening Lounge",
                "Vibe Vault",
                "Chords & Coffee",
                "Tempo Terrace",
                "The Mix Lab",
                "Sonic Sanctuary",
                "Bass Base",
                "Symphony Studio",
                "Vinyl Vault",
                "Acoustic Alley",
                "The Music Nest",
                "Pulse Place",
                "Harmony Haven",
                "Jam Junction",
                "Resonance Room",
                "The Chill Stage",
                "Soul Station",
                "Audio Arcade"
            ];
            return musicSpaceNames[Math.floor(Math.random() * musicSpaceNames.length)]            
        })();
        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md relative">
                    {/* Close Button */}
                    <button
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
                        onClick={() => setIsModalOpen(false)}
                    >
                        &times;
                    </button>

                    {/* Modal Title */}
                    <h2 className="text-2xl font-semibold text-gray-100 mb-4">Create a New Space</h2>

                    {/* Instructions */}
                    <p className="text-gray-400 mb-4">Enter a name for the space (optional):</p>

                    {/* Input Field */}
                    <input
                        type="text"
                        placeholder="Space Name"
                        className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => {
                            setSpaceName(e.target.value)
                        }}
                    />

                    {/* Create Space Button */}
                    <button
                        className="w-full mt-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                        onClick={async () => {
                            try{
                                localStorage.setItem("spaceName",spaceName)
                         
                                const res = await axios.post("http://localhost:3000/api/space",{
                                    userId:"1c1ad11b-0d2a-4d1a-aea5-f40a072d8b66",
                                    name:spaceName
                                })
                                console.log(res.data.spaceid)
                                router.push(`/${res.data.spaceid}`)
                            }catch(e){
                                console.log("error occured")
                                console.log(e)
                            }
                        }      
                        } // Placeholder for button action
                    >
                        Create Space
                    </button>   
                </div>
            </div>
        );
    }

    return (
        <div>
            {!isModalOpen ? (
                <button
                    className="bg-gray-700 text-gray-200 hover:text-white hover:bg-gray-600 rounded-lg w-32 h-8"
                    onClick={() => {
                        setIsModalOpen(true)
                    }}
                >
                    Create Space
                </button>
            ) : (
                <div className="h-screen flex justify-center items-center">
                    <Modal />
                </div>
            )}
        </div>
    );
};

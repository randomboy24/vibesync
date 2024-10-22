"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export function Appbar(){
    const session = useSession();
    const router = useRouter();
    return (
        <div className="flex flex-row justify-between items-center h-20 shadow-lg px-16">
            <div>
                <button onClick={() => router.push("/")}>
                    VibeSync
                </button>
            </div>
            <div>
                {session.data?.user && <button onClick={() => { signOut();}} className="border h-8 w-16 rounded-lg bg-blue-600 text-white text-extrabold">Logout</button>}
                {!session.data?.user && <button onClick={() => { signIn();}} className="border h-8 w-16 rounded-lg bg-blue-600 text-white text-extrabold">SignIn</button>}
            </div>
        </div>
    )
}
"use client"
import React, { createContext, ReactChild, ReactElement, ReactNode, useState } from "react";

interface userContextTypes {
    userId:string
    setUserId:React.Dispatch<React.SetStateAction<string>>
}

export const UserContext = createContext<userContextTypes | undefined>(undefined)

export const UserProvider = ({children}:{children:React.ReactNode}) => {
    const [userId,setUserId] = useState<string>("");
    return (
        <UserContext.Provider value={{userId,setUserId}}>
            {children}
        </UserContext.Provider>
    )
}

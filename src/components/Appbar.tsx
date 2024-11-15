'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Music, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AppBar() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement
    if (isDarkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleDarkMode:any = () => {
    setIsDarkMode(!isDarkMode)    
  }

  const session = useSession();
  const router = useRouter();
  // console.log(session.data)

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b shadow-white dark:shadow-black shadow-lg dark:bg-gray-900 backdrop-blur-md transition-colors duration-300 sticky top-0 z-50">
      <Link className="flex items-center justify-center group" href="/">
        <Music className="h-8 w-8 text-purple-600 dark:text-purple-400 transition-transform duration-300 group-hover:rotate-12" />
        <span className="ml-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 transition-all duration-300 group-hover:tracking-wider">VibeSync</span>
      </Link>
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => {}} className="transition-all duration-300 hover:scale-105 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-400 dark:hover:text-gray-900 md:visible collapse">
          Create Space
        </Button>
        {!session.data?.user?
        <Button className="transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white dark:from-purple-500 dark:via-pink-500 dark:to-blue-500 dark:hover:from-purple-600 dark:hover:via-pink-600 dark:hover:to-blue-600 animate-shimmer" onClick={() => {
            signIn();
        }}>Sign In</Button>
        :
        <Button className="transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white dark:from-purple-500 dark:via-pink-500 dark:to-blue-500 dark:hover:from-purple-600 dark:hover:via-pink-600 dark:hover:to-blue-600 animate-shimmer" onClick={() => {
            localStorage.setItem("randomasstoken",JSON.stringify(session.data.user))
            signOut();
        }}>Logout</Button>

        }
        <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="transition-colors duration-300">
          {isDarkMode ? <Sun className="h-5 w-5 text-yellow-400 animate-spin-slow" /> : <Moon className="h-5 w-5 text-purple-600 animate-pulse" />}
        </Button>
      </div>
    </header>
  )
}
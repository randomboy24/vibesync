'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Users, Zap, Star, Headphones, Mic2, Volume2, Play, SkipForward, Heart, Github, Twitter, Instagram } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export function Landing() {
  const [isCreateSpaceOpen, setIsCreateSpaceOpen] = useState(false)
  const [spaceName, setSpaceName] = useState('')
  const session = useSession();
  const router = useRouter();
  

  const handleCreateSpace = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Creating space:', spaceName)
    setIsCreateSpaceOpen(false)
    setSpaceName('')
    console.log(spaceName)
  }

  return (
    <div className=" flex flex-col min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 transition-colors duration-300">
      {/* Space for AppBar */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 px-4 md:px-6 overflow-hidden relative">
          <div className="container mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 animate-gradient-x">
                Sync Your Vibe with Your Fans
              </h1>
              <p className="mx-auto lg:mx-0 max-w-[700px] text-gray-700 md:text-xl dark:text-gray-300 animate-fade-in">
                Create interactive music spaces where your fans choose the beat. Connect, engage, and amplify your music experience.
              </p>
              <div className="flex justify-center lg:justify-start space-x-4">
                <Button onClick={() => setIsCreateSpaceOpen(true)} size="lg" className="transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white dark:from-purple-500 dark:via-pink-500 dark:to-blue-500 dark:hover:from-purple-600 dark:hover:via-pink-600 dark:hover:to-blue-600 animate-float">
                  Create Your Space
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="aspect-square bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 rounded-3xl blur-2xl absolute inset-0 transform rotate-3 animate-pulse"></div>
              <div className="relative z-10 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-4 transform -rotate-3 transition-all duration-300 hover:rotate-0 hover:scale-105 group">
                <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-purple-900 dark:via-pink-900 dark:to-blue-900 rounded-2xl p-4 transition-all duration-300 group-hover:from-purple-200 group-hover:via-pink-200 group-hover:to-blue-200 dark:group-hover:from-purple-800 dark:group-hover:via-pink-800 dark:group-hover:to-blue-800">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">Now Playing</h3>
                    <Button variant="ghost" size="icon" className="group">
                      <Heart className="h-5 w-5 text-pink-600 dark:text-pink-400 transition-transform duration-300 group-hover:scale-125" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <Image
                      src="/placeholder.svg?height=80&width=80"
                      alt="Album cover"
                      width={80}
                      height={80}
                      className="rounded-lg transition-transform duration-300 group-hover:scale-110"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">Synth Waves</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">ElectroVibe</p>
                    </div>
                  </div>
                  <div className="flex justify-center space-x-4 mb-4">
                    <Button variant="ghost" size="icon" className="group">
                      <Play className="h-6 w-6 text-purple-600 dark:text-purple-400 transition-transform duration-300 group-hover:scale-125" />
                    </Button>
                    <Button variant="ghost" size="icon" className="group">
                      <SkipForward className="h-6 w-6 text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:scale-125" />
                    </Button>
                  </div>
                  <div className="bg-purple-200 dark:bg-purple-700 h-1 rounded-full overflow-hidden">
                    <div className="bg-purple-600 dark:bg-purple-400 w-1/3 h-full rounded-full animate-progress"></div>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Up Next</h3>
                  <ul className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <li key={i} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{i}.</span>
                        <Image
                          src={`/placeholder.svg?height=40&width=40&text=Track${i}`}
                          alt={`Track ${i}`}
                          width={40}
                          height={40}
                          className="rounded transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-gray-800 dark:text-white">Track Title {i}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Artist {i}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="group">
                          <Play className="h-4 w-4 text-purple-600 dark:text-purple-400 transition-transform duration-300 group-hover:scale-125" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-1/2 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute -bottom-1/2 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-blue-600/20 via-pink-600/20 to-purple-600/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-100 dark:bg-gray-800 transition-colors duration-300 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 animate-gradient-x">Why VibeSync?</h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group">
                <Users className="h-12 w-12 text-purple-600 dark:text-purple-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Fan-Driven Playlists</h3>
                <p className="text-gray-600 dark:text-gray-300">Let your fans vote on the next track, creating a truly interactive experience.</p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group">
                <Zap className="h-12 w-12 text-pink-600 dark:text-pink-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Real-time Syncing</h3>
                <p className="text-gray-600 dark:text-gray-300">High-quality, low-latency streaming for seamless music synchronization.</p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group">
                <Star className="h-12 w-12 text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Creator Dashboard</h3>
                <p className="text-gray-600 dark:text-gray-300">Powerful analytics and engagement tools to grow and understand your audience.</p>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/4 w-1/3 h-1/3 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-gradient-to-tl from-blue-600/10 via-pink-600/10 to-purple-600/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex-1 space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 animate-gradient-x">
                  Ready to Sync Your Vibe?
                </h2>
                <p className="max-w-[600px] text-gray-700 md:text-lg dark:text-gray-300">
                  Join the revolution of interactive music experiences. Create your space and let the music flow.
                </p>
                <Button onClick={() => setIsCreateSpaceOpen(true)} size="lg" className="transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white dark:from-purple-500 dark:via-pink-500 dark:to-blue-500 dark:hover:from-purple-600 dark:hover:via-pink-600 dark:hover:to-blue-600 animate-float">
                  Start Creating Now
                </Button>
              </div>
              <div className="flex-1 relative">
                <div className="aspect-square bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 rounded-full blur-2xl absolute inset-0 animate-pulse"></div>
                <div className="relative z-10 grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg transform rotate-3 transition-all duration-300 hover:rotate-0 hover:scale-105 group">
                    <Headphones className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                    <h3 className="font-bold text-gray-800 dark:text-white">Listen Together</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Sync music with friends in real-time</p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg transform -rotate-3 transition-all duration-300 hover:rotate-0 hover:scale-105 group">
                    <Mic2 className="h-8 w-8 text-pink-600 dark:text-pink-400 mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                    <h3 className="font-bold text-gray-800 dark:text-white">Live Sessions</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Host live music events for your fans</p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg transform -rotate-3 transition-all duration-300 hover:rotate-0 hover:scale-105 group col-span-2">
                    <Volume2 className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                    <h3 className="font-bold text-gray-800 dark:text-white">Personalized Sound</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Customize your audio experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 px-4 md:px-6 border-t bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-colors duration-300">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">© 2024 VibeSync. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
            <Link className="dark:text-white text-sm hover:underline underline-offset-4 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300" href="https://github.com/randomboy24" aria-label="GitHub">
              <Github className="h-5 w-5 hover:scale-125" />
            </Link>
            <Link className="dark:text-white text-sm hover:underline underline-offset-4 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300" href="https://x.com/AlexByers737394" aria-label="Twitter">
              <Twitter className="h-5 w-5 hover:scale-125" />
            </Link>
            <Link className="dark:text-white text-sm hover:underline underline-offset-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300" href="https://www.instagram.com/rathorjatinsingh" aria-label="LinkedIn">
              <Instagram className="h-5 w-5 hover:scale-125" />
            </Link>
          </nav>
        </div>
      </footer>

      <Dialog open={isCreateSpaceOpen} onOpenChange={setIsCreateSpaceOpen}>
        <DialogContent className='border border-white dark:bg-[#111] bg-white dark:text-white'>
          <DialogHeader>
            <DialogTitle>Create a New Space</DialogTitle>
            <DialogDescription>
              Give your space a name or leave it blank for a randomly generated one.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateSpace}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="spaceName" className="text-right">
                  Space Name
                </label>
                <Input
                  id="spaceName"
                  value={spaceName}
                  onChange={(e) => setSpaceName(e.target.value)}
                  className="col-span-3 dark:placeholder-gray-500"  
                  placeholder="My Awesome Space"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={async () => {
	      	const user = session.data?.userId;
		if(!user){
			alert("you are not logged in");
			return;
		}
                const response = await axios.post("http://localhost:3000/api/space",{
                  userId:session.data?.userId,
                  name:spaceName
                })
                // console.log(response)
                router.push(`/${response.data.spaceId}`)

              }} type="submit">Create Space</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

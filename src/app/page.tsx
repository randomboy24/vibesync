"use client"
import { Landing } from "@/components/Landing";
import { Space } from "@/components/Space";
import { useSession } from "next-auth/react";
// import { Space } from "@/components/Space";


export default function Home() {
  const session = useSession();
  console.log("user :- "+session.data?.user)
  console.log("userId :-"+session.data?.userId)
  return (
    <main>
      <Landing/>
    </main>
  )
}

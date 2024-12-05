import { Landing } from "@/components/Landing";
import { Space } from "@/components/Space";
import { useSession } from "next-auth/react";
// import { Space } from "@/components/Space";


export default function Home() {
  return (
    <main>
      <Landing/>
    </main>
  )
}

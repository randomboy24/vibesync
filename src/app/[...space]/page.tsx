import { BackgroundBeamsWithCollision } from "@/components/check"
import { Dashboard } from "@/components/Dashboard"


export default function Space ({params : { 
    space
}}:{params:{
    space:string
}}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 transition-colors duration-300]">
            {/* <div>
                this  is a space route {space}
            </div> */}
            {/* <BackgroundBeamsWithCollision className="h-[100vh] w-[100vw]"> */}
                <Dashboard spaceId={space[0]}/>
            {/* </BackgroundBeamsWithCollision> */}
                
        </div>
    )
}





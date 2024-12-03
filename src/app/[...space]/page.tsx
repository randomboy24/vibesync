import { BackgroundBeamsWithCollision } from "@/components/check"
import { Dashboard } from "@/components/Dashboard"


export default function Space ({params : { 
    space
}}:{params:{
    space:string
}}) {
    return (
        <div className="bg-[#000000]">
            {/* <div>
                this  is a space route {space}
            </div> */}
            {/* <BackgroundBeamsWithCollision className="h-[100vh] w-[100vw]"> */}
                <Dashboard spaceId={space[0]}/>
            {/* </BackgroundBeamsWithCollision> */}
                
        </div>
    )
}





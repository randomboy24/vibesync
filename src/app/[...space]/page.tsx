import { Dashboard } from "@/components/Dashboard"


export default function Space ({params : { 
    space
}}:{params:{
    space:string
}}) {
    return (
        <div>
            <div>
                this  is a space route {space}
            </div>
            <Dashboard spaceId={space[0]}/>
        </div>
    )
}





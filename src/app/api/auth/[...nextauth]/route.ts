import NextAuth from "next-auth";
import prisma from '../../../db';
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks : {
        async signIn({user:{
            name,
            email
        }}){
            console.log(name,email)
            try{
                const exsistingUser = await prisma.user.findFirst({
                    where:{
                        email:email as string
                    }   
                })
                if(exsistingUser){
                    console.log(exsistingUser)
                    console.log("user already exists")
                    return true;
                }
                // console.log(process.env.DATABASE_URL)
                try{    
                    const newUser = await prisma.user.create({
                        data:{
                            email:email as string,
                            name:name as string
                        }
                    })
                    console.log(newUser)
                    return true
                }catch(err){
                    console.log(err)
                    return false
                }
            }catch(e){
                console.log("-----------------------------------------------------------------------\n"+e)
                return false
            }
            return false;
        },
        async jwt({token,user}){
            if(user){
                console.log("email :- "+user.email)
                const dbUser = await prisma.user.findFirst({
                    where:{
                        email:user.email as string
                    }
                })
                if(dbUser){
                    token.userId = dbUser.userId
                }
                console.log(token)
                return token
            }
            return token
        },
        async session({session,token}){
            if(token?.userId){
                session.userId = token.userId as string 
            }
            console.log(session)
            return session
        }
        
    }
})

export { handler as GET, handler as POST };          
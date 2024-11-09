import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";
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
            try{
                const user = await prisma.user.findFirst({
                    where:{
                        email:email as string
                    }
                })
                if(user){
                    console.log("user already exists")
                    return true;
                }
                // console.log(process.env.DATABASE_URL)
                const res = await prisma.user.create({
                    data:{
                        email:email as string,
                        name:name as string
                    }
                })
                console.log(res)
            }catch(e){
                console.log("-----------------------------------------------------------------------\n"+e)
                return false
            }
            return true;
        },
        
    }
})

export { handler as GET, handler as POST };          
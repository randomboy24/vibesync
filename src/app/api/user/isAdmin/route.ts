import prisma from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    console.log("hey there")
    try {
        // Extract query parameters
        const url = new URL(req.url);
        const spaceId = url.searchParams.get("spaceId");
        const userId = url.searchParams.get("userId");

        // Validate query parameters
        if (!spaceId || !userId) {
            return NextResponse.json({ error: "Missing query parameters" }, { status: 400 });
        }

        console.log("spaceId :-", spaceId);
        console.log("userId :-", userId);

        // Query database
        const user = await prisma.spaces.findFirst({
            where: {
                userId: userId,
                spacesId: spaceId,
            },
        });


        console.log("user :-", user);

        // Respond based on query result
        return NextResponse.json({ isAdmin: !!user });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};

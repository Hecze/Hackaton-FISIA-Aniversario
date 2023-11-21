import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET() {
    try {
        const result = await conn.query("SELECT * FROM planestudios");
        return NextResponse.json({ message: "GET planes de estudios", result });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 500});
        
    }

}

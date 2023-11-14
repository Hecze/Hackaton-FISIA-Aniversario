import { NextResponse } from "next/server";
import  {conn} from "@/libs/mysql";
 
export async function GET() {
    try {
        const result = await conn.query("SELECT NOW()");
        return NextResponse.json({message: result[0]["NOW()"]})
    } catch (error) {
        console.error("Error during query:", error);
        return NextResponse.json({ message: "Error during query" });
    }
}

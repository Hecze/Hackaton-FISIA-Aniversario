import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET() {
    try {
        const result = await conn.query("SELECT * FROM grupo");
        return NextResponse.json({ message: "GET grupos", result });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }), { status: 500};
        
    }

}

export async function POST(request) {
  try {
    const { id_curso } = await request.json();

    const result = await conn.query("INSERT INTO grupo SET ?", {
      id_curso,
    });

    return NextResponse.json({ message: "POST grupos", result });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }), { status: 500};
  }
}

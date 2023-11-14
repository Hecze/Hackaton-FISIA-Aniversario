import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET() {
    try {
        const result = await conn.query("SELECT * FROM curso");
        return NextResponse.json({ message: "GET grupos", result });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }), { status: 500};
        
    }

}

export async function POST(request) {
  try {
    const {id_plan_estudios, nombre_curso, horas_teoria, horas_practica, horas_laboratorio } = await request.json();

    const result = await conn.query("INSERT INTO Curso SET ?", {
      id_plan_estudios, nombre_curso, horas_teoria, horas_practica, horas_laboratorio
    });

    return NextResponse.json({ message: "POST grupos", result });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }), { status: 500};
  }
}

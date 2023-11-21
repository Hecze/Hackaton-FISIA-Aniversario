import { NextResponse } from "next/server";
import { connect } from "@/libs/mysql";

export async function GET() {
  try {
    const connection = await connect();
    const [result] = await connection.execute("SELECT * FROM Curso");
    connection.end();

    return NextResponse.json({ message: "GET Cursos", result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const {
      id_plan_estudios,
      nombre_curso,
      horas_teoria,
      horas_practica,
      horas_laboratorio,
    } = await request.json();

    const connection = await connect();
    const [result] = await connection.execute(
      "INSERT INTO Curso SET ?",
      {
        id_plan_estudios,
        nombre_curso,
        horas_teoria,
        horas_practica,
        horas_laboratorio,
      }
    );
    connection.end();

    return NextResponse.json({ message: "POST grupos", result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

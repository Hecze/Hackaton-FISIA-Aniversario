import { NextResponse } from "next/server";
import { connect } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const connection = await connect();
    const [result] = await connection.execute("SELECT * FROM Curso WHERE id_curso = ?", [params.id]);
    connection.end();

    if (result.length === 0) {
      return NextResponse.json({ message: "No se encontró el grupo" }, { status: 404 });
    }

    return NextResponse.json(result[0]);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

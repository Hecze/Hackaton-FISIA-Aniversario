import { NextResponse } from "next/server";
import { connect } from "@/libs/mysql";

export async function GET() {
  try {
    const connection = await connect();
    const [rows] = await connection.execute("SELECT * FROM Grupo");
    connection.end();

    return NextResponse.json({ message: "GET Grupos", result: rows });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { id_curso, gru_iNumero } = await request.json();

    const connection = await connect();
    const [result] = await connection.execute(
      "INSERT INTO Grupo (id_curso, gru_iNumero) VALUES (?, ?)",
      [id_curso, gru_iNumero]
    );
    connection.end();

    return NextResponse.json({ message: "POST Grupos", result });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

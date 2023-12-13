import { NextResponse } from "next/server";
import { connect } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const connection = await connect();
    const [result] = await connection.execute("SELECT * FROM Grupo WHERE id_grupo = ?", [params.id]);
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

export async function DELETE(request, { params }) {
  try {
    const connection = await connect();
    const [result] = await connection.execute("DELETE FROM Grupo WHERE id_grupo = ?", [params.id]);
    connection.end();

    return NextResponse.json({ message: "Seccion eliminada" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const {gru_iNumero } = await request.json();

    const connection = await connect();
    const [result] = await connection.execute(
      "UPDATE Grupo SET gru_iNumero = ? WHERE id_grupo = ?",
      [gru_iNumero, params.id]
    );
    connection.end();

    return NextResponse.json({ message: "Grupo actualizado", result });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

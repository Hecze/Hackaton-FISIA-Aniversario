import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const result = await conn.query("SELECT * FROM grupo WHERE id_grupo = ?", [params.id]);

    if (result.length === 0) {
      return NextResponse.json(
        { message: "No se encontró el grupo" },
        { status: 404 }
      );
    }

  return NextResponse.json(result[0]);

  } catch (error) {}
}


export async function DELETE(request, { params }) {
  try {
    const result = await conn.query("DELETE FROM grupo WHERE id_grupo = ?", [params.id]);
    return NextResponse.json({message: "Seccion eliminada"});
  } catch (error) {}
}


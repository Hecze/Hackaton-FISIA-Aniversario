import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const result = await conn.query("SELECT * FROM product WHERE id = ?", [
      params.id,
    ]);

    if (result.length === 0) {
      return NextResponse.json(
        { message: "No se encontró el producto" },
        { status: 404 }
      );
    }

  return NextResponse.json(result[0]);

  } catch (error) {}
}

export function POST(request) {
  return NextResponse.json({ message: "POST products/[id]" });
}

export function PUT() {
  return NextResponse.json({ message: "PUT products/[id]" });
}

export function DELETE() {
  return NextResponse.json({ message: "DELETE products/[id]" });
}

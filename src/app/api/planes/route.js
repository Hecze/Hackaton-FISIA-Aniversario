import { NextResponse } from "next/server";
import { connect } from "@/libs/mysql";

export async function GET() {
  try {
    const connection = await connect();
    const [result] = await connection.execute("SELECT * FROM PlanEstudios");
    connection.end();

    return NextResponse.json({ message: "GET planes de estudios", result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET() {
    try {
        const result = await conn.query("SELECT * FROM product");
        return NextResponse.json({ message: "GET products", result });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }), { status: 500};
        
    }

}

export async function POST(request) {
  try {
    const { name, description, price } = await request.json();

    const result = await conn.query("INSERT INTO product SET ?", {
      name,
      description,
      price,
    });

    return NextResponse.json({ message: "POST product", result });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }), { status: 500};
  }
}

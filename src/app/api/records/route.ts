// app/api/records/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { title, amount, type } = await req.json();

    if (!title || !amount || !type) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const record = await prisma.record.create({
      data: {
        title,
        amount: parseFloat(amount),
        type,
      },
    });

    return NextResponse.json(record, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    cookies().delete("authenticatorStatus");
    return NextResponse.json("Success");
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

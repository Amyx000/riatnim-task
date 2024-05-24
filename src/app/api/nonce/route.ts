import { NextResponse } from "next/server";
import { generateNonce } from "siwe";

export async function GET() {
  try {
    return NextResponse.json(generateNonce());
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

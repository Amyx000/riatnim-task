import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const value = cookies().get("authenticatorStatus")?.value;
    return NextResponse.json({ auth: value === "authenticated" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}

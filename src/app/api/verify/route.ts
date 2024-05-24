import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { SiweMessage } from "siwe";

export async function POST(req: NextRequest) {
  try {
    const { message, signature } = await req.json();
    const result = await new SiweMessage(message).verify({ signature });
    if (result.success) {
      cookies().set("authenticatorStatus", "authenticated", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 1800,
      });
    }
    return NextResponse.json({ verify: result.success });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

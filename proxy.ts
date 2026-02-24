import { NextRequest, NextResponse } from "next/server";

export async function proxy(req:NextRequest) {
    
    const res = NextResponse.next();

  res.headers.set(
    "Access-Control-Allow-Origin",
    "http://localhost:5173"
  );
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Authorization, Content-Type"
  );
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  // Handle preflight
  if (req.method === "OPTIONS") {
    return new NextResponse(null, { status: 200, headers: res.headers });
  }

  return res;
    
}
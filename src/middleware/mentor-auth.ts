import { NextRequest, NextResponse } from "next/server";

interface JwtPayload {
  id: string;
  email: string;
  role: string;
  exp?: number;
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

function base64UrlToUint8Array(base64Url: string) {
  const base64 = base64Url
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(base64Url.length + ((4 - (base64Url.length % 4)) % 4), "=");
  const raw = atob(base64);
  const bytes = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) {
    bytes[i] = raw.charCodeAt(i);
  }
  return bytes;
}

function decodeBase64Url(base64Url: string) {
  const base64 = base64Url
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(base64Url.length + ((4 - (base64Url.length % 4)) % 4), "=");
  const raw = atob(base64);
  const bytes = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) {
    bytes[i] = raw.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

async function verifyJwt(token: string) {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid token format");
  }

  const [header, payload, signature] = parts;
  const payloadJson = decodeBase64Url(payload);
  const decoded = JSON.parse(payloadJson) as JwtPayload;

  if (!decoded || typeof decoded !== "object") {
    throw new Error("Invalid token payload");
  }

  if (decoded.exp && Date.now() >= decoded.exp * 1000) {
    throw new Error("Token expired");
  }

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(JWT_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );

  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    base64UrlToUint8Array(signature),
    encoder.encode(`${header}.${payload}`),
  );

  if (!valid) {
    throw new Error("Invalid token signature");
  }

  return decoded;
}

export async function mentorAuthMiddleware(req: NextRequest) {
  try {
    const token = req.cookies.get("mentor_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/pages/mentor-login", req.url));
    }

    const decoded = await verifyJwt(token);

    if (decoded.role !== "mentor") {
      return NextResponse.redirect(new URL("/pages/mentor-login", req.url));
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-mentor-id", decoded.id);
    requestHeaders.set("x-mentor-email", decoded.email);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (_error) {
    return NextResponse.redirect(new URL("/pages/mentor-login", req.url));
  }
}

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import dbConnect from "@/lib/dbConnect";
import Mentor from "@/models/Mentor";
import logger from "@/lib/logger";

// Define schema for validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    const body = await request.json();
    logger.info(
      `POST /api/mentor/login - Request received with payload: ${JSON.stringify(body)}`,
    );
    logger.info("Connecting to database");
    await dbConnect();
    logger.info("Database connected");
    // Parse request body

    // Validate request body
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      logger.warn("Mentor login validation failed", {
        issues: result.error.issues,
      });
      return NextResponse.json(
        { message: "Invalid input data", errors: result.error.issues },
        { status: 400 },
      );
    }

    const { email, password } = result.data;
    logger.info(
      `POST /api/mentor/login - Mentor login attempt with email: ${email}`,
    );
    // Find mentor by email
    const mentor = await Mentor.findOne({ email });

    // If mentor not found or not active
    if (!mentor) {
      logger.warn(
        "Mentor login failed: invalid credentials or inactive account",
        { email },
      );
      return NextResponse.json(
        { message: "Invalid credentials or account not active" },
        { status: 401 },
      );
    }

    if (password !== mentor.password) {
      logger.warn("Mentor login failed: password mismatch", { email });
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    logger.info("Mentor login successful", { email, mentorId: mentor._id });

    // Generate JWT token
    const token = jwt.sign(
      {
        id: mentor._id.toString(),
        email: mentor.email,
        role: "mentor",
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" },
    );

    // Create the response
    const response = NextResponse.json({
      message: "Login successful",
      mentor: {
        id: mentor._id.toString(),
        name: mentor.name,
        email: mentor.email,
      },
    });

    // Set HTTP-only cookie with the token
    response.cookies.set({
      name: "mentor_token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    logger.error("Mentor login error", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: 500 },
    );
  }
}

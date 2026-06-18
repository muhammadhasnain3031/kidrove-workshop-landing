import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, phone } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    console.log("New Enquiry:", {
      name,
      email,
      phone,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}
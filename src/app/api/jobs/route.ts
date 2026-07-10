import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/jobs — Fetch all jobs with optional search & filters
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    const location = searchParams.get("location") || "";
    const category = searchParams.get("category") || "";
    const type = searchParams.get("type") || "";

    // Build the filter conditions
    const where: Record<string, unknown> = {
      status: "OPEN",
    };

    // Search by keyword (matches title, company, or description)
    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { company: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ];
    }

    // Filter by location
    if (location) {
      where.location = { contains: location, mode: "insensitive" };
    }

    // Filter by category
    if (category) {
      where.category = { contains: category, mode: "insensitive" };
    }

    // Filter by job type
    if (type) {
      where.type = type;
    }

    const jobs = await prisma.job.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        employer: {
          select: { name: true, avatar: true },
        },
      },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

// POST /api/jobs — Create a new job (employer only)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Must be logged in
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Must be an employer
    if (session.user.role !== "EMPLOYER") {
      return NextResponse.json(
        { error: "Only employers can post jobs" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { title, company, location, type, category, salary, description, requirements } = body;

    // Validate required fields
    if (!title || !company || !location || !type || !category || !description || !requirements) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Create the job
    const job = await prisma.job.create({
      data: {
        title,
        company,
        location,
        type,
        category,
        salary: salary || null,
        description,
        requirements,
        employerId: session.user.id,
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}

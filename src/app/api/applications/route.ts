import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (session.user.role !== "SEEKER") {
      return NextResponse.json(
        { error: "Only job seekers can apply" },
        { status: 403 }
      );
    }

    const { jobId, coverLetter } = await req.json();

    if (!jobId) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    const existingApplication = await prisma.application.findUnique({
      where: {
        jobId_seekerId: {
          jobId,
          seekerId: session.user.id,
        },
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied to this job" },
        { status: 409 }
      );
    }

    const application = await prisma.application.create({
      data: {
        jobId,
        seekerId: session.user.id,
        coverLetter: coverLetter || null,
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error("Application error:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (session.user.role === "SEEKER") {
      const applications = await prisma.application.findMany({
        where: { seekerId: session.user.id },
        include: {
          job: {
            select: {
              id: true,
              title: true,
              company: true,
              location: true,
              type: true,
              category: true,
            },
          },
        },
        orderBy: { appliedAt: "desc" },
      });
      return NextResponse.json(applications);
    }

    if (session.user.role === "EMPLOYER") {
      const applications = await prisma.application.findMany({
        where: {
          job: { employerId: session.user.id },
        },
        include: {
          job: {
            select: { id: true, title: true, company: true },
          },
          seeker: {
            select: { id: true, name: true, email: true },
          },
        },
        orderBy: { appliedAt: "desc" },
      });
      return NextResponse.json(applications);
    }

    return NextResponse.json([]);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

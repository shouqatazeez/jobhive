import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// PATCH /api/applications/[id] — Update application status (employer only)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "EMPLOYER") {
      return NextResponse.json(
        { error: "Only employers can update application status" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const { status } = await req.json();

    if (!status || !["PENDING", "REVIEWED", "ACCEPTED", "REJECTED"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be PENDING, REVIEWED, ACCEPTED, or REJECTED" },
        { status: 400 }
      );
    }

    // Verify the application belongs to a job posted by this employer
    const application = await prisma.application.findUnique({
      where: { id },
      include: { job: { select: { employerId: true } } },
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    if (application.job.employerId !== session.user.id) {
      return NextResponse.json(
        { error: "You can only update applications for your own jobs" },
        { status: 403 }
      );
    }

    const updated = await prisma.application.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 }
    );
  }
}

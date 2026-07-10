"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ListRowSkeleton } from "@/components/skeletons/job-card-skeleton";
import { Briefcase, Building2 } from "lucide-react";

interface Application {
  id: string;
  status: string;
  appliedAt: string;
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    category: string;
  };
}

function statusStyle(status: string) {
  const styles: Record<string, string> = {
    PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
    REVIEWED: "bg-blue-50 text-blue-700 border-blue-200",
    ACCEPTED: "bg-green-50 text-green-700 border-green-200",
    REJECTED: "bg-red-50 text-red-700 border-red-200",
  };
  return styles[status] || "bg-slate-50 text-slate-700 border-slate-200";
}

export default function ApplicationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status === "authenticated") {
      const fetchApps = async () => {
        try {
          const res = await fetch("/api/applications");
          const data = await res.json();
          setApplications(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Failed to fetch applications:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchApps();
    }
  }, [status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="px-6 py-8">
        <div className="mb-6 space-y-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-36" />
        </div>
        <Card className="border-slate-200">
          <ListRowSkeleton count={5} />
        </Card>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="px-6 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">My Applications</h1>
            <p className="text-sm text-slate-500 mt-1">
              {applications.length} application{applications.length !== 1 ? "s" : ""} submitted
            </p>
          </div>

          <Card className="border-slate-200">
            {applications.length === 0 ? (
              <div className="p-10 text-center">
                <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-base font-semibold text-slate-900">
                  No applications yet
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Start applying to jobs to track them here.
                </p>
                <Link
                  href="/jobs"
                  className="inline-flex items-center gap-1.5 mt-4 bg-indigo-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Browse Jobs
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="p-5 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-indigo-50 shrink-0">
                        <Building2 className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="min-w-0">
                        <Link
                          href={`/jobs/${app.job.id}`}
                          className="text-sm font-semibold text-slate-900 hover:text-indigo-600 transition-colors truncate block"
                        >
                          {app.job.title}
                        </Link>
                        <p className="text-xs text-slate-500 truncate">
                          {app.job.company} · {app.job.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 shrink-0">
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${statusStyle(app.status)}`}
                      >
                        {app.status}
                      </Badge>
                      <span className="text-[10px] text-slate-400">
                        {new Date(app.appliedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
    </div>
  );
}

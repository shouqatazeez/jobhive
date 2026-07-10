"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Plus,
  Building2,
  Loader2,
} from "lucide-react";

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

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  status: string;
  createdAt: string;
  _count?: { applications: number };
}

function formatStatus(status: string) {
  const styles: Record<string, string> = {
    PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
    REVIEWED: "bg-blue-50 text-blue-700 border-blue-200",
    ACCEPTED: "bg-green-50 text-green-700 border-green-200",
    REJECTED: "bg-red-50 text-red-700 border-red-200",
  };
  return styles[status] || "bg-slate-50 text-slate-700 border-slate-200";
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [employerJobs, setEmployerJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      if (session.user.role === "SEEKER") {
        fetchApplications();
      } else {
        fetchEmployerJobs();
      }
    }
  }, [status, session, router]);

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/applications");
      const data = await res.json();
      setApplications(data);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployerJobs = async () => {
    try {
      const res = await fetch("/api/employer/jobs");
      const data = await res.json();
      setEmployerJobs(data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <>
        <Navbar />
        <main className="flex-1 bg-slate-50">
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        </main>
      </>
    );
  }

  if (!session) return null;

  const isSeeker = session.user.role === "SEEKER";

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">
              Welcome back, {session.user.name}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {isSeeker
                ? "Track your job applications"
                : "Manage your job postings"}
            </p>
          </div>

          {isSeeker ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <Card className="p-4 border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50">
                      <FileText className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-slate-900">
                        {applications.length}
                      </p>
                      <p className="text-xs text-slate-500">Total Applied</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-yellow-50">
                      <Clock className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-slate-900">
                        {applications.filter((a) => a.status === "PENDING").length}
                      </p>
                      <p className="text-xs text-slate-500">Pending</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-50">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-slate-900">
                        {applications.filter((a) => a.status === "ACCEPTED").length}
                      </p>
                      <p className="text-xs text-slate-500">Accepted</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-50">
                      <XCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-slate-900">
                        {applications.filter((a) => a.status === "REJECTED").length}
                      </p>
                      <p className="text-xs text-slate-500">Rejected</p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="border-slate-200">
                <div className="p-5 flex items-center justify-between">
                  <h2 className="text-base font-semibold text-slate-900">
                    My Applications
                  </h2>
                  <Link
                    href="/jobs"
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Browse more jobs
                  </Link>
                </div>
                <Separator className="bg-slate-100" />
                {applications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-sm text-slate-500">
                      No applications yet. Start applying to jobs!
                    </p>
                    <Link
                      href="/jobs"
                      className="inline-flex items-center gap-1.5 mt-3 text-sm text-indigo-600 font-medium hover:text-indigo-700"
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
                          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 shrink-0">
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
                        <div className="flex items-center gap-3 shrink-0">
                          <Badge
                            variant="outline"
                            className={`text-[10px] ${formatStatus(app.status)}`}
                          >
                            {app.status}
                          </Badge>
                          <span className="text-[10px] text-slate-400 hidden sm:block">
                            {new Date(app.appliedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                <Card className="p-4 border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50">
                      <Briefcase className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-slate-900">
                        {employerJobs.length}
                      </p>
                      <p className="text-xs text-slate-500">Jobs Posted</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-50">
                      <Eye className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-slate-900">
                        {employerJobs.filter((j) => j.status === "OPEN").length}
                      </p>
                      <p className="text-xs text-slate-500">Active Jobs</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-50">
                      <FileText className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-slate-900">
                        {employerJobs.reduce(
                          (sum, j) => sum + (j._count?.applications || 0),
                          0
                        )}
                      </p>
                      <p className="text-xs text-slate-500">Total Applicants</p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="border-slate-200">
                <div className="p-5 flex items-center justify-between">
                  <h2 className="text-base font-semibold text-slate-900">
                    My Job Postings
                  </h2>
                  <Link
                    href="/dashboard/post-job"
                    className="inline-flex items-center gap-1.5 text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Post a Job
                  </Link>
                </div>
                <Separator className="bg-slate-100" />
                {employerJobs.length === 0 ? (
                  <div className="p-8 text-center">
                    <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-sm text-slate-500">
                      No jobs posted yet. Create your first job listing!
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {employerJobs.map((job) => (
                      <div
                        key={job.id}
                        className="p-5 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 shrink-0">
                            <Building2 className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">
                              {job.title}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                              {job.company} · {job.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <Badge
                            variant="outline"
                            className={`text-[10px] ${
                              job.status === "OPEN"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-slate-50 text-slate-600 border-slate-200"
                            }`}
                          >
                            {job.status}
                          </Badge>
                          <span className="text-[10px] text-slate-400 hidden sm:block">
                            {job._count?.applications || 0} applicants
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </>
          )}
        </div>
      </main>
    </>
  );
}

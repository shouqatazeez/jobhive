"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Building2,
  Users,
  ArrowLeft,
  Loader2,
  CheckCircle2,
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  logo: string | null;
  location: string;
  type: string;
  category: string;
  salary: string | null;
  description: string;
  requirements: string;
  status: string;
  featured: boolean;
  createdAt: string;
  employer: {
    name: string;
    avatar: string | null;
    email: string;
  };
  _count: {
    applications: number;
  };
}

function formatType(type: string) {
  return type.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${params.id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setJob(data);
      } catch {
        router.push("/jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [params.id, router]);

  const handleApply = async () => {
    if (!session) {
      router.push("/login");
      return;
    }

    setApplying(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: job?.id }),
      });

      if (res.ok) {
        setApplied(true);
      }
    } catch (error) {
      console.error("Failed to apply:", error);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
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

  if (!job) return null;

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to jobs
          </Link>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <Card className="p-6 sm:p-8 border-slate-200">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-50 shrink-0">
                    <Building2 className="w-7 h-7 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {job.title}
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                      {job.company} · {job.location}
                    </p>
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      <Badge
                        variant="outline"
                        className="text-xs border-indigo-200 text-indigo-600"
                      >
                        {formatType(job.type)}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs border-slate-200 text-slate-600"
                      >
                        {job.category}
                      </Badge>
                      {job.featured && (
                        <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 sm:p-8 border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                  Description
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>

                <Separator className="my-6 bg-slate-100" />

                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                  Requirements
                </h2>
                <ul className="flex flex-col gap-2">
                  {job.requirements.split(",").map((req, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-slate-600"
                    >
                      <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{req.trim()}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div className="flex flex-col gap-6">
              <Card className="p-6 border-slate-200">
                {session?.user?.role === "SEEKER" && !applied ? (
                  <button
                    onClick={handleApply}
                    disabled={applying}
                    className="w-full inline-flex items-center justify-center bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors text-sm cursor-pointer disabled:opacity-50"
                  >
                    {applying ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Apply Now"
                    )}
                  </button>
                ) : applied ? (
                  <div className="w-full inline-flex items-center justify-center gap-2 bg-green-50 text-green-700 font-semibold px-6 py-3 rounded-xl border border-green-200 text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    Application Submitted
                  </div>
                ) : !session ? (
                  <Link
                    href="/login"
                    className="w-full inline-flex items-center justify-center bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors text-sm"
                  >
                    Login to Apply
                  </Link>
                ) : null}

                <Separator className="my-5 bg-slate-100" />

                <h3 className="text-sm font-semibold text-slate-900 mb-4">
                  Job Overview
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-400">Job Type</p>
                      <p className="text-sm text-slate-700 font-medium">
                        {formatType(job.type)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-400">Location</p>
                      <p className="text-sm text-slate-700 font-medium">
                        {job.location}
                      </p>
                    </div>
                  </div>
                  {job.salary && (
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-400">Salary</p>
                        <p className="text-sm text-slate-700 font-medium">
                          {job.salary}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-400">Posted</p>
                      <p className="text-sm text-slate-700 font-medium">
                        {formatDate(job.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-400">Applicants</p>
                      <p className="text-sm text-slate-700 font-medium">
                        {job._count.applications} applied
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">
                  About the Company
                </h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50">
                    <Building2 className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {job.company}
                    </p>
                    <p className="text-xs text-slate-500">{job.location}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {job.company} is a leading company that values innovation,
                  collaboration, and growth. Join their team to make an impact.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

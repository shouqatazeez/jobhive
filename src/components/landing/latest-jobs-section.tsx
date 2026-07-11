"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  company: string;
  logo: string | null;
  location: string;
  type: string;
  category: string;
}

function formatType(type: string) {
  return type.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const categoryColors: Record<string, string> = {
  Technology: "bg-indigo-100 text-indigo-700",
  Engineering: "bg-blue-100 text-blue-700",
  Design: "bg-purple-100 text-purple-700",
  Marketing: "bg-orange-100 text-orange-700",
  Sales: "bg-green-100 text-green-700",
  Business: "bg-amber-100 text-amber-700",
  Finance: "bg-emerald-100 text-emerald-700",
  "Human Resource": "bg-teal-100 text-teal-700",
};

const typeColor = "border border-indigo-600 text-indigo-600 bg-transparent";

export default function LatestJobsSection() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch("/api/jobs?limit=8");
        const data = await res.json();
        setJobs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch latest jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  return (
    <section className="py-[72px] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl sm:text-[40px] font-bold text-slate-900 leading-tight">
            Latest <span className="text-indigo-600">jobs open</span>
          </h2>
          <Link
            href="/jobs"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Show all jobs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 py-5 border-b border-slate-100">
                <Skeleton className="w-12 h-12 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-2/5" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <p className="text-center text-slate-400 py-16">
            No jobs available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
            {jobs.map((job) => (
              <Link key={job.id} href={`/jobs/${job.id}`}>
                <div className="group flex items-start gap-4 py-5 border-b border-slate-100 hover:bg-slate-50/50 transition-colors cursor-pointer -mx-2 px-2">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 shrink-0 overflow-hidden p-2">
                    {job.logo ? (
                      <Image src={job.logo} alt={job.company} width={40} height={40} className="object-contain w-full h-full" />
                    ) : (
                      <Briefcase className="w-5 h-5 text-indigo-600" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-0.5">
                      {job.company} · {job.location}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap mt-2">
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${typeColor}`}>
                        {formatType(job.type)}
                      </span>
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${categoryColors[job.category] || "bg-slate-100 text-slate-700"}`}>
                        {job.category}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="flex sm:hidden justify-center mt-8">
          <Link
            href="/jobs"
            className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Show all jobs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

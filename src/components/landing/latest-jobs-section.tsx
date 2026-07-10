"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  category: string;
}

const cardColors = [
  "bg-green-500",
  "bg-slate-800",
  "bg-blue-500",
  "bg-teal-500",
  "bg-indigo-600",
  "bg-cyan-500",
  "bg-orange-500",
  "bg-purple-500",
];

function formatType(type: string) {
  return type.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

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
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-100"
              >
                <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-2/5" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
                <Skeleton className="h-5 w-16 rounded-md hidden sm:block" />
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <p className="text-center text-slate-400 py-16">
            No jobs available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {jobs.map((job, index) => (
              <Link key={job.id} href={`/jobs/${job.id}`}>
                <div className="group flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-indigo-200 hover:shadow-sm transition-all duration-200 cursor-pointer">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 ${
                      cardColors[index % cardColors.length]
                    }`}
                  >
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                      {job.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">
                      {job.company} · {job.location}
                    </p>
                  </div>

                  <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                    <Badge
                      variant="outline"
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 border-indigo-100"
                    >
                      {formatType(job.type)}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border-slate-100"
                    >
                      {job.category}
                    </Badge>
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

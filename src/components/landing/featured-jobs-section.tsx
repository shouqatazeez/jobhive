"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JobGridSkeleton } from "@/components/skeletons/job-card-skeleton";
import { ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  category: string;
  description: string;
}

const cardColors = [
  "bg-slate-900",
  "bg-green-500",
  "bg-indigo-600",
  "bg-cyan-500",
  "bg-blue-500",
  "bg-green-600",
  "bg-teal-500",
  "bg-sky-500",
];

function formatType(type: string) {
  return type.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function FeaturedJobsSection() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch("/api/jobs?featured=true&limit=8");
        const data = await res.json();
        setJobs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch featured jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Featured <span className="text-indigo-600">jobs</span>
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
          <JobGridSkeleton count={8} />
        ) : jobs.length === 0 ? (
          <p className="text-center text-slate-400 py-16">
            No featured jobs available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {jobs.map((job, index) => (
              <Link key={job.id} href={`/jobs/${job.id}`}>
                <Card className="group p-5 h-full border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all duration-200 cursor-pointer">
                  <div className="flex flex-col gap-4 h-full">
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex items-center justify-center w-11 h-11 rounded-xl ${cardColors[index % cardColors.length]
                          }`}
                      >
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                      <Badge
                        variant="outline"
                        className="text-xs font-medium border-indigo-200 text-indigo-600"
                      >
                        {formatType(job.type)}
                      </Badge>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {job.company} · {job.location}
                      </p>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {job.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-medium px-2.5 py-1 rounded-md border bg-indigo-50 text-indigo-600 border-indigo-100">
                        {job.category}
                      </span>
                    </div>
                  </div>
                </Card>
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

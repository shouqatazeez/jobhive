"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JobGridSkeleton } from "@/components/skeletons/job-card-skeleton";
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
  description: string;
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
    <section className="py-[72px] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl sm:text-[40px] font-bold text-slate-900 leading-tight">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobs.map((job) => (
              <Link key={job.id} href={`/jobs/${job.id}`}>
                <Card className="group p-6 h-full border border-slate-100 rounded-none bg-white hover:border-indigo-200 hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex flex-col gap-3 h-full">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-slate-100 overflow-hidden p-2">
                        {job.logo ? (
                          <Image src={job.logo} alt={job.company} width={40} height={40} className="object-contain w-full h-full" />
                        ) : (
                          <Briefcase className="w-5 h-5 text-indigo-600" />
                        )}
                      </div>
                      <Badge
                        variant="outline"
                        className="text-xs font-medium border-indigo-200 text-indigo-600 rounded-none px-3 py-1"
                      >
                        {formatType(job.type)}
                      </Badge>
                    </div>

                    <div className="flex-1 mt-2">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        {job.company} · {job.location}
                      </p>
                      <p className="text-sm text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                        {job.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap mt-2">
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-none ${
                          categoryColors[job.category] || "bg-slate-100 text-slate-700"
                        }`}
                      >
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

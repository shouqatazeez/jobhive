"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";

const latestJobs = [
  {
    id: "1",
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    tags: ["Full-Time", "Marketing", "Design"],
    color: "bg-green-500",
  },
  {
    id: "2",
    title: "Social Media Assistant",
    company: "Netlify",
    location: "Paris, France",
    tags: ["Full-Time", "Marketing", "Design"],
    color: "bg-slate-800",
  },
  {
    id: "3",
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, USA",
    tags: ["Full-Time", "Marketing", "Design"],
    color: "bg-blue-500",
  },
  {
    id: "4",
    title: "Brand Designer",
    company: "Maze",
    location: "San Francisco, USA",
    tags: ["Full-Time", "Marketing", "Design"],
    color: "bg-teal-500",
  },
  {
    id: "5",
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    tags: ["Full-Time", "Marketing", "Design"],
    color: "bg-indigo-600",
  },
  {
    id: "6",
    title: "Interactive Developer",
    company: "Udacity",
    location: "Hamburg, Germany",
    tags: ["Full-Time", "Marketing", "Design"],
    color: "bg-cyan-500",
  },
  {
    id: "7",
    title: "HR Manager",
    company: "Packer",
    location: "Lucern, Switzerland",
    tags: ["Full-Time", "Marketing", "Design"],
    color: "bg-orange-500",
  },
  {
    id: "8",
    title: "HR Manager",
    company: "Webflow",
    location: "Lucern, Switzerland",
    tags: ["Full-Time", "Marketing", "Design"],
    color: "bg-purple-500",
  },
];

const tagStyles: Record<string, string> = {
  "Full-Time": "bg-indigo-50 text-indigo-600 border-indigo-100",
  Marketing: "bg-orange-50 text-orange-600 border-orange-100",
  Design: "bg-green-50 text-green-600 border-green-100",
};

export default function LatestJobsSection() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Latest{" "}
            <span className="text-indigo-600">jobs open</span>
          </h2>
          <Link
            href="/jobs"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Show all jobs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Jobs List - 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {latestJobs.map((job) => (
            <Link key={job.id + job.company} href={`/jobs/${job.id}`}>
              <div className="group flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-indigo-200 hover:shadow-sm transition-all duration-200 cursor-pointer">
                {/* Company Logo */}
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 ${job.color}`}
                >
                  <Briefcase className="w-5 h-5 text-white" />
                </div>

                {/* Job Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {job.company} · {job.location}
                  </p>
                </div>

                {/* Tags */}
                <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                  {job.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
                        tagStyles[tag] || "bg-slate-50 text-slate-600 border-slate-100"
                      }`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile show all link */}
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

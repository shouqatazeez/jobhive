"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";

const featuredJobs = [
  {
    id: "1",
    title: "Email Marketing",
    company: "Revolut",
    location: "Madrid, Spain",
    type: "Full Time",
    description: "Revolut is looking for Email Marketing to help team ma...",
    tags: ["Marketing", "Design"],
    color: "bg-slate-900",
    textColor: "text-white",
  },
  {
    id: "2",
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, US",
    type: "Full Time",
    description: "Dropbox is looking for Brand Designer to help the team t...",
    tags: ["Design", "Business"],
    color: "bg-green-500",
    textColor: "text-white",
  },
  {
    id: "3",
    title: "Email Marketing",
    company: "Pitch",
    location: "Berlin, Germany",
    type: "Full Time",
    description: "Pitch is looking for Customer Manager to join marketing t...",
    tags: ["Marketing"],
    color: "bg-indigo-600",
    textColor: "text-white",
  },
  {
    id: "4",
    title: "Visual Designer",
    company: "Blinklist",
    location: "Granada, Spain",
    type: "Full Time",
    description: "Blinklist is looking for Visual Designer to help team desi...",
    tags: ["Design"],
    color: "bg-cyan-400",
    textColor: "text-white",
  },
  {
    id: "5",
    title: "Product Designer",
    company: "ClassPass",
    location: "Manchester, UK",
    type: "Full Time",
    description: "ClassPass is looking for Product Designer to help us...",
    tags: ["Marketing", "Design"],
    color: "bg-blue-500",
    textColor: "text-white",
  },
  {
    id: "6",
    title: "Lead Designer",
    company: "Canva",
    location: "Ontario, Canada",
    type: "Full Time",
    description: "Canva is looking for Lead Engineer to help develop n...",
    tags: ["Design", "Business"],
    color: "bg-green-600",
    textColor: "text-white",
  },
  {
    id: "7",
    title: "Brand Strategist",
    company: "GoDaddy",
    location: "Marseille, France",
    type: "Full Time",
    description: "GoDaddy is looking for Brand Strategist to join the team...",
    tags: ["Marketing"],
    color: "bg-teal-500",
    textColor: "text-white",
  },
  {
    id: "8",
    title: "Data Analyst",
    company: "Twitter",
    location: "San Diego, US",
    type: "Full Time",
    description: "Twitter is looking for Data Analyst to help team desi...",
    tags: ["Technology"],
    color: "bg-sky-400",
    textColor: "text-white",
  },
];

const tagColors: Record<string, string> = {
  Marketing: "bg-orange-50 text-orange-600 border-orange-100",
  Design: "bg-indigo-50 text-indigo-600 border-indigo-100",
  Business: "bg-green-50 text-green-600 border-green-100",
  Technology: "bg-cyan-50 text-cyan-600 border-cyan-100",
};

export default function FeaturedJobsSection() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Featured{" "}
            <span className="text-indigo-600">jobs</span>
          </h2>
          <Link
            href="/jobs"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Show all jobs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredJobs.map((job) => (
            <Link key={job.id} href={`/jobs/${job.id}`}>
              <Card className="group p-5 h-full border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all duration-200 cursor-pointer">
                <div className="flex flex-col gap-4 h-full">
                  {/* Header - Logo + Badge */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex items-center justify-center w-11 h-11 rounded-xl ${job.color}`}
                    >
                      <Briefcase className={`w-5 h-5 ${job.textColor}`} />
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs font-medium border-indigo-200 text-indigo-600"
                    >
                      {job.type}
                    </Badge>
                  </div>

                  {/* Job Info */}
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

                  {/* Tags */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[11px] font-medium px-2.5 py-1 rounded-md border ${
                          tagColors[tag] || "bg-slate-50 text-slate-600 border-slate-100"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
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

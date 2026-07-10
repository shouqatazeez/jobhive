"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Building2,
  Loader2,
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  category: string;
  salary: string | null;
  description: string;
  featured: boolean;
  createdAt: string;
}

const jobTypes = [
  { value: "", label: "All Types" },
  { value: "FULL_TIME", label: "Full Time" },
  { value: "PART_TIME", label: "Part Time" },
  { value: "REMOTE", label: "Remote" },
  { value: "CONTRACT", label: "Contract" },
  { value: "INTERNSHIP", label: "Internship" },
];

const categories = [
  "All Categories",
  "Technology",
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "Business",
  "Finance",
  "Human Resource",
];

function formatType(type: string) {
  return type.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function timeAgo(dateStr: string) {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return `${Math.floor(diff / 604800)}w ago`;
}

export default function JobsPage() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [selectedType, setSelectedType] = useState(searchParams.get("type") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");

  const fetchJobs = async (type?: string, category?: string) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (keyword) params.set("q", keyword);
    if (location) params.set("location", location);
    const t = type ?? selectedType;
    const c = category ?? selectedCategory;
    if (t) params.set("type", t);
    if (c && c !== "All Categories") params.set("category", c);

    try {
      const res = await fetch(`/api/jobs?${params.toString()}`);
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedType) params.set("type", selectedType);
      if (selectedCategory && selectedCategory !== "All Categories")
        params.set("category", selectedCategory);

      try {
        const res = await fetch(`/api/jobs?${params.toString()}`);
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, [selectedType, selectedCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Find your dream job
            </h1>
            <p className="text-slate-500 mt-1">
              Browse {jobs.length} jobs available
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-3 mb-8"
          >
            <div className="flex items-center gap-2 flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <Input
                type="text"
                placeholder="Job title or keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="border-0 shadow-none p-0 h-auto text-sm focus-visible:ring-0"
              />
            </div>
            <div className="flex items-center gap-2 flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <Input
                type="text"
                placeholder="City or location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border-0 shadow-none p-0 h-auto text-sm focus-visible:ring-0"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors text-sm cursor-pointer shrink-0"
            >
              Search
            </button>
          </form>

          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="w-full lg:w-56 shrink-0">
              <Card className="p-4 border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">
                  Job Type
                </h3>
                <div className="flex flex-col gap-1.5">
                  {jobTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setSelectedType(type.value)}
                      className={`text-left text-sm px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        selectedType === type.value
                          ? "bg-indigo-50 text-indigo-700 font-medium"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>

                <Separator className="my-4 bg-slate-100" />

                <h3 className="text-sm font-semibold text-slate-900 mb-3">
                  Category
                </h3>
                <div className="flex flex-col gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-left text-sm px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-indigo-50 text-indigo-700 font-medium"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </Card>
            </aside>

            <div className="flex-1">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                </div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-20">
                  <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900">
                    No jobs found
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Try adjusting your search or filters
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {jobs.map((job) => (
                    <Link key={job.id} href={`/jobs/${job.id}`}>
                      <Card className="group p-5 border-slate-200 hover:border-indigo-200 hover:shadow-sm transition-all cursor-pointer">
                        <div className="flex items-start gap-4">
                          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-indigo-50 shrink-0">
                            <Building2 className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <h3 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                  {job.title}
                                </h3>
                                <p className="text-xs text-slate-500 mt-0.5">
                                  {job.company} · {job.location}
                                </p>
                              </div>
                              {job.featured && (
                                <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-[10px] shrink-0">
                                  Featured
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 mt-2 line-clamp-1">
                              {job.description}
                            </p>
                            <div className="flex items-center gap-3 mt-3 flex-wrap">
                              <Badge
                                variant="outline"
                                className="text-[10px] border-indigo-200 text-indigo-600"
                              >
                                {formatType(job.type)}
                              </Badge>
                              <Badge
                                variant="outline"
                                className="text-[10px] border-slate-200 text-slate-600"
                              >
                                {job.category}
                              </Badge>
                              {job.salary && (
                                <span className="text-[10px] text-slate-400">
                                  {job.salary}
                                </span>
                              )}
                              <span className="text-[10px] text-slate-400 flex items-center gap-1 ml-auto">
                                <Clock className="w-3 h-3" />
                                {timeAgo(job.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

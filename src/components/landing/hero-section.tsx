"use client";

import { Search, MapPin, Briefcase, Building2, Users } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function HeroSection() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.set("q", keyword);
    if (location) params.set("location", location);
    router.push(`/jobs?${params.toString()}`);
  };

  const popularSearches = [
    "UI Designer",
    "UX Researcher",
    "Android Developer",
    "Admin",
  ];

  return (
    <section className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center py-20 lg:py-28">
          {/* Left Content */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-slate-900 leading-[1.15] tracking-tight">
                Discover
                <br />
                more than
                <br />
                <span className="text-indigo-600">5000+ Jobs</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-500 max-w-md leading-relaxed">
                Great platform for the job seeker that searching for new career
                heights and passionate about startups.
              </p>
            </div>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row items-stretch bg-white border border-slate-200 rounded-2xl shadow-lg shadow-slate-100 overflow-hidden"
            >
              <div className="flex items-center gap-3 flex-1 px-4 py-3.5">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <Input
                  type="text"
                  placeholder="Job title or keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="border-0 shadow-none p-0 h-auto text-sm focus-visible:ring-0 placeholder:text-slate-400"
                />
              </div>

              <div className="hidden sm:block w-px bg-slate-200 my-3" />

              <div className="flex items-center gap-3 flex-1 px-4 py-3.5 border-t sm:border-t-0 border-slate-100">
                <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
                <Input
                  type="text"
                  placeholder="City or location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border-0 shadow-none p-0 h-auto text-sm focus-visible:ring-0 placeholder:text-slate-400"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors shrink-0 cursor-pointer m-2 rounded-xl"
              >
                Search my Job
              </button>
            </form>

            {/* Popular Searches */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-slate-400">Popular:</span>
              {popularSearches.map((term) => (
                <Badge
                  key={term}
                  variant="secondary"
                  className="cursor-pointer hover:bg-indigo-50 hover:text-indigo-700 transition-colors text-slate-600 font-normal"
                  onClick={() => {
                    setKeyword(term);
                    router.push(`/jobs?q=${term}`);
                  }}
                >
                  {term}
                </Badge>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-5 w-full max-w-sm">
              <Card className="p-5 flex flex-col items-center gap-3 text-center border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50">
                  <Briefcase className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">5,000+</p>
                  <p className="text-xs text-slate-500 mt-0.5">Active Jobs</p>
                </div>
              </Card>

              <Card className="p-5 flex flex-col items-center gap-3 text-center border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-50">
                  <Building2 className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">200+</p>
                  <p className="text-xs text-slate-500 mt-0.5">Companies</p>
                </div>
              </Card>

              <Card className="p-5 flex flex-col items-center gap-3 text-center border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-50">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">10,000+</p>
                  <p className="text-xs text-slate-500 mt-0.5">Job Seekers</p>
                </div>
              </Card>

              <Card className="p-5 flex flex-col items-center gap-3 text-center border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-50">
                  <Search className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">8,000+</p>
                  <p className="text-xs text-slate-500 mt-0.5">Placements</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

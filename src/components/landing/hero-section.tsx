"use client";

import Image from "next/image";
import { Search, MapPin } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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
    "Android",
    "Admin",
  ];

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative min-h-[600px] lg:min-h-[700px] py-12 lg:py-0 flex items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6 z-10 max-w-xl">
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-bold text-slate-900 leading-[1.1] tracking-tight">
              Discover
              <br />
              more than
              <br />
              <span className="text-indigo-600 relative">
                5000+ Jobs
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 8C50 2 150 2 198 8"
                    stroke="#4F46E5"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-500 max-w-md leading-relaxed">
              Great platform for the job seeker that searching for new career
              heights and passionate about startups.
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row items-stretch bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden mt-2"
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
                  placeholder="Florence, Italy"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border-0 shadow-none p-0 h-auto text-sm focus-visible:ring-0 placeholder:text-slate-400"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors shrink-0 cursor-pointer"
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

          {/* Right Image */}
          <div className="hidden lg:block absolute right-0 -top-16 w-[50%] h-[calc(100%+64px)] overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src="/hero-img.png"
                alt="Professional looking for jobs"
                fill
                sizes="(min-width: 1024px) 50vw, 0vw"
                className="object-cover object-top scale-110"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Briefcase, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

interface Job {
  id: string;
  company: string;
  logo: string | null;
  location: string;
}

interface Company {
  name: string;
  logo: string | null;
  locations: string[];
  jobCount: number;
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch("/api/jobs");
        const jobs: Job[] = await res.json();

        const map = new Map<string, Company>();
        for (const job of jobs) {
          const existing = map.get(job.company);
          if (existing) {
            existing.jobCount += 1;
            if (!existing.locations.includes(job.location)) {
              existing.locations.push(job.location);
            }
          } else {
            map.set(job.company, {
              name: job.company,
              logo: job.logo,
              locations: [job.location],
              jobCount: 1,
            });
          }
        }
        setCompanies(Array.from(map.values()).sort((a, b) => b.jobCount - a.jobCount));
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Browse Companies
            </h1>
            <p className="text-slate-500 mt-1">
              Discover companies hiring on JobHive
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-3 mb-8 max-w-md">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <Input
              type="text"
              placeholder="Search companies"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-0 shadow-none p-0 h-auto text-sm focus-visible:ring-0"
            />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="p-6 border-slate-200">
                  <div className="flex items-start gap-4">
                    <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/5" />
                      <Skeleton className="h-3 w-2/5" />
                      <Skeleton className="h-5 w-28 rounded-md mt-3" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-sm text-slate-500">No companies found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((company) => (
                <Link
                  key={company.name}
                  href={`/jobs?q=${encodeURIComponent(company.name)}`}
                >
                  <Card className="group p-6 border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer h-full">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0 bg-slate-100 overflow-hidden p-2">
                        {company.logo ? (
                          <Image src={company.logo} alt={company.name} width={48} height={48} className="object-contain w-full h-full" />
                        ) : (
                          <Building2 className="w-6 h-6 text-indigo-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                          {company.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{company.locations[0]}</span>
                        </p>
                        <Badge
                          variant="outline"
                          className="mt-3 text-[10px] border-indigo-200 text-indigo-600"
                        >
                          <Briefcase className="w-3 h-3 mr-1" />
                          {company.jobCount} open position{company.jobCount !== 1 ? "s" : ""}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

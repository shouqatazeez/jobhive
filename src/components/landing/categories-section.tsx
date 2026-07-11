"use client";

import { Card } from "@/components/ui/card";
import {
  Palette,
  BarChart3,
  Megaphone,
  DollarSign,
  Monitor,
  Code2,
  Briefcase,
  Users,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const categories = [
  { name: "Design", count: 235, icon: Palette },
  { name: "Sales", count: 756, icon: BarChart3 },
  { name: "Marketing", count: 140, icon: Megaphone },
  { name: "Finance", count: 325, icon: DollarSign },
  { name: "Technology", count: 436, icon: Monitor },
  { name: "Engineering", count: 542, icon: Code2 },
  { name: "Business", count: 211, icon: Briefcase },
  { name: "Human Resource", count: 346, icon: Users },
];

export default function CategoriesSection() {
  return (
    <section className="py-[72px] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl sm:text-[40px] font-bold text-slate-900 leading-tight">
            Explore by <span className="text-indigo-600">category</span>
          </h2>
          <Link
            href="/jobs"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Show all jobs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={`/jobs?category=${category.name}`}>
              <Card className="group p-8 cursor-pointer border border-slate-100 rounded-lg bg-white hover:border-indigo-200 hover:shadow-sm transition-all">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-50">
                    <category.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-[18px] font-bold text-slate-900 mt-3">
                    {category.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-slate-500">
                      {category.count} jobs available
                    </p>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

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

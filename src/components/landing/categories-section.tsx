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
  {
    name: "Design",
    count: 235,
    icon: Palette,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    hoverBg: "hover:bg-indigo-50",
    hoverBorder: "hover:border-indigo-200",
  },
  {
    name: "Sales",
    count: 756,
    icon: BarChart3,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    hoverBg: "hover:bg-cyan-50/50",
    hoverBorder: "hover:border-cyan-200",
  },
  {
    name: "Marketing",
    count: 140,
    icon: Megaphone,
    color: "text-purple-600",
    bg: "bg-purple-50",
    hoverBg: "hover:bg-purple-50/50",
    hoverBorder: "hover:border-purple-200",
  },
  {
    name: "Finance",
    count: 325,
    icon: DollarSign,
    color: "text-green-600",
    bg: "bg-green-50",
    hoverBg: "hover:bg-green-50/50",
    hoverBorder: "hover:border-green-200",
  },
  {
    name: "Technology",
    count: 436,
    icon: Monitor,
    color: "text-orange-600",
    bg: "bg-orange-50",
    hoverBg: "hover:bg-orange-50/50",
    hoverBorder: "hover:border-orange-200",
  },
  {
    name: "Engineering",
    count: 542,
    icon: Code2,
    color: "text-rose-600",
    bg: "bg-rose-50",
    hoverBg: "hover:bg-rose-50/50",
    hoverBorder: "hover:border-rose-200",
  },
  {
    name: "Business",
    count: 211,
    icon: Briefcase,
    color: "text-amber-600",
    bg: "bg-amber-50",
    hoverBg: "hover:bg-amber-50/50",
    hoverBorder: "hover:border-amber-200",
  },
  {
    name: "Human Resource",
    count: 346,
    icon: Users,
    color: "text-teal-600",
    bg: "bg-teal-50",
    hoverBg: "hover:bg-teal-50/50",
    hoverBorder: "hover:border-teal-200",
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Explore by{" "}
            <span className="text-indigo-600">category</span>
          </h2>
          <Link
            href="/jobs"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Show all jobs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {categories.map((category) => (
            <Link key={category.name} href={`/jobs?category=${category.name}`}>
              <Card
                className={`group p-6 cursor-pointer border-slate-100 bg-white transition-all duration-200 ${category.hoverBorder} ${category.hoverBg} hover:shadow-sm`}
              >
                <div className="flex flex-col gap-4">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-xl ${category.bg}`}
                  >
                    <category.icon className={`w-6 h-6 ${category.color}`} />
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      {category.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <p className="text-sm text-slate-500">
                        {category.count} jobs available
                      </p>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
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

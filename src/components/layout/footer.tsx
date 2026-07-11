import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { BriefcaseBusiness } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600">
                <BriefcaseBusiness className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Job<span className="text-indigo-400">Hive</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Great platform for the job seeker that passionate about startups. Find your dream job easier.
            </p>
          </div>

          {/* About */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">About</h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link href="/companies" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link href="/dashboard" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/post-job" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Support</h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-slate-800" />

        <p className="text-sm text-slate-500 text-center">
          {new Date().getFullYear()} © JobHive. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

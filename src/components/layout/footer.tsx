import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { BriefcaseBusiness } from "lucide-react";

export default function Footer() {
  const footerLinks = {
    "For Job Seekers": [
      { label: "Browse Jobs", href: "/jobs" },
      { label: "My Applications", href: "/dashboard/applications" },
    ],
    "For Employers": [
      { label: "Post a Job", href: "/dashboard/post-job" },
      { label: "My Job Listings", href: "/dashboard/my-jobs" },
    ],
    Company: [
      { label: "About Us", href: "#" },
      { label: "Contact", href: "#" },
    ],
  };

  return (
    <footer className="bg-white border-t border-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand - same as navbar */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600">
                <BriefcaseBusiness className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">
                Job<span className="text-indigo-600">Hive</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Great platform for job seekers searching for new career heights and passionate about startups.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-slate-900 mb-4">{title}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-6 bg-slate-300" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} JobHive. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-slate-400 hover:text-indigo-600 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-slate-400 hover:text-indigo-600 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

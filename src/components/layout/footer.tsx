import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { BriefcaseBusiness } from "lucide-react";

export default function Footer() {
  const footerLinks = {
    "For Job Seekers": [
      { label: "Browse Jobs", href: "/jobs" },
      { label: "Browse Companies", href: "/companies" },
      { label: "Career Advice", href: "#" },
    ],
    "For Employers": [
      { label: "Post a Job", href: "/dashboard/post-job" },
      { label: "Browse Candidates", href: "#" },
      { label: "Pricing", href: "#" },
    ],
    Company: [
      { label: "About Us", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
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
              Great platform for the job seeker that searching for new career
              heights.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-slate-700" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} JobHive. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-slate-500 hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-sm text-slate-500 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-slate-500 hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

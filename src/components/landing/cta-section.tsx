import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Briefcase, UserPlus } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-16 lg:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="relative overflow-hidden border-0 bg-indigo-600 p-10 sm:p-14 lg:p-20 rounded-2xl">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500 rounded-full -translate-y-1/3 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-indigo-700 rounded-full translate-y-1/3 -translate-x-1/3" />

          <div className="relative z-10 flex flex-col items-center text-center gap-5">
            <Badge className="bg-white/15 text-white border-white/20 hover:bg-white/20 text-xs font-medium px-4 py-1.5 rounded-full">
              Start your journey today
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-2xl">
              Start posting jobs today
            </h2>

            <p className="text-indigo-100 text-base sm:text-lg max-w-md leading-relaxed">
              Join thousands of companies and job seekers who trust JobHive to
              connect talent with opportunity.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors text-sm"
              >
                <UserPlus className="w-4 h-4" />
                Sign up for free
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/dashboard/post-job"
                className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors border border-white/20 text-sm"
              >
                <Briefcase className="w-4 h-4" />
                Post a job
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

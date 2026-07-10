"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, User as UserIcon, Briefcase } from "lucide-react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  if (status === "loading") {
    return (
      <div className="px-4 max-w-3xl sm:px-6 lg:px-8 py-8">
        <Card className="p-6 sm:p-8 border-slate-200">
          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
          <Separator className="my-6 bg-slate-100" />
          <div className="space-y-5">
            <Skeleton className="h-11 w-full" />
            <Skeleton className="h-11 w-full" />
            <Skeleton className="h-11 w-full" />
          </div>
        </Card>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="px-4 max-w-3xl sm:px-6 lg:px-8 py-8">
      <Card className="p-6 sm:p-8 border-slate-200">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-indigo-100 text-indigo-700 font-semibold text-lg">
                  {getInitials(session.user?.name || "U")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  {session.user?.name}
                </h1>
                <p className="text-sm text-slate-500 capitalize">
                  {session.user?.role?.toLowerCase()} Account
                </p>
              </div>
            </div>

            <Separator className="my-6 bg-slate-100" />

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-slate-400" />
                  Full Name
                </Label>
                <Input value={session.user?.name || ""} disabled className="h-11 bg-slate-50" />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  Email Address
                </Label>
                <Input value={session.user?.email || ""} disabled className="h-11 bg-slate-50" />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  Account Type
                </Label>
                <Input
                  value={session.user?.role === "EMPLOYER" ? "Employer" : "Job Seeker"}
                  disabled
                  className="h-11 bg-slate-50"
                />
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-6">
              Profile information is managed through your account settings.
            </p>
      </Card>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  User,
  Plus,
  LogOut,
  BriefcaseBusiness,
  Menu,
  Search,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

function useNavItems(role?: string): NavItem[] {
  if (role === "EMPLOYER") {
    return [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "My Job Listings", href: "/dashboard/my-jobs", icon: Briefcase },
      { label: "Post a Job", href: "/dashboard/post-job", icon: Plus },
      { label: "Profile", href: "/dashboard/profile", icon: User },
    ];
  }
  return [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Applications", href: "/dashboard/applications", icon: FileText },
    { label: "Browse Jobs", href: "/jobs", icon: Search },
    { label: "Profile", href: "/dashboard/profile", icon: User },
  ];
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const navItems = useNavItems(session?.user?.role);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <Link
        href="/"
        onClick={onNavigate}
        className="flex items-center gap-2 px-6 h-16 border-b border-slate-100"
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600">
          <BriefcaseBusiness className="w-4 h-4 text-white" />
        </div>
        <span className="text-xl font-bold text-slate-900">
          Job<span className="text-indigo-600">Hive</span>
        </span>
      </Link>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 flex flex-col gap-1">
        {navItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-slate-100 p-3">
        <div className="flex items-center gap-3 px-3 py-2">
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarFallback className="bg-indigo-100 text-indigo-700 font-semibold text-sm">
              {getInitials(session?.user?.name || "U")}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-slate-900 truncate">
              {session?.user?.name}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {session?.user?.email}
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 fixed inset-y-0 left-0">
        <SidebarContent />
      </aside>

      {/* Main area */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        {/* Mobile top bar */}
        <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between h-16 px-4 bg-white border-b border-slate-200">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="inline-flex items-center justify-center rounded-lg p-2 hover:bg-slate-100 transition-colors cursor-pointer">
              <Menu className="h-5 w-5 text-slate-600" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SidebarContent onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-600">
              <BriefcaseBusiness className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">
              Job<span className="text-indigo-600">Hive</span>
            </span>
          </Link>

          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-indigo-100 text-indigo-700 font-semibold text-xs">
              {getInitials(session?.user?.name || "U")}
            </AvatarFallback>
          </Avatar>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

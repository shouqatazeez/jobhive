"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ListRowSkeleton } from "@/components/skeletons/job-card-skeleton";
import {
    Briefcase,
    Building2,
    Loader2,
    Plus,
    Users,
    Trash2,
} from "lucide-react";

interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    status: string;
    createdAt: string;
    _count?: { applications: number };
}

function formatType(type: string) {
    return type.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function MyJobsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
            return;
        }
        if (status === "authenticated") {
            if (session.user.role !== "EMPLOYER") {
                router.push("/dashboard");
                return;
            }
            fetchJobs();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, session]);

    const fetchJobs = async () => {
        try {
            const res = await fetch("/api/employer/jobs");
            const data = await res.json();
            setJobs(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch jobs:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this job posting?")) return;
        setDeletingId(id);
        try {
            const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
            if (res.ok) {
                setJobs((prev) => prev.filter((j) => j.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete job:", error);
        } finally {
            setDeletingId(null);
        }
    };

    if (status === "loading" || loading) {
        return (
            <div className="px-6 py-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-40" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-10 w-28 rounded-lg" />
                </div>
                <Card className="border-slate-200">
                    <ListRowSkeleton count={4} />
                </Card>
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="px-6 py-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">My Job Listings</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        {jobs.length} job{jobs.length !== 1 ? "s" : ""} posted
                    </p>
                </div>
                <Link
                    href="/dashboard/post-job"
                    className="inline-flex items-center gap-1.5 bg-indigo-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors shrink-0"
                >
                    <Plus className="w-4 h-4" />
                    Post a Job
                </Link>
            </div>

            <Card className="border-slate-200">
                {jobs.length === 0 ? (
                    <div className="p-10 text-center">
                        <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-base font-semibold text-slate-900">
                            No jobs posted yet
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                            Create your first job listing to start hiring.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {jobs.map((job) => (
                            <div
                                key={job.id}
                                className="p-5 flex items-center justify-between gap-4"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-indigo-50 shrink-0">
                                        <Building2 className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <Link
                                            href={`/jobs/${job.id}`}
                                            className="text-sm font-semibold text-slate-900 hover:text-indigo-600 transition-colors truncate block"
                                        >
                                            {job.title}
                                        </Link>
                                        <p className="text-xs text-slate-500 truncate">
                                            {job.location} · {formatType(job.type)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                    <span className="hidden sm:flex items-center gap-1 text-xs text-slate-500">
                                        <Users className="w-3.5 h-3.5" />
                                        {job._count?.applications || 0}
                                    </span>
                                    <Badge
                                        variant="outline"
                                        className={`text-[10px] ${job.status === "OPEN"
                                                ? "bg-green-50 text-green-700 border-green-200"
                                                : "bg-slate-50 text-slate-600 border-slate-200"
                                            }`}
                                    >
                                        {job.status}
                                    </Badge>
                                    <button
                                        onClick={() => handleDelete(job.id)}
                                        disabled={deletingId === job.id}
                                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                                        title="Delete job"
                                    >
                                        {deletingId === job.id ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Trash2 className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
}

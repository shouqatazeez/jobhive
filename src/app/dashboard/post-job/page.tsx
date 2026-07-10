"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const jobTypes = [
  { value: "FULL_TIME", label: "Full Time" },
  { value: "PART_TIME", label: "Part Time" },
  { value: "REMOTE", label: "Remote" },
  { value: "CONTRACT", label: "Contract" },
  { value: "INTERNSHIP", label: "Internship" },
];

const categories = [
  "Technology",
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "Business",
  "Finance",
  "Human Resource",
];

export default function PostJobPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "FULL_TIME",
    category: "Technology",
    salary: "",
    description: "",
    requirements: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Failed to post job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (session?.user?.role !== "EMPLOYER") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-slate-500">Only employers can post jobs.</p>
        <Link href="/dashboard" className="text-indigo-600 text-sm mt-2 inline-block">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 max-w-3xl sm:px-6 lg:px-8 py-8">
      <Card className="p-6 sm:p-8 border-slate-200">
        <h1 className="text-xl font-bold text-slate-900">Post a New Job</h1>
        <p className="text-sm text-slate-500 mt-1">
          Fill in the details below to create a job listing
        </p>

        <Separator className="my-6 bg-slate-100" />

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title" className="text-sm font-medium text-slate-700">
                Job Title *
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. Frontend Developer"
                value={form.title}
                onChange={handleChange}
                required
                className="h-11"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="company" className="text-sm font-medium text-slate-700">
                Company Name *
              </Label>
              <Input
                id="company"
                name="company"
                placeholder="e.g. Google"
                value={form.company}
                onChange={handleChange}
                required
                className="h-11"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="location" className="text-sm font-medium text-slate-700">
                Location *
              </Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g. Bangalore, India"
                value={form.location}
                onChange={handleChange}
                required
                className="h-11"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="salary" className="text-sm font-medium text-slate-700">
                Salary (optional)
              </Label>
              <Input
                id="salary"
                name="salary"
                placeholder="e.g. ₹10L - ₹15L/year"
                value={form.salary}
                onChange={handleChange}
                className="h-11"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="type" className="text-sm font-medium text-slate-700">
                Job Type *
              </Label>
              <select
                id="type"
                name="type"
                value={form.type}
                onChange={handleChange}
                className="h-11 w-full rounded-lg border border-input bg-transparent px-3 text-sm focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none"
              >
                {jobTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="category" className="text-sm font-medium text-slate-700">
                Category *
              </Label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="h-11 w-full rounded-lg border border-input bg-transparent px-3 text-sm focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description" className="text-sm font-medium text-slate-700">
              Job Description *
            </Label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe the role, responsibilities, and what the day-to-day looks like..."
              value={form.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2.5 text-sm focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="requirements" className="text-sm font-medium text-slate-700">
              Requirements *
            </Label>
            <textarea
              id="requirements"
              name="requirements"
              placeholder="List requirements separated by commas (e.g. 3+ years React, TypeScript, REST APIs)"
              value={form.requirements}
              onChange={handleChange}
              required
              rows={4}
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2.5 text-sm focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto sm:self-end inline-flex items-center justify-center bg-indigo-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-indigo-700 transition-colors text-sm cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Post Job"
            )}
          </button>
        </form>
      </Card>
    </div>
  );
}

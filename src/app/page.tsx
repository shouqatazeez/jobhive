import Navbar from "@/components/layout/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-4xl font-bold text-slate-900">
            Welcome to JobHive
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Navbar is working. Hero section coming next.
          </p>
        </div>
      </main>
    </>
  );
}

export default function CompaniesSection() {
  const companies = [
    { name: "Vodafone", style: "tracking-wider" },
    { name: "intel", style: "lowercase tracking-wide" },
    { name: "TESLA", style: "tracking-[0.25em]" },
    { name: "AMD", style: "tracking-[0.2em]" },
    { name: "Talkit", style: "tracking-wide" },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-400 text-center mb-8">
          Companies we helped grow
        </p>
        <div className="flex items-center justify-between flex-wrap gap-8">
          {companies.map((company) => (
            <span
              key={company.name}
              className={`text-xl sm:text-2xl font-bold text-slate-300 select-none hover:text-slate-500 transition-colors ${company.style}`}
            >
              {company.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

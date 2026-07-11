import Navbar from "@/components/layout/navbar";
import HeroSection from "@/components/landing/hero-section";
import CompaniesSection from "@/components/landing/companies-section";
import CategoriesSection from "@/components/landing/categories-section";
import CTASection from "@/components/landing/cta-section";
import FeaturedJobsSection from "@/components/landing/featured-jobs-section";
import LatestJobsSection from "@/components/landing/latest-jobs-section";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <CompaniesSection />
        <CategoriesSection />
        <CTASection />
        <FeaturedJobsSection />
        <LatestJobsSection />
      </main>
      <Footer />
    </>
  );
}

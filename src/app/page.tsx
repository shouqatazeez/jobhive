import Navbar from "@/components/layout/navbar";
import HeroSection from "@/components/landing/hero-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
      </main>
    </>
  );
}

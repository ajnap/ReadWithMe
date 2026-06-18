import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { HowItWorks } from "@/components/HowItWorks";
import { Promise as PromiseSection } from "@/components/Promise";
import { Features } from "@/components/Features";
import { IncludedBook } from "@/components/IncludedBook";
import { Testimonials } from "@/components/Testimonials";
import { MeetTheTeam } from "@/components/MeetTheTeam";
import { BuilderTeaser } from "@/components/BuilderTeaser";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full">
      <Nav />
      <Hero />
      <Marquee />
      <HowItWorks />
      <PromiseSection />
      <Features />
      <IncludedBook />
      <Testimonials />
      <MeetTheTeam />
      <BuilderTeaser />
      <Footer />
    </main>
  );
}

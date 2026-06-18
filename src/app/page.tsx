import { Preloader } from "@/components/Preloader";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Journey } from "@/components/Journey";
import { Features } from "@/components/Features";
import { IncludedBook } from "@/components/IncludedBook";
import { Testimonials } from "@/components/Testimonials";
import { MeetTheTeam } from "@/components/MeetTheTeam";
import { BuilderTeaser } from "@/components/BuilderTeaser";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full">
      <Preloader />
      <Nav />
      <Hero />
      <Marquee />
      <Journey />
      <Features />
      <IncludedBook />
      <Testimonials />
      <MeetTheTeam />
      <BuilderTeaser />
      <Footer />
    </main>
  );
}

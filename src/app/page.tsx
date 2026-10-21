import { Activities } from "@/components/Activities";
import { Closing } from "@/components/Closing";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Mission } from "@/components/Mission";
import { Story } from "@/components/Story";
import { Support } from "@/components/Support";
import { WhyItMatters } from "@/components/WhyItMatters";
import { hasGallery } from "@/lib/site";

export default function Home() {
  // Sections after the gallery are numbered on from it, so hiding an
  // empty gallery never leaves a gap in the numbering.
  const n = (i: number) => String(i).padStart(2, "0");
  const afterGallery = hasGallery ? 5 : 4;

  return (
    <>
      <a href="#main" className="btn btn-primary fixed top-3 left-3 z-[60] -translate-y-24 focus-visible:translate-y-0">
        Skip to content
      </a>
      <div id="top" />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Mission number="01" />
        <Activities number="02" />
        <WhyItMatters number="03" />
        <Gallery number="04" />
        <Story number={n(afterGallery)} />
        <Support number={n(afterGallery + 1)} />
        <Closing />
      </main>
      <Footer />
    </>
  );
}

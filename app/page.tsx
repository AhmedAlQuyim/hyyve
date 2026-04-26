import { Hero } from "@/components/home/Hero";
import { SolutionsGrid } from "@/components/home/SolutionsGrid";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { QuoteBlock } from "@/components/home/QuoteBlock";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  return (
    <main>
      <Hero />
      <SolutionsGrid />
      <ProcessSteps />
      <QuoteBlock />
      <FinalCta />
    </main>
  );
}

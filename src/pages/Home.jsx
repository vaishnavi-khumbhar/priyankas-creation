import Hero from "../components/Hero";
import ProductMarquee from "../components/ProductMarquee";
import Collections from "../components/Collections";
import BestSellers from "../components/BestSellers";
import HowItWorks from "../components/HowItWorks";
import WhyUs from "../components/WhyUs";
import CTA from "../components/CTA";
import FAQ from "../components/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductMarquee />
      <Collections />
      <BestSellers />
      <HowItWorks />
      <WhyUs />
      <FAQ />
      <CTA />
    </>
  );
}
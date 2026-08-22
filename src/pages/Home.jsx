import Hero from "../components/Hero";
import ProductMarquee from "../components/ProductMarquee";
import Collections from "../components/Collections";
import BestSellers from "../components/BestSellers";
import HowItWorks from "../components/HowItWorks";
import WhyUs from "../components/WhyUs";
import CustomerVideos from "../components/CustomerVideos";
import CustomerReviews from "../components/CustomerReviews";
import WhatsAppReviews from "../components/WhatsAppReviews";
import FeedbackCTA from "../components/FeedbackCTA";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";

export default function Home() {
  return (
    <>
      <Hero />

      <ProductMarquee />

      <Collections />

      <BestSellers />

      <HowItWorks />

      <WhyUs />

      {/* Customer Experience */}
      <CustomerVideos />

      <CustomerReviews />

      <WhatsAppReviews />

      <FeedbackCTA />

      <FAQ />

      <CTA />
    </>
  );
}
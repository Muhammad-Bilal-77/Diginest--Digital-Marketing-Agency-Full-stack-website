import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClientLogos from "@/components/ClientLogos";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import InfluencerSection from "@/components/InfluencerSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ProcessTimeline from "@/components/ProcessTimeline";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ClientLogos />
      <ServicesSection />
      <AboutSection />
      <InfluencerSection />
      <PortfolioSection />
      <TestimonialsSection />
      <ProcessTimeline />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;

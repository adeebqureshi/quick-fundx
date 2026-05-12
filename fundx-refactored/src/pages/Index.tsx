import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import LoanProducts from "@/components/landing/LoanProducts";
import FeaturedCampaigns from "@/components/landing/FeaturedCampaigns";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <HowItWorks />
    <FeaturedCampaigns />
    <LoanProducts />
    <Footer />
  </div>
);

export default Index;

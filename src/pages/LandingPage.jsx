import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import InfoSection from "../components/InfoSection";
import FeatureSection from "../components/FeatureSection";
import HowItWorks from "../components/HowItWorks";
import CallToActionSection from "../components/CallToActionSection";
import FooterSection from "../components/FooterSection";

const LandingPage = () => {
  return (
    <div className="h-screen bg-blue-50">
      <Navbar />
      <HeroSection />
      <InfoSection />
      <FeatureSection />
      <HowItWorks />
      <CallToActionSection />
      <FooterSection />
    </div>
  );
};

export default LandingPage;

import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import InfoSection from "../components/InfoSection";
import FeatureSection from "../components/FeatureSection";

const LandingPage = () => {
  return (
    <div className="h-screen bg-blue-50">
      <Navbar />
      <HeroSection />
      <InfoSection />
      <FeatureSection />
    </div>
  );
};

export default LandingPage;

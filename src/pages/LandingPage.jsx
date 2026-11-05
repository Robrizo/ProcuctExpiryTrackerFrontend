import React from "react";
import { Link } from "react-router";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

const LandingPage = () => {
  return (
    <div className="h-screen bg-blue-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
      </div>
    </div>
  );
};

export default LandingPage;

import React from "react";
import { Link } from "react-router";

const LandingPage = () => {
  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-7xl mx-auto flex items-center space-x-6">
        <div>Welcome to PET</div>
        <Link
          to={"/login"}
          className="bg-blue-600 px-4 py-2.5 rounded-lg text-white"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;

import React from "react";
import heroImage from "../assets/hero-image.png";
import { Link } from "react-router";

const HeroSection = () => {
  return (
    <div className="h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col  items-center justify-center lg:flex-row h-full">
        {/* welcome */}
        <div className="md:flex-1 space-y-4 text-center">
          {/* title */}
          <div className="flex flex-col text-6xl sm:text-3xl text-blue-600 font-bold">
            <span>Product</span>
            <span>Expiry Tracker</span>
          </div>
          {/* subtitle */}
          <div className="text-gray-700 font-medium">
            Track. Get Reminded.{" "}
            <span className="text-blue-600">Reduce Waste.</span>
          </div>
          {/* description */}
          <div className="text-gray-700 text-lg hidden">
            <p className="max-w-lg">
              <span>PET</span> keeps a live status of your household inventory
              and warns you a full week before anything goes off. For example,
              food, medicine, cleaning supplies and more.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row space-x-4 space-y-6 sm:space-y-0 pt-6">
            <Link
              to={"/login"}
              className="bg-blue-600 text-white font-medium p-4 rounded-full hover:bg-blue-700"
            >
              Start tracking free
            </Link>
            <a
              href={"#itworks"}
              className="border border-gray-600 text-gray-800 font-medium p-4 rounded-full hover:bg-blue-100"
            >
              See how it works
            </a>
          </div>
        </div>

        {/* hero image */}
        <div className="flex-1 hidden lg:block">
          <img src={heroImage} alt="" className="rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;


import React from "react";
import heroImage from "../assets/hero-image.png";
import { Link } from "react-router";

const HeroSection = () => {
  return (
    <section className=" min-h-[calc(100svh-4rem)] py-12 sm:py-16 lg:py-20 flex items-center">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">

          {/* Welcome / Hero Content */}
          <div className="w-full lg:flex-1 space-y-5 text-center lg:text-left">

            {/* Title */}
            <h1 className="flex flex-col text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-blue-600">
              <span>Product</span>
              <span>Expiry Tracker</span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-700 text-base sm:text-lg md:text-xl font-medium">
              Track. Get Reminded.{" "}
              <span className="text-blue-600">
                Reduce Waste.
              </span>
            </p>

            {/* Description */}
            <p className="text-gray-600 text-sm sm:text-base max-w-lg mx-auto lg:mx-0">
              PET keeps a live status of your household inventory
              and warns you a full week before anything expires.
              Track food, medicine, cleaning supplies and more.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-5">

              <Link
                to="/login"
                className="w-full sm:w-auto text-center bg-blue-600 text-white font-medium px-7 py-4 rounded-full hover:bg-blue-700 transition-colors"
              >
                Start tracking free
              </Link>

              <a
                href="#itworks"
                className="w-full sm:w-auto text-center border border-gray-600 text-gray-800 font-medium px-7 py-4 rounded-full hover:bg-blue-100 transition-colors"
              >
                See how it works
              </a>

            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full lg:flex-1 flex justify-center">
            <img
              src={heroImage}
              alt="Product Expiry Tracker illustration"
              className="w-full max-w-md sm:max-w-lg lg:max-w-full h-auto object-contain rounded-xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

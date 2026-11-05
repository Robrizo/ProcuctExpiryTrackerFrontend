import React from "react";
import heroImage from "../assets/hero-image.png";
import { Bell, CalendarClock, CalendarDays, Leaf } from "lucide-react";
import { Link } from "react-router";

const HeroSection = () => {
  return (
    <div className="h-[80vh] flex items-center justify-center">
      {/* welcome */}
      <div className="flex-1 space-y-4">
        {/* title */}
        <div className="flex flex-col text-6xl text-blue-600 font-bold">
          <span>Product</span>
          <span>Expiry Tracker</span>
        </div>

        {/* subtitle */}
        <div className="inline-flex space-x-2 text-gray-700 font-medium">
          <span>Track.</span>
          <span>Get Reminded.</span>
          <span className="text-blue-600">Reduce Waste.</span>
        </div>

        {/* icons */}
        {/* <div className="grid grid-cols-3 gap-3 mt-6 w-full max-w-md">
          <div className="flex flex-col items-center justify-center gap-3 bg-blue-100 p-4 rounded-xl">
            <CalendarClock className="w-8 h-8 text-blue-600 shrink-0" />
            <span className="text-gray-700 text-sm text-center leading-5">
              Track Expiry Dates
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 bg-blue-100 p-4 rounded-xl">
            <Bell className="w-8 h-8 text-blue-600 shrink-0" />
            <span className="text-gray-700 text-sm text-center leading-5">
              Get Timely Reminders
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 bg-blue-100 p-4 rounded-xl">
            <Leaf className="w-8 h-8 text-blue-600 shrink-0" />
            <span className="text-gray-700 text-sm text-center leading-5">
              Reduce Product Waste
            </span>
          </div>
        </div> */}

        <div className="pt-12 space-x-4">
          <Link
            to={"/login"}
            className="bg-blue-600 text-white font-medium p-4 rounded-full hover:bg-blue-700"
          >
            Start tracking free
          </Link>
          <Link
            to={"#"}
            className="border border-gray-600 text-gray-800 font-medium p-4 rounded-full hover:bg-blue-100"
          >
            See how it works
          </Link>
        </div>
      </div>

      {/* hero image */}
      <div className="flex-1">
        <img src={heroImage} alt="" className="" />
      </div>
    </div>
  );
};

export default HeroSection;

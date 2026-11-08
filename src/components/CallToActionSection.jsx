import { CheckCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const CallToActionSection = () => {
  return (
    <div className="bg-blue-50 py-24">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl text-gray-800 font-stylish font-semibold">
          Your shelves, always in date.
        </h1>
        <p className="text-gray-600 text-lg mt-4 max-w-xl mx-auto">
          Join households cutting waste and saving money every month.
        </p>
        <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
          <li className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-green-600" />
            Free to start
          </li>
          <li className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-green-600" />
            No credit card
          </li>
          <li className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-green-600" />
            Works on any device
          </li>
        </ul>
        <Link
          to={"/login"}
          className="mt-8 inline-block bg-blue-600 text-white font-medium p-4 rounded-full hover:bg-blue-700"
        >
          Create your free account
        </Link>
      </div>
    </div>
  );
};

export default CallToActionSection;

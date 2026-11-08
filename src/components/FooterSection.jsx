import React from "react";
import { date } from "zod/v3";

const FooterSection = () => {
  return (
    <div className="bg-blue-50 border-t border-gray-300 py-8 text-center text-sm">
      <div className="flex justify-between mx-auto max-w-7xl">
        <div className="text-gray-600">
          &copy; {new Date().getFullYear()} PET. Waste less, live better
        </div>
        <div className="text-gray-600">
          Developed by:{" "}
          <a
            href="https://robertchunga.vercel.app/"
            target="_blank"
            className="text-blue-600 underline-offset-1 hover:underline"
          >
            Robert Chunga
          </a>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;

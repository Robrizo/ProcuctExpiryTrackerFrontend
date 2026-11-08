import React from "react";

const HowItWorks = () => {
  return (
    <section className="bg-blue-600 py-24" id="itworks">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-4xl font-bold text-white font-stylish max-w-xl">
          <h1>Three steps to a smarter home</h1>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-stylish font-medium text-blue-300 text-5xl">
              01
            </p>
            <h3 className="mt-4 text-xl text-white font-semibold font-stylish">
              Add your products
            </h3>
            <p className="mt-2 text-white/80">
              Add items with their expiry date and storage notes.
            </p>
          </div>

          <div>
            <p className="font-stylish font-medium text-blue-300 text-5xl">
              02
            </p>
            <h3 className="mt-4 text-xl text-white font-semibold font-stylish">
              We monitor daily
            </h3>
            <p className="mt-2 text-white/80">
              PET scans your inventory every day for anything within 7 days.
            </p>
          </div>

          <div>
            <p className="font-stylish font-medium text-blue-300 text-5xl">
              03
            </p>
            <h3 className="mt-4 text-xl text-white font-semibold font-stylish">
              Act in time
            </h3>
            <p className="mt-2 text-white/80">
              Use, share or restock flagged items before they go to waste.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

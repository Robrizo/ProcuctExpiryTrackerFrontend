import React from "react";

const InfoSection = () => {
  return (
    <section className="py-18 grid grid-cols-3 mx-auto bg-blue-50/10 max-w-6xl">
      <div className="text-center space-y-2">
        <h2 className="text-4xl text-blue-600 font-stylish font-semibold">
          7 Days
        </h2>
        <p className="text-sm text-gray-700">advance warning</p>
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-4xl text-blue-600 font-stylish font-medium">
          Daily
        </h2>
        <p className="text-sm text-gray-700">automatic checks</p>
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-4xl text-blue-600 font-stylish font-medium">
          3 States
        </h2>
        <p className="text-sm text-gray-700">fresh • expiring soon • expired</p>
      </div>
    </section>
  );
};

export default InfoSection;

import React from "react";

const LandingSectionCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white border border-blue-200 rounded-2xl  p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="space-y-4">
        <Icon className="w-8 h-8 text-blue-600" />
        <h3 className="text-lg font-bold text-gray-900 font-stylish mb-2">
          {title}
        </h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default LandingSectionCard;

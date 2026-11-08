import React from "react";
import LandingSectionCard from "./LandingSectionCard";
import {
  Bell,
  CalendarClock,
  Radio,
  ScanLine,
  ShieldCheck,
  Wallet,
} from "lucide-react";

const FeatureSection = () => {
  const cardInfo = [
    {
      icon: Radio,
      title: "Live inventory status",
      description:
        "See everything at home gouped as fresh, expiring soon or expired.",
    },
    {
      icon: CalendarClock,
      title: "Automated 7-day watch",
      description:
        "Every item is checked daily. Anything within 7 days of expiry is flagged automatically.",
    },
    {
      icon: Bell,
      title: "Timely reminders",
      description:
        "Get a heads-up before it’s too late, so you use it, share it or replace it in time.",
    },
    {
      icon: ScanLine,
      title: "Quick add",
      description:
        "Add products in seconds with name, location, quantity and expiry date.",
    },
    {
      icon: Wallet,
      title: "Save money",
      description:
        "Stop re-buying what you already own and throwing out what you forgot.",
    },
    {
      icon: ShieldCheck,
      title: "Safer home",
      description:
        "Keep medicines, cleaners and food in date for the whole family.",
    },
  ];
  return (
    <section id="feature" className="bg-blue-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-4xl font-bold text-blue-600 font-stylish max-w-xl">
          <h1>Everything your household needs to waste less.</h1>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cardInfo.map((card, index) => (
            <LandingSectionCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

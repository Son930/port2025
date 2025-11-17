import React from "react";
import "./Footer.css";

const Form = () => {
  const handleContactClick = () => {
    window.location.href =
      "mailto:sunny.sondhi93@gmail.com?subject=Job Opportunity&body=Hi Sunny,%0D%0A%0D%0AI came across your portfolio and would like to discuss potential opportunities.%0D%0A%0D%0ABest regards,";
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-6">
      <h3 className="text-xl md:text-2xl text-gray-300 text-center">
        Ready to work together?
      </h3>

      <button
        onClick={handleContactClick}
        className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
      >
        <span className="relative z-10 flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Contact Me
        </span>

        {/* Hover effect background */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-white/20 to-green-400/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>

      <p className="text-sm text-gray-500 text-center">
        Click to send me an email directly
      </p>
    </div>
  );
};

export default Form;

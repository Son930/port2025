import React from "react";

export default function LoadingSpinner(){
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-12 h-12 border-4 border-t-transparent border-r-transparent border-b-blue-500 border-l-pink-500 rounded-full animate-spin relative">
        <div className="absolute inset-1 border-2 border-t-transparent border-r-transparent border-b-white/20 border-l-transparent rounded-full animate-[spin_1.5s_linear_infinite]"></div>
      </div>
    </div>
  );
};


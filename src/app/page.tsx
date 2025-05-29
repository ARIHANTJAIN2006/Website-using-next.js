"use client";

import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      {/* Header with gradient text */}
      <h1 className="text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
        ARIHANT'S DEV STUDIO
      </h1>
      <div className="relative w-full h-6 overflow-hidden bg-black">
  <div
    className="absolute text-yellow-400 font-bold text-2xl select-none mt-2"
    style={{
      animation: "sineWave 4s linear infinite",
      whiteSpace: "nowrap",
    }}
  >
    WELCOME!
  </div>

      <style jsx>{`
    @keyframes sineWave {
      0% {
        transform: translateX(-160px) translateY(0);
      }
      12.5% {
        transform: translateX(0) translateY(-20px);
      }
      25% {
        transform: translateX(160px) translateY(0);
      }
      37.5% {
        transform: translateX(320px) translateY(20px);
      }
      50% {
        transform: translateX(480px) translateY(0);
      }
      62.5% {
        transform: translateX(640px) translateY(-20px);
      }
      75% {
        transform: translateX(800px) translateY(0);
      }
      87.5% {
        transform: translateX(960px) translateY(20px);
      }
      100% {
        transform: translateX(1120px) translateY(0);
      }
    }
  `}</style>
</div>


      {/* Card with sharp gradient border */}
      <div
        className="max-w-md w-full rounded-lg p-8 bg-gray-900 relative"
        style={{
          borderWidth: "3px",
          borderStyle: "solid",
          borderImageSlice: 1,
          borderImageSource:
            "linear-gradient(to right, #ffff00, #ffffff)", // yellow to white gradient
        }}
      >
        {/* Card content */}
        <p className="text-red-200 text-lg mb-6 font-semibold text-center">
          Already a member?
        </p>

        <div className="flex justify-center gap-6">
          <a
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-6 py-3 font-semibold shadow-lg transition"
          >
            LOGIN
          </a>
          <a
            href="/signup"
            className="bg-green-600 hover:bg-green-700 text-white rounded-md px-6 py-3 font-semibold shadow-lg transition"
          >
            SIGN UP
          </a>
        </div>
      </div>
    </div>
  );
}

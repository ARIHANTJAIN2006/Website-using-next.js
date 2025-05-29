"use client";
import React, { useEffect, useState } from "react";
import axios from 'axios'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authentication = async() => {
    await axios
      .get("/api/users/me",{ withCredentials: true })
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
    }
    authentication();
  }, []);

  if (loading) return <div className="text-white">Checking Authentication...</div>;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
        ARIHANT DEV STUDIO
      </h1>

      {!isAuthenticated && (
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
      )}

      {!isAuthenticated && (
        <div
          className="max-w-md w-full rounded-lg p-8 bg-gray-900 relative"
          style={{
            borderWidth: "3px",
            borderStyle: "solid",
            borderImageSlice: 1,
            borderImageSource:
              "linear-gradient(to right, #ffff00, #ffffff)",
          }}
        >
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
      )}
      {isAuthenticated && (
  <a
    href="/profile"
    className="mt-10 inline-block px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 transition duration-300"
  >
    Go to Profile
  </a>
)}

    </div>
  );
}

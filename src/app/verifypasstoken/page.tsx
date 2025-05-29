"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [verified, setVerified] = useState(false);

  // Grab token from URL
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []); // ✅ Only run on mount

  // Verify token if present
  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        const res = await axios.post("/api/users/verifyemail2", { token });
        setVerified(true);
        
        if(res.data.success){
          const email = res.data.email
        if (res.data.message === "youcanresetpass") {
          router.push(`/resetpassword?email=${email}`);
        }
      }
      } catch (error: unknown) {
        setError(true);
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data);
        } else if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("Unknown error occurred");
        }
      }
    };

    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token, router]); // ✅ Include all deps

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? token : "No token"}
      </h2>

      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl">Email Verification Failed</h2>
        </div>
      )}
    </div>
  );
}

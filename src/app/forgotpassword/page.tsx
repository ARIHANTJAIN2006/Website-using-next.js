"use client"
import React,{useState,useEffect} from "react"
import axios from "axios"
import { CheckCircle } from "lucide-react";
export default function Forgotpasswordpage(){
    const [email,setemail] = useState("")
    const [buttondisabled,setbuttondisabled] = useState(true)
    const [error,seterror] = useState(false)
    const [message,setmessage] = useState("")
    const [success,setsuccess] = useState(false)
    const verifyemail = async () => {
        
        try {
  const res = await axios.post("/api/users/forgotpassword", {email});
  console.log("Success:", res.data);
  setsuccess(true)
  setmessage("Password reset link has been sent to your email.")
  setTimeout(() => {
    setsuccess(false)
  },5000)
} catch (err: unknown) {
  let errorMessage = "Unknown error occurred";

  if (axios.isAxiosError(err)) {
    errorMessage = err.response?.data?.error || err.message || errorMessage;
    console.log("Status Code:", err.response?.status);
    console.log("Message:", errorMessage);
  } else if (err instanceof Error) {
    errorMessage = err.message;
    console.log("Error:", errorMessage);
  } else {
    console.log("Unknown error object:", err);
  }

  setmessage(errorMessage);
  seterror(true);
  setTimeout(() => {
    seterror(false);
  }, 3000);
}

    }
    useEffect(() => {
    if(email.length > 0)
    {
      setbuttondisabled(false)
    }
    else{
      setbuttondisabled(true)
    }
    },[email])
   return (
  <div className="flex flex-col items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
   
      <div className="flex flex-col items-center gap-4 w-full px-4">
        <label htmlFor="email" className="text-white text-lg text-center">
          Enter your email
        </label>
        <input
          className="w-full max-w-md px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          id="email"
          value={email}
          placeholder="E-mail"
          onChange={(e) => setemail(e.target.value)}
        />
        {error && (
          <p className="mt-2 text-sm text-red-600">{message}</p>
        )}
        {success && (
          <p className="mt-2 text-sm text-green-600">{message}</p>
        )}
<button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-5 rounded-xl shadow transition-all duration-200 ease-in-out"
disabled = {buttondisabled}
onClick = {verifyemail}
>
  <CheckCircle size={20} />
  Verify
</button>
      </div>
  </div>
);

}
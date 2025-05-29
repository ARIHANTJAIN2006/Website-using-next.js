"use client"
import React,{useState,useEffect} from "react"
import axios from "axios"
import {useRouter} from "next/navigation"
import { RotateCcw } from "lucide-react";
import toast from 'react-hot-toast'
import { useSearchParams } from 'next/navigation';

export default function Resetpasswordpage() {
    const router = useRouter()
    const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
    const [newpassword,setnewpassword] = useState("")
    const [buttondisabled,setbuttondisabled] = useState(true)
    const [passmatch,setpassmatch] = useState(false)
    const [confirmedpassword,setconfirmedpassword] = useState("")
    const resetpassword = async () => {
        console.log(newpassword,email)
     try{
        
      await axios.post("/api/users/resetpassword",{newpassword,email})
      router.push('/login')
      }catch (error: unknown) {
  if (error instanceof Error) {
    console.log("login failed", error.message);
    toast.error(error.message);
  } else {
    console.log("login failed: Unknown error");
    toast.error("An unknown error occurred");
  }
}

    }
    useEffect(() => {
        const emailParam = searchParams.get("email");
  if (emailParam) {
    setEmail(emailParam);
  }
         if((newpassword === confirmedpassword) && newpassword.length > 0 && confirmedpassword.length > 0){
            setbuttondisabled(false);
            setpassmatch(false)
         }
         else if(newpassword.length == 0 && confirmedpassword.length == 0){
            setpassmatch(false)
         }
         else if(newpassword !== confirmedpassword){
            setpassmatch(true)
        }
    },[newpassword,confirmedpassword,searchParams])
    return (
        <div className=" flex flex-col items-center  justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
         <div className="flex flex-col items-center gap-4 w-full px-4">
        <label htmlFor="email">RESET PASSWORD</label>
        <input
        className="w-full max-w-md px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        id="password"
        type="password"
        value={newpassword}
        onChange={(e) => setnewpassword(e.target.value)}
        placeholder="New Password"
></input>
  <label htmlFor="email">CONFIRM PASSWORD</label>
        <input
        className="w-full max-w-md px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        id="password"
        type="password"
        value={confirmedpassword}
        onChange={(e) => setconfirmedpassword(e.target.value)}
        placeholder="Confirm Password"
></input>
{passmatch && (
        <p className="text-red-500 text-sm font-medium">
          Passwords do not match.
        </p>
      )}
<button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-5 rounded-xl shadow transition"
onClick={resetpassword}
disabled={buttondisabled}
type="button"
>
  <RotateCcw size={18} />
  RESET
</button>
        </div>
        </div>
    )
}
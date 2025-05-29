"use client"
 
import axios from "axios"
import React,{useEffect,useState} from "react"
import {useRouter} from 'next/navigation'

export default function VerifyresetpasswordtokenPage(){
    const router = useRouter()
    const [token,settoken] = useState("")
    const [error,seterror] = useState(false)
    const verifyuseremail = async () => {
        try{
            const res = await axios.post('/api/users/verifyemail2',{token})
            const email = res.data.email
            
             router.push(`/resetpassword?email=${email}`)
        }catch (error: unknown) {
  seterror(true);

  if (axios.isAxiosError(error)) {
    console.log(error.response?.data);
  } else if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log("Unknown error occurred");
  }
}
    }
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        settoken(urlToken || "")
    })
    useEffect(()=> {
        if(token.length > 0){
             verifyuseremail()
        }
    },[token])
    return(
  <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1 className="text-4xl">Verify Email</h1>
    <h2 className="p-2 bg-orange-500 text-black">
      {token ? `${token}` : "no token"}
    </h2>

    
    {error && (
      <div>
        <h2 className="text-2xl">Email Verification failed</h2>
      </div>
    )}
  </div>
)
}

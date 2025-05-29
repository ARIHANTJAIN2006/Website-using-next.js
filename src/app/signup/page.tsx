"use client"
import Link from "next/link"
import React,{useEffect} from "react"
import {useRouter} from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
export default function SignupPage(){
  const router = useRouter()
    const [user,setUser] = React.useState({
        email:"",
        password:"",
        username:""
    })
    const [buttonDisabled,setbuttonDisabled] = React.useState(false)
    const [loading,setLoading] = React.useState(false)
    const [mass,setmass] = React.useState(false)

    const onSignup = async () => {
      try{
        setLoading(true)
       const response =  await axios.post("/api/users/signup",user)
       setmass(true)
       console.log("Signup sucess",response.data)
       
       router.push("/login")
      }catch (error: unknown) {
  console.log("Signup failed");

  if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("An unknown error occurred");
  }
} finally {
  setLoading(false);
}
    }

useEffect(() => {
  if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
    setbuttonDisabled(false);
  } else {
    setbuttonDisabled(true);
  }
}, [user]);  // run effect whenever user object changes


    return (
        <div className=" flex flex-col items-center  justify-center min-h-screen font-[family-name:var(--font-geist-sans)] ">
          
            <h1 className="text-2xl">{loading? "Processing":"Signup"}</h1>
        <div className="w-full h-0.5 bg-yellow-200"></div>
        <label htmlFor="username">username</label>
        <input
        className="w-full max-w-md px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({...user,username:e.target.value})}
        placeholder="username"
></input>
<label htmlFor="email">email</label>
        <input
        className="w-full max-w-md px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({...user,email:e.target.value})}
        placeholder="email"
></input>
<label htmlFor="password">password</label>
        <input
        className="w-full max-w-md px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        id="email"
        type="password"
        value={user.password}
        onChange={(e) => setUser({...user,password:e.target.value})}
        placeholder="password"
></input>
{mass && (
  <p className="text-green-400 text-lg font-semibold text-center mt-6 animate-pulse">
  📧 Verification link sent! Please check your Gmail inbox.
</p>
)}
<button
  type="submit"
  onClick={onSignup}
  disabled = {buttonDisabled}
  className="w-full max-w-md py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors duration-300"
>
 {buttonDisabled? "No Sign Up":"Sign Up"}
</button>
<Link href = "/login">Visit Login Page</Link>
                    </div>
      )
}
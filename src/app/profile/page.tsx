"use client"
import Link from "next/link"
import axios from "axios"
import React,{useState} from "react"
import {toast} from "react-hot-toast"
import {useRouter} from "next/navigation"

export default function ProfilePage(){
    const router = useRouter()
    const [data,setdata] = useState("nothing")

    const logout = async () => {
        try{
            await axios.get("/api/users/logout")
            toast.success("Logout successful")
            router.push("/login")
        } catch(error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.error ?? "Logout failed")
                console.log("Axios error:", error.response?.status, error.response?.data)
            } else if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error("Unknown error occurred")
            }
            console.log("Error logging out", error)
        }
    }

    const getuserdetails = async () => {
        try {
            const res = await axios.get('/api/users/me')
            console.log(res.data)
            setdata(res.data.data?._id ?? "nothing")
        } catch(error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.error ?? "Failed to get user details")
                console.log("Axios error:", error.response?.status, error.response?.data)
            } else if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error("Unknown error occurred")
            }
            console.log("Error fetching user details", error)
        }
    }

    return(
        <div className ="relative flex flex-col items-center  justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
            <h1 className = "text-2xl">Profile</h1>
            <h2 className = "text-lg">{data === "nothing"? "nothing":<Link href = {`/profile/${data}`}>{data}</Link>}</h2>
            <button className="absolute bottom-4 right-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-4xl shadow-md transition duration-300"
            onClick={logout}>
                Logout
            </button>
            <button
            className="px-6 py-3 rounded-2xl text-white font-semibold bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-md"
            onClick={getuserdetails}
            >
            Get User Details
            </button>
        </div>
    )
}

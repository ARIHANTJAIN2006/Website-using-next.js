"use client"

import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"

export default function LoginPage() {
  const router = useRouter()
  const [message, setMessage] = React.useState("")
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  })
  const [buttonDisabled, setButtonDisabled] = React.useState(true)
  const [error, setError] = React.useState(false)

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post("/api/users/login", user)
      console.log("Login success", response.data)
      toast.success("Login success")
      router.push("/profile")
    } catch (error: any) {
      setError(true)
      if (error.response?.data?.error) {
        setMessage(error.response.data.error)
        toast.error(error.response.data.error)
      } else {
        setMessage(error.message)
        toast.error(error.message)
      }
      setTimeout(() => setError(false), 3000)
      console.log("login failed", error)
    }
  }

  useEffect(() => {
    setButtonDisabled(!(user.email.length > 0 && user.password.length > 0))
  }, [user.email, user.password])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl">Login</h1>
      <br />
      <div className="w-full h-0.5 bg-yellow-200"></div>
      <form onSubmit={onLogin} className="flex flex-col w-full max-w-md">
        <label htmlFor="email" className="mt-5">Email</label>
        <input
          id="email"
          type="text"
          value={user.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, email: e.target.value })
          }
          placeholder="Email"
          className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={user.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, password: e.target.value })
          }
          placeholder="Password"
          className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && (
          <p className="mt-2 text-sm text-red-600">{message}</p>
        )}
        <button
          type="submit"
          disabled={buttonDisabled}
          className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors duration-300"
        >
          Login
        </button>
      </form>
      <Link href="/forgotpassword" className="text-sm text-blue-400 hover:underline mt-2">
        Forgot Password?
      </Link>
    </div>
  )
}

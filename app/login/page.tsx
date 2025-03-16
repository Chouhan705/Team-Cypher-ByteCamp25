"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import MumbaiFriendLogo from "@/components/mumbai-friend-logo"
import FloatingBubbles from "@/components/floating-bubbles"

export default function LoginPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [location, setLocation] = useState("Mumbai")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !age) {
      toast({
        title: "Missing Information",
        description: "Please provide your name and age to continue.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // This would be an actual API call in production
      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store user info in localStorage for demo purposes
      // In production, this would be handled by a proper auth system
      localStorage.setItem(
        "mumbaiMitraUser",
        JSON.stringify({
          name,
          age: Number.parseInt(age),
          location,
        }),
      )

      toast({
        title: "Welcome to Mumbai Mitra!",
        description: "Your account has been created successfully.",
      })

      // Redirect to home page
      router.push("/")
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Error",
        description: "There was a problem creating your account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-teal-900 via-blue-800 to-emerald-800 p-4">
      <FloatingBubbles />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="flex justify-center mb-6">
          <MumbaiFriendLogo />
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader>
            <CardTitle className="text-center">Welcome to Mumbai Mitra</CardTitle>
            <CardDescription className="text-center text-white/70">Your personal city health companion</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/20 border-white/20 placeholder:text-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Your Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  min="1"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="bg-white/20 border-white/20 placeholder:text-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Your Location</Label>
                <Input
                  id="location"
                  placeholder="Mumbai"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-white/20 border-white/20 placeholder:text-white/50"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2">
            <p className="text-sm text-white/70 text-center">
              By creating an account, you agree to receive personalized health reports based on your age and location.
            </p>
            <Button variant="link" className="text-white/70" onClick={() => router.push("/")}>
              Continue as Guest
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}


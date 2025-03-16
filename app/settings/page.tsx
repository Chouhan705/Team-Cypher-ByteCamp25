"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import FloatingBubbles from "@/components/floating-bubbles"
import MumbaiFriendLogo from "@/components/mumbai-friend-logo"

export default function SettingsPage() {
  const router = useRouter()
  const [language, setLanguage] = useState("english")
  const [notifications, setNotifications] = useState("all")
  const [darkMode, setDarkMode] = useState(true)
  const [autoPlay, setAutoPlay] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSaveSettings = async () => {
    setIsLoading(true)

    try {
      // This would be an actual API call in production
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store settings in localStorage for demo purposes
      localStorage.setItem(
        "mumbaiMitraSettings",
        JSON.stringify({
          language,
          notifications,
          darkMode,
          autoPlay,
        }),
      )

      toast({
        title: "Settings Saved",
        description: "Your preferences have been updated successfully.",
      })
    } catch (error) {
      console.error("Settings error:", error)
      toast({
        title: "Error",
        description: "There was a problem saving your settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-teal-900 via-blue-800 to-emerald-800 text-white">
      <FloatingBubbles />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-4">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-full bg-white/10 p-2 backdrop-blur-md"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-6 w-6" />
        </motion.button>

        <MumbaiFriendLogo />

        <div className="w-10" />
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-emerald-200">
            Settings
          </h1>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Audio Settings</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Audio Language</h3>
                <RadioGroup value={language} onValueChange={setLanguage} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="english" id="english" />
                    <Label htmlFor="english">English</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hindi" id="hindi" />
                    <Label htmlFor="hindi">Hindi</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="marathi" id="marathi" />
                    <Label htmlFor="marathi">Marathi</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gujarati" id="gujarati" />
                    <Label htmlFor="gujarati">Gujarati</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Auto-Play Reports</h3>
                  <p className="text-xs text-white/70">Automatically play audio when a report is loaded</p>
                </div>
                <Switch checked={autoPlay} onCheckedChange={setAutoPlay} />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>

            <RadioGroup value={notifications} onValueChange={setNotifications} className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all-notifications" />
                <Label htmlFor="all-notifications">All Notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="important" id="important-notifications" />
                <Label htmlFor="important-notifications">Important Only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="no-notifications" />
                <Label htmlFor="no-notifications">None</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Display Settings</h2>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Dark Mode</h3>
                <p className="text-xs text-white/70">Use dark theme for the application</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </div>

          <Button
            onClick={handleSaveSettings}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Saving...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Settings
              </span>
            )}
          </Button>
        </motion.div>
      </main>
    </div>
  )
}


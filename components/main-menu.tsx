"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Home, Settings, Info, Users, ChevronRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function MainMenu() {
  const router = useRouter()
  const [language, setLanguage] = useState("english")

  const handleLanguageChange = (value: string) => {
    setLanguage(value)
    // In a real app, this would update a global state or context
    // and potentially make an API call to update user preferences
  }

  const navigateTo = (path: string) => {
    router.push(path)
  }

  return (
    <div className="grid gap-4 py-4">
      <button
        className="flex items-center justify-between px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        onClick={() => navigateTo("/")}
      >
        <div className="flex items-center gap-3">
          <Home className="h-5 w-5" />
          <span>Home</span>
        </div>
        <ChevronRight className="h-4 w-4 opacity-60" />
      </button>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="settings" className="border-white/10">
          <AccordionTrigger className="flex items-center justify-between px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-3">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Audio Language</h4>
                <RadioGroup value={language} onValueChange={handleLanguageChange} className="space-y-2">
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
                </RadioGroup>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Notification Preferences</h4>
                <RadioGroup defaultValue="all" className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all">All Notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="important" id="important" />
                    <Label htmlFor="important">Important Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="none" />
                    <Label htmlFor="none">None</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <button
        className="flex items-center justify-between px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        onClick={() => navigateTo("/about")}
      >
        <div className="flex items-center gap-3">
          <Info className="h-5 w-5" />
          <span>About</span>
        </div>
        <ChevronRight className="h-4 w-4 opacity-60" />
      </button>

      <button
        className="flex items-center justify-between px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        onClick={() => navigateTo("/developers")}
      >
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5" />
          <span>Developers</span>
        </div>
        <ChevronRight className="h-4 w-4 opacity-60" />
      </button>
    </div>
  )
}


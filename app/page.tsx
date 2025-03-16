"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, User, Play, Pause, ChevronUp, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import AudioVisualizer from "@/components/audio-visualizer"
import CategoryButton from "@/components/category-button"
import FloatingBubbles from "@/components/floating-bubbles"
import { toast } from "@/components/ui/use-toast"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import MumbaiFriendLogo from "@/components/mumbai-friend-logo"
import MainMenu from "@/components/main-menu"

export default function MumbaiMitra() {
  const router = useRouter()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [audioData, setAudioData] = useState<number[]>(Array(64).fill(0))
  const animationRef = useRef<number | null>(null)
const [audioSrc, setAudioSrc] = useState(
  "https://drive.google.com/file/d/1T2L4H3gJ8Xpj7V1q5h7-PcdnLcC3oSAJ/view?usp=sharing" // Replace this!
);
  const [transcriptText, setTranscriptText] = useState<string>(
    "Good morning Mumbai! Today's city health report shows an AQI of 42, which is in the good range. The weather is sunny with a temperature of 32°C. Humidity is at 65%. Disease risk levels are low today with no significant outbreaks reported in your area. There are no calamity alerts for Mumbai today. Have a safe and healthy day!",
  )

  // Generate mock audio data for visualization when no real data is available
  const generateMockAudioData = () => {
    const mockData = Array(64)
      .fill(0)
      .map((_, i) => {
        // Create a wave pattern
        const base = Math.sin(Date.now() / 500 + i / 5) * 50 + 50
        return isPlaying ? base : base * 0.3
      })
    setAudioData(mockData)

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(generateMockAudioData)
    }
  }

  // Function to load audio from backend (placeholder for now)
  const loadAudioFromBackend = async (category?: string) => {
    try {
      // This would be replaced with actual API call
      // For now, we'll just simulate a delay and use the sample audio
      toast({
        title: "Loading Audio",
        description: `Loading ${category || "daily"} report from server...`,
      })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In the future, this would be a dynamic path from the backend
      setAudioSrc("/sample-audio.mp3")

      // Also update transcript text (would come from backend)
      if (category) {
        setTranscriptText(`This is the ${category} report for Mumbai. The data shows favorable conditions today.`)
      } else {
        setTranscriptText(
          "Good morning Mumbai! Today's city health report shows an AQI of 42, which is in the good range. The weather is sunny with a temperature of 32°C. Humidity is at 65%. Disease risk levels are low today with no significant outbreaks reported in your area. There are no calamity alerts for Mumbai today. Have a safe and healthy day!",
        )
      }

      // Reset audio element to load new source
      if (audioRef.current) {
        audioRef.current.src = audioSrc
        audioRef.current.load()
      }

      toast({
        title: "Report Ready",
        description: "Your audio report is ready to play.",
      })
    } catch (error) {
      console.error("Error loading audio:", error)
      toast({
        title: "Error",
        description: "Could not load audio report. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Toggle audio playback
  const togglePlayback = async () => {
    if (!audioRef.current) {
      // If no audio element exists yet, create one
      audioRef.current = new Audio(audioSrc)
      audioRef.current.load()
    }

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      } else {
        // Start mock data generation immediately for responsive UI
        generateMockAudioData()

        // Attempt to play the audio
        const playPromise = audioRef.current.play()

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
            })
            .catch((error) => {
              console.error("Playback error:", error)
              // Continue with mock data even if audio fails
              setIsPlaying(true)
              toast({
                title: "Audio Playback Issue",
                description: "Using visualization only. Check your audio settings.",
                variant: "destructive",
              })
            })
        }
      }
    } catch (error) {
      console.error("Audio control error:", error)
      // Continue with mock data even if audio fails
      setIsPlaying(!isPlaying)
      generateMockAudioData()
    }
  }

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  // Start mock data generation when playing state changes
  useEffect(() => {
    if (isPlaying) {
      generateMockAudioData()
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }, [isPlaying])

  const toggleTranscript = () => {
    setIsTranscriptOpen(!isTranscriptOpen)
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    loadAudioFromBackend(category)
    toast({
      title: `${category} Information`,
      description: getCategoryDescription(category),
    })
  }

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case "AQI":
        return "Arre bhai, sun na! Aaj ka hava ka haal kuch kharab hai. AQI 128 hai, aur PM2.5 sabse zyada hai. Ye sab log ke liye theek nahi hai, especially bacche, budhape wale, aur asthma wale. Bahar jaana kam karo, aur ghar mein rehna behtar hai. Agar bahar jaana hi hai, toh mask pehno. Aur saath mein, khana-peena bhi kam karo. Thoda dhyan rakhna padega, par koi tension nahi, hum saath mein hai!"
      case "Weather":
        return "Arey bhai, dekho aaj ka mausam kitna sahi hai! Yaar, temperature to bilkul perfect hai, 27 degree Celsius. Aur humidity bhi theek hai, sirf 34% hai. Bahar nikal ke thoda ghoom lo, lekin wind speed 7.8 km/h hai, toh light jacket pehen lena. Aur sky bhi saaf hai, sirf 7% cloud cover hai. Pressure bhi sahi hai, 1011 hPa. Toh aaj ka din bahut achcha hai, bahar niklo aur maza karo!"
      case "Wellness":
        return "Mumbai mein aajkal diseases ka scene thoda tight hai. Suno, kya-kya ho raha hai...Viral Fever:Mausam badal raha hai, local trains mein germs! Bukhar, khansi, body pain. Doctor: aaram karo, chai piyo. BMC: cases 30% badhe........Gastroenteritis:Street food aur polluted paani! Ulti, dast, pet mein ainthhan. Doctor: ORS piyo. 500+ cases last week........Dengue:Machhar saaf paani mein! Bukhar, joints pain, platelets down. Doctor: paani piyo, bachho. Cases 20% badhe........Bachav:Safai rakho, haath dho, machhar se bachho! Aur hanste raho. Doctor ko dikhao, zyada kharab lage toh."
      case "Wellbeing":
        return "Bro, life hectic hai? Mental health bhi dekh le.....Job pressure, traffic, competition. Break le, gym ja, chill kar. Meditation try kar. Zyada problem? Baat kar.....Phone se bahar nikal. Doston se mil. Gardens, hangouts. Real life interactions better.....Plan bana, goals set kar. Failures se mat dar. Positive reh. Parents se baat kar.....Exercise, healthy khaana, sleep. Hobbies pursue kar. Emotions express kar. Me-time nikal. Professional help le, agar zaroorat hai.....Chill reh, handle ho jayega."
      default:
        return "Information not available."
    }
  }

  const handleDailyReportClick = () => {
    loadAudioFromBackend()
    toast({
      title: "Daily City Health Report",
      description: "Generating comprehensive report for Mumbai. This will be available shortly.",
    })
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-teal-900 via-blue-800 to-emerald-800 text-white">
      <FloatingBubbles />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-4">
        <Sheet>
          <SheetTrigger asChild>
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-full bg-white/10 p-2 backdrop-blur-md"
            >
              <Menu className="h-6 w-6" />
            </motion.button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-gradient-to-br from-teal-900 via-blue-800 to-emerald-800 text-white border-r-white/10 overflow-y-auto"
          >
            <SheetHeader>
              <SheetTitle className="text-white">Mumbai Mitra Menu</SheetTitle>
            </SheetHeader>
            <MainMenu />
          </SheetContent>
        </Sheet>

        <MumbaiFriendLogo />

        <Sheet>
          <SheetTrigger asChild>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-full bg-white/10 p-2 backdrop-blur-md"
            >
              <User className="h-6 w-6" />
            </motion.button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-gradient-to-br from-teal-900 via-blue-800 to-emerald-800 text-white border-l-white/10"
          >
            <SheetHeader>
              <SheetTitle className="text-white">User Profile</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col items-center gap-4 py-6">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                <User className="h-10 w-10" />
              </div>
              <h3 className="text-lg font-medium">Guest User</h3>
              <p className="text-sm text-white/70">Mumbai, Maharashtra</p>
              <button
                className="w-full px-4 py-2 mt-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                onClick={() => router.push("/login")}
              >
                Sign In
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-8 pb-32">
        {/* Audio Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className={`relative flex items-center justify-center w-64 h-64 mb-8 rounded-full ${
            isPlaying ? "shadow-[0_0_30px_rgba(20,184,166,0.5)]" : ""
          }`}
        >
          <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-md"></div>
          <AudioVisualizer audioData={audioData} isPlaying={isPlaying} />

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={togglePlayback}
            className="absolute z-10 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600"
          >
            {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
          </motion.button>
        </motion.div>

        {/* Daily Report Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDailyReportClick}
          className="mb-8 px-8 py-3 rounded-full bg-gradient-to-r from-teal-500 via-blue-500 to-emerald-500 font-semibold shadow-lg"
        >
          Today's City Health Report
        </motion.button>

        {/* Category Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-4 w-full max-w-xs mb-8"
        >
          <CategoryButton
            title="AQI Report"
            description="Good (42)"
            colorFrom="from-emerald-500"
            colorTo="to-teal-500"
            delay={0.7}
            onClick={() => handleCategoryClick("AQI")}
            isSelected={selectedCategory === "AQI"}
          />
          <CategoryButton
            title="Weather Report"
            description="Sunny (32°C)"
            colorFrom="from-sky-500"
            colorTo="to-blue-500"
            delay={0.7}
            onClick={() => handleCategoryClick("Weather")}
            isSelected={selectedCategory === "Weather"}
          />
          <CategoryButton
            title="Wellness Report"
            description="Low Risk"
            colorFrom="from-amber-500"
            colorTo="to-orange-500"
            delay={0.7}
            onClick={() => handleCategoryClick("Wellness")}
            isSelected={selectedCategory === "Wellness"}
          />
          <CategoryButton
            title="Wellbeing Advice"
            description="Positive"
            colorFrom="from-rose-500"
            colorTo="to-red-500"
            delay={0.7}
            onClick={() => handleCategoryClick("Wellbeing")}
            isSelected={selectedCategory === "Wellbeing"}
          />
        </motion.div>
      </main>

      {/* Transcript Panel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="fixed bottom-0 left-0 right-0 z-20"
      >
        <motion.div
          className={`backdrop-blur-md rounded-t-2xl p-4 shadow-lg transition-all duration-300 ${
            isTranscriptOpen ? "bg-white/60" : "bg-white/30"
          }`}
          animate={{
            height: isTranscriptOpen ? "auto" : "auto",
            paddingBottom: isTranscriptOpen ? "2rem" : "1rem",
            maxHeight: isTranscriptOpen ? "50vh" : "auto",
          }}
        >
          <div className="flex items-center justify-between cursor-pointer" onClick={toggleTranscript}>
            <h3 className={`font-semibold ${isTranscriptOpen ? "text-slate-900" : "text-white"}`}>Transcript</h3>
            <button>
              {isTranscriptOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
            </button>
          </div>

          <AnimatePresence>
            {isTranscriptOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 text-sm max-h-[40vh] overflow-y-auto"
              >
                <p className="mb-2 text-slate-900 font-medium">{transcriptText}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  )
}


"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Heart, Shield, Zap, Globe } from "lucide-react"
import { useRouter } from "next/navigation"
import FloatingBubbles from "@/components/floating-bubbles"
import MumbaiFriendLogo from "@/components/mumbai-friend-logo"

export default function AboutPage() {
  const router = useRouter()

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
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-emerald-200">
            About Mumbai Mitra
          </h1>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
            <p className="mb-4">
              Mumbai Mitra (meaning "Mumbai's Friend") was created with a simple yet powerful mission: to provide
              accessible, personalized health and environmental information to every resident of Mumbai, helping them
              make informed decisions about their daily activities and long-term wellbeing.
            </p>
            <p>
              In a city as dynamic and densely populated as Mumbai, staying informed about environmental conditions,
              health risks, and wellbeing factors can be challenging. Mumbai Mitra bridges this gap by delivering
              tailored, location-specific reports directly to your device, in your preferred language.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-teal-500/20 p-2 rounded-lg">
                  <Heart className="h-6 w-6 text-teal-300" />
                </div>
                <h3 className="text-lg font-semibold">Health-First Approach</h3>
              </div>
              <p>
                We prioritize your health by providing accurate, timely information about air quality, disease risks,
                and wellness factors that might affect your daily life in Mumbai.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Globe className="h-6 w-6 text-blue-300" />
                </div>
                <h3 className="text-lg font-semibold">Hyperlocal Intelligence</h3>
              </div>
              <p>
                Our reports are tailored to your specific location within Mumbai, ensuring you receive the most relevant
                information for your neighborhood and daily routes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-emerald-500/20 p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-emerald-300" />
                </div>
                <h3 className="text-lg font-semibold">Privacy Focused</h3>
              </div>
              <p>
                We collect only the information necessary to provide you with personalized reports. Your data is never
                sold or shared with third parties for advertising purposes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-amber-500/20 p-2 rounded-lg">
                  <Zap className="h-6 w-6 text-amber-300" />
                </div>
                <h3 className="text-lg font-semibold">Accessible to All</h3>
              </div>
              <p>
                Mumbai Mitra is designed to be accessible to everyone, with support for multiple languages and an
                intuitive interface that works for users of all ages and technical abilities.
              </p>
            </motion.div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Our Technology</h2>
            <p className="mb-4">
              Mumbai Mitra combines advanced data analytics with user-friendly design to deliver a seamless experience.
              We aggregate data from multiple trusted sources, including government weather stations, air quality
              monitors, health departments, and emergency services.
            </p>
            <p className="mb-4">
              Our proprietary algorithms process this data to generate personalized reports that are both informative
              and actionable. The audio reports are generated using natural language processing and text-to-speech
              technology, allowing for a more accessible and engaging user experience.
            </p>
            <p>
              As we grow, we continue to refine our technology and expand our data sources to provide even more accurate
              and comprehensive information to our users.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}


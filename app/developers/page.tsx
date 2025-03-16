"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Github, Linkedin, Twitter } from "lucide-react"
import { useRouter } from "next/navigation"
import FloatingBubbles from "@/components/floating-bubbles"
import MumbaiFriendLogo from "@/components/mumbai-friend-logo"

interface DeveloperCardProps {
  name: string
  role: string
  bio: string
  imageUrl: string
  delay: number
}

function DeveloperCard({ name, role, bio, imageUrl, delay }: DeveloperCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden"
    >
      <div className="aspect-square relative">
        <img src={imageUrl || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-4">
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-white/80">{role}</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm mb-4">{bio}</p>
        <div className="flex gap-2">
          <a
            href="#"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label={`${name}'s GitHub profile`}
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label={`${name}'s LinkedIn profile`}
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label={`${name}'s Twitter profile`}
          >
            <Twitter className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function DevelopersPage() {
  const router = useRouter()

  const developers = [
    {
      name: "Aditya Chouhan",
      role: "Project Leader/Backend",
      bio: "Experienced backend developer with expertise in Python and database management. Leads the Mumbai Mitra project with a focus on scalable architecture and reliable data processing.",
      imageUrl: "/placeholder.svg?height=300&width=300",
      delay: 0.3,
    },
    {
      name: "Siddharth Verma",
      role: "Lead Researcher",
      bio: "Data scientist specializing in environmental and health metrics. Responsible for developing the algorithms that power Mumbai Mitra's personalized health reports.",
      imageUrl: "/placeholder.svg?height=300&width=300",
      delay: 0.4,
    },
    {
      name: "Arjun Marar",
      role: "Frontend Developer",
      bio: "Creative frontend developer with a passion for intuitive user interfaces. Designed and implemented Mumbai Mitra's responsive and accessible user experience.",
      imageUrl: "/placeholder.svg?height=300&width=300",
      delay: 0.5,
    },
    {
      name: "Soumyaranjan Maharana",
      role: "Integration Expert",
      bio: "Systems architect specializing in API integration and data pipelines. Ensures seamless communication between Mumbai Mitra's frontend and backend systems.",
      imageUrl: "/placeholder.svg?height=300&width=300",
      delay: 0.6,
    },
  ]

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
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-emerald-200">
            Meet Our Team
          </h1>

          <p className="text-center mb-8 max-w-2xl mx-auto">
            Mumbai Mitra is brought to you by a dedicated team of professionals passionate about improving the health
            and wellbeing of Mumbai's residents through technology and innovation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {developers.map((developer) => (
              <DeveloperCard key={developer.name} {...developer} />
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}


"use client"

import { motion } from "framer-motion"

export default function MumbaiFriendLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex items-center gap-2"
    >
      <div className="relative">
        <span className="text-2xl">🫂</span>
      </div>
      <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-emerald-200">
        Mumbai Mitra
      </h1>
    </motion.div>
  )
}


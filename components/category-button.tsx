"use client"

import { motion } from "framer-motion"

interface CategoryButtonProps {
  title: string
  description: string
  colorFrom: string
  colorTo: string
  delay: number
  onClick: () => void
  isSelected?: boolean
}

export default function CategoryButton({
  title,
  description,
  colorFrom,
  colorTo,
  delay,
  onClick,
  isSelected = false,
}: CategoryButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`rounded-xl bg-gradient-to-br ${colorFrom} ${colorTo} p-4 shadow-lg cursor-pointer relative ${
        isSelected ? "ring-2 ring-white ring-opacity-70" : ""
      }`}
    >
      {isSelected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-xl bg-white/10"
        />
      )}
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="text-sm text-white/90">{description}</p>
    </motion.div>
  )
}


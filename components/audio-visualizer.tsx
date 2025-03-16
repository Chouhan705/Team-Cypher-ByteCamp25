"use client"

import { useRef, useEffect } from "react"

interface AudioVisualizerProps {
  audioData: number[]
  isPlaying: boolean
}

export default function AudioVisualizer({ audioData, isPlaying }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const parentRect = canvas.parentElement?.getBoundingClientRect()
    if (parentRect) {
      canvas.width = parentRect.width * dpr
      canvas.height = parentRect.height * dpr
      canvas.style.width = `${parentRect.width}px`
      canvas.style.height = `${parentRect.height}px`
      ctx.scale(dpr, dpr)
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw active waveform
    const centerX = canvas.width / (2 * dpr)
    const centerY = canvas.height / (2 * dpr)
    const radius = Math.min(centerX, centerY) - 30

    // Draw base circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw waveform bars
    const barCount = Math.min(audioData.length, 64)
    const barWidth = 2

    for (let i = 0; i < barCount; i++) {
      const angle = (i * 2 * Math.PI) / barCount
      const value = audioData[i] || 0
      const barHeight = (value / 255) * 50 // Scale the bar height based on audio data

      const x1 = centerX + radius * Math.cos(angle)
      const y1 = centerY + radius * Math.sin(angle)
      const x2 = centerX + (radius + barHeight) * Math.cos(angle)
      const y2 = centerY + (radius + barHeight) * Math.sin(angle)

      // Create gradient for each bar - updated to teal/blue palette
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2)
      gradient.addColorStop(0, "rgba(20, 184, 166, 0.5)") // Teal
      gradient.addColorStop(1, "rgba(6, 182, 212, 0.8)") // Cyan

      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.strokeStyle = gradient
      ctx.lineWidth = barWidth
      ctx.stroke()
    }

    // Add a pulsing glow effect when playing
    if (isPlaying) {
      const time = (Date.now() % 2000) / 2000
      const glowSize = 5 + Math.sin(time * Math.PI * 2) * 3

      ctx.beginPath()
      ctx.arc(centerX, centerY, radius + glowSize, 0, 2 * Math.PI)
      const glowGradient = ctx.createRadialGradient(centerX, centerY, radius, centerX, centerY, radius + 20)
      glowGradient.addColorStop(0, "rgba(20, 184, 166, 0.3)") // Teal
      glowGradient.addColorStop(1, "rgba(20, 184, 166, 0)")
      ctx.fillStyle = glowGradient
      ctx.fill()
    }
  }, [audioData, isPlaying])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}


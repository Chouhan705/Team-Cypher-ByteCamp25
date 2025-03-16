"use client"

import { useEffect, useRef } from "react"

interface Bubble {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
}

export default function FloatingBubbles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full window size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create bubbles
    const bubbles: Bubble[] = []
    const bubbleCount = 15

    // Updated colors to green and blue palette
    const colors = [
      "rgba(20, 184, 166, 0.3)", // Teal
      "rgba(6, 182, 212, 0.3)", // Cyan
      "rgba(16, 185, 129, 0.3)", // Emerald
      "rgba(59, 130, 246, 0.3)", // Blue
      "rgba(14, 165, 233, 0.3)", // Sky
    ]

    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 30 + Math.random() * 100,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.1 + Math.random() * 0.3,
      })
    }

    // Animation loop
    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      bubbles.forEach((bubble) => {
        // Update position
        bubble.x += bubble.speedX
        bubble.y += bubble.speedY

        // Bounce off edges
        if (bubble.x < 0 || bubble.x > canvas.width) {
          bubble.speedX *= -1
        }

        if (bubble.y < 0 || bubble.y > canvas.height) {
          bubble.speedY *= -1
        }

        // Draw bubble
        const gradient = ctx.createRadialGradient(bubble.x, bubble.y, 0, bubble.x, bubble.y, bubble.size)

        gradient.addColorStop(0, bubble.color.replace("0.3", "0.5"))
        gradient.addColorStop(1, bubble.color.replace("0.3", "0"))

        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />
}


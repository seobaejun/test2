"use client"

import React, { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface TimelineItem {
  id: number
  title: string
  date: string
  content: string
  category: string
  icon: React.ComponentType<{ className?: string }>
  relatedIds: number[]
  energy: number
}

interface RadialOrbitalTimelineProps {
  data: TimelineItem[]
  className?: string
}

export function RadialOrbitalTimeline({ data, className }: RadialOrbitalTimelineProps) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const [rotationAngle, setRotationAngle] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)
  const rotationTimer = useRef<NodeJS.Timeout | null>(null)

  const getEnergyColor = (energy: number) => {
    if (energy >= 80) return "text-green-400"
    if (energy >= 60) return "text-yellow-400"
    if (energy >= 40) return "text-orange-400"
    return "text-red-400"
  }

  // Auto rotation effect
  useEffect(() => {
    if (autoRotate) {
      rotationTimer.current = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360
          return Number(newAngle.toFixed(3))
        })
      }, 50)
    }

    return () => {
      if (rotationTimer.current) {
        clearInterval(rotationTimer.current)
      }
    }
  }, [autoRotate])

  // Calculate node position with rotation
  const calculateNodePosition = (index: number, total: number) => {
    const angle = (((index / total) * 360) + rotationAngle) % 360
    const radius = 250 // Increased radius for more space
    const radian = (angle * Math.PI) / 180
    const x = radius * Math.cos(radian)
    const y = radius * Math.sin(radian)
    const zIndex = Math.round(100 + 50 * Math.cos(radian))
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)))
    
    return { x, y, angle, zIndex, opacity }
  }

  // Pause rotation on hover
  const handleMouseEnter = (itemId: number) => {
    setHoveredItem(itemId)
    setAutoRotate(false)
  }

  const handleMouseLeave = () => {
    setHoveredItem(null)
    setAutoRotate(true)
  }

  return (
    <div className={cn("relative w-full h-[1000px] overflow-visible", className)}>
      {/* Center circle */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center z-50">
        <span className="text-white font-bold text-lg">부스트웹</span>
      </div>

      {/* Connection circle around center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-gray-600/30 rounded-full" />
      
      {/* Second connection circle */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-100 h-100 border border-gray-600/20 rounded-full" />

      {/* Timeline items positioned in a circle with rotation */}
      {data.map((item, index) => {
        const position = calculateNodePosition(index, data.length)
        const isHovered = hoveredItem === item.id

        return (
          <div
            key={item.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300"
            style={{
              left: `calc(50% + ${position.x}px)`,
              top: `calc(50% + ${position.y}px)`,
              zIndex: position.zIndex,
              opacity: position.opacity,
            }}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Connection line to center - curved line */}
            <svg
              className="absolute pointer-events-none"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "500px",
                height: "500px",
              }}
            >
              <path
                d={`M 250 250 Q ${250 + position.x/2} ${250 + position.y/2} ${250 + position.x} ${250 + position.y}`}
                stroke="rgba(107, 114, 128, 0.3)"
                strokeWidth="1"
                fill="none"
                className="opacity-60"
              />
            </svg>

            {/* Timeline item - compact by default, expanded on hover */}
            <div className={cn(
              "relative bg-gray-800/90 backdrop-blur-sm border border-white/20 rounded-2xl transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20",
              isHovered ? "p-6 w-80 scale-110" : "p-4 w-48 scale-100"
            )}>
              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <span className="text-sm text-gray-400">{item.date}</span>
                </div>
                
                {/* Only show detailed content when hovered */}
                {isHovered && (
                  <>
                    <p className="text-sm text-gray-300 leading-relaxed">{item.content}</p>
                    
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                        {item.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-600 rounded-full" />
                        <span className={cn("text-xs font-medium", getEnergyColor(item.energy))}>
                          {item.energy}%
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        )
      })}
    </div>
  )
}

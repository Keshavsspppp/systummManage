    "use client"

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface GlowButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

export default function GlowButton({ 
  children, 
  className = '', 
  onClick,
  variant = 'primary' 
}: GlowButtonProps) {
  const baseClasses = variant === 'primary' 
    ? "relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden group"
    : "relative px-8 py-4 rounded-xl font-semibold border-2 overflow-hidden group"

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 transition-all duration-300 group-hover:scale-110" />
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-500" />
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  )
}

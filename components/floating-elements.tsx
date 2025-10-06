"use client"

import { motion } from "framer-motion"

export function FloatingElements() {
  return (
    <>
      {/* Floating Gold Sparkles */}
      <motion.div
        className="absolute top-1/4 left-1/4 text-gold opacity-50"
        animate={{
          y: [0, 20, 0],
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 right-1/4 text-gold opacity-50"
        animate={{
          y: [0, -20, 0],
          rotate: [0, -360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute top-1/2 left-1/2 text-gold opacity-50"
        animate={{
          x: [0, 15, 0],
          y: [0, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        ✨
      </motion.div>

      {/* Floating Royal Blue Sparkles (now subtle on blue background) */}
      <motion.div
        className="absolute top-1/3 right-1/3 text-secondary opacity-40" /* Royal blue sparkle, using secondary for subtle contrast */
        animate={{
          y: [0, 15, 0],
          rotate: [0, -270],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.3,
        }}
      >
        ✦
      </motion.div>
      <motion.div
        className="absolute bottom-1/4 left-1/3 text-secondary opacity-40" /* Royal blue sparkle */
        animate={{
          x: [0, -10, 0],
          y: [0, 10, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 11,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.8,
        }}
      >
        ✦
      </motion.div>
    </>
  )
}

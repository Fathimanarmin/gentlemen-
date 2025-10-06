"use client"
import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { useState } from "react"
import { WhatsAppContactModal } from "./WhatsAppContactModal"

export function WhatsAppFloatingButton() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover-glow"
        onClick={() => setShowModal(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle size={24} />
      </motion.button>
      <WhatsAppContactModal  isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}

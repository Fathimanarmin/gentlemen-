// "use client"
// import { motion, AnimatePresence } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { MessageCircle } from "lucide-react"

// interface WhatsAppContactModalProps {
//   isOpen: boolean
//   onClose: () => void
// }

// export function WhatsAppContactModal({ isOpen, onClose }: WhatsAppContactModalProps) {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={onClose}
//         >
//           <motion.div
//             className="bg-card p-8 rounded-lg max-w-md mx-4 glow-border"
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.8, opacity: 0 }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h3 className="text-2xl font-serif text-gold mb-6 text-center">Chat with Us</h3>
//             <p className="text-foreground mb-6 text-center">Choose a store to WhatsApp directly</p>
//             <div className="space-y-4">
//               <Button
//                 className="w-full bg-green-500 hover:bg-green-600 text-white"
//                 onClick={() =>
//                   window.open("https://wa.me/971567800180 ", "_blank") // Dubai WhatsApp
//                 }
//               >
//                 <MessageCircle className="mr-2" size={16} />
//                 Dubai Store WhatsApp
//               </Button>
//               <Button
//                 className="w-full bg-green-500 hover:bg-green-600 text-white"
//                 onClick={() =>
//                   window.open("https://wa.me/971585738072", "_blank") // Sharjah WhatsApp
//                 }
//               >
//                 <MessageCircle className="mr-2" size={16} />
//                 Sharjah Store WhatsApp
//               </Button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   )
// }

"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface WhatsAppContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WhatsAppContactModal({
  isOpen,
  onClose,
}: WhatsAppContactModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-card p-8 rounded-lg max-w-md mx-4 glow-border"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-serif text-gold mb-6 text-center">
              Chat with Us
            </h3>
            <p className="text-foreground mb-6 text-center">
              Choose a store to WhatsApp directly
            </p>
            <div className="space-y-4">
              {/* <Button
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                onClick={() =>
                  window.open(
                    "https://wa.me/971567800180?text=" +
                      encodeURIComponent(
                        "Hi, I’m interested in your Dubai store services."
                      ),
                    "_blank"
                  )
                }
              >
                <MessageCircle className="mr-2" size={16} />
                Dubai Store WhatsApp
              </Button>

              <Button
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                onClick={() =>
                  window.open(
                    "https://wa.me/971585738072?text=" +
                      encodeURIComponent(
                        "Hi, I’m interested in your Sharjah store services."
                      ),
                    "_blank"
                  )
                }
              >
                <MessageCircle className="mr-2" size={16} />
                Sharjah Store WhatsApp
              </Button> */}

              <Button
  className="w-full bg-green-500 hover:bg-green-600 text-white"
  onClick={() =>
    window.open(
      `https://wa.me/971567800180?text=${encodeURIComponent(
        `Hi, I’m interested in your Dubai store services. I found you on the ${window.location.pathname} page.`
      )}`,
      "_blank"
    )
  }
>
  <MessageCircle className="mr-2" size={16} />
  Dubai Store WhatsApp
</Button>

<Button
  className="w-full bg-green-500 hover:bg-green-600 text-white"
  onClick={() =>
    window.open(
      `https://wa.me/971585738072?text=${encodeURIComponent(
        `Hi, I’m interested in your Sharjah store services. I found you on the ${window.location.pathname} page.`
      )}`,
      "_blank"
    )
  }
>
  <MessageCircle className="mr-2" size={16} />
  Sharjah Store WhatsApp
</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


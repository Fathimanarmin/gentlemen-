// "use client"
// import { motion, AnimatePresence } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { MapPin } from "lucide-react"

// interface WhatsAppModalProps {
//   isOpen: boolean
//   onClose: () => void
// }

// export function WhatsAppModal({ isOpen, onClose }: WhatsAppModalProps) {
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
//             <h3 className="text-2xl font-serif text-gold mb-6 text-center">Book Now</h3>
//             <p className="text-foreground mb-6 text-center">Where would you like to Book?</p>
//             <div className="space-y-4">
//               <Button
//                 className="w-full bg-green-500 hover:bg-green-600 text-white"
//                 onClick={() => window.open("https://bookings.gettimely.com/thegentlementimes/bb/book", "_blank")}
//               >
//                 <MapPin className="mr-2" size={16} />
//                 Dubai Store
//               </Button>
//               <Button
//                 className="w-full bg-green-500 hover:bg-green-600 text-white"
//                 onClick={() => window.open("https://store.zylu.co/the-gentlemen-times-barbers-llc", "_blank")}
//               >
//                 <MapPin className="mr-2" size={16} />
//                 Sharjah Store
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
import { MapPin } from "lucide-react";
import { useState, useEffect } from "react";

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WhatsAppModal({ isOpen, onClose }: WhatsAppModalProps) {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const getWhatsAppLink = (phone: string, store: string) =>
    `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(
      `Hi, I’m interested in your ${store} store services. I found you on the ${currentPath} page.`
    )}`;

  const handleClick = (phone: string, store: string) => {
    window.open(getWhatsAppLink(phone, store), "_blank");
    onClose(); // close the modal after opening WhatsApp
  };

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
            <h3 className="text-2xl font-serif text-gold mb-6 text-center">Book Now</h3>
            <p className="text-foreground mb-6 text-center">Where would you like to Book?</p>
            <div className="space-y-4">
              <Button
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                onClick={() => handleClick("971567800180", "Dubai")}
              >
                <MapPin className="mr-2" size={16} />
                Dubai Store
              </Button>
              <Button
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                onClick={() => handleClick("971585738072", "Sharjah")}
              >
                <MapPin className="mr-2" size={16} />
                Sharjah Store
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

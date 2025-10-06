// "use client";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { MapPin } from "lucide-react";
// import { WhatsAppModal } from "./whatsapp-modal";
// import { useState } from "react";

// interface NewStoreDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export function NewStoreDialog({ isOpen, onClose }: NewStoreDialogProps) {
//   const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

//   const handleGetDirections = () => {
//     window.open("https://maps.app.goo.gl/HZpxb8URRhUD8HLY9", "_blank"); // Replace with actual Sharjah map link
//     onClose();
//   };

//   const handleBookNow = () => {
//     setIsWhatsAppModalOpen(true);
//   };

//   return (
//     <>
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//           >
//             <motion.div
//               className="bg-card p-8 rounded-lg max-w-md mx-4 glow-border text-center relative"
//               initial={{ scale: 0.5, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.5, opacity: 0 }}
//               transition={{ type: "spring", stiffness: 200, damping: 20 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <Button
//                 className="absolute top-4 right-4 text-foreground hover:text-gold"
//                 variant="ghost"
//                 size="icon"
//                 onClick={onClose}
//               >
//                 &times;
//               </Button>
//               <motion.span
//                 className="text-6xl mb-4 block"
//                 initial={{ scale: 0, rotate: 0 }}
//                 animate={{ scale: 1, rotate: 10 }} // Use single values
//                 transition={{
//                   type: "spring",
//                   stiffness: 260,
//                   damping: 20,
//                   delay: 0.2,
//                 }}
//               >
//                 🎉
//               </motion.span>
//               <h3 className="text-3xl font-serif text-gold mb-4">
//                 We’ve Arrived!
//               </h3>
//               <p className="text-foreground/90 text-lg mb-8">
//                 New Store Now Open in Sharjah
//               </p>
//               <div className="flex flex-col space-y-4">
//                 <Button
//                   className="bg-gold hover:bg-gold/90 text-charcoal px-8 py-3 hover-glow"
//                   onClick={handleGetDirections}
//                 >
//                   <MapPin className="mr-2" size={16} />
//                   Get Directions
//                 </Button>
//                 <Button
//                   className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 hover-glow"
//                   onClick={handleBookNow}
//                 >
//                   Book Now
//                 </Button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//       <WhatsAppModal
//         isOpen={isWhatsAppModalOpen}
//         onClose={() => setIsWhatsAppModalOpen(false)}
//       />
//     </>
//   );
// }

"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { WhatsAppModal } from "./whatsapp-modal";
import { useState, useEffect } from "react";

interface NewStoreDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewStoreDialog({ isOpen, onClose }: NewStoreDialogProps) {
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  // ⏳ Auto-close after 3 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      timer = setTimeout(() => {
        onClose();
      }, 1500); 
    }
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  const handleGetDirections = () => {
    window.open("https://maps.app.goo.gl/HZpxb8URRhUD8HLY9", "_blank"); 
    onClose();
  };

  const handleBookNow = () => {
    setIsWhatsAppModalOpen(true);
  };

  return (
    <>
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
              className="bg-card p-8 rounded-lg max-w-md mx-4 glow-border text-center relative"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                className="absolute top-4 right-4 text-foreground hover:text-gold"
                variant="ghost"
                size="icon"
                onClick={onClose}
              >
                &times;
              </Button>
              <motion.span
                className="text-6xl mb-4 block"
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 10 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2,
                }}
              >
                🎉
              </motion.span>
              <h3 className="text-3xl font-serif text-gold mb-4">
                We’ve Arrived!
              </h3>
              <p className="text-foreground/90 text-lg mb-8">
                New Store Now Open in Sharjah
              </p>
              <div className="flex flex-col space-y-4">
                <Button
                  className="bg-gold hover:bg-gold/90 text-charcoal px-8 py-3 hover-glow"
                  onClick={handleGetDirections}
                >
                  <MapPin className="mr-2" size={16} />
                  Get Directions
                </Button>
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 hover-glow"
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />
    </>
  );
}


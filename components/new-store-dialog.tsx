

// "use client";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { MapPin } from "lucide-react";
// import { useState, useEffect } from "react";
// import { BookingPopup } from "./BookingPopup"; // 👈 import the new popup

// interface NewStoreDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export function NewStoreDialog({ isOpen, onClose }: NewStoreDialogProps) {
//   const [isBookingPopupOpen, setIsBookingPopupOpen] = useState(false);

//   // ⏳ Auto-close main popup
//   useEffect(() => {
//     let timer: NodeJS.Timeout;
//     if (isOpen) {
//       timer = setTimeout(() => {
//         onClose();
//       }, 2000);
//     }
//     return () => clearTimeout(timer);
//   }, [isOpen, onClose]);

//   const handleGetDirections = () => {
//     window.open("https://maps.app.goo.gl/HZpxb8URRhUD8HLY9", "_blank");
//     onClose();
//   };

//   const handleBookNow = () => {
//     setIsBookingPopupOpen(true); // 👈 open the new popup
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
//               transition={{ type: 'spring', stiffness: 200, damping: 20 }}
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
//                 animate={{ scale: 1, rotate: 10 }}
//                 transition={{
//                   type: 'spring',
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

//       {/* 💚 Green booking popup */}
//       <BookingPopup
//         isOpen={isBookingPopupOpen}
//         onClose={() => setIsBookingPopupOpen(false)}
//       />
//     </>
//   );
// }


"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { BookingPopup } from "./BookingPopup";

interface NewStoreDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewStoreDialog({ isOpen, onClose }: NewStoreDialogProps) {
  const [isBookingPopupOpen, setIsBookingPopupOpen] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      timer = setTimeout(() => {
        onClose();
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  const handleGetDirections = () => {
    window.open("https://maps.app.goo.gl/HZpxb8URRhUD8HLY9", "_blank");
    onClose();
  };

  const handleBookNow = () => {
    setIsBookingPopupOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="bg-white text-blue-900 p-10 rounded-xl max-w-lg mx-4 shadow-2xl text-center relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 text-2xl font-bold"
                onClick={onClose}
              >
                &times;
              </button>

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

              <h3 className="text-3xl sm:text-4xl font-bold mb-3">
                We’ve Arrived!
              </h3>
              <p className="text-lg sm:text-xl mb-6 font-medium">
                Our New Store is Now Open in Sharjah 🎊
              </p>

              <div className="flex flex-col space-y-4 mt-6">
                <Button
                  className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-md font-semibold"
                  onClick={handleGetDirections}
                >
                  <MapPin className="mr-2" size={16} />
                  Get Directions
                </Button>

                <Button
                  className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-8 py-3 rounded-md font-semibold border border-blue-300"
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>
              </div>

              <p className="text-sm text-gray-500 mt-6">
                Continue exploring our services and offers.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking popup */}
      <BookingPopup
        isOpen={isBookingPopupOpen}
        onClose={() => setIsBookingPopupOpen(false)}
      />
    </>
  );
}

// "use client";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button";

// interface BookingPopupProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export function BookingPopup({ isOpen, onClose }: BookingPopupProps) {
//   const handleDubaiClick = () => {
//     window.open("https://bookings.gettimely.com/thegentlementimes/bb/book", "_blank");
//     onClose();
//   };

//   const handleSharjahClick = () => {
//     window.open("https://store.zylu.co/the-gentlemen-times-barbers-llc", "_blank");
//     onClose();
//   };

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
//             className="bg-green-500 text-white rounded-2xl p-8 shadow-2xl max-w-sm mx-4 text-center"
//             initial={{ scale: 0.5, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.5, opacity: 0 }}
//             transition={{ type: "spring", stiffness: 200, damping: 20 }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={onClose}
//               className="absolute top-3 right-4 text-white text-2xl hover:text-yellow-300"
//             >
//               &times;
//             </button>

//             <h2 className="text-2xl font-semibold mb-6">Choose Your Store</h2>

//             <div className="flex flex-col gap-4">
//               <Button
//                 className="bg-white text-green-700 hover:bg-green-100 font-bold text-lg py-3 rounded-xl"
//                 onClick={handleDubaiClick}
//               >
//                 Dubai Store
//               </Button>

//               <Button
//                 className="bg-white text-green-700 hover:bg-green-100 font-bold text-lg py-3 rounded-xl"
//                 onClick={handleSharjahClick}
//               >
//                 Sharjah Store
//               </Button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }


"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface BookingPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingPopup({ isOpen, onClose }: BookingPopupProps) {
  const handleDubaiClick = () => {
    window.open("https://bookings.gettimely.com/thegentlementimes/bb/book", "_blank");
    onClose();
  };

  const handleSharjahClick = () => {
    window.open("https://store.zylu.co/the-gentlemen-times-barbers-llc", "_blank");
    onClose();
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
            className="bg-card p-8 rounded-lg max-w-md mx-4 glow-border text-center relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-2xl text-foreground hover:text-gold"
            >
              &times;
            </button>

            <h3 className="text-2xl font-serif text-gold mb-6">Book Now</h3>
            <p className="text-foreground mb-6">
              Where would you like to book your appointment?
            </p>

            <div className="space-y-4">
              <Button
                className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-3 font-semibold flex items-center justify-center"
                onClick={handleDubaiClick}
              >
                <MapPin className="mr-2" size={16} />
                Dubai Store
              </Button>

              <Button
                className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-3 font-semibold flex items-center justify-center"
                onClick={handleSharjahClick}
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

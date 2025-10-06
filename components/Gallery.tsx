// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import { useState, useRef, useEffect } from "react";
// import { useInView } from "framer-motion";
// import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "./ui/button";


// import professional from "../public/images/TGT-20.jpg";
// import professional2 from "../public/images/TGT-13.jpg";
// import professional3 from "../public/images/TGT-18.jpg";
// import professional4 from "../public/images/TGT-25.jpg";
// import professional5 from "../public/images/TGT-8.jpg";
// import image1 from "../public/images/TGT-10.jpg";
// import image2 from "../public/images/TGT-15.jpg";
// import image3 from "../public/images/TGT-24.jpg";
// import image4 from "../public/images/TGT-28.jpg";
// import image5 from "../public/images/TGT-9.jpg";
// import team from "../public/images/team.jpg";

// const galleryImages = [
//   { src: team, alt: "", category: "" },
//   { src: professional, alt: "", category: "" },
//   { src: image1, alt: "", category: "" },
//   { src: professional2, alt: "", category: "" },
//   { src: image2, alt: "", category: "" },
//   { src: professional3, alt: "", category: "" },
//   { src: image3, alt: "", category: "" },
//   { src: professional4, alt: "", category: "" },
//   { src: image4, alt: "", category: "" },
//   { src: image5, alt: "", category: "" },
//   { src: professional5, alt: "", category: "" },
  
// ];

// export default function Gallery() {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });

//   // Pagination
//   const [page, setPage] = useState(0);
//   const imagesPerPage = 6;
//   const paginatedImages = galleryImages.slice(
//     page * imagesPerPage,
//     (page + 1) * imagesPerPage
//   );
//   const totalPages = Math.ceil(galleryImages.length / imagesPerPage);

//   // Lightbox state
//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

//   const handlePrev = () => {
//     if (selectedIndex !== null) {
//       setSelectedIndex((prev) =>
//         prev === 0 ? galleryImages.length - 1 : (prev ?? 0) - 1
//       );
//     }
//   };

//   const handleNext = () => {
//     if (selectedIndex !== null) {
//       setSelectedIndex((prev) =>
//         prev === galleryImages.length - 1 ? 0 : (prev ?? 0) + 1
//       );
//     }
//   };

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKey = (e: KeyboardEvent) => {
//       if (selectedIndex === null) return;
//       if (e.key === "ArrowLeft") handlePrev();
//       if (e.key === "ArrowRight") handleNext();
//       if (e.key === "Escape") setSelectedIndex(null);
//     };
//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, [selectedIndex]);

//   return (
//     <section
//       id="gallery"
//       className="py-20 bg-background relative overflow-hidden section-divider"
//     >
//       <div className="max-w-6xl mx-auto px-6 relative z-10" ref={ref}>
//         {/* Section Heading */}
//         <motion.div
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//         >
//           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-gold mb-3 sm:mb-4">
//              Our Gallery
//           </h2>
//           <p className="text-foreground/90 text-sm sm:text-base lg:text-lg">
//             A glimpse into our premium grooming experience
//           </p>
//         </motion.div>

//         {/* Gallery Grid */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8, delay: 0.3 }}
//           className="grid grid-cols-2 md:grid-cols-3 gap-4"
//         >
//           {paginatedImages.map((img, idx) => {
//             const globalIndex = page * imagesPerPage + idx;
//             const isBig = img.src === team;
//             return (
//               <motion.div
//                 key={globalIndex}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={isInView ? { opacity: 1, scale: 1 } : {}}
//                 transition={{ duration: 0.6, delay: 0.1 + idx * 0.1 }}
//                 // className="group relative overflow-hidden rounded-2xl cursor-pointer border border-gold/20 shadow-lg aspect-square"
//                  className={`group relative overflow-hidden rounded-2xl cursor-pointer border border-gold/20 shadow-lg
//           ${isBig ? "col-span-2  h-[700px],w-[700px]" : ""}`}
//                 onClick={() => setSelectedIndex(globalIndex)}
//               >
//                 <Image
//                   src={img.src}
//                   alt={img.alt}
//                   width={600}
//                   height={600}
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-black/40 opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
//                 <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   <div className="flex justify-between items-start">
//                     <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-cream text-xs font-semibold">
//                       {img.category}
//                     </span>
//                     <ZoomIn className="w-5 h-5 text-cream" />
//                   </div>
//                   <h4 className="text-cream font-semibold text-sm">{img.alt}</h4>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </motion.div>


//         {/* Numbered Pagination */}
//         <div className="flex justify-center gap-2 mt-8">
//           {Array.from({ length: totalPages }).map((_, i) => (
//             <Button
//               key={i}
//               variant={page === i ? "default" : "outline"}
//               className={`w-10 h-10 rounded-full ${
//                 page === i ? "bg-gold text-black" : "text-foreground/70"
//               }`}
//               onClick={() => setPage(i)}
//             >
//               {i + 1}
//             </Button>
//           ))}
//         </div>
//       </div>
// {/* Lightbox Modal */}
// {selectedIndex !== null && (
//   <motion.div
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     exit={{ opacity: 0 }}
//     className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//     onClick={() => setSelectedIndex(null)}
//   >
//     <motion.div
//       drag="x"
//       dragConstraints={{ left: 0, right: 0 }}
//       onDragEnd={(e, info) => {
//         if (info.offset.x < -100) handleNext();
//         if (info.offset.x > 100) handlePrev();
//       }}
//       initial={{ scale: 0.8, opacity: 0 }}
//       animate={{ scale: 1, opacity: 1 }}
//       exit={{ scale: 0.8, opacity: 0 }}
//       className="relative w-full max-w-5xl h-[70vh] bg-background rounded-xl p-6 flex flex-col shadow-2xl"
//       onClick={(e) => e.stopPropagation()}
//     >
//       {/* Zoomed Image */}
//       <Image
//         src={galleryImages[selectedIndex].src}
//         alt={galleryImages[selectedIndex].alt}
//         width={1200}
//         height={900} // rectangle ratio
//         className="w-full h-full object-contain rounded-lg"
//       />

//       {/* Image info */}
//       <div className="mt-4 text-center text-foreground">
//         <h3 className="text-xl font-bold">{galleryImages[selectedIndex].alt}</h3>
//         <p className="text-sm opacity-80">{galleryImages[selectedIndex].category}</p>
//       </div>

//       {/* Prev / Next arrows */}
//       <Button
//         variant="ghost"
//         size="icon"
//         className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground hover:bg-white/20"
//         onClick={handlePrev}
//       >
//         <ChevronLeft className="w-6 h-6" />
//       </Button>
//       <Button
//         variant="ghost"
//         size="icon"
//         className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground hover:bg-white/20"
//         onClick={handleNext}
//       >
//         <ChevronRight className="w-6 h-6" />
//       </Button>

//       {/* Close button */}
//       <Button
//         variant="outline"
//         size="icon"
//         className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm border-white/20 text-foreground hover:bg-white/20"
//         onClick={() => setSelectedIndex(null)}
//       >
//         <X className="w-5 h-5" />
//       </Button>
//     </motion.div>
//   </motion.div>
// )}



//       {/* Decorative animated circles */}
//       <motion.div
//         animate={{ rotate: [0, 360] }}
//         transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
//         className="absolute top-20 left-10 w-32 h-32 border border-gold/10 rounded-full"
//       />
//       <motion.div
//         animate={{ rotate: [360, 0] }}
//         transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
//         className="absolute bottom-20 right-10 w-24 h-24 border border-gold/10 rounded-full"
//       />
//     </section>
//   );
// }


"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

// ✅ Your images
import professional from "../public/images/TGT-20.jpg";
import professional2 from "../public/images/TGT-13.jpg";
import professional3 from "../public/images/TGT-18.jpg";
import professional4 from "../public/images/TGT-25.jpg";
import professional5 from "../public/images/TGT-8.jpg";
import image1 from "../public/images/TGT-10.jpg";
import image2 from "../public/images/TGT-15.jpg";
import image3 from "../public/images/TGT-24.jpg";
import image4 from "../public/images/TGT-28.jpg";
import image5 from "../public/images/TGT-9.jpg";
import team from "../public/images/team.jpg";

const galleryImages = [
  { src: team, alt: "", category: "" },
  { src: professional, alt: "", category: "" },
  { src: image1, alt: "", category: "" },
  { src: professional2, alt: " ", category: "" },
  { src: image2, alt: "", category: "" },
  { src: professional3, alt: "", category: "" },
  { src: image3, alt: "", category: "" },
  { src: professional4, alt: "", category: "" },
  { src: image4, alt: "", category: "" },
  { src: image5, alt: "", category: "" },
  { src: professional5, alt: "", category: "" },
];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [page, setPage] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // ---------------- Pagination logic ----------------
  const getPaginatedImages = () => {
    if (page === 0) return galleryImages.slice(0, 3); // first page 3 images
    const startIndex = 3 + (page - 1) * 4;
    return galleryImages.slice(startIndex, startIndex + 4);
  };

  const paginatedImages = getPaginatedImages();
  const totalPages = Math.ceil((galleryImages.length - 3) / 4) + 1;

  // ---------------- Lightbox navigation ----------------
  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) =>
        prev === 0 ? galleryImages.length - 1 : (prev ?? 0) - 1
      );
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) =>
        prev === galleryImages.length - 1 ? 0 : (prev ?? 0) + 1
      );
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex]);

  return (
    <section
      id="gallery"
      className="py-20 bg-background relative overflow-hidden section-divider"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10" ref={ref}>
        {/* Section Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-gold mb-3 sm:mb-4">
            Our Gallery
          </h2>
          <p className="text-foreground/90 text-sm sm:text-base lg:text-lg">
            A glimpse into our premium grooming experience
          </p>
        </motion.div>

        {/* Gallery Grid with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4"
          >
            {paginatedImages.map((img, idx) => {
              const globalIndex =
                page === 0 ? idx : 3 + (page - 1) * 4 + idx; // correct global index
              const isBig = img.src === team; // team image is big
              return (
                <motion.div
                  key={globalIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 + idx * 0.05 }}
                  className={`group relative overflow-hidden rounded-2xl cursor-pointer border border-gold/20 shadow-lg
                    ${isBig ? "col-span-2 h-[400px]" : "h-[300px]"}`}
                  onClick={() => setSelectedIndex(globalIndex)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex justify-between items-start">
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-cream text-xs font-semibold">
                        {img.category}
                      </span>
                      <ZoomIn className="w-5 h-5 text-cream" />
                    </div>
                    <h4 className="text-cream font-semibold text-sm">{img.alt}</h4>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Numbered Pagination */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              variant={page === i ? "default" : "outline"}
              className={`w-10 h-10 rounded-full ${
                page === i ? "bg-gold text-black" : "text-foreground/70"
              }`}
              onClick={() => setPage(i)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, info) => {
              if (info.offset.x < -100) handleNext();
              if (info.offset.x > 100) handlePrev();
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-5xl h-[70vh] bg-background rounded-xl p-6 flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[selectedIndex].src}
              alt={galleryImages[selectedIndex].alt}
              width={1200}
              height={900}
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="mt-4 text-center text-foreground">
              <h3 className="text-xl font-bold">{galleryImages[selectedIndex].alt}</h3>
              <p className="text-sm opacity-80">{galleryImages[selectedIndex].category}</p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground hover:bg-white/20"
              onClick={handlePrev}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground hover:bg-white/20"
              onClick={handleNext}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm border-white/20 text-foreground hover:bg-white/20"
              onClick={() => setSelectedIndex(null)}
            >
              <X className="w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

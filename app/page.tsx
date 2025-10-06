"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  Scissors,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Star,
  Award,
  Facebook,
  
} from "lucide-react";

import { FaTiktok } from "react-icons/fa";
import { AnimatedCounter } from "@/components/animated-counter";
import { FloatingElements } from "@/components/floating-elements";
import { ScrollProgress } from "@/components/scroll-progress";
import { WhatsAppModal } from "@/components/whatsapp-modal";
import { WhatsAppFloatingButton } from "@/components/whatsapp-floating-button";
import { NewStoreDialog } from "@/components/new-store-dialog";
import Gallery from "@/components/Gallery";


// Mobile Carousel Component
const MobileCarousel = ({
  children,
  itemsPerView = 1,
  showDots = true,
  className = "",
  autoPlayInterval = 3000,
}: {
  children: React.ReactNode[];
  itemsPerView?: number;
  showDots?: boolean;
  className?: string;
  autoPlayInterval?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const totalItems = children.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isMobile || isPaused || totalItems <= itemsPerView) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [
    isMobile,
    isPaused,
    autoPlayInterval,
    totalItems,
    itemsPerView,
    maxIndex,
  ]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < maxIndex) {
      nextSlide();
    }
    if (isRightSwipe && currentIndex > 0) {
      prevSlide();
    }

    // Resume auto-play after touch interaction
    setTimeout(() => setIsPaused(false), 1000);
  };

  const handleMouseEnter = () => {
    if (isMobile) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) setIsPaused(false);
  };

  if (!isMobile) {
    return (
      <div
        className={`grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Carousel Container */}
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          className="flex"
          animate={{ x: `${-currentIndex * (100 / itemsPerView)}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className={`flex-shrink-0 px-2`}
              style={{ width: `${100 / itemsPerView}%` }}
            >
              {child}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dots Indicator */}
      {showDots && totalItems > itemsPerView && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-gold" : "bg-gold/30"
              }`}
              onClick={() => {
                goToSlide(index);
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 2000);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Loading Animation Component
const LoadingAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
      setTimeout(onComplete, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!animationComplete && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            className="absolute bg-gold rounded-full"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 200, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          <motion.div className="relative flex flex-col items-center justify-center z-10 w-full h-full">
            <motion.img
              src="/images/tgt-logo.png"
              alt="The Gentlemen Times Logo"
              className="absolute w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 object-contain"
              style={{
                filter:
                  "drop-shadow(0 0 25px rgba(240, 198, 116, 0.7)) blur(3px)",
                zIndex: 5,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.5, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            />

            <motion.h2
              className="absolute text-lg sm:text-2xl md:text-4xl font-serif text-gold tracking-wider text-center px-4"
              style={{
                background: "linear-gradient(90deg, #F0C674, #F0C674, #F0C674)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% 100%",
                backgroundPosition: ["0% 0%"],
                filter: "drop-shadow(0 0 15px rgba(240, 198, 116, 0.5))",
                zIndex: 10,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            >
              THE GENTLEMEN TIMES
            </motion.h2>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Header Component
const Header = ({ onBookNowClick }: { onBookNowClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 0.98]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 20]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Packages", href: "#packages" },
    { name: "Team", href: "#team" },
    { name: "Locations", href: "#locations" },
    { name: "Gallery", href: "#gallery" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-2" : "py-3 sm:py-4"
      }`}
      style={{
        backgroundColor: `hsl(var(--background) / ${headerOpacity.get()})`,
        backdropFilter: `blur(${headerBlur.get()}px)`,
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <motion.div
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-full flex items-center justify-center">
            <img
              src="/images/TGTlogo.png"
              alt="TGT Logo"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
            />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-serif text-gold font-bold">
              TGT
            </h1>
            <p className="text-xs text-foreground/70 -mt-1 hidden sm:block">
              The Gentlemen Times
            </p>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="text-foreground/90 hover:text-gold transition-colors duration-300 relative group text-sm xl:text-base"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
            >
              {item.name}
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300"
                whileHover={{ width: "100%" }}
              />
            </motion.a>
          ))}
        </nav>

        <motion.div
          className="hidden sm:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Button
            className="bg-gold hover:bg-gold/90 text-charcoal px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold hover-glow"
            onClick={onBookNowClick}
          >
            Book Now
          </Button>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          className="lg:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={
              isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
            }
            className="w-5 h-0.5 bg-foreground mb-1.5 transition-all duration-300"
          />
          <motion.div
            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-5 h-0.5 bg-foreground mb-1.5 transition-all duration-300"
          />
          <motion.div
            animate={
              isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
            }
            className="w-5 h-0.5 bg-foreground transition-all duration-300"
          />
        </motion.button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-gold/30"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="block text-foreground/90 hover:text-gold transition-colors duration-300 py-2 text-base"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="pt-4"
              >
                <Button
                  className="bg-gold hover:bg-gold/90 text-charcoal w-full"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onBookNowClick();
                  }}
                >
                  Book Now
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// Animated Section Component
const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Parallax Text Component
const ParallaxText = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -50]);

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

export default function GentlemenTimes() {
  const [loading, setLoading] = useState(true);
  const [showNewStoreDialog, setShowNewStoreDialog] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);
  // const [selectedService, setSelectedService] = useState<any>(null);
  // const [selectedSubService, setSelectedSubService] = useState<any>(null);

  const locations = [
    {
      name: "Dubai",
      address: "Bahwan Tower - 5th St - Al Qusais - Al Nahda 1 - Dubai",
      phone: "+971 56 780 0180",
      whatsapp: "+971 56 780 0180",
      googleMapsUrl: "https://maps.app.goo.gl/7XGCSfvGsAACcTpH6",
    },
    {
      name: "Sharjah",
      address: "SHARJAH CENTRAL - C-21,GROUND FLOOR - 21 St - Samnan - Halwan - Sharjah",
      phone: "+971 58 573 8072",
      whatsapp: "+971 58 573 8072",
      googleMapsUrl: "https://maps.app.goo.gl/JyHtw1d4M5nAAPgc9",
    },
  ];

  const packages = [
    {
      name: "The Executive Suite",
      prices: [" AED 299", "AED 299(save AED 118!)"],
      services: [
        "Upgrade your style with a full haircut and beard trim",
        " head wash & styling",
        "our luxurious Signature Facial",
      ],
      popular: true,
    },
    {
      name: "The Grooming Standard",
      prices: ["AED 199", "AED 149 (Save AED 68!)"],
      services: [
        " Refresh your look with a complete haircut and beard care",
        "soothing scalp treatment",
        " relaxing head wash, and a stylish finish",
      ],
      popular: false,
    },
    {
      name: "The Business Refresh",
      prices: ["AED 499", "AED 199 (Save AED 68!)"],
      services: [
        "Refresh your professional look with a complete haircut and beard trim",
        "relaxing head wash & styling, and a revitalizing express facial",
      ],
      popular: false,
    },

    {
      name: "The Chairman's Package ",
      prices: ["AED 499", "AED 249 (Save AED 67!)"],
      services: [
        " Premium haircut and beard grooming",
        "complete with a Signature Manicure & Pedicure for the ultimate grooming experience",
      ],
      popular: false,
    },

    {
      name: "The TGT Ultimate Experience ",
      prices: ["AED 499", "AED 499 (Save AED 226!)"],
      services: [
        " Complete haircut and beard grooming",
        " luxurious Signature Facial",
        "premium manicure & pedicure for the ultimate head-to-toe refresh",
      ],
      popular: false,
    },
  ];

  const services = [
    {
      name: "Hair Cutting",
      icon: Scissors,
      subServices: [
        {
          name: "Hair",
          details: [
            {
              title: "TGT Hair Consultation",
              desc: "Free Service",
              time: "10 Mins",
              price: "AED 0",
            },
            {
              title: "TGT Basic Haircut",
              desc: "Enjoy your routine haircuts in TGTs premium Hair Lounge",
              time: "30 Mins",
              price: "AED 35",
            },
            {
              title: "TGT Premium Haircut",
              desc: "Private Room + Head massage + Before & after Hair wash & Conditioning",
              time: "45 Mins",
              price: "AED 60",
            },
            {
              title: "TGT Skin Fade",
              desc: "Upgrade to Premium for AED 10",
              time: "45 Mins",
              price: "AED 40",
            },
            {
              title: "TGT Buzz Cut",
              desc: "Upgrade to Premium for AED 10",
              time: "40 Mins",
              price: "AED 40",
            },
            {
              title: "Head Shave",
              desc: "Upgrade to Premium for AED 10",
              time: "30 Mins",
              price: "AED 35",
            },
            {
              title: "Styling (Haircut not included)",
              desc: "Upgrade to Premium for AED 10",
              time: "20 Mins",
              price: "AED 35",
            },
            {
              title: "TGT Signature Haircut",
              desc: "Refresh your hairstyle and enjoy exquisite haircut from the finest barbers in the neighborhood",
              time: "60 Mins",
              price: "AED 70",
            },
          ],
        },
        {
          name: "TGT Kids",
          details: [
            {
              title: "Kids Basic Cut",
              desc: "Gentle and professional haircut for kids",
              time: "30 Mins",
              price: "AED 25",
            },
            {
              title: "Kids Premium Cut",
              desc: "Includes styling and gentle wash",
              time: "45 Mins",
              price: "AED 40",
            },
          ],
        },
      ],
    },
    {
      name: "Coloring",
      icon: Award,
      subServices: [
        {
          name: "Hair color",
          details: [
            {
              title: "Short Hair",
              desc: "Product used - Schwarzkopf - manufactured in Germany ",
              time: "25 Mins",
              price: "AED 100",
            },
            {
              title: "Medium Hair",
              desc: "Product used - Schwarzkopf - manufactured in Germany ",
              time: "30 Mins",
              price: "AED 130",
            },
            {
              title: "Long Hair",
              desc: "Product used - Schwarzkopf - manufactured in Germany ",
              time: "35 Mins",
              price: "AED 160",
            },
          ],
        },
        {
          name: "Highlights",
          details: [
            {
              title: "Short Hair",
              desc: "Product used - Schwarzkopf - manufactured in Germany ",
              time: "60 Mins",
              price: "AED 150",
            },
            {
              title: "Medium Hair",
              desc: "Product used - Schwarzkopf - manufactured in Germany ",
              time: "70 Mins",
              price: "AED 200",
            },
            {
              title: "Long Hair",
              desc: "Product used - Schwarzkopf - manufactured in Germany ",
              time: "55 Mins",
              price: "AED 225",
            },
          ],
        },
        {
          name: "Ash/platinum hair colour",
          details: [
            {
              title: "Short Hair",
              desc: "Product used - Schwarzkopf - manufactured in Germany ",
              time: "60 Mins",
              price: "AED 250",
            },
            {
              title: "Medium Hair",
              desc: "Product used - Schwarzkopf - manufactured in Germany ",
              time: "65 Mins",
              price: "AED 280",
            },
            {
              title: "Long Hair",
              desc: "Product used - Schwarzkopf - manufactured in Germany ",
              time: "75 Mins",
              price: "AED 300",
            },
          ],
        },
        {
          name: "Bread colour",
          details: [
            {
              title: "Short Hair",
              desc: "Product used - Schwarzkopf - manufactured in Germany ",
              time: "20 Mins",
              price: "AED 50",
            },
            {
              title: "Medium Hair",
              desc: "Product used - Schwarzkopf - manufactured in Germany ",
              time: "30 Mins",
              price: "AED 70",
            },
            {
              title: "Long Hair",
              desc: "Product used - Schwarzkopf - manufactured in Germany ",
              time: "30 Mins",
              price: "AED 100",
            },
            {
              title: "Mustache color",
              desc: "Product used - Schwarzkopf - manufactured in Germany ",
              time: "20 Mins",
              price: "AED 20",
            },
          ],
        },
      ],
    },

    {
      name: "Massages",
      icon: Sparkles,
      details: [
        {
          title: "Hot Oil Head Massage",
          desc: "With choice of oil",
          time: "20 Mins",
          price: "AED 50",
        },
        {
          title: "Head Massage",
          desc: "Without oil",
          time: "20 Mins",
          price: "AED 30",
        },
        {
          title: "Feet Massage",
          desc: "",
          time: "20 Mins",
          price: "AED 50",
        },
        {
          title: "Hand Massage",
          desc: "",
          time: "20 Mins",
          price: "AED 50",
        },
      ],
    },

    {
      name: "FACE TREATMENTS",
      icon: Star,
      description: "Rejuvenating facial treatments",
      details: [
        {
          title: "Face Treatments",
          desc: "Product used - Schwarzkopf - Manufactured in Germany",
          time: "60 Mins",
          price: "AED 300",
        },
        {
          title: "Anti-Ageing Corrective Treatment",
          desc: "Corrective Botox and filler like treatment to reduce wrinkles and expression lines. Achieve skin up to 5 years younger. Product used - Schwarzkopf - Manufactured in Germany",
          time: "75 Mins",
          price: "AED 550",
        },
        {
          title: "Dr.Renaud Express Facial",
          desc: "Based on your skin type we have different variants of Dr. Renaud. Product used - Dr Renaud - Manufactured in France",
          time: "25 Mins",
          price: "AED 120",
        },
        {
          title: "DCR Facial",
          desc: "Say goodbye to sun damage and hello to radiant skin. Product used - DeTan - Manufactured in India",
          time: "40 Mins",
          price: "AED 300",
        },
      ],
    },
    {
      name: "MANICURE PEDICURE",
      icon: Sparkles,
      description: "Nail and foot care services",
      details: [
        {
          title: "Express Manicure",
          desc: "Basic Nail Cutting and Filing",
          time: "15 Mins",
          price: "AED 20",
        },
        {
          title: "Express Pedicure",
          desc: "Basic Nail Cutting, Filing and dead skin removal",
          time: "25 Mins",
          price: "AED 30",
        },
        {
          title: "Classic Manicure",
          desc: "Nail Cutting, Filing, Cuticle Removal, Moisturizing and Buffing",
          time: "25 Mins",
          price: "AED 50",
        },
        {
          title: "Classic Pedicure",
          desc: "Nail Cutting, Filing, Cuticle Removal, Dead skin removal, Scrub and Moisturizing",
          time: "35 Mins",
          price: "AED 60",
        },
        {
          title: "Premium Manicure",
          desc: "Classic Manicure + Hand mask + Hand Massage",
          time: "35 Mins",
          price: "AED 80",
        },
        {
          title: "Premium Pedicure",
          desc: "Classic Pedicure + Leg mask + Leg Massage",
          time: "45 Mins",
          price: "AED 100",
        },
      ],
    },
    {
      name: "WAXING",
      icon: Scissors,
      description: "Professional waxing services",
      details: [
        {
          title: "Nose",
          desc: "",
          time: "10 Mins",
          price: "AED 10",
        },
        {
          title: "Ear",
          desc: "",
          time: "10 Mins",
          price: "AED 10",
        },
        {
          title: "Eyebrow Threading",
          desc: "",
          time: "15 Mins",
          price: "AED 20",
        },
      ],
    },
    {
      name: "Hair & Scalp Treatments",
      icon: Scissors,
      description: "Specialized treatments for scalp and hair health",
      details: [
        {
          title: "Hair SPA",
          desc: "For full and damaged hair",
          time: "30 Mins",
          price: "AED 75",
        },
        {
          title: "Anti-Dandruff Scalp Treatment",
          desc: "Schwarzkopf's biotic technology calms and removes flakes on irritated scalp. Product used - Schwarzkopf - Manufactured in Germany",
          time: "30 Mins",
          price: "AED 150",
        },
        {
          title: "Hydrating Hair Treatment",
          desc: "A deeply hydrating treatment from Bonacure Schwarzkopf specially formulated for dry, textured, curly or brittle hair (Vegan Product). Product used - Schwarzkopf - Manufactured in Germany",
          time: "40 Mins",
          price: "AED 130",
        },
        {
          title: "Scalp & Hair Rejuvenating Treatment",
          desc: "Innovation collagen based filler therapy which reconstructs the structure of hair fiber making it thicker, smoother and shinier. Product used - Schwarzkopf - Manufactured in Germany",
          time: "30 Mins",
          price: "AED 120",
        },
      ],
    },
    {
      name: "Keratin Treatment",
      icon: Scissors,
      description: "Professional keratin and perming services",
      details: [
        {
          
          title: "Short Hair",
          desc: "Industry leader Brazilian Blowout protein treatment will smoothen and add definition to your hair",
          time: "60 Mins",
          price: "AED 400",
        },
        {
          title: "Medium Hair",
          desc: "Product used - Brazilian Blowout - Manufactured in USA",
          time: "75 Mins",
          price: "AED 450",
        },
        {
          title: "Long Hair",
          desc: "",
          time: "90 Mins",
          price: "AED 500",
        },
        {
          title: "Hair Perm",
          desc: "Waves, spiral and curls suiting medium to longer hairstyles and long length. *Price subject to hair length. Product used - Lakme - Manufactured in India",
          time: "90 Mins",
          price: "AED 300",
        },
      ],
    },
  ];

  const [selectedService, setSelectedService] = useState<any>(
    services[0] || null
  );
  const [selectedSubService, setSelectedSubService] = useState<any>(
    services[0]?.subServices ? services[0].subServices[0] : null
  );

  // Location-based team data
  const teamByLocation = [
    // Dubai Team
    [
      {
        image: "/images/Barber -Irshad.JPG",
        name: "Irshad",
        title: "Master Barber",
        specialty: "Classic Cuts & Beard Styling",
        experience: "8 Years",
      },
      {
        image: "/images/Barber -Shaneeb.JPG",
        name: "Shaneeb",
        title: "Senior Stylist",
        specialty: "Modern Cuts & Color",
        experience: "6 Years",
      },
      {
        image: "/images/Barber-Mathew.JPG",
        name: "Mathew",
        title: "Grooming Specialist",
        specialty: "Facials & Treatments",
        experience: "5 Years",
      },
      {
        image: "/images/Barber-Salman.JPG",
        name: "Salman",
        title: "Hair Artist",
        specialty: "Creative Styling",
        experience: "7 Years",
      },

      {
        image: "/images/Barber-Soufiyan.JPG",
        name: "Soufiyan",
        title: "Hair Artist",
        specialty: "Creative Styling",
        experience: "7 Years",
      },

      {
        image: "/images/Service-Kim.JPG",
        name: "Kim",
        title: "Hair Artist",
        specialty: "Creative Styling",
        experience: "7 Years",
      },

      {
        image: "/images/Service-Muniru.JPG",
        name: "Muniru",
        title: "Hair Artist",
        specialty: "Creative Styling",
        experience: "7 Years",
      },

      {
        image: "/images/Service-Saritha.JPG",
        name: "Saritha",
        title: "Hair Artist",
        specialty: "Creative Styling",
        experience: "7 Years",
      },
    ],
    // Sharjah Team
    [
      {
        image: "/images/Barbee-Javed.JPG",
        name: "Javed",
        title: "Master Barber",
        specialty: "Traditional & Modern Cuts",
        experience: "9 Years",
      },
      {
        image: "/images/Barber -Aman.JPG",
        name: "Aman",
        title: "Senior Stylist",
        specialty: "Precision Cuts & Styling",
        experience: "6 Years",
      },
      {
        image: "/images/Barber -Khalid.JPG",
        name: "Khalid",
        title: "Beard Specialist",
        specialty: "Beard Design & Care",
        experience: "4 Years",
      },
      {
        image: "/images/Service-Apon.JPG",
        name: "Apon",
        title: "Grooming Expert",
        specialty: "Premium Services",
        experience: "5 Years",
      },

      {
        image: "/images/Service-Poonam.JPG",
        name: "Poonam",
        title: "Grooming Expert",
        specialty: "Premium Services",
        experience: "5 Years",
      },
    ],
  ];

  const testimonials = [
    {
      name: "Omar Al-Mahmoud",
      rating: 5,
      quote:
        "Exceptional service and attention to detail. The best grooming experience in Dubai!",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "James Wilson",
      rating: 5,
      quote: "Professional staff and luxurious atmosphere. Highly recommended!",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Ahmed Hassan",
      rating: 5,
      quote:
        "Been coming here for years. Consistently excellent quality and service.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Mohammed Ali",
      rating: 4,
      quote: "Great haircut and friendly staff. Will definitely be back!",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ];

  useEffect(() => {
    if (!loading) {
      const dialogTimer = setTimeout(() => {
        setShowNewStoreDialog(true);
      }, 500);
      return () => clearTimeout(dialogTimer);
    }
  }, [loading]);

  const handleBookNowClick = () => {
    setIsWhatsAppModalOpen(true);
  };

  const handleLocationTabClick = (index: number) => {
    setSelectedLocationIndex(index);
  };

  if (loading) {
    return <LoadingAnimation onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen luxury-gradient text-foreground">
      <ScrollProgress />
      <FloatingElements />
      <Header onBookNowClick={handleBookNowClick} />
      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />
      <NewStoreDialog
        isOpen={showNewStoreDialog}
        onClose={() => setShowNewStoreDialog(false)}
      />

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/team.jpg')",
            filter: "brightness(0.3)",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/60" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <ParallaxText>
            <motion.h1
              className="font-serif text-gold mb-4 sm:mb-6 leading-tight"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <motion.span
                className="block text-base sm:text-lg md:text-xl lg:text-2xl mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {"WELCOME TO "}
                <br />
              </motion.span>

              {/* Big text for THE GENTLEMENT TIMES */}
              <motion.span
                className="text-gradient relative block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                {"THE GENTLEMEN TIMES"}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                {/* {"of real elegance."} */}
              </motion.span>
            </motion.h1>
          </ParallaxText>
          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/90 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Grooming is the secret of real elegance. We at TGT are keen on
            fulfilling our clients expectations on personal grooming and create
            a platform for our team of passionate barbers to explore and develop
            their talents. Whether you are maintaining the look of a corporate
            professional or a fashion conscious rebel, your experience here will
            guarantee the luxury you expect and the style you desire. As
            professional barbers and stylists, we stay passionate about our
            field and keeping you on top of the latest trends for men. So sit
            back, relax and enjoy the decadence of Male Grooming.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <Button
              className="bg-gold hover:bg-gold/90 text-charcoal px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold hover-glow relative overflow-hidden group"
              onClick={handleBookNowClick}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              Book Your Experience
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          whileHover={{ scale: 1.2 }}
          onClick={() =>
            document
              .getElementById("offers")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <ChevronDown className="text-gold" size={28} />
        </motion.div>
      </section>

      {/* Stats Section */}
      <AnimatedSection className="py-12 sm:py-16 lg:py-20 px-4 bg-card section-divider">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center">
            {[
              { value: 1000, suffix: "+", label: "Happy Clients" },
              { value: 3, suffix: " Years", label: "Experience" },
              { value: 2, suffix: " Locations", label: "Dubai & Sharjah" },
              { value: 15, suffix: " Services", label: "Premium Treatments" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="p-3 sm:p-4 lg:p-6 premium-card rounded-lg"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gold mb-1 sm:mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs sm:text-sm lg:text-base text-foreground/90">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Updates/Offers Section */}
      <AnimatedSection
        id="offers"
        className="py-12 sm:py-16 lg:py-20 px-4 bg-background section-divider"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="premium-card rounded-lg p-6 sm:p-8 text-center relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            <Badge className="bg-gold text-charcoal mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg px-3 sm:px-4 py-1 sm:py-2 relative z-10">
              HAPPY HOURS OFFER
            </Badge>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-gold mb-3 sm:mb-4 relative z-10">
              Special Discount Available
            </h2>
            <p className="text-foreground/90 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg relative z-10">
              Get flat 20% discount on Skeyndor premium facial treatments,
              best-in-line keratin (straightening), and hair perming (curling).
            </p>

            <div className="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg relative z-10 gap-2">
              <p className="text-gold font-semibold">
                Monday – Friday:{" "}
                <span className="text-foreground/90">11:00 AM – Midnight</span>
              </p>
              <p className="text-gold font-semibold">
                Saturday & Sunday:{" "}
                <span className="text-foreground/90">10:00 AM – Midnight</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6 text-sm sm:text-base relative z-10 gap-2">
              <p className="text-gold font-semibold">
                Call & Book:{" "}
                <span className="text-foreground/90">(04)-353-2283</span>
              </p>
              <p className="text-gold font-semibold">
                WhatsApp Booking:{" "}
                <span className="text-foreground/90">+971-56-680-0180</span>
              </p>
            </div>
            <p className="text-xs sm:text-sm text-foreground/70 mb-4 sm:mb-6 relative z-10">
              T&C's apply
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10"
            >
              <Button
                className="bg-gold hover:bg-gold/90 text-charcoal px-6 sm:px-8 py-2 sm:py-3 hover-glow text-sm sm:text-base"
                onClick={handleBookNowClick}
              >
                Claim Offer
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Packages Section */}
      <section
        id="packages"
        className="py-12 sm:py-16 lg:py-20 px-4 bg-card section-divider"
      >
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-gold mb-3 sm:mb-4">
              Luxury Packages
            </h2>
            <p className="text-foreground/90 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8">
              Choose the perfect grooming experience
            </p>

            {/* Location Tabs */}
            <div className="flex justify-center items-center space-x-2 sm:space-x-4 mb-2">
              <Button
                className={`px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full transition-all duration-300 font-semibold text-sm sm:text-base ${
                  selectedLocationIndex === 0
                    ? "bg-gold text-charcoal hover:bg-gold/90 shadow-lg hover-glow"
                    : "bg-secondary/50 text-foreground/70 hover:bg-secondary/70 hover:text-foreground"
                }`}
                onClick={() => handleLocationTabClick(0)}
              >
                Dubai Packages
              </Button>
              <Button
                className={`px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full transition-all duration-300 font-semibold text-sm sm:text-base ${
                  selectedLocationIndex === 1
                    ? "bg-gold text-charcoal hover:bg-gold/90 shadow-lg hover-glow"
                    : "bg-secondary/50 text-foreground/70 hover:bg-secondary/70 hover:text-foreground"
                }`}
                onClick={() => handleLocationTabClick(1)}
              >
                Sharjah Packages
              </Button>
            </div>
          </AnimatedSection>

          {/* Packages Grid/Carousel */}
          <AnimatedSection delay={0.2}>
            <motion.div
              key={selectedLocationIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              {/* Desktop Grid */}
              <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
                {packages.map((pkg, index) => (
                  <motion.div
                    key={`${selectedLocationIndex}-${pkg.name}-desktop`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="h-full"
                  >
                    <Card
                      className={`premium-card h-full flex flex-col relative overflow-hidden transition-all duration-300 ${
                        pkg.popular
                          ? "border-gold shadow-lg shadow-gold/20"
                          : "border-gold/30 hover:border-gold/50"
                      }`}
                    >
                      {pkg.popular && (
                        <div className="absolute top-0 right-0 bg-gold text-charcoal px-4 py-2 rounded-bl-lg font-semibold text-sm z-20">
                          Most Popular
                        </div>
                      )}

                      <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-gold/20 to-transparent"></div>

                      <CardContent className="p-6 lg:p-8 text-center flex-grow flex flex-col relative z-10">
                        <div className="mb-6">
                          <h3 className="text-xl lg:text-2xl font-serif text-gold mb-4 font-semibold">
                            {pkg.name}
                          </h3>
                          <motion.div
                            key={`${selectedLocationIndex}-${pkg.prices[selectedLocationIndex]}-desktop`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="relative"
                          >
                            <p className="text-3xl lg:text-4xl font-bold text-gold mb-2">
                              {pkg.prices[selectedLocationIndex]}
                            </p>
                            <div className="w-16 h-1 bg-gold/50 mx-auto rounded-full"></div>
                          </motion.div>
                        </div>

                        <ul className="space-y-3 lg:space-y-4 mb-8 flex-grow">
                          {pkg.services.map((service, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.4,
                                delay: 0.1 + i * 0.1,
                              }}
                              className="text-foreground/90 flex items-center justify-start text-left"
                            >
                              <div className="w-2 h-2 bg-gold rounded-full mr-3 flex-shrink-0"></div>
                              <span className="text-sm">{service}</span>
                            </motion.li>
                          ))}
                        </ul>

                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-auto"
                        >
                          <Button
                            className="bg-gold hover:bg-gold/90 text-charcoal w-full py-3 font-semibold hover-glow transition-all duration-300"
                            onClick={handleBookNowClick}
                          >
                            Book This Package
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Carousel */}
              <div className="md:hidden">
                <MobileCarousel
                  autoPlayInterval={4500}
                  showDots={true}
                  className="px-2"
                >
                  {packages.map((pkg, index) => (
                    <motion.div
                      key={`${selectedLocationIndex}-${pkg.name}-mobile`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="h-full px-2"
                    >
                      <Card
                        className={`premium-card h-full flex flex-col relative overflow-hidden transition-all duration-300 min-h-[420px] ${
                          pkg.popular
                            ? "border-gold shadow-lg shadow-gold/20"
                            : "border-gold/30 hover:border-gold/50"
                        }`}
                      >
                        {pkg.popular && (
                          <div className="absolute top-0 right-0 bg-gold text-charcoal px-3 py-1.5 rounded-bl-lg font-semibold text-xs z-20">
                            Most Popular
                          </div>
                        )}

                        <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-gold/20 to-transparent"></div>

                        <CardContent className="p-4 sm:p-6 text-center flex-grow flex flex-col relative z-10">
                          <div className="mb-4 sm:mb-6">
                            <h3 className="text-lg sm:text-xl font-serif text-gold mb-3 sm:mb-4 font-semibold">
                              {pkg.name}
                            </h3>
                            <motion.div
                              key={`${selectedLocationIndex}-${pkg.prices[selectedLocationIndex]}-mobile`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.4 }}
                              className="relative"
                            >
                              <p className="text-2xl sm:text-3xl font-bold text-gold mb-2">
                                {pkg.prices[selectedLocationIndex]}
                              </p>
                              <div className="w-12 sm:w-16 h-1 bg-gold/50 mx-auto rounded-full"></div>
                            </motion.div>
                          </div>

                          <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
                            {pkg.services.map((service, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.4,
                                  delay: 0.1 + i * 0.1,
                                }}
                                className="text-foreground/90 flex items-center justify-start text-left"
                              >
                                <div className="w-1.5 h-1.5 bg-gold rounded-full mr-2 flex-shrink-0"></div>
                                <span className="text-xs sm:text-sm">
                                  {service}
                                </span>
                              </motion.li>
                            ))}
                          </ul>

                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-auto"
                          >
                            <Button
                              className="bg-gold hover:bg-gold/90 text-charcoal w-full py-2 sm:py-3 font-semibold hover-glow transition-all duration-300 text-sm sm:text-base"
                              onClick={handleBookNowClick}
                            >
                              Book This Package
                            </Button>
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </MobileCarousel>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Location Info */}
          <AnimatedSection delay={0.4} className="mt-8 sm:mt-12 text-center">
            <motion.div
              key={selectedLocationIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="premium-card rounded-lg p-4 sm:p-6 max-w-2xl mx-auto"
            >
              <h4 className="text-lg sm:text-xl font-serif text-gold mb-2">
                {locations[selectedLocationIndex].name} Location
              </h4>
              <p className="text-foreground/80 mb-3 sm:mb-4 text-sm sm:text-base">
                {locations[selectedLocationIndex].address}
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-foreground/70">
                <div className="flex items-center">
                  <Phone className="mr-2 text-gold" size={14} />
                  {locations[selectedLocationIndex].phone}
                </div>
                <div className="flex items-center cursor-pointer hover:text-gold transition-colors">
                  <MapPin className="mr-2 text-gold" size={14} />
                  <span
                    onClick={() =>
                      window.open(
                        locations[selectedLocationIndex].googleMapsUrl,
                        "_blank"
                      )
                    }
                  >
                    Get Directions
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Section */}

    

     <section
  id="services"
  className="py-12 sm:py-16 lg:py-20 px-4 bg-background section-divider"
>
  <div className="max-w-6xl mx-auto">
    <AnimatedSection className="text-center mb-12 sm:mb-16">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-gold mb-3 sm:mb-4">
        Our Services
      </h2>
      <p className="text-foreground/90 text-sm sm:text-base lg:text-lg">
        Professional grooming services tailored for the modern gentleman
      </p>
    </AnimatedSection>

    {/* Main service buttons */}
    <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar-mobile">
      {services.map((service) => (
        <motion.button
          key={service.name}
          onClick={() => {
            setSelectedService(service);
            setSelectedSubService(
              service.subServices ? service.subServices[0] : null
            );
          }}
          className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium text-base transition-all shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap ${
            selectedService?.name === service.name
              ? "bg-gold text-charcoal border-2 border-gold"
              : "bg-transparent border-2 border-gold text-gold hover:bg-gold/10"
          }`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {service.name}
        </motion.button>
      ))}
    </div>

    {/* Sub-services (if any) */}
    {selectedService?.subServices && (
      <div className="flex flex-wrap gap-3 justify-center mt-6">
        {selectedService.subServices.map((sub: any) => (
          <motion.button
            key={sub.name}
            onClick={() => setSelectedSubService(sub)}
            className={`px-4 py-2 rounded-lg border font-medium text-base transition ${
              selectedSubService?.name === sub.name
                ? "bg-gold text-charcoal border-gold"
                : "bg-transparent border-gold text-gold hover:bg-gold/10"
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {sub.name}
          </motion.button>
        ))}
      </div>
    )}

    {/* Show sub-service details */}
    {selectedSubService && (
      <motion.div
        key={selectedSubService.name}
        className="mt-8 p-6 rounded-lg premium-card max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-xl font-semibold text-gold mb-4 text-center">
          {selectedSubService.name}
        </h3>
        <div className="space-y-4">
          {selectedSubService.details.map((item: any, idx: number) => (
            <div
              key={idx}
              className="border border-gold/30 rounded-lg p-4 text-left hover:bg-gold/5 transition"
            >
              <h4 className="text-lg font-semibold text-gold">{item.title}</h4>
              <p className="text-sm text-foreground/80">{item.desc}</p>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-foreground/70">{item.time}</span>
                <span className="font-semibold text-gold">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    )}

    {/* Direct details (like MASSAGES) */}
    {selectedService?.details && !selectedService.subServices && (
      <motion.div
        key={selectedService.name}
        className="mt-8 p-6 rounded-lg premium-card max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-xl font-semibold text-gold mb-4 text-center">
          {selectedService.name}
        </h3>
        <div className="space-y-4">
          {selectedService.details.map((item: any, idx: number) => (
            <div
              key={idx}
              className="border border-gold/30 rounded-lg p-4 text-left hover:bg-gold/5 transition"
            >
              <h4 className="text-lg font-semibold text-gold">{item.title}</h4>
              <p className="text-sm text-foreground/80">{item.desc}</p>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-foreground/70">{item.time}</span>
                <span className="font-semibold text-gold">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    )}

    {/* Normal service description (for description-only services) */}
    {selectedService &&
      !selectedService.subServices &&
      !selectedService.details && (
        <motion.div
          key={selectedService.name}
          className="mt-8 p-6 rounded-lg premium-card text-center max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <selectedService.icon
            className="text-gold mx-auto mb-3 sm:mb-4"
            size={50}
          />
          <h3 className="text-xl font-semibold text-gold mb-3">
            {selectedService.name}
          </h3>
          <p className="text-foreground/90 text-base">
            {selectedService.description}
          </p>
        </motion.div>
      )}
  </div>
</section>

<style jsx global>{`
  /* Custom thin scrollbar only on mobile */
  @media (max-width: 768px) {
    .custom-scrollbar-mobile::-webkit-scrollbar {
      height: 3px; /* very thin */
    }
    .custom-scrollbar-mobile::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar-mobile::-webkit-scrollbar-thumb {
      background-color: #d4af37; /* gold */
      border-radius: 2px;
    }

    /* Firefox */
    .custom-scrollbar-mobile {
      scrollbar-width: thin;
      scrollbar-color: #d4af37 transparent;
    }
  }

  /* Hide scrollbar on desktop */
  @media (min-width: 769px) {
    .custom-scrollbar-mobile::-webkit-scrollbar {
      display: none;
    }
    .custom-scrollbar-mobile {
      scrollbar-width: none;
    }
  }
`}</style>


      
   {/* Team Section */}
<section
  id="team"
  className="py-12 sm:py-16 lg:py-20 px-4 bg-card section-divider"
>
  <div className="max-w-6xl mx-auto">
    <AnimatedSection className="text-center mb-12 sm:mb-16">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-gold mb-3 sm:mb-4">
        Meet Our Masters
      </h2>
      <p className="text-foreground/90 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8">
        Expert craftsmen dedicated to your grooming excellence
      </p>

      {/* Location Tabs for Team */}
      <div className="flex justify-center items-center space-x-2 sm:space-x-4 mb-2">
        <Button
          className={`px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full transition-all duration-300 font-semibold text-sm sm:text-base ${
            selectedLocationIndex === 0
              ? "bg-gold text-charcoal hover:bg-gold/90 shadow-lg hover-glow"
              : "bg-secondary/50 text-foreground/70 hover:bg-secondary/70 hover:text-foreground"
          }`}
          onClick={() => handleLocationTabClick(0)}
        >
          Dubai Team
        </Button>
        <Button
          className={`px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full transition-all duration-300 font-semibold text-sm sm:text-base ${
            selectedLocationIndex === 1
              ? "bg-gold text-charcoal hover:bg-gold/90 shadow-lg hover-glow"
              : "bg-secondary/50 text-foreground/70 hover:bg-secondary/70 hover:text-foreground"
          }`}
          onClick={() => handleLocationTabClick(1)}
        >
          Sharjah Team
        </Button>
      </div>
    </AnimatedSection>

    <AnimatedSection delay={0.2}>
      <motion.div
        key={selectedLocationIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {teamByLocation[selectedLocationIndex].map((member, index) => (
            <motion.div
              key={`${selectedLocationIndex}-${member.name}-desktop`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="h-full"
            >
              <div className="text-center p-4 rounded-lg premium-card h-full">
                <div className="w-32 h-32 lg:w-40 lg:h-40 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gold/50 shadow-lg">
                  <img
                    src={member.image} // different image per member
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-gold mb-1">
                  {member.name}
                </h3>
                <p className="text-foreground/90 mb-1 text-sm lg:text-base">
                  {member.title}
                </p>
                <p className="text-xs lg:text-sm text-foreground/70 mb-2">
                  {member.specialty}
                </p>
                <Badge className="bg-gold/20 text-gold text-xs">
                  {member.experience}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <MobileCarousel autoPlayInterval={3500} showDots={true} className="px-2">
            {teamByLocation[selectedLocationIndex].map((member, index) => (
              <motion.div
                key={`${selectedLocationIndex}-${member.name}-mobile`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-full px-2"
              >
                <div className="text-center p-3 sm:p-4 rounded-lg premium-card h-full min-h-[280px] flex flex-col justify-center">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-3 sm:mb-4 rounded-full overflow-hidden border-2 border-gold/50 shadow-lg">
                    <img
                      src={member.image} // different image per member
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gold mb-1">
                    {member.name}
                  </h3>
                  <p className="text-foreground/90 mb-1 text-xs sm:text-sm">
                    {member.title}
                  </p>
                  <p className="text-xs text-foreground/70 mb-2">
                    {member.specialty}
                  </p>
                  <Badge className="bg-gold/20 text-gold text-xs mx-auto">
                    {member.experience}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </MobileCarousel>
        </div>
      </motion.div>
    </AnimatedSection>
  </div>
</section>


      {/* Locations Section */}
      <section
        id="locations"
        className="py-12 sm:py-16 lg:py-20 px-4 bg-card section-divider"
      >
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-gold mb-3 sm:mb-4">
              Visit Us In...
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            <AnimatedSection>
              <motion.div
                className="text-center"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="mb-4 sm:mb-6 premium-card rounded-lg p-4 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=400"
                    alt="Dubai Location"
                    className="w-full h-48 sm:h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-gold mb-3 sm:mb-4">
                  Dubai
                </h3>
                <p className="text-foreground/90 mb-3 sm:mb-4 text-sm sm:text-base">
                  {locations[0].address}
                </p>
                <Button
                  className="bg-gold hover:bg-gold/90 text-charcoal hover-glow text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                  onClick={() =>
                    window.open(locations[0].googleMapsUrl, "_blank")
                  }
                >
                  <MapPin className="mr-2" size={16} />
                  Get Directions
                </Button>
              </motion.div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <motion.div
                className="text-center"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="mb-4 sm:mb-6 premium-card rounded-lg p-4 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=400"
                    alt="Sharjah Location"
                    className="w-full h-48 sm:h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-gold mb-3 sm:mb-4">
                  Sharjah
                </h3>
                <p className="text-foreground/90 mb-3 sm:mb-4 text-sm sm:text-base">
                  {locations[1].address}
                </p>
                <Button
                  className="bg-gold hover:bg-gold/90 text-charcoal hover-glow text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                  onClick={() =>
                    window.open(locations[1].googleMapsUrl, "_blank")
                  }
                >
                  <MapPin className="mr-2" size={16} />
                  Get Directions
                </Button>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      <Gallery />

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-12 sm:py-16 lg:py-20 px-4 bg-background section-divider"
      >
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-gold mb-3 sm:mb-4">
              What Our Clients Say
            </h2>
          </AnimatedSection>

          <MobileCarousel autoPlayInterval={5000}>
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={testimonial.name} delay={index * 0.2}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="premium-card p-4 sm:p-6 rounded-lg text-center h-full flex flex-col justify-between">
                    <div className="flex flex-col items-center">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-3 sm:mb-4 object-cover border-4 border-gold/50 shadow-md"
                      />
                      <div className="flex justify-center mb-3 sm:mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="text-gold fill-current"
                            size={16}
                          />
                        ))}
                      </div>
                      <p className="text-foreground/90 mb-3 sm:mb-4 italic text-sm sm:text-base lg:text-lg">
                        "{testimonial.quote}"
                      </p>
                    </div>
                    <p className="text-gold font-semibold mt-auto text-sm sm:text-base">
                      - {testimonial.name}
                    </p>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </MobileCarousel>
        </div>
      </section>

      {/* Terms & Conditions Section */}
      <AnimatedSection className="py-12 sm:py-16 lg:py-20 px-4 bg-background section-divider">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-gold mb-3 sm:mb-4">
              Terms & Conditions
            </h2>
          </AnimatedSection>
          <AnimatedSection>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem
                value="booking"
                className="premium-card rounded-lg px-4 sm:px-6"
              >
                <AccordionTrigger className="text-gold hover:text-gold/80 text-sm sm:text-base">
                  Terms & Conditions
                </AccordionTrigger>
                <AccordionContent className="text-foreground/90 text-sm sm:text-base">
                  <div className="max-h-80 overflow-y-auto pr-2 space-y-4">
                    <p>
                      Terms and conditions ("Terms") are a set of legal terms
                      defined by the owner of a website. They set forth the
                      terms and conditions governing the activities of the
                      website visitors on the said website and the relationship
                      between the site visitors and the website owner. Terms
                      must be defined according to the specific needs and nature
                      of each website.
                    </p>

                    <h3 className="font-semibold text-gold mb-2">
                      In general, what should you cover in your Terms &
                      Conditions?
                    </h3>

                    <ol className="list-decimal list-inside space-y-2">
                      <li>
                        Who can use your website; what are the requirements to
                        create an account (if relevant)
                      </li>
                      <li>Key commercial terms offered to customers</li>
                      <li>Retention of right to change offering</li>
                      <li>
                        Warranties & responsibility for services and products
                      </li>
                      <li>
                        Ownership of intellectual property, copyrights and logos
                      </li>
                      <li>Right to suspend or cancel member account</li>
                      <li>Indemnification</li>
                      <li>Limitation of liability</li>
                      <li>Right to change and modify Terms</li>
                      <li>Preference of law and dispute resolution</li>
                      <li>Contact info</li>
                    </ol>

                    <p className="mt-4">
                      You can check out this support article to receive more
                      information about how to create a Terms and Conditions
                      page.
                    </p>

                    <p className="mt-2 text-foreground/80 text-xs">
                      The explanations and information provided herein are only
                      general and high-level explanations, information, and
                      samples. You should not rely on this article as legal
                      advice or as recommendations regarding what you should
                      actually do. We recommend that you seek legal advice to
                      help you understand and to assist you in the creation of
                      your Terms.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="payment"
                className="premium-card rounded-lg px-4 sm:px-6"
              >
                <AccordionTrigger className="text-gold hover:text-gold/80 text-sm sm:text-base">
                  Privacy Policy
                </AccordionTrigger>
                <AccordionContent className="text-foreground/90 text-sm sm:text-base">
                  <div className="max-h-80 overflow-y-auto pr-2 space-y-4">
                    <p>
                      We collect information from and about you, information
                      about your use of the The Gentlemen Times website.
                      Specifically, we collect information when you register to
                      use the site, request to participate in any online
                      promotions and from our booking software, such as Site
                      usage, browser types, IP addresses or device IDs etc. This
                      policy is not applicable to any information collected
                      offline or via channels other than this website.
                    </p>

                    <h2 className="font-semibold text-gold mb-2">
                      Information We Collect Directly From You
                    </h2>

                    <p>
                      We request information from you when you register for an
                      account for our Site, participate in our promotions, and
                      contact us. Depending upon the particular activity, we may
                      request the following information from you: your name,
                      email address, gender, mobile number, date of birth and,
                      date of birth.
                    </p>

                    <h2 className="font-semibold text-gold mb-2">
                      Information We Collect Automatically
                    </h2>

                    <p>
                      We request information from you when you register for an
                      account for our Site, participate in our promotions, and
                      contact us. Depending upon the particular activity, we may
                      request the following information from you: your name,
                      email address, gender, mobile number, date of birth and,
                      date of birth. We also may collect your location. We may
                      combine your location information with other information
                      that we have collected about you.
                    </p>

                    <h2 className="font-semibold text-gold mb-2">Cookies</h2>

                    <p>
                      We use browser "cookies" on our Site. Cookies are a
                      website's way of remembering who you are. A cookie is a
                      small text file that is stored on your computer's hard
                      drive or stored temporarily in your computer's memory.
                      There are two kinds of cookies, and we use both types of
                      cookies on our Site: "session" cookies and "persistent"
                      cookies. Session cookies are deleted when you close your
                      browser. Persistent cookies remain on your computer and
                      retain information for later use tomorrow, next month or
                      whenever they are set to expire. We use cookies to help us
                      to identify account holders and to optimize their
                      experience on our Site. Also, we will use cookies to
                      monitor and maintain information about your use of this
                      Site. Most Web browsers accept cookies automatically. You
                      can delete cookies manually or set your browser to
                      automatically delete cookies on a pre-determined schedule.
                      If you decline to accept cookies, you may not be able to
                      take advantage of or participate in certain features of
                      this Site
                    </p>

                    <h2 className="font-semibold text-gold mb-2">
                      Use of Your Information
                    </h2>

                    <p>
                      We use your information, including your personal
                      information, to provide our Services to you and for the
                      following purposes:
                    </p>

                    <ol className="list-decimal list-inside space-y-2">
                      <li>
                        To communicate with you, to respond to your inquiries,
                        and for other customer services purposes.
                      </li>
                      <li>
                        To provide information that you have requested to
                        receive from us.
                      </li>
                      <li>
                        To tailor the content, including advertisements and
                        information that we may send or display to you, and to
                        otherwise personalize your experiences while using our
                        Services.
                      </li>
                      <li>To improve our Services.</li>
                      <li>
                        For marketing and advertising purposes; for example, we
                        may send you emails about new products and services.
                      </li>
                      <li>
                        To better understand how users access and use our
                        Services, both on an aggregated and
                        individualized basis.
                      </li>
                    </ol>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="hygiene"
                className="premium-card rounded-lg px-4 sm:px-6"
              >
                <AccordionTrigger className="text-gold hover:text-gold/80 text-sm sm:text-base">
                  Health & Safety
                </AccordionTrigger>
                <AccordionContent className="text-foreground/90 text-sm sm:text-base">
                  We maintain the highest standards of hygiene and sanitation.
                  All tools are sterilized between clients, and we follow strict
                  health protocols.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AnimatedSection>
        </div>
      </AnimatedSection>

      {/* Footer */}
      
      <footer
        id="contact"
        className="py-12 sm:py-16 px-4 bg-card border-t border-gold/30"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-xl sm:text-2xl font-serif text-gold mb-3 sm:mb-4">
                THE GENTLEMEN TIMES
              </h3>
              <p className="text-foreground/90 mb-3 sm:mb-4 text-sm sm:text-base">
                Luxury grooming experience for the modern gentleman.
              </p>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-gold mb-3 sm:mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2 text-foreground/90 text-sm sm:text-base">
                <li>
                  <a
                    href="#services"
                    className="hover:text-gold transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#packages"
                    className="hover:text-gold transition-colors"
                  >
                    Packages
                  </a>
                </li>
                <li>
                  <a href="#team" className="hover:text-gold transition-colors">
                    Our Team
                  </a>
                </li>
                <li>
                  <a
                    href="#locations"
                    className="hover:text-gold transition-colors"
                  >
                    Locations
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="hover:text-gold transition-colors"
                  >
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>
            <div>
              
              <div>
  <h4 className="text-base sm:text-lg font-semibold text-gold mb-3 sm:mb-4">
    Contact
  </h4>
  <ul className="space-y-2 text-foreground/90 text-sm sm:text-base">
    {/* Dubai Contact */}
    <li className="flex items-center">
      <Phone className="mr-2 text-gold flex-shrink-0" size={14} />
      <a
        href={`https://wa.me/${locations[0].phone.replace(/\D/g, "")}?text=${encodeURIComponent(
          `Hi, I’m interested in your Dubai store services. I found you on the ${window.location.pathname} page.`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all hover:text-gold transition"
      >
        {locations[0].phone} (Dubai)
      </a>
    </li>
    <li className="flex items-start">
      <MapPin className="mr-2 text-gold flex-shrink-0 mt-0.5" size={14} />
      <span className="text-xs sm:text-sm">{locations[0].address}</span>
    </li>

    {/* Sharjah Contact */}
    <li className="flex items-center mt-3 sm:mt-4">
      <Phone className="mr-2 text-gold flex-shrink-0" size={14} />
      <a
        href={`https://wa.me/${locations[1].phone.replace(/\D/g, "")}?text=${encodeURIComponent(
          `Hi, I’m interested in your Sharjah store services. I found you on the ${window.location.pathname} page.`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all hover:text-gold transition"
      >
        {locations[1].phone} (Sharjah)
      </a>
    </li>
    <li className="flex items-start">
      <MapPin className="mr-2 text-gold flex-shrink-0 mt-0.5" size={14} />
      <span className="text-xs sm:text-sm">{locations[1].address}</span>
    </li>

    {/* Email */}
    <li className="flex items-center mt-3 sm:mt-4">
      <Mail className="mr-2 text-gold flex-shrink-0" size={14} />
      <a
        href="mailto:info@thegentlementimes.ae"
        className="break-all hover:text-gold transition"
      >
        info@thegentlementimes.ae
      </a>
    </li>
  </ul>
</div>

            </div>
            <div>

          

              <h4 className="text-base sm:text-lg font-semibold text-gold mb-3 sm:mb-4">
                Follow Us
              </h4>
              <div className="flex space-x-4 mb-4 sm:mb-6">
                <a
                  href="https://www.instagram.com/tgt_barbers?igsh=MTBsdjF2Nm81cTRpaw=="
                  className="text-foreground/90 hover:text-gold transition-colors"
                >
                  <Instagram size={20} />
                </a>

                 <a
                  href="https://www.facebook.com/profile.php?id=100088159838955"
                  className="text-foreground/90 hover:text-gold transition-colors"
                >
                  <Facebook size={20} />
                </a>

                <a
                  href="https://www.tiktok.com/@tgtbarbers_shj?_t=ZS-909wXcHan3Q&_r=1"
                  className="text-foreground/90 hover:text-gold transition-colors"
                >
                  <FaTiktok size={20} />
                </a>

    
              </div>

              
               

    
              <div>
                {/* <h5 className="text-gold mb-2 text-sm sm:text-base">
                  Newsletter
                </h5> */}
                {/* <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="Your email"
                    className="bg-background border-background/50 text-foreground text-sm flex-1"
                  />
                  <Button className="bg-gold hover:bg-gold/90 text-charcoal text-sm px-4 py-2">
                    Subscribe
                  </Button>
                </div> */}
              </div>
            </div>
          </div>
          <div className="border-t border-gold/30 pt-6 sm:pt-8 text-center text-foreground/70 text-xs sm:text-sm">
            <p>
              &copy; {new Date().getFullYear()} The Gentlemen Times. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>

      

      
      <WhatsAppFloatingButton />
    </div>
  );
}

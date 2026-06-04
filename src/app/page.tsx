"use client";

import { useState, useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store, RootState, setSelectedService, setSelectedStylist, setClientName, setSelectedDate, setSelectedTime } from "@/lib/store";
import { SmoothScrollHero } from "@/components/ui/modern-hero";
import { ModernPricingPage, PricingCardProps } from "@/components/ui/animated-glassy-pricing";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Clock, 
  Scissors, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight,
  MapPin,
  Phone,
  Menu,
  X
} from "lucide-react";
import { FiMessageSquare, FiCompass, FiUsers } from "react-icons/fi";

// Safe image component with client-side error handling fallback
const SafeImage = ({ src, alt, className, priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);
  const [attemptedFallback, setAttemptedFallback] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setIsLoading(true);
    setIsFailed(false);
    setAttemptedFallback(false);
  }, [src]);

  const FALLBACK = "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=70&w=500&auto=format&fit=crop";

  const handleError = () => {
    if (!attemptedFallback) {
      setImgSrc(FALLBACK);
      setAttemptedFallback(true);
    } else {
      setIsFailed(true);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`relative overflow-hidden ${className || ""}`}>
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-zinc-900/90 flex flex-col items-center justify-center select-none z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          <div className="w-6 h-6 rounded-full border-2 border-amber-500/20 border-t-amber-500 animate-spin" />
        </div>
      )}

      {/* Styled Error Placeholder */}
      {isFailed && (
        <div className="absolute inset-0 bg-zinc-950 border border-white/5 flex flex-col items-center justify-center p-4 text-center select-none z-10">
          <div className="text-amber-500/40 mb-2 animate-pulse">
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-[8px] uppercase tracking-widest text-zinc-500 font-semibold block mb-0.5">
            Error
          </span>
          <span className="text-[8px] text-zinc-650 line-clamp-1 max-w-[80px] mx-auto">
            {alt}
          </span>
        </div>
      )}

      {!isFailed && (
        <img
          src={imgSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        />
      )}
    </div>
  );
};

// Service catalog types
type ServiceItem = {
  name: string;
  price: string;
  duration: string;
  description: string;
};

type ServicesCategory = {
  category: string;
  items: ServiceItem[];
};

const SERVICES_DATA: ServicesCategory[] = [
  {
    category: "Signature Cuts",
    items: [
      { name: "Couture Haircut & Blowout", price: "$140+", duration: "75 mins", description: "Bespoke cut tailored to your hair texture, facial features, and style goals. Includes signature shampoo and finish." },
      { name: "Editorial Blowout & Style", price: "$85+", duration: "45 mins", description: "Luxury shampoo, conditioning massage, and styling session for maximum volume, curl, or sleekness." },
      { name: "Signature Men's Barbering", price: "$75+", duration: "45 mins", description: "Precision mens haircut including scalp massage, hot towel service, and tailored styling." }
    ]
  },
  {
    category: "Master Color",
    items: [
      { name: "Bespoke Balayage", price: "$280+", duration: "180 mins", description: "Hand-painted natural highlights customized for seamless growth and gorgeous depth. Includes tone/gloss." },
      { name: "High-Contrast Highlights", price: "$220+", duration: "150 mins", description: "Full head precision foils to create dimensional brightness or striking highlights. Includes bond protector." },
      { name: "Signature Gloss & Tone", price: "$95+", duration: "60 mins", description: "Refresh your shade, boost color vibrancy, and inject high-gloss shine. Perfect between color services." }
    ]
  },
  {
    category: "Advanced Therapy",
    items: [
      { name: "Oribe Gold Lust Ritual", price: "$75+", duration: "30 mins", description: "Deeply restorative treatment utilizing Oribe Gold Lust bio-restorative complex. Replenishes and strengthens." },
      { name: "Bespoke Scalp & Hair Detox", price: "$90+", duration: "45 mins", description: "Rebalancing exfoliation and hydration ritual for hair follicle health. Relieves stress and dry scalp." },
      { name: "Premium Keratin Smoothing", price: "$350+", duration: "180 mins", description: "Advanced amino acid complex to eliminate frizz, reduce blow-dry time, and enhance shine for up to 5 months." }
    ]
  }
];

const EXCLUSIVE_PACKAGES: PricingCardProps[] = [
  { 
    planName: 'Classic Grooming', 
    description: 'Essential hair styling, precision cut, and wash.', 
    price: '95', 
    features: ['Precision Cut & Shape', 'Signature Wash & Conditioning', 'Standard Blowdry & Styling', '1 Oribe Treatment Product Sample'], 
    buttonText: 'Book via WhatsApp', 
    buttonVariant: 'secondary',
    whatsappMessage: 'Hi Air Area! I would like to book the Classic Grooming package ($95).'
  },
  { 
    planName: 'Vanguard Indulgence', 
    description: 'Full couture highlights/painting with professional color protection.', 
    price: '280', 
    features: ['Bespoke Balayage or Dimensional Highlights', 'Oribe Gold Lust Recovery Treatment Mask', 'Relaxing Scalp Massage Therapy', 'Premium Blowout & Styling Session', 'Complimentary Beverage Service'], 
    buttonText: 'Select Vanguard Plan', 
    isPopular: true, 
    buttonVariant: 'primary',
    whatsappMessage: 'Hi Air Area! I would like to book the popular Vanguard Indulgence package ($280).'
  },
  { 
    planName: 'Royal VIP Day Spa', 
    description: 'Absolute sensory relief and complete makeover experience.', 
    price: '550', 
    features: ['Bespoke Creative Design Cut', 'Artisan Color Correction / Full Highlights', 'Bespoke Scalp & Hair Detoxification Ritual', 'Premium Keratin Smoothing Treatment', 'Oribe Gold Lust Complete Take-Home Care Set', 'Access to VIP Private Lounge'], 
    buttonText: 'Book Royal VIP', 
    buttonVariant: 'primary',
    whatsappMessage: 'Hi Air Area! I would like to book the exclusive Royal VIP Day Spa makeover package ($550).'
  },
];

type StylistType = {
  name: string;
  role: string;
  specialty: string;
  experience: string;
  bio: string;
  image: string;
  tags: string[];
  portfolio: {
    image: string;
    title: string;
    desc: string;
    category: string;
  }[];
};

const STYLISTS: StylistType[] = [
  {
    name: "Elena Rostova",
    role: "Creative Director",
    specialty: "Precision Cuts & Balayage",
    experience: "12 years",
    bio: "Elena trained in Paris and London, bringing a sharp European sensibility to custom cuts and effortless painting techniques.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=70&w=500&auto=format&fit=crop",
    tags: ["Balayage Architect", "Couture Cuts", "French Shag", "Textured Layers"],
    portfolio: [
      { image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600&auto=format&fit=crop", title: "Sculpted French Bob", desc: "Symmetrical volume & feathered edges.", category: "Cuts" },
      { image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=600&auto=format&fit=crop", title: "Soft Balayage Melt", desc: "Hand-painted organic highlights.", category: "Color" },
      { image: "https://images.unsplash.com/photo-1605497746444-ac9dbd324486?q=80&w=600&auto=format&fit=crop", title: "Classic Shag Revamp", desc: "Texturized volume & custom fringe.", category: "Cuts" },
      { image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop", title: "Editorial Blowout", desc: "Voluminous bouncing curls.", category: "Styling" },
      { image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=600&auto=format&fit=crop", title: "Textured Face Framing", desc: "Layers tailored to facial symmetry.", category: "Cuts" },
      { image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=600&auto=format&fit=crop", title: "Sleek Editorial Finish", desc: "High gloss and perfect alignment.", category: "Styling" }
    ]
  },
  {
    name: "Marcus Vance",
    role: "Master Colorist",
    specialty: "Vivid Tones & Color Correction",
    experience: "9 years",
    bio: "Marcus is a master of chemical safety and high-contrast color shifts. He specializes in healthy, bright transformations.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=70&w=500&auto=format&fit=crop",
    tags: ["Color Correction", "Vivid Neon", "Platinum Ice", "Bond Protection"],
    portfolio: [
      { image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop", title: "Vivid Copper Melt", desc: "Glossy ginger tones with protection.", category: "Color" },
      { image: "https://images.unsplash.com/photo-1527799863836-7241285289f6?q=80&w=600&auto=format&fit=crop", title: "Platinum Shield", desc: "Ice blonde highlights with zero bond break.", category: "Color" },
      { image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=600&auto=format&fit=crop", title: "Pastel Lavender", desc: "Delicate lavender hues and conditioning.", category: "Color" },
      { image: "https://images.unsplash.com/photo-1620331789556-9765960c9594?q=80&w=600&auto=format&fit=crop", title: "Prismatic Streaks", desc: "High-contrast multi-tonal foils.", category: "Color" },
      { image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop", title: "Burgundy Velvet", desc: "Deep rich red wine color glaze.", category: "Color" },
      { image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=600&auto=format&fit=crop", title: "Warm Caramel Balayage", desc: "Subtle sunlit face-framing foils.", category: "Color" }
    ]
  },
  {
    name: "Sienna Brooks",
    role: "Styling Expert",
    specialty: "Editorial Styling & Extensions",
    experience: "8 years",
    bio: "Sienna's work has been featured in top fashion journals. She excels in creating voluminous event locks and seamless hair extensions.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=70&w=500&auto=format&fit=crop",
    tags: ["Silk Extensions", "Editorial Updos", "Bridal Styling", "Gala Volume"],
    portfolio: [
      { image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop", title: "Editorial Volume Waves", desc: "Hollywood-ready bouncy blowouts.", category: "Styling" },
      { image: "https://images.unsplash.com/photo-1634449571010-02389ed0fde1?q=80&w=600&auto=format&fit=crop", title: "Seamless Silk Weft", desc: "Invisible hair extensions for length.", category: "Extensions" },
      { image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=600&auto=format&fit=crop", title: "Gala Updo Concept", desc: "Delicately twisted red carpet braids.", category: "Styling" },
      { image: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?q=80&w=600&auto=format&fit=crop", title: "Bridal Pearl Veil", desc: "Delicate bridal hair styling and curls.", category: "Styling" },
      { image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop", title: "Hollywood Glam Waves", desc: "High gloss retro S-wave curls.", category: "Styling" },
      { image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop", title: "Tousled Boho Crown", desc: "Effortless messy braids and texture.", category: "Styling" }
    ]
  }
];

const TIME_SLOTS: Record<string, string[]> = {
  Morning: ["09:00 AM", "10:00 AM", "11:00 AM", "11:30 AM"],
  Afternoon: ["01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"],
  Evening: ["05:30 PM", "06:30 PM", "07:30 PM", "08:30 PM"]
};

// Generates next 7 days starting from current date
const getNext7Days = () => {
  const days = [];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dayName = dayNames[d.getDay()];
    const dateNum = d.getDate();
    const monthName = monthNames[d.getMonth()];
    const year = d.getFullYear();
    const isoString = `${year}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(dateNum).padStart(2, '0')}`;
    
    const isClosed = dayName === "Sun";
    
    days.push({
      dayName,
      dateNum,
      monthName,
      isoString,
      isClosed
    });
  }
  return days;
};

export default function Home() {
  return (
    <Provider store={store}>
      <HomeContent />
    </Provider>
  );
}

function HomeContent() {
  const dispatch = useDispatch();
  const selectedService = useSelector((state: RootState) => state.booking.selectedService);
  const selectedStylist = useSelector((state: RootState) => state.booking.selectedStylist);
  const clientName = useSelector((state: RootState) => state.booking.clientName);
  const selectedDate = useSelector((state: RootState) => state.booking.selectedDate);
  const selectedTime = useSelector((state: RootState) => state.booking.selectedTime);

  // Modal portfolio states
  const [activePortfolioStylist, setActivePortfolioStylist] = useState<StylistType | null>(null);
  const [activeLightboxImage, setActiveLightboxImage] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dynamic days (calculated on mount to prevent hydration errors)
  const [bookingDays, setBookingDays] = useState<any[]>([]);

  useEffect(() => {
    setBookingDays(getNext7Days());
  }, []);

  // Video player control states
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Layout active interactive states
  const [activeTab, setActiveTab] = useState("Signature Cuts");

  // Update video progress bar
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        setVideoProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, []);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTabChange = (category: string) => {
    setActiveTab(category);
  };

  const handleBookRedirect = (serviceName: string) => {
    dispatch(setSelectedService(serviceName));
    const element = document.getElementById("reserve");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getWhatsAppLink = () => {
    const baseText = "Hi Air Area! I'd like to book an appointment.";
    const namePart = clientName ? `\nMy Name: ${clientName}` : "";
    const servicePart = selectedService ? `\nRequested Service: ${selectedService}` : "";
    const stylistPart = selectedStylist ? `\nPreferred Artist: ${selectedStylist}` : "";
    const datePart = selectedDate ? `\nRequested Date: ${selectedDate}` : "";
    const timePart = selectedTime ? `\nRequested Time: ${selectedTime}` : "";
    const fullText = `${baseText}${namePart}${servicePart}${stylistPart}${datePart}${timePart}`;
    return `https://wa.me/919962992491?text=${encodeURIComponent(fullText)}`;
  };

  const activeCategoryData = SERVICES_DATA.find(s => s.category === activeTab);

  return (
    <ReactLenis root>
      <div className="flex flex-col min-h-screen bg-black text-zinc-100 font-sans selection:bg-amber-600 selection:text-white antialiased">
        
        {/* Sticky Premium Nav Header */}
        <header className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <a href="#" className="flex items-center gap-2 group">
              <Scissors className="text-amber-500 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-xl font-bold tracking-[0.3em] text-white uppercase group-hover:text-amber-500 transition-colors duration-300">
                Air Area
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#experience" className="text-xs font-semibold tracking-widest text-zinc-300 uppercase hover:text-white transition-colors py-2 relative group">
                Experience
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#services" className="text-xs font-semibold tracking-widest text-zinc-300 uppercase hover:text-white transition-colors py-2 relative group">
                Services
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#packages" className="text-xs font-semibold tracking-widest text-zinc-300 uppercase hover:text-white transition-colors py-2 relative group">
                Packages
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#artists" className="text-xs font-semibold tracking-widest text-zinc-300 uppercase hover:text-white transition-colors py-2 relative group">
                Artists
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#reserve" className="text-xs font-semibold tracking-widest text-zinc-300 uppercase hover:text-white transition-colors py-2 relative group">
                Reserve
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <a 
                href="#reserve" 
                className="hidden sm:inline-block text-[11px] font-bold tracking-widest uppercase text-black bg-white hover:bg-amber-600 hover:text-white px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105"
              >
                Book on WhatsApp
              </a>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-white hover:text-amber-500 transition-colors p-2 z-55 relative"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-40 bg-zinc-950/98 backdrop-blur-xl flex flex-col justify-center items-center gap-10"
            >
              <div className="absolute top-24 text-center">
                <span className="text-[10px] font-bold tracking-[0.3em] text-amber-500 uppercase">
                  Air Area
                </span>
              </div>

              <nav className="flex flex-col items-center gap-8 text-center">
                {[
                  { name: "Experience", href: "#experience" },
                  { name: "Services", href: "#services" },
                  { name: "Packages", href: "#packages" },
                  { name: "Artists", href: "#artists" },
                  { name: "Reserve", href: "#reserve" }
                ].map((item, idx) => (
                  <motion.a
                    key={item.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.08, duration: 0.4 }}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-bold uppercase tracking-[0.2em] text-zinc-300 hover:text-amber-500 active:text-amber-500 transition-colors"
                  >
                    {item.name}
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4"
              >
                <a 
                  href="#reserve" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xs font-bold tracking-widest uppercase text-black bg-white hover:bg-amber-600 hover:text-white px-8 py-3.5 rounded-full transition-all duration-300"
                >
                  Book on WhatsApp
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1. RESTORED Fullscreen video background Hero Section at the top */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-950">
          <div className="absolute inset-0 z-0">
            <video
              ref={videoRef}
              className={`w-full h-full object-cover transition-all duration-[1.5s] ${isPlaying ? 'scale-100 blur-0' : 'scale-105 blur-sm brightness-75'}`}
              src="/promo.webm"
              autoPlay
              loop
              muted={isMuted}
              playsInline
            />
            {/* Subtle gradient vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 z-10" />
          </div>

          {/* Hero content overlay */}
          <div className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-200">
                Luxury Bespoke Hair Studio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.15, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-7xl font-bold tracking-[0.3em] uppercase text-white mb-6"
            >
              Air Area
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="text-sm md:text-lg text-zinc-300 font-light tracking-wide max-w-2xl mb-10 leading-relaxed"
            >
              Where high precision hair architecture meets ultimate sensory relief. Elevate your design, color, and texture under the care of master stylists.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <a 
                href="#reserve" 
                className="w-full sm:w-auto text-xs font-bold tracking-widest uppercase bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(217,119,6,0.3)] flex items-center justify-center gap-2"
              >
                Book Experience <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#services" 
                className="w-full sm:w-auto text-xs font-bold tracking-widest uppercase bg-transparent border border-white/20 hover:border-white text-white hover:bg-white/5 px-8 py-4 rounded-full transition-all duration-300"
              >
                Explore Services
              </a>
            </motion.div>
          </div>

          {/* Interactive Video Controllers */}
          <div className="absolute bottom-10 left-0 right-0 z-30 max-w-7xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-4 bg-black/40 border border-white/10 px-4 py-2.5 rounded-full backdrop-blur-md">
              <button 
                onClick={handlePlayPause}
                className="text-white hover:text-amber-500 transition-colors p-1"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <Pause className="w-4.5 h-4.5" /> : <Play className="w-4.5 h-4.5 fill-white" />}
              </button>
              <button 
                onClick={handleMuteToggle}
                className="text-white hover:text-amber-500 transition-colors p-1"
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              >
                {isMuted ? <VolumeX className="w-4.5 h-4.5" /> : <Volume2 className="w-4.5 h-4.5" />}
              </button>
              <span className="text-[10px] uppercase font-semibold tracking-widest text-zinc-400 border-l border-white/10 pl-3">
                {isPlaying ? "Live Look" : "Paused preview"}
              </span>
            </div>

            {/* Simple video status timeline */}
            <div className="hidden sm:flex items-center gap-3 w-48">
              <span className="text-[9px] font-mono text-zinc-400">0:00</span>
              <div className="flex-1 h-1 bg-white/15 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 transition-all duration-100 ease-linear"
                  style={{ width: `${videoProgress}%` }}
                />
              </div>
              <span className="text-[9px] font-mono text-zinc-400">1:00</span>
            </div>
          </div>
        </section>

        {/* 2. APPENDED SmoothScrollHero immediately after the top video hero */}
        <section className="relative w-full overflow-hidden">
          <SmoothScrollHero />
        </section>

        {/* Experience / Brand Story Section */}
        <section id="experience" className="py-24 md:py-32 bg-zinc-950 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-900/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-zinc-900/40 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Left side: Premium Narrative */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 space-y-8"
              >
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500">
                    The Experience
                  </span>
                  <h2 className="text-3xl md:text-5xl font-semibold uppercase tracking-wider text-white leading-tight">
                    Where precision meets absolute indulgence.
                  </h2>
                </div>

                <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base">
                  AIR AREA is more than a salon. It is an architectural approach to hair design. We analyze structural flow, natural textures, and personal symmetry to craft styles that are fluid, elegant, and uniquely yours.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-3 border-l-2 border-amber-500/50 pl-4">
                    <h3 className="text-base font-medium text-white uppercase tracking-wider">
                      Oribe Gold Lust
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      We utilize premium plant-infused, bio-restorative Oribe shampoo and care formulas. Nourishing hair from the follicles upward for enduring structural integrity and glossy shine.
                    </p>
                  </div>
                  <div className="space-y-3 border-l-2 border-amber-500/50 pl-4">
                    <h3 className="text-base font-medium text-white uppercase tracking-wider">
                      Artisan Color Correction
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Our colorists design high-end hand-painted balayage and highlights with advanced organic shielding, preventing damage while bringing vibrant color fields to life.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right side: Elegant Feature Box with micro-interaction */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 relative"
              >
                <div className="relative group overflow-hidden rounded-2xl glass-panel p-8 glow-card transition-all duration-500 hover:border-amber-500/30">
                  <div className="flex justify-between items-start mb-10">
                    <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-500">
                      <Scissors className="w-6 h-6 animate-pulse" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">EST. 2026</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white uppercase tracking-widest mb-4">
                    Signature Scalp Massage & Treatment
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                    Every booking includes our luxury scalp massage therapy. Relax your mind while our custom Oribe formula cleanses and detoxifies your hair structure in our low-light treatment lounge.
                  </p>

                  <a 
                    href="#services" 
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500 hover:text-white transition-colors duration-300"
                  >
                    View full menu <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Services Catalog */}
        <section id="services" className="py-24 bg-black border-t border-zinc-900 relative">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500">
                  Studio Services
                </span>
                <h2 className="text-3xl md:text-5xl font-semibold uppercase tracking-wider text-white">
                  Bespoke Menu
                </h2>
              </div>

              {/* Tab Switched Header Navigation */}
              <div className="flex flex-wrap gap-2 bg-zinc-950 p-1.5 rounded-full border border-zinc-900 self-start relative">
                {SERVICES_DATA.map((s) => {
                  const isActive = activeTab === s.category;
                  return (
                    <button
                      key={s.category}
                      onClick={() => handleTabChange(s.category)}
                      className={`relative text-[10px] font-bold uppercase tracking-wider px-6 py-2.5 rounded-full transition-colors duration-300 z-10 ${
                        isActive 
                          ? "text-white" 
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <span className="relative z-10">{s.category}</span>
                      {isActive && (
                        <motion.span
                          layoutId="activeCategoryTab"
                          className="absolute inset-0 bg-amber-600 rounded-full z-0 shadow-lg"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Animating container */}
            <div className="min-h-[380px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                  {activeCategoryData?.items.map((item) => (
                    <div 
                      key={item.name}
                      className="flex flex-col justify-between p-8 rounded-2xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-all duration-300 hover:translate-y-[-4px]"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold text-white uppercase tracking-wider max-w-[70%]">
                            {item.name}
                          </h3>
                          <span className="text-lg font-bold text-amber-500 tracking-wider">
                            {item.price}
                          </span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest text-zinc-500">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>{item.duration}</span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <button 
                        onClick={() => handleBookRedirect(item.name)}
                        className="mt-8 w-full py-3 text-[10px] font-bold uppercase tracking-widest border border-zinc-800 hover:border-amber-600 hover:bg-amber-600/5 text-zinc-300 hover:text-white rounded-full transition-all duration-300 flex items-center justify-center gap-1.5"
                      >
                        Choose & Reserve <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* 3. INTEGRATED ModernPricingPage component displaying exclusive packages */}
        <section id="packages" className="relative w-full">
          <ModernPricingPage
            title="Exclusive Packages"
            subtitle="Explore our curated treatment bundles designed for structural health, master color vibrancies, and absolute aesthetic satisfaction."
            plans={EXCLUSIVE_PACKAGES}
            showAnimatedBackground={true}
          />
        </section>

        {/* Elite Stylists Showcase with staggered scroll animations */}
        <section id="artists" className="py-24 bg-zinc-950 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-900/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6">
            <div className="space-y-3 mb-16 text-center">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500">
                The Creators
              </span>
              <h2 className="text-3xl md:text-5xl font-semibold uppercase tracking-wider text-white">
                Master Stylists
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {STYLISTS.map((stylist, index) => (
                <motion.div 
                  key={stylist.name}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between transition-all duration-500 hover:border-amber-600/30 hover:shadow-2xl z-10"
                >
                  <div className="relative h-72 w-full overflow-hidden">
                    <SafeImage 
                      src={stylist.image} 
                      alt={stylist.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10" />
                    
                    <span className="absolute top-4 right-4 text-[9px] font-mono tracking-widest text-zinc-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5 uppercase">
                      {stylist.experience} Exp
                    </span>
                  </div>

                  <div className="p-8 pt-0 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="mt-6">
                        <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                          {stylist.name}
                        </h3>
                        <span className="text-xs font-medium text-amber-500 uppercase tracking-widest">
                          {stylist.role}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Focus</span>
                        <p className="text-xs font-medium text-zinc-300">{stylist.specialty}</p>
                      </div>

                      <p className="text-xs text-zinc-400 leading-relaxed font-light font-sans">
                        {stylist.bio}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {stylist.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[8px] font-mono bg-zinc-950 border border-white/5 text-zinc-400 px-2 py-0.5 rounded-full uppercase">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-zinc-800/60 flex flex-col gap-3">
                      <button 
                        onClick={() => setActivePortfolioStylist(stylist)}
                        className="w-full py-2.5 text-center text-[10px] font-bold text-amber-500 hover:text-white uppercase tracking-widest border border-amber-500/20 hover:border-amber-500 bg-amber-500/5 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5"
                      >
                        View Previous Work <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <button 
                        onClick={() => {
                          dispatch(setSelectedStylist(stylist.name));
                          const element = document.getElementById("reserve");
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="w-full text-center py-2 text-[9px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors flex items-center justify-center gap-1.5"
                      >
                        Request {stylist.name.split(" ")[0]} <ArrowRight className="w-3.5 h-3.5 text-amber-500 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* WhatsApp Reservation Portal */}
        <section id="reserve" className="py-24 bg-black border-t border-zinc-900 relative">
          <div className="max-w-3xl mx-auto px-6">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center space-y-4 mb-16"
            >
              <div className="inline-flex items-center justify-center p-3.5 bg-green-500/10 rounded-full border border-green-500/20 text-green-400 mb-2">
                <FiMessageSquare className="w-6 h-6 animate-bounce" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500 block">
                Instant Reservation
              </span>
              <h2 className="text-3xl md:text-5xl font-semibold uppercase tracking-wider text-white">
                Book via WhatsApp
              </h2>
              <p className="text-xs text-zinc-400 font-light max-w-md mx-auto leading-relaxed">
                Connect directly with our registry coordinator. No forms or delays. Customize your treatments in real-time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden z-10"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="space-y-8 relative z-10">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Select Treatment helper */}
                  <div className="space-y-2.5">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      1. Select Treatment (Optional)
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => dispatch(setSelectedService(e.target.value))}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-600 transition-colors"
                    >
                      <option value="">Any Treatment...</option>
                      {SERVICES_DATA.map((cat) => (
                        <optgroup key={cat.category} label={cat.category}>
                          {cat.items.map((it) => (
                            <option key={it.name} value={it.name}>
                              {it.name} ({it.price})
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>

                  {/* Select Stylist helper */}
                  <div className="space-y-2.5">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      2. Choose Artist (Optional)
                    </label>
                    <select
                      value={selectedStylist}
                      onChange={(e) => dispatch(setSelectedStylist(e.target.value))}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-600 transition-colors"
                    >
                      <option value="">Any Stylist...</option>
                      {STYLISTS.map((st) => (
                        <option key={st.name} value={st.name}>
                          {st.name} ({st.role})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Custom Calendar date slider */}
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    3. Select Date of Appointment
                  </label>
                  <div className="flex gap-3 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                    {bookingDays.map((day) => {
                      const isSelected = selectedDate === day.isoString;
                      return (
                        <button
                          key={day.isoString}
                          type="button"
                          disabled={day.isClosed}
                          onClick={() => dispatch(setSelectedDate(day.isoString))}
                          className={`flex-shrink-0 w-24 p-4 rounded-xl border snap-start text-center transition-all duration-300 ${
                            day.isClosed 
                              ? "bg-zinc-950/20 border-zinc-900/40 opacity-40 cursor-not-allowed" 
                              : isSelected
                                ? "bg-amber-600/10 border-amber-500 text-white shadow-[0_0_15px_rgba(217,119,6,0.2)] scale-[1.02]"
                                : "bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white"
                          }`}
                        >
                          <p className="text-[10px] uppercase tracking-wider text-zinc-500">{day.dayName}</p>
                          <p className="text-2xl font-bold my-1 tracking-tight">{day.dateNum}</p>
                          <p className="text-[9px] font-medium text-zinc-400 uppercase tracking-widest">{day.monthName}</p>
                          {day.isClosed && (
                            <div className="mt-2 inline-block text-[8px] font-bold px-1.5 py-0.5 rounded border bg-red-950/15 border-red-900/20 text-red-400">
                              Closed
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Time Slot selector */}
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    4. Choose Time Slot
                  </label>
                  <div className="space-y-4 bg-zinc-950/40 p-6 rounded-2xl border border-white/5">
                    {Object.entries(TIME_SLOTS).map(([period, slots]) => (
                      <div key={period} className="space-y-2">
                        <h5 className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">{period}</h5>
                        <div className="flex flex-wrap gap-2">
                          {slots.map((time) => {
                            const isSelected = selectedTime === time;
                            return (
                              <button
                                key={time}
                                type="button"
                                onClick={() => dispatch(setSelectedTime(time))}
                                className={`flex items-center justify-center px-5 py-2.5 rounded-full border text-xs tracking-wider transition-all duration-300 ${
                                  isSelected
                                    ? "bg-amber-600 border-amber-500 text-white shadow-[0_0_15px_rgba(217,119,6,0.2)] scale-[1.02]"
                                    : "bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white"
                                }`}
                              >
                                <span>{time}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guest name input */}
                <div className="space-y-2.5">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    5. Your Name
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => dispatch(setClientName(e.target.value))}
                    placeholder="Enter your name to pre-fill the chat..."
                    className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-600 placeholder-zinc-650 transition-colors"
                  />
                </div>

                {/* Direct Action Link */}
                <div className="pt-4 border-t border-zinc-900">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]"
                  >
                    Start WhatsApp Chat <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Informational Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-center">
                  <div className="p-4 bg-zinc-950/60 rounded-xl border border-white/5 space-y-1">
                    <FiCompass className="w-4 h-4 mx-auto text-amber-500" />
                    <p className="text-[10px] font-bold uppercase text-white tracking-widest">Real-time Consultation</p>
                    <p className="text-[9px] text-zinc-500 leading-normal">Discuss styles and send hair photos instantly.</p>
                  </div>
                  <div className="p-4 bg-zinc-950/60 rounded-xl border border-white/5 space-y-1">
                    <Clock className="w-4 h-4 mx-auto text-amber-500" />
                    <p className="text-[10px] font-bold uppercase text-white tracking-widest">Flexible Scheduling</p>
                    <p className="text-[9px] text-zinc-500 leading-normal">Confirm custom slots and cancellations on the go.</p>
                  </div>
                  <div className="p-4 bg-zinc-950/60 rounded-xl border border-white/5 space-y-1">
                    <FiUsers className="w-4 h-4 mx-auto text-amber-500" />
                    <p className="text-[10px] font-bold uppercase text-white tracking-widest">Concierge Support</p>
                    <p className="text-[9px] text-zinc-500 leading-normal">Direct human contact for wedding/event groups.</p>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto py-16 bg-zinc-950 border-t border-zinc-900 text-zinc-400">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            
            <div className="space-y-4">
              <span className="text-lg font-bold tracking-[0.3em] text-white uppercase">
                Air Area
              </span>
              <p className="text-xs text-zinc-500 leading-relaxed font-light">
                Bespoke precision hair styling and Oribe treatments in a luxury studio atmosphere.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white">Location</h4>
              <p className="text-xs text-zinc-500 leading-relaxed font-light flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                <span>101 Aurora Blvd, Suite 200<br />Metro District, Citycenter</span>
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white">Contact</h4>
              <p className="text-xs text-zinc-500 leading-relaxed font-light flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-600" />
                <span>+1 (800) 555-AREA</span>
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white">Social</h4>
              <div className="flex gap-4">
                <a href="#" className="p-2.5 bg-zinc-900 hover:bg-amber-600 hover:text-white rounded-full transition-colors duration-300" aria-label="Instagram">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a href="#" className="p-2.5 bg-zinc-900 hover:bg-amber-600 hover:text-white rounded-full transition-colors duration-300" aria-label="Facebook">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
          <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-zinc-900 text-center text-[10px] text-zinc-650 tracking-wider">
            &copy; {new Date().getFullYear()} AIR AREA luxury studio. All rights reserved.
          </div>
        </footer>

      </div>

      {/* 5. OS-Style Stylist Portfolio Modal */}
      <AnimatePresence>
        {activePortfolioStylist && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md">
            {/* Modal backdrop tap close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setActivePortfolioStylist(null);
                setActiveLightboxImage(null);
              }}
              className="absolute inset-0 cursor-zoom-out"
            />

            {/* Window Container */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden z-10 glass-panel"
            >
              {/* Title Bar */}
              <div className="bg-zinc-950 border-b border-zinc-900 px-6 py-4 flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <button 
                    onClick={() => {
                      setActivePortfolioStylist(null);
                      setActiveLightboxImage(null);
                    }} 
                    className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 flex items-center justify-center group/btn" 
                    aria-label="Close window"
                  >
                    <span className="text-[8px] text-[#4c0002] opacity-0 group-hover/btn:opacity-100 transition-opacity font-bold">×</span>
                  </button>
                  <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400 flex items-center gap-2">
                  <Scissors className="w-3.5 h-3.5 text-amber-500" />
                  <span>{activePortfolioStylist.name}&apos;s Portfolio</span>
                </div>
                <div className="w-16" /> {/* Spacer to center title */}
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                {/* Stylist Profile Intro */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-6 border-b border-zinc-800/60">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-amber-500/30 shrink-0 shadow-md">
                    <SafeImage 
                      src={activePortfolioStylist.image} 
                      alt={activePortfolioStylist.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-3 text-center md:text-left flex-1">
                    <div>
                      <h4 className="text-xl font-bold text-white uppercase tracking-wider">{activePortfolioStylist.name}</h4>
                      <p className="text-xs font-medium text-amber-500 uppercase tracking-widest">{activePortfolioStylist.role}</p>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed max-w-xl font-sans font-light">
                      {activePortfolioStylist.bio}
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
                      {activePortfolioStylist.tags?.map((tag) => (
                        <span key={tag} className="text-[9px] font-mono tracking-wider bg-zinc-950 border border-white/5 text-zinc-400 px-2.5 py-1 rounded-full uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Portfolio Gallery Grid */}
                <div className="space-y-4">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.15em] block border-b border-zinc-800 pb-2">
                    Showcase Works (Click to View)
                  </span>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {activePortfolioStylist.portfolio?.map((item, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => setActiveLightboxImage(idx)}
                        className="group/item relative aspect-[4/3] rounded-xl overflow-hidden border border-white/5 shadow-md cursor-pointer hover:border-amber-600/30 hover:shadow-lg transition-all duration-300"
                      >
                        <SafeImage 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover/item:scale-108 transition-all duration-[0.6s] ease-[cubic-bezier(0.16,1,0.3,1)]" 
                        />
                        <div className="absolute inset-0 bg-black/75 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10">
                          <span className="text-[8px] font-mono text-amber-500 uppercase tracking-widest mb-1">{item.category}</span>
                          <h5 className="text-[11px] font-bold text-white uppercase tracking-wider truncate">{item.title}</h5>
                          <p className="text-[9px] text-zinc-400 font-light truncate mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. Lightbox Overlay for Portfolio Image Zooming */}
      <AnimatePresence>
        {activeLightboxImage !== null && activePortfolioStylist && (
          <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 bg-black/95 backdrop-blur-lg">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLightboxImage(null)}
              className="absolute inset-0 cursor-zoom-out"
            />

            {/* Lightbox Main Box */}
            <div className="relative w-full max-w-3xl flex flex-col items-center justify-center z-10">
              
              {/* Close Button top-right */}
              <button 
                onClick={() => setActiveLightboxImage(null)}
                className="absolute top-[-50px] right-0 text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md transition-colors"
              >
                Close <span className="text-sm">×</span>
              </button>

               {/* Navigation Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLightboxImage((activeLightboxImage - 1 + activePortfolioStylist.portfolio.length) % activePortfolioStylist.portfolio.length);
                }}
                className="absolute left-2 md:left-[-60px] p-3 text-white hover:text-amber-500 bg-black/60 hover:bg-black/80 md:bg-white/5 md:hover:bg-white/10 border border-white/10 rounded-full transition-all backdrop-blur-sm z-20"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLightboxImage((activeLightboxImage + 1) % activePortfolioStylist.portfolio.length);
                }}
                className="absolute right-2 md:right-[-60px] p-3 text-white hover:text-amber-500 bg-black/60 hover:bg-black/80 md:bg-white/5 md:hover:bg-white/10 border border-white/10 rounded-full transition-all backdrop-blur-sm z-20"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Lightbox Image Panel */}
              <motion.div
                key={activeLightboxImage}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 aspect-[4/3] w-full max-h-[70vh] flex items-center justify-center"
              >
                <SafeImage 
                  src={activePortfolioStylist.portfolio[activeLightboxImage].image} 
                  alt={activePortfolioStylist.portfolio[activeLightboxImage].title} 
                  className="w-full h-full object-contain"
                />
              </motion.div>

              {/* Image Description Footer */}
              <div className="text-center mt-6 space-y-1.5 max-w-xl">
                <span className="text-[9px] font-mono text-amber-500 uppercase tracking-widest">
                  {activePortfolioStylist.portfolio[activeLightboxImage].category} &bull; Work {activeLightboxImage + 1} of {activePortfolioStylist.portfolio.length}
                </span>
                <h4 className="text-lg font-bold text-white uppercase tracking-wider">
                  {activePortfolioStylist.portfolio[activeLightboxImage].title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans font-light">
                  {activePortfolioStylist.portfolio[activeLightboxImage].desc}
                </p>
              </div>

            </div>
          </div>
        )}
      </AnimatePresence>
    </ReactLenis>
  );
}

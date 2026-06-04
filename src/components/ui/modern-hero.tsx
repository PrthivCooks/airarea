"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { FiArrowRight, FiMapPin, FiMessageSquare } from "react-icons/fi";
import { useRef, useState, useEffect } from "react";

export const SmoothScrollHero = () => {
  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      <Hero />
      <Schedule />
    </div>
  );
};

const SECTION_HEIGHT = 2600;

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState(SECTION_HEIGHT);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSectionHeight(1500); // Tighter scroll for mobile
      } else {
        setSectionHeight(SECTION_HEIGHT);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: `calc(${sectionHeight}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage containerRef={containerRef} />

      <ParallaxImages />
    </div>
  );
};

interface CenterImageProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const CenterImage = ({ containerRef }: CenterImageProps) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const clip1 = useTransform(scrollYProgress, [0, 0.3], [25, 0]);
  const clip2 = useTransform(scrollYProgress, [0, 0.3], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0.3, 0.45],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage:
          "url(https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2670&auto=format&fit=crop)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 z-10" />

      {/* Floating Brand Title in the center of the image */}
      <div className="absolute z-20 text-center px-6">
        <h2 className="text-4xl md:text-7xl font-extralight tracking-[0.3em] uppercase text-white mb-4 animate-blur-reveal">
          Master Artistry
        </h2>
        <p className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-amber-500 uppercase">
          High Precision Hair Architecture
        </p>
      </div>
    </motion.div>
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6 pt-[50px] relative z-20 grid grid-cols-2 gap-x-4 gap-y-4 md:gap-x-12 md:gap-y-12">
      
      {/* Column 1 - Staggered */}
      <div className="space-y-4 md:space-y-16 flex flex-col justify-start">
        <ParallaxImg
          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1500&auto=format&fit=crop"
          alt="High-end styling and blowout session"
          start={-100}
          end={100}
          className="w-full rounded-2xl border border-white/10 shadow-2xl"
        />
        <ParallaxImg
          src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=1500&auto=format&fit=crop"
          alt="Luxury hair washing and shampoo conditioning"
          start={50}
          end={-100}
          className="w-11/12 rounded-2xl border border-white/10 shadow-2xl self-end"
        />
        <ParallaxImg
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1500&auto=format&fit=crop"
          alt="Precision cuts in premium barber chair"
          start={-120}
          end={80}
          className="w-full rounded-2xl border border-white/10 shadow-2xl"
        />
        <ParallaxImg
          src="https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?q=80&w=1500&auto=format&fit=crop"
          alt="Professional styling shears and styling comb details"
          start={80}
          end={-80}
          className="w-10/12 rounded-2xl border border-white/10 shadow-2xl self-start"
        />
        <ParallaxImg
          src="https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=1500&auto=format&fit=crop"
          alt="High-end salon styling client care"
          start={-100}
          end={100}
          className="w-full rounded-2xl border border-white/10 shadow-2xl"
        />
        <ParallaxImg
          src="https://images.unsplash.com/photo-1634449571010-02389ed0fde1?q=80&w=1500&auto=format&fit=crop"
          alt="Creative design look modeling"
          start={60}
          end={-120}
          className="w-11/12 rounded-2xl border border-white/10 shadow-2xl self-end"
        />
        <ParallaxImg
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1500&auto=format&fit=crop"
          alt="Air Area luxury salon interior design details"
          start={-80}
          end={80}
          className="w-full rounded-2xl border border-white/10 shadow-2xl"
        />
        <ParallaxImg
          src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1500&auto=format&fit=crop"
          alt="Premium hair prep and tools details"
          start={70}
          end={-90}
          className="w-10/12 rounded-2xl border border-white/10 shadow-2xl self-start"
        />
        <ParallaxImg
          src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1500&auto=format&fit=crop"
          alt="Healthy hair model shine and beauty look"
          start={-90}
          end={70}
          className="w-full rounded-2xl border border-white/10 shadow-2xl"
        />
        <ParallaxImg
          src="https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?q=80&w=1500&auto=format&fit=crop"
          alt="Cosmetology and premium styling products"
          start={50}
          end={-70}
          className="w-11/12 rounded-2xl border border-white/10 shadow-2xl self-end"
        />
        <ParallaxImg
          src="https://images.unsplash.com/photo-1620331789556-9765960c9594?q=80&w=1500&auto=format&fit=crop"
          alt="Vivid color dye foils process"
          start={-110}
          end={90}
          className="w-full rounded-2xl border border-white/10 shadow-2xl"
        />
        <ParallaxImg
          src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1500&auto=format&fit=crop"
          alt="Scissor cutting detail at master salon"
          start={80}
          end={-80}
          className="w-10/12 rounded-2xl border border-white/10 shadow-2xl self-start"
        />
      </div>

      {/* Column 2 - Staggered offset */}
      <div className="space-y-4 md:space-y-16 pt-12 md:pt-24 flex flex-col justify-start">
        <ParallaxImg
          src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1500&auto=format&fit=crop"
          alt="Premium shears and styling kit"
          start={100}
          end={-100}
          className="w-full rounded-2xl border border-white/10 shadow-2xl"
        />
        <ParallaxImg
          src="https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1500&auto=format&fit=crop"
          alt="Master salon hair color treatment"
          start={-80}
          end={120}
          className="w-11/12 rounded-2xl border border-white/10 shadow-2xl self-start"
        />
        <ParallaxImg
          src="https://images.unsplash.com/photo-1605497746444-ac9dbd324486?q=80&w=1500&auto=format&fit=crop"
          alt="Luxury haircut design styling details"
          start={120}
          end={-80}
          className="w-full rounded-2xl border border-white/10 shadow-2xl"
        />
        <ParallaxImg
          src="https://images.unsplash.com/photo-1527799863836-7241285289f6?q=80&w=1500&auto=format&fit=crop"
          alt="Client curling iron styling details"
          start={-50}
          end={100}
          className="w-10/12 rounded-2xl border border-white/10 shadow-2xl self-end"
        />
        <ParallaxImg
          src="https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=1500&auto=format&fit=crop"
          alt="Hair color details and texture styling"
          start={90}
          end={-90}
          className="w-full rounded-2xl border border-white/10 shadow-2xl"
        />
        <ParallaxImg
          src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1500&auto=format&fit=crop"
          alt="Premium hair vanity setup"
          start={-100}
          end={100}
          className="w-11/12 rounded-2xl border border-white/10 shadow-2xl self-start"
        />
        <ParallaxImg
          src="https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=1500&auto=format&fit=crop"
          alt="Color foils dye process"
          start={60}
          end={-140}
          className="w-full rounded-2xl border border-white/10 shadow-2xl"
        />
        <ParallaxImg
          src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=1500&auto=format&fit=crop"
          alt="Hairdresser styling client session"
          start={-70}
          end={70}
          className="w-10/12 rounded-2xl border border-white/10 shadow-2xl self-end"
        />
        <ParallaxImg
          src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1500&auto=format&fit=crop"
          alt="Model hair volume and bounce styling"
          start={80}
          end={-80}
          className="w-full rounded-2xl border border-white/10 shadow-2xl"
        />
        <ParallaxImg
          src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1500&auto=format&fit=crop"
          alt="Hair model style posing"
          start={-60}
          end={90}
          className="w-11/12 rounded-2xl border border-white/10 shadow-2xl self-start"
        />
        <ParallaxImg
          src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1500&auto=format&fit=crop"
          alt="Salon tools and care items"
          start={90}
          end={-60}
          className="w-full rounded-2xl border border-white/10 shadow-2xl"
        />
        <ParallaxImg
          src="https://images.unsplash.com/photo-1560869713-7d0a29430f39?q=80&w=1500&auto=format&fit=crop"
          alt="Modern luxury salon wash basin"
          start={-80}
          end={80}
          className="w-10/12 rounded-2xl border border-white/10 shadow-2xl self-end"
        />
      </div>

    </div>
  );
};

interface ParallaxImgProps {
  className?: string;
  alt: string;
  src: string;
  start: number;
  end: number;
}

const ParallaxImg = ({ className, alt, src, start, end }: ParallaxImgProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);
  const [attemptedFallback, setAttemptedFallback] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setIsLoading(true);
    setIsFailed(false);
    setAttemptedFallback(false);
  }, [src]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const adjustedStart = isMobile ? start * 0.3 : start;
  const adjustedEnd = isMobile ? end * 0.3 : end;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${adjustedStart}px end`, `end ${adjustedEnd * -1}px`],
  });

  const y = useTransform(scrollYProgress, [0, 1], [adjustedStart, adjustedEnd]);
  const transform = useMotionTemplate`translateY(${y}px)`;

  const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1500&auto=format&fit=crop";

  const handleError = () => {
    if (!attemptedFallback) {
      setImgSrc(FALLBACK_IMAGE);
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
    <motion.div
      ref={ref}
      style={{ transform }}
      className={`relative overflow-hidden aspect-[4/5] bg-zinc-900 ${className || ""}`}
    >
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-zinc-900/90 flex flex-col items-center justify-center select-none z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          <div className="flex flex-col items-center gap-2 z-10">
            <div className="w-6 h-6 rounded-full border-2 border-amber-500/20 border-t-amber-500 animate-spin" />
            <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-500 font-medium">Loading</span>
          </div>
        </div>
      )}

      {/* Styled Error Placeholder */}
      {isFailed && (
        <div className="absolute inset-0 bg-zinc-950 border border-white/5 flex flex-col items-center justify-center p-4 text-center select-none z-10">
          <div className="text-amber-500/40 mb-2 animate-pulse">
            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-semibold block mb-1">
            Image Unavailable
          </span>
          <span className="text-[9px] text-zinc-600 line-clamp-2 max-w-[120px] mx-auto leading-tight">
            {alt}
          </span>
        </div>
      )}

      {/* Actual Image */}
      {!isFailed && (
        <img
          src={imgSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        />
      )}
    </motion.div>
  );
};

const Schedule = () => {
  return (
    <div className="relative z-30 bg-zinc-950 w-full border-t border-zinc-900">
      <section
        id="launch-schedule"
        className="mx-auto max-w-5xl px-6 py-32 text-white"
      >
        <motion.div
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6"
        >
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500">
              Availabilities & Calendar
            </span>
            <h1 className="text-4xl font-black uppercase text-zinc-50 tracking-wider">
              Styling Hours
            </h1>
          </div>
          <a
            href="https://wa.me/919962992491?text=Hi%20Air%20Area%2C%20I%2520would%2520like%2520to%2520book%2520a%2520luxury%2520hair%2520session!"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-full transition-all duration-300 hover:scale-105"
          >
            Book on WhatsApp <FiMessageSquare className="w-4 h-4" />
          </a>
        </motion.div>

        <ScheduleItem title="Monday" date="09:00 AM - 07:00 PM" location="Master Colorists Only" />
        <ScheduleItem title="Tuesday" date="09:00 AM - 07:00 PM" location="Signature Cuts & Styling" />
        <ScheduleItem title="Wednesday" date="09:00 AM - 08:30 PM" location="Midweek Color Specials" />
        <ScheduleItem title="Thursday" date="09:00 AM - 08:30 PM" location="Late Night Hair Spa" />
        <ScheduleItem title="Friday" date="09:00 AM - 09:00 PM" location="Weekend Prep & Styling" />
        <ScheduleItem title="Saturday" date="09:00 AM - 07:00 PM" location="Full Creative Team" />
        <ScheduleItem title="Sunday" date="Closed" location="Studio Maintenance" />
      </section>
    </div>
  );
};

interface ScheduleItemProps {
  title: string;
  date: string;
  location: string;
}

const ScheduleItem = ({ title, date, location }: ScheduleItemProps) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-9 flex items-center justify-between border-b border-zinc-800 px-3 pb-9"
    >
      <div>
        <p className="mb-1.5 text-xl font-semibold text-zinc-50 uppercase tracking-wider">{title}</p>
        <p className="text-xs uppercase text-zinc-500 font-mono tracking-widest">{date}</p>
      </div>
      <div className="flex items-center gap-1.5 text-end text-xs uppercase text-zinc-400 font-medium tracking-wide">
        <p>{location}</p>
        <FiMapPin className="text-amber-500" />
      </div>
    </motion.div>
  );
};

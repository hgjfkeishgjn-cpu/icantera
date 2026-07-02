import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowDown, Instagram, Music, Facebook, Moon, Sun, Award, Flame, Heart } from "lucide-react";
import LuxuryCursorFollower from "./components/LuxuryCursorFollower";
import BackgroundParticles from "./components/BackgroundParticles";
import Countdown from "./components/Countdown";
import ProductCard, { luxuryProducts, Product } from "./components/ProductCard";
import ProductDetailModal from "./components/ProductDetailModal";
import Features from "./components/Features";
import WaitlistCard from "./components/WaitlistCard";
import LuxuryLoader from "./components/LuxuryLoader";
import Reviews from "./components/Reviews";
import LuxuryDiscoveryQuiz from "./components/LuxuryDiscoveryQuiz";
import SSOAuthPopup from "./components/SSOAuthPopup";
import sovereignImage from "./assets/images/sovereign.png";
import vixenImage from "./assets/images/vixen.png";

const liveNotifications = [
  { id: 1, name: "Viscountess Hélène", city: "Geneva, CH", action: "secured priority reservation #8,491" },
  { id: 2, name: "Audrey M.", city: "Beverly Hills, USA", action: "pre-ordered the 'Liaison' limited batch" },
  { id: 3, name: "Dr. Clara K.", city: "Munich, DE", action: "joined the pre-launch VIP list" },
  { id: 4, name: "Charlotte L.", city: "Paris, FR", action: "unlocked complimentary bespoke engraving" },
  { id: 5, name: "Mia T.", city: "Tokyo, JP", action: "added 'Vixen' to her collection booking" },
  { id: 6, name: "Contessa Isabella", city: "Milan, IT", action: "unlocked the pre-release miniature set" }
];

export default function App() {
  const isAuthPopup = window.location.pathname === "/auth-popup";

  if (isAuthPopup) {
    return <SSOAuthPopup />;
  }

  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [invitationsLeft, setInvitationsLeft] = useState(58);
  const [activeNotification, setActiveNotification] = useState<typeof liveNotifications[0] | null>(null);

  // Calculate dynamic background color transitioning on scroll
  const bgPercent = Math.min(scrollY / 1000, 1);
  const r = Math.round(12 + (30 - 12) * bgPercent); // Blend from 12 to 30
  const g = Math.round(11 + (13 - 11) * bgPercent); // Blend from 11 to 13
  const b = Math.round(13 + (17 - 13) * bgPercent); // Blend from 13 to 17
  const containerBg = `rgb(${r}, ${g}, ${b})`;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Slowly decrease available invitations to trigger high-conversion urgency
  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setInvitationsLeft((prev) => {
        if (prev <= 7) return prev;
        return prev - 1;
      });
    }, 45000);
    return () => clearInterval(interval);
  }, [loading]);

  // Live registration activity loop (psychological trust trigger)
  useEffect(() => {
    if (loading) return;
    
    const initialTimeout = setTimeout(() => {
      setActiveNotification(liveNotifications[0]);
    }, 6000);

    let currentIndex = 0;
    const interval = setInterval(() => {
      setActiveNotification(null);
      
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % liveNotifications.length;
        setActiveNotification(liveNotifications[currentIndex]);
      }, 1000);
    }, 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [loading]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // SVG drip animation helper
  const renderDripAnimation = () => (
    <svg className="absolute top-0 left-0 w-full h-32 pointer-events-none text-white/5 fill-current" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path d="M0,96C120,112,240,128,360,117.3C480,107,600,69,720,69.3C840,70,960,107,1080,128C1200,149,1320,155,1380,157.3L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,0,0Z" />
    </svg>
  );

  return (
    <>
      {/* 1. Luxury Loader Sequence */}
      <LuxuryLoader onComplete={() => setLoading(false)} />

      {/* Main app container revealed after loading */}
      {!loading && (
        <div 
          className="min-h-screen text-[#FDFCFB] selection:bg-[#D8B36A]/30 selection:text-white pt-[34px] transition-colors duration-500 ease-out"
          style={{ backgroundColor: "transparent" }}
        >
          {/* Modern Elegant Background Effect */}
          <BackgroundParticles />

          {/* Elegant Inertial Cursor Follower */}
          <LuxuryCursorFollower />

          {/* Decorative Liquid Drips on Scroll */}
          {renderDripAnimation()}

          {/* Top Scarcity Announcement Bar */}
          <div className="fixed top-0 left-0 right-0 z-50 bg-[#0C0B0D]/95 backdrop-blur-md border-b border-[#D8B36A]/10 text-center py-2 text-[8px] sm:text-[9px] tracking-[0.35em] font-sans font-bold text-[#D8B36A] uppercase px-4 flex items-center justify-center gap-2 select-none">
            <Sparkles className="w-3 h-3 text-[#D8B36A] animate-pulse" />
            <span>Priority Batch 001: Only {invitationsLeft} Custom Engravings Remaining for Launch</span>
            <Sparkles className="w-3 h-3 text-[#D8B36A] animate-pulse" />
          </div>

          {/* 2. Navigation Header */}
          <header className="fixed top-[34px] left-0 right-0 z-40 transition-all duration-300 px-6 sm:px-12 py-5 sm:py-6 flex justify-between items-center bg-transparent backdrop-blur-[2px]">
            {/* Logo */}
            <div className="flex flex-col items-center leading-none select-none">
              <span className="font-signature text-[38px] sm:text-[44px] text-white tracking-normal text-glow-gold">
                Incantéa
              </span>
              <div className="flex items-center gap-1.5 w-full mt-[-6px]">
                <div className="h-[0.5px] bg-white/20 w-4 sm:w-5" />
                <span className="text-[7px] sm:text-[8px] tracking-[0.4em] font-sans font-bold text-[#D8B36A] pl-[0.4em] uppercase whitespace-nowrap">
                  BEAUTY
                </span>
                <div className="h-[0.5px] bg-white/20 w-4 sm:w-5" />
              </div>
            </div>

            {/* Launch Banner Indicator & Controls */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setQuizOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 py-2 px-4 rounded-full border border-[#D8B36A]/40 text-[#D8B36A] hover:bg-[#D8B36A]/10 transition-all duration-300 text-[9px] tracking-widest font-sans font-bold cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-[#D8B36A] animate-pulse" />
                SHADE QUIZ
              </button>

              <button
                onClick={() => scrollToSection("waitlist")}
                className="py-2.5 px-6 rounded-full bg-white text-black hover:bg-[#D8B36A] hover:text-white transition-all duration-300 text-[10px] tracking-widest font-sans font-bold shadow-md hover:scale-[1.03] active:scale-95 cursor-pointer"
              >
                JOIN WAITLIST
              </button>
            </div>
          </header>

          {/* 3. Hero Section */}
          <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-28 pb-16 overflow-hidden">
            {/* Ambient Background Radial Vignette Layer */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#0C0B0D]/85 pointer-events-none z-10" />

            {/* Huge Cinematic Background Brand Watermark Text Layer */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
              <motion.div
                style={{ y: scrollY * 0.12, scale: 1 - scrollY * 0.0003, opacity: Math.max(0.015, 0.05 - scrollY * 0.0001) }}
                className="text-[16vw] font-serif tracking-[0.2em] font-light leading-none text-white text-center text-glow-white uppercase whitespace-nowrap"
              >
                INCANTÉA
              </motion.div>
            </div>

            {/* Centered Luxury Beauty Composition */}
            <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center min-h-[80vh] px-4">
              <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                <div className="absolute -top-12 w-72 h-72 rounded-full bg-[#D8B36A]/10 blur-3xl -z-10"></div>
                <span className="text-xs sm:text-sm tracking-[0.4em] font-sans font-bold text-[#D8B36A] uppercase mb-4" style={{ opacity: 1, transform: "none" }}>
                  The Future of Effortless Brilliance
                </span>
                
                <div className="flex flex-col items-center leading-none select-none my-4 mb-8" style={{ opacity: 1, transform: "none" }}>
                  <span className="font-signature text-[84px] sm:text-[112px] md:text-[140px] text-white tracking-normal text-glow-white">
                    Incantéa
                  </span>
                  <div className="flex items-center justify-center gap-3 w-full max-w-[220px] sm:max-w-[280px] md:max-w-[340px] mt-[-20px] sm:mt-[-28px] md:mt-[-35px]">
                    <div className="h-[0.5px] bg-white/30 flex-grow"></div>
                    <span className="text-[10px] sm:text-[12px] tracking-[0.45em] font-sans font-light text-white pl-[0.45em] uppercase whitespace-nowrap">
                      BEAUTY
                    </span>
                    <div className="h-[0.5px] bg-white/30 flex-grow"></div>
                  </div>
                </div>

                <p className="font-serif text-lg sm:text-2xl italic text-[#CFA8A1] tracking-wide mt-3" style={{ opacity: 1, transform: "none" }}>
                  Luxury Lip Gloss Collection
                </p>
                <div className="w-20 h-[1px] bg-[#D8B36A] my-6" style={{ opacity: 0.8 }}></div>
                
                <p className="text-xs sm:text-sm md:text-base tracking-[0.1em] font-sans text-white/85 max-w-lg leading-relaxed mb-10" style={{ opacity: 0.85, transform: "none" }}>
                  A new era of effortless beauty is arriving. Formulated with molecular active oils and mineral crystalline structures.
                </p>

                <div className="w-full mb-12" style={{ opacity: 1, transform: "none" }}>
                  <p className="text-[10px] tracking-[0.3em] font-sans font-bold text-[#CFA8A1] mb-2 uppercase text-center">
                    LAUNCHING GLOBALLY IN
                  </p>
                  <Countdown />
                </div>

                <div className="flex flex-col items-center gap-4 animate-fade-in w-full max-w-md" style={{ opacity: 1, transform: "none" }}>
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
                    <button 
                      onClick={() => scrollToSection("waitlist")}
                      className="w-full sm:w-auto group relative overflow-hidden px-8 py-4 rounded-full bg-white text-black hover:text-white font-sans text-xs tracking-[0.2em] font-bold shadow-xl transition-all duration-500 hover:scale-[1.05] active:scale-95 cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-[#D8B36A] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out -z-10"></div>
                      <span className="relative z-10">JOIN WAITLIST</span>
                    </button>
                    
                    <button 
                      onClick={() => setQuizOpen(true)}
                      className="w-full sm:w-auto group relative overflow-hidden px-8 py-4 rounded-full bg-transparent border border-[#D8B36A] text-[#D8B36A] hover:text-white font-sans text-xs tracking-[0.2em] font-bold shadow-xl transition-all duration-500 hover:scale-[1.05] active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <div className="absolute inset-0 bg-[#D8B36A] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out -z-10"></div>
                      <Sparkles className="w-3.5 h-3.5 text-[#D8B36A] group-hover:text-white transition-colors relative z-10 animate-pulse" />
                      <span className="relative z-10">DISCOVER YOUR SHADE</span>
                    </button>
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-white/60 tracking-wider max-w-xs leading-relaxed font-sans block text-center">
                    Be the first to experience exclusive launches, VIP offers, and early access.
                  </span>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              onClick={() => scrollToSection("collection")}
              className="absolute bottom-6 cursor-pointer flex flex-col items-center gap-1.5 opacity-40 hover:opacity-100 transition-opacity z-30"
            >
              <span className="text-[8px] tracking-[0.35em] font-sans font-bold text-[#D8B36A] uppercase">EXPLORE LA COLLECTION</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#D8B36A]" />
            </motion.div>
          </section>

          {/* 4. Products Showcase Section */}
          <section id="collection" className="py-24 px-6 sm:px-12 relative overflow-hidden">
            {/* Ambient Background Lights */}
            <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-[#CFA8A1]/5 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#D8B36A]/5 blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <span className="text-[10px] sm:text-xs tracking-[0.3em] font-sans font-bold text-[#CFA8A1]">
                  THE INAUGURAL RELEASES
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-white mt-2 tracking-wide text-glow-gold">
                  The Crystalline Series
                </h2>
                <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto mt-4 font-sans leading-relaxed">
                  Four meticulously calibrated shades designed to yield high-refraction mirror shine and comprehensive hydration.
                </p>
                <div className="w-12 h-[1px] bg-[#D8B36A] mx-auto mt-6" />
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
                {luxuryProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>

              {/* Luxury Discovery Quiz Interactive Teaser Banner */}
              <div className="mt-20 rounded-3xl border border-[#D8B36A]/20 bg-gradient-to-r from-black/80 via-[#D8B36A]/5 to-black/80 p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 shadow-[0_15px_40px_rgba(216,179,106,0.08)] select-none">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 rounded-full bg-[#D8B36A]/5 blur-3xl pointer-events-none" />
                <div className="space-y-3 relative z-10 text-center md:text-left max-w-xl">
                  <span className="text-[9px] tracking-[0.3em] font-sans font-bold text-[#D8B36A] uppercase flex items-center justify-center md:justify-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    Bespoke Personalization Engine
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white tracking-wide">
                    Find Your Sovereign Refraction
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                    Unsure which inaugural formulation coordinates with your skin chemistry? Our interactive alignment engine calibrates texture, essence, and light to match you with your signature Incantéa piece.
                  </p>
                </div>
                <button
                  onClick={() => setQuizOpen(true)}
                  className="relative z-10 w-full md:w-auto py-4 px-8 rounded-full bg-white text-black hover:bg-[#D8B36A] hover:text-white font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 shadow-lg active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  DISCOVER MY SHADE NOW
                </button>
              </div>
            </div>
          </section>

          {/* 5. Features Section */}
          <section className="py-20 relative bg-white/[0.02]">
            <Features />
          </section>

          {/* 5.5. Editorial Customer Reviews Section */}
          <section className="py-20 relative border-t border-white/5 bg-black/20">
            <Reviews />
          </section>

          {/* 6. Waitlist Section */}
          <section id="waitlist" className="py-24 relative overflow-hidden flex items-center justify-center min-h-[90vh]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D8B36A]/5 to-transparent pointer-events-none" />
            
            {/* Parallax elements around waitlist */}
            <motion.div 
              style={{ y: (scrollY - 2000) * -0.08 }}
              className="absolute left-10 md:left-24 bottom-24 w-32 sm:w-44 aspect-[3/4] opacity-15 rounded-2xl overflow-hidden pointer-events-none filter brightness-[0.7] contrast-[1.1]"
            >
              <img 
                src={sovereignImage} 
                alt="Sovereign Gloss" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <motion.div 
              style={{ y: (scrollY - 2000) * 0.08 }}
              className="absolute right-10 md:right-24 top-24 w-32 sm:w-44 aspect-[3/4] opacity-15 rounded-2xl overflow-hidden pointer-events-none filter brightness-[0.7] contrast-[1.1]"
            >
              <img 
                src={vixenImage} 
                alt="Vixen Gloss" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <WaitlistCard />
          </section>

          {/* 7. Footer */}
          <footer className="border-t border-white/10 bg-black/60 py-16 px-6 sm:px-12 select-none">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              {/* Logo block */}
              <div className="flex flex-col items-center md:items-start leading-none select-none">
                <span className="font-signature text-[46px] sm:text-[52px] text-white tracking-normal text-glow-gold">
                  Incantéa
                </span>
                <div className="flex items-center gap-1.5 mt-[-6px] pl-[0.1em]">
                  <div className="h-[0.5px] bg-white/20 w-5 sm:w-6" />
                  <span className="text-[8px] sm:text-[9px] tracking-[0.4em] font-sans font-bold text-[#D8B36A] pl-[0.4em] uppercase whitespace-nowrap">
                    BEAUTY
                  </span>
                  <div className="h-[0.5px] bg-white/20 w-5 sm:w-6" />
                </div>
              </div>

              {/* Social Channels and Links */}
              <div className="flex items-center gap-6 sm:gap-8 text-white">
                <a
                  href="https://www.instagram.com/incantea_beauty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-sans tracking-widest text-white/80 hover:text-[#D8B36A] transition-colors"
                  aria-label="Incantea Beauty on Instagram"
                >
                  <Instagram className="w-4 h-4 text-[#D8B36A]" />
                  INSTAGRAM
                </a>
                <a
                  href="https://www.tiktok.com/@incantea.beauty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-sans tracking-widest text-white/80 hover:text-[#D8B36A] transition-colors"
                  aria-label="Incantea Beauty on TikTok"
                >
                  <Music className="w-4 h-4 text-[#D8B36A]" />
                  TIKTOK
                </a>
                <a
                  href="https://www.facebook.com/incanteabeauty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-sans tracking-widest text-white/80 hover:text-[#D8B36A] transition-colors"
                  aria-label="Incantea Beauty on Facebook"
                >
                  <Facebook className="w-4 h-4 text-[#D8B36A]" />
                  FACEBOOK
                </a>
              </div>

              {/* Copyright & Info */}
              <div className="text-center md:text-right">
                <p className="text-xs font-sans text-white/70">
                  © 2026 Incantea Beauty. All rights reserved.
                </p>
                <p className="text-[10px] text-[#CFA8A1] font-sans mt-1">
                  Designed for ultimate modern sophisticated aesthetics.
                </p>
              </div>
            </div>
          </footer>

          {/* 8. Detailed View Modal */}
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onJoinWaitlist={() => scrollToSection("waitlist")}
          />

          {/* 8.5. Luxury Discovery Quiz Modal */}
          <LuxuryDiscoveryQuiz
            isOpen={quizOpen}
            onClose={() => setQuizOpen(false)}
            onProductSelect={(p) => setSelectedProduct(p)}
            onWaitlistScroll={() => scrollToSection("waitlist")}
          />

          {/* 9. Floating Live VIP Activity Feed (Psychological Trigger) */}
          <AnimatePresence>
            {activeNotification && (
              <motion.div
                initial={{ opacity: 0, x: -50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                className="fixed bottom-6 left-6 z-40 max-w-[320px] rounded-2xl bg-[#0D0C0E]/95 border border-[#D8B36A]/30 p-4 shadow-[0_10px_35px_rgba(216,179,106,0.15)] backdrop-blur-lg flex items-start gap-3 select-none pointer-events-auto"
              >
                <div className="w-8 h-8 rounded-full border border-[#D8B36A]/40 flex items-center justify-center bg-[#D8B36A]/10 text-[#D8B36A] flex-shrink-0 animate-pulse mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-sans font-bold text-white tracking-wide">
                      {activeNotification.name}
                    </span>
                    <span className="text-[9px] text-[#CFA8A1] font-sans tracking-widest font-semibold bg-[#CFA8A1]/10 px-1.5 py-0.5 rounded uppercase">
                      {activeNotification.city}
                    </span>
                  </div>
                  <p className="text-[10px] text-white/80 font-sans leading-relaxed">
                    {activeNotification.action}
                  </p>
                  <p className="text-[8px] text-[#D8B36A] font-sans font-semibold tracking-wider uppercase pt-1">
                    • LIVE ACQUISITION ACTIVE
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Sparkles, Eye } from "lucide-react";
import liaisonImage from "../assets/images/liaison.png";
import vixenImage from "../assets/images/vixen.png";
import nectarImage from "../assets/images/nectar.png";
import sovereignImage from "../assets/images/sovereign.png";

export interface Product {
  id: string;
  name: string;
  shade: string;
  description: string;
  image: string;
  badge: string;
  price: string;
  colorHex: string;
}

export const luxuryProducts: Product[] = [
  {
    id: "prod-1",
    name: "Liaison",
    shade: "01 Whispered Rose Gold",
    description: "A clandestine flush of delicate whispered rose gold that melts into a deep emotional fusion. Infused with ultra-fine rose quartz minerals, it is designed to evoke a soft-focus intimacy that feels like an elegant shared secret.",
    image: liaisonImage,
    badge: "BESTSELLER",
    price: "$38",
    colorHex: "#B76E79",
  },
  {
    id: "prod-2",
    name: "Vixen",
    shade: "02 Midnight Velvet Petal",
    description: "A deep, commanding velvet berry-petal pink crafted for moments of absolute magnetic pull. Formulated with intensive biological peptides, it delivers an ultra-smooth, high-impact glaze that commands attention and seals your influence.",
    image: vixenImage,
    badge: "NEW SHADE",
    price: "$38",
    colorHex: "#E5989B",
  },
  {
    id: "prod-3",
    name: "Nectar",
    shade: "03 Molten Gold Pearl",
    description: "An intoxicating liquid honey-gold serum that coats your lips in an unapologetic, high-shine satin luster. Drenched in pure cloudberry nectar and molten gold-dust micro-minerals, it triggers pure sensory indulgence and leaves an addictive, succulent finish.",
    image: nectarImage,
    badge: "EXCLUSIVE",
    price: "$40",
    colorHex: "#E2B65D",
  },
  {
    id: "prod-4",
    name: "Sovereign",
    shade: "04 Imperial Quartz Shimmer",
    description: "An ultra-luxurious, majestic rose quartz glaze that commands unquestioned authority. Infused with high-refraction imperial mineral crystals, it wraps your lips in a crystalline, glass-like shield of pure power and royal distinction.",
    image: sovereignImage,
    badge: "LIMITED EDITION",
    price: "$42",
    colorHex: "#CFA8A1",
  },
];

interface ProductCardProps {
  key?: string;
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Mouse hover tilt mechanics (3D effect)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseSpringConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), mouseSpringConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), mouseSpringConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative position inside the card from -0.5 to 0.5
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative w-full rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 p-4 sm:p-5 flex flex-col justify-between transition-all duration-500 shadow-xl hover:shadow-[0_20px_50px_rgba(216,179,106,0.2)] overflow-hidden"
    >
      {/* Glossy Traveling Light Reflection Effect */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: hovered
            ? `radial-gradient(circle 180px at ${x.get() * 100 + 50}% ${y.get() * 100 + 50}%, rgba(216, 179, 106, 0.15) 0%, rgba(255,255,255,0) 80%)`
            : "none",
        }}
      />

      {/* Floating Sparkle Icon */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <span className="text-[10px] tracking-[0.2em] font-sans font-semibold bg-black/80 backdrop-blur-md text-[#D8B36A] px-3 py-1 rounded-full border border-white/10 shadow-sm">
          {product.badge}
        </span>
      </div>

      {/* Product Image Area */}
      <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-5 bg-[#0F0E11]/80 flex items-center justify-center">
        {/* Soft floating background aura */}
        <div 
          className="absolute w-40 h-40 rounded-full blur-[45px] opacity-25 transition-all duration-700 group-hover:scale-125"
          style={{ backgroundColor: product.colorHex }}
        />

        {/* Product image with subtle tilt parallax */}
        <motion.div
          animate={{
            y: hovered ? -8 : [0, -6, 0],
            scale: hovered ? 1.05 : 1,
            rotate: hovered ? 1 : 0,
          }}
          transition={
            hovered 
              ? { type: "spring", stiffness: 100, damping: 15 }
              : { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }
          className="w-full h-full relative z-10 transition-transform duration-500"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-2xl filter brightness-[0.98] contrast-[1.03]"
            referrerPolicy="no-referrer"
          />
          
          {/* Shimmer Sheen effect across bottle on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
        </motion.div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 pointer-events-none">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            animate={hovered ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            className="px-5 py-3 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-white/60 flex items-center gap-2 pointer-events-auto cursor-pointer text-xs tracking-widest font-sans font-medium text-[#2B2B2B]"
            onClick={() => onSelect(product)}
          >
            <Eye className="w-3.5 h-3.5 text-[#D8B36A]" />
            VIEW IN DETAIL
          </motion.div>
        </div>
      </div>

      {/* Product Information */}
      <div className="text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
          <h3 className="font-serif text-xl sm:text-2xl font-medium text-white tracking-wide group-hover:text-[#D8B36A] transition-colors duration-300">
            {product.name}
          </h3>
          <span className="font-serif text-base text-[#D8B36A] font-medium">
            {product.price}
          </span>
        </div>
        
        <p className="text-xs text-[#CFA8A1] tracking-wider font-sans font-medium mt-1">
          {product.shade}
        </p>
        
        <p className="text-xs text-white/70 font-sans mt-2.5 leading-relaxed line-clamp-2">
          {product.description}
        </p>

        <button 
          onClick={() => onSelect(product)}
          className="mt-4 w-full py-2.5 rounded-xl border border-[#D8B36A]/40 text-[#D8B36A] hover:bg-[#D8B36A] hover:text-white hover:border-transparent transition-all duration-300 text-[10px] tracking-[0.25em] font-sans font-semibold"
        >
          EXPLORE FORMULA
        </button>
      </div>
    </motion.div>
  );
}

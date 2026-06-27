"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, CheckCircle2, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Samridh",
    location: "New York, USA",
    date: "March 12, 2026",
    rating: 5,
    title: "Breathtaking color and cut",
    text: "I was extremely hesitant to purchase a high-value gemstone online without seeing it first. However, the Imperial Ruby exceeded all my expectations. The certification provided peace of mind, and the deep pigeon-blood red is completely mesmerizing in natural light. The packaging was also incredibly secure.",
    verified: true,
  },
  {
    id: 2,
    name: "Annu",
    location: "London, UK",
    date: "February 28, 2026",
    rating: 5,
    title: "Perfect center stone",
    text: "I sourced a 2.5-carat sapphire from here for a custom engagement ring. The local master jeweler I took it to for the final setting confirmed that the clarity and grading matched the provided IGI certificate exactly. Outstanding customer service throughout the process.",
    verified: true,
  },
  {
    id: 3,
    name: "Khushal",
    location: "Dubai, UAE",
    date: "January 15, 2026",
    rating: 5,
    title: "Exactly as described",
    text: "The emerald I ordered arrived exactly when promised. The inclusions are very minor and completely typical for a natural emerald of this origin. It has a beautiful glow to it. The team was very patient in sending me extra videos before I made the final wire transfer.",
    verified: true,
  },
  {
    id: 4,
    name: "Divyanshi",
    location: "Sydney, AU",
    date: "December 04, 2025",
    rating: 4,
    title: "Beautiful stone, slight delay",
    text: "The amethyst is stunning and the cut is phenomenal, reflecting light beautifully. I took off one star only because customs clearance took two days longer than expected. Otherwise, the stone itself is a flawless museum-quality piece.",
    verified: true,
  },
  {
    id: 5,
    name: "Arjun",
    location: "Paris, FR",
    date: "November 22, 2025",
    rating: 5,
    title: "Trustworthy and professional",
    text: "Buying investment-grade diamonds requires absolute trust. Their transparency regarding the GIA reports and the flawless, conflict-free sourcing is why I return to them. Truly a white-glove experience.",
    verified: true,
  },
  {
    id: 6,
    name: "Gunnu",
    location: "Toronto, CA",
    date: "October 08, 2025",
    rating: 5,
    title: "Exquisite craftsmanship",
    text: "I bought a loose golden citrine for a 10th-anniversary pendant. The color saturation is much richer in person than it appeared on my monitor. My wife was completely blown away. Thank you for the detailed consultation.",
    verified: true,
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating 
              ? "fill-[#d4af37] text-[#d4af37]" 
              : "fill-transparent text-[#d4af37]/30"
          }`}
        />
      ))}
    </div>
  );
};

export default function Reviews() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(".review-header", 
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );

      // 3D Staggered cards animation
      const cards = gsap.utils.toArray(".review-card");
      gsap.fromTo(cards,
        { opacity: 0, y: 100, rotationX: 15, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "elastic.out(1, 0.8)",
          scrollTrigger: {
            trigger: ".reviews-grid",
            start: "top 80%",
          }
        }
      );

      // Subtle parallax effect on scroll
      cards.forEach((card: any, index: number) => {
        gsap.to(card, {
          y: (index % 2 === 0) ? -40 : -80, // Staggered upward float
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#1c0808] py-32 px-0 md:px-6 overflow-hidden perspective-[1000px]">
      {/* Decorative luxury lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10 px-0">
        
        <div className="review-header text-center mb-24 px-6 md:px-0">
          <h2 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 drop-shadow-xl">
            Words of <span className="text-primary italic">Trust</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Genuine experiences from collectors, jewelers, and gemstone enthusiasts worldwide who have trusted us with their most precious investments.
          </p>
        </div>

        <div className="relative w-full overflow-hidden py-10 flex mask-image-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-8 pr-8 hover:[animation-play-state:paused]">
            {[...reviews, ...reviews].map((review, index) => (
              <div 
                key={`${review.id}-${index}`} 
                className="review-card w-[350px] md:w-[450px] flex-shrink-0 group relative bg-gradient-to-br from-black/80 to-[#2a0e0e]/80 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl transition-all duration-500 hover:border-primary/40 hover:-translate-y-2 overflow-hidden"
              >
                {/* Massive background quote watermark */}
                <Quote className="absolute -top-6 -right-6 w-32 h-32 text-primary opacity-5 transform -rotate-12 group-hover:scale-110 group-hover:opacity-10 transition-all duration-700 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <StarRating rating={review.rating} />
                      <h4 className="text-white font-bold text-xl mt-4 font-serif leading-tight group-hover:text-primary transition-colors duration-300">
                        &quot;{review.title}&quot;
                      </h4>
                    </div>
                  </div>
                  
                  <p className="text-white/70 text-sm leading-loose mb-8 font-light italic">
                    {review.text}
                  </p>
                  
                  <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-yellow-700 flex items-center justify-center shadow-lg border border-white/20 flex-shrink-0">
                      <span className="text-black font-bold font-serif text-lg">
                        {review.name.charAt(0)}
                      </span>
                    </div>
  
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold tracking-wide">{review.name}</span>
                        {review.verified && (
                          <span className="flex items-center gap-1 text-[9px] uppercase tracking-widest font-bold text-[#d4af37] bg-[#d4af37]/10 px-2 py-1 rounded-full border border-[#d4af37]/20">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </div>
                      <span className="text-white/40 text-xs mt-1 block uppercase tracking-wider">
                        {review.location} • {review.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

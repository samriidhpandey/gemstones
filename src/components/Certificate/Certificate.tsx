"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Award, FileText, Gem } from "lucide-react";

const trustFeatures = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "100% Authentic",
    desc: "Every gemstone is rigorously tested and verified."
  },
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: "Lab Certified",
    desc: "Accompanied by official GIA, IGI, or GRS reports."
  },
  {
    icon: <Gem className="w-8 h-8 text-primary" />,
    title: "Ethically Sourced",
    desc: "Guaranteed conflict-free and responsibly mined."
  },
  {
    icon: <Award className="w-8 h-8 text-primary" />,
    title: "Lifetime Warranty",
    desc: "Unmatched quality backed by our global lifetime guarantee."
  }
];

export default function Certificate() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      // Animate text elements
      gsap.fromTo(".cert-text", 
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );

      // Floating animation for the certificate card
      gsap.to(".cert-card", {
        y: -20,
        rotation: 2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Animate card entrance
      gsap.fromTo(".cert-card-wrapper",
        { opacity: 0, y: 100, rotation: -10 },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 1.5,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-background py-32 px-6 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Text Content */}
          <div className="flex-1 space-y-8 z-10">
            <div className="cert-text space-y-4">
              <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
                Uncompromising <span className="text-primary italic">Authenticity</span>
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl max-w-xl">
                True luxury demands absolute certainty. Every gemstone you purchase from our collection is delivered with an internationally recognized laboratory grading report, serving as the passport of its impeccable quality.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
              {trustFeatures.map((feature, index) => (
                <div key={index} className="cert-text flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 rounded-full bg-primary/10 border border-primary/20">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cert-text pt-4">
              <button className="magnetic-btn rounded-full border border-primary text-primary px-8 py-3 font-semibold transition-colors hover:bg-primary hover:text-primary-foreground shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                View Sample Report
              </button>
            </div>
          </div>

          {/* Right Visual Content (The Certificate) */}
          <div className="cert-card-wrapper flex-1 relative w-full max-w-lg z-10 [perspective:1000px]">
            {/* The actual certificate visual */}
            <div className="cert-card relative w-full aspect-[1/1.4] bg-[#f8f5f0] rounded-lg shadow-2xl p-8 border-[8px] border-double border-[#d4af37] flex flex-col justify-between transform-gpu">
              
              {/* Certificate Header */}
              <div className="text-center space-y-2 border-b-2 border-[#d4af37]/30 pb-6">
                <div className="w-16 h-16 mx-auto mb-4 text-[#d4af37] opacity-80">
                  <Award className="w-full h-full" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#2a2a2a] uppercase tracking-widest">Certificate</h4>
                <p className="text-[#5a5a5a] text-xs uppercase tracking-[0.3em]">Of Authenticity</p>
              </div>

              {/* Certificate Body */}
              <div className="flex-1 py-8 flex flex-col justify-center space-y-4 text-center">
                <p className="text-[#4a4a4a] text-sm italic font-serif">This document certifies that the accompanying gemstone is a</p>
                <h5 className="font-serif text-3xl text-[#1a1a1a] font-bold">Natural Untreated Ruby</h5>
                <p className="text-[#4a4a4a] text-sm italic font-serif">weighing 3.42 Carats, originating from the Mogok Valley, Myanmar.</p>
              </div>

              {/* Certificate Footer / Signatures */}
              <div className="flex justify-between items-end border-t border-[#d4af37]/30 pt-6">
                <div className="text-center">
                  <div className="w-24 h-px bg-[#8a8a8a] mb-2 mx-auto"></div>
                  <p className="text-[#8a8a8a] text-[10px] uppercase">Master Gemologist</p>
                </div>
                
                {/* Gold Foil Seal */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#bf953f] via-[#fcf6ba] to-[#b38728] shadow-lg flex items-center justify-center border-2 border-white transform rotate-12">
                  <span className="font-serif font-bold text-[#5e4c19] text-xs uppercase text-center leading-tight">Official<br/>Seal</span>
                </div>

                <div className="text-center">
                  <div className="w-24 h-px bg-[#8a8a8a] mb-2 mx-auto"></div>
                  <p className="text-[#8a8a8a] text-[10px] uppercase">Date of Issue</p>
                </div>
              </div>

              {/* Hologram line effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent pointer-events-none rounded opacity-50" />
            </div>

            {/* Glowing shadow underneath */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-primary/20 blur-[50px] rounded-[100%]" />
          </div>

        </div>
      </div>
    </section>
  );
}

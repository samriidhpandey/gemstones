"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleSystem from "./ParticleSystem";
import { ArrowDown } from "lucide-react";
import ImageSequence from "./ImageSequence";
import Link from "next/link";
export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Stagger headline animation
    if (titleRef.current) {
      const chars = titleRef.current.innerText.split("");
      titleRef.current.innerText = "";
      chars.forEach((char) => {
        const span = document.createElement("span");
        span.innerText = char;
        span.className = "inline-block opacity-0 translate-y-8";
        titleRef.current?.appendChild(span);
      });

      gsap.to(titleRef.current.children, {
        duration: 0.8,
        opacity: 1,
        y: 0,
        stagger: 0.05,
        ease: "power3.out",
        delay: 0.5,
      });
    }

    // Fade out text content on scroll
    gsap.to(".hero-content", {
      scrollTrigger: {
        trigger: ".hero-container",
        start: "top top",
        end: "+=100%", // Fades out over the first 100vh
        scrub: 1,
      },
      opacity: 0,
      y: -50,
    });

    // Magnetic button effect
    const btn = btnRef.current;
    if (btn) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      btn.addEventListener("mousemove", handleMouseMove);
      btn.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        btn.removeEventListener("mousemove", handleMouseMove);
        btn.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <section className="hero-container relative h-[300vh] w-full bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Image Sequence Background */}
        <div className="absolute inset-0 z-0">
          <ImageSequence />
        </div>

        {/* Content */}
        <div className="hero-content relative z-20 flex h-full flex-col items-center justify-center px-6 text-center pointer-events-none">
          <h1 ref={titleRef} className="mb-6 font-serif text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
            POSH KALEIDO GEMSTONES
          </h1>
          <p className="mb-12 max-w-2xl text-lg md:text-xl font-medium text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Floating Brilliance Awaits. Discover ethically sourced, premium gemstones with immersive 3D previews.
          </p>

          <Link href="/collections" className="pointer-events-auto">
            <button
              ref={btnRef}
              className="magnetic-btn group relative overflow-hidden rounded-full bg-black/40 backdrop-blur-md border border-white/20 px-10 py-4 font-serif text-lg tracking-[0.2em] uppercase text-white shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-500 hover:bg-white/10 hover:border-white/40 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
              <span className="relative z-10">Explore Collection</span>
            </button>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="hero-content absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce text-muted-foreground pointer-events-none">
          <ArrowDown className="h-6 w-6" />
        </div>
      </div>
    </section>
  );
}

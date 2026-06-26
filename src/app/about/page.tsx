"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Microscope, Globe2, Compass, MapPin } from "lucide-react";

const timelineEvents = [
  {
    year: "1924",
    title: "The First Expedition",
    description: "Our founder embarked on a perilous journey to the deep caverns of Madagascar, unearthing the first 'Antigravity' core.",
    icon: <Compass size={32} className="text-black" />,
    image: "/gems/gallery1.jpeg"
  },
  {
    year: "1956",
    title: "The Master's Atelier",
    description: "We established our first cutting facility in Geneva, culminating in a new cutting technique that maximizes light refraction.",
    icon: <Microscope size={32} className="text-black" />,
    image: "/gems/gallery2.jpeg"
  },
  {
    year: "1989",
    title: "The Zero-G Synthesis",
    description: "By studying the molecular lattice of meteoritic diamonds, we pioneered the 'Zero-G' setting.",
    icon: <Globe2 size={32} className="text-black" />,
    image: "https://images.pexels.com/photos/2873669/pexels-photo-2873669.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    year: "2026",
    title: "The Modern Legacy",
    description: "Today, Antigravity Luxury stands as the pinnacle of 100+ years of relentless research.",
    icon: <Shield size={32} className="text-black" />,
    image: "https://images.pexels.com/photos/305833/pexels-photo-305833.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo(".hero-text",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power4.out" }
      );

      // Fade up elements
      const fadeElements = gsap.utils.toArray(".fade-up");
      fadeElements.forEach((item: any) => {
        gsap.fromTo(item,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 1, ease: "power3.out",
            scrollTrigger: {
              trigger: item, start: "top 85%", toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Timeline Animations
      const timelineItems = gsap.utils.toArray(".timeline-item");
      timelineItems.forEach((item: any, i) => {
        gsap.fromTo(item,
          { opacity: 0, x: i % 2 === 0 ? -100 : 100 },
          {
            opacity: 1, x: 0, duration: 1, ease: "power3.out",
            scrollTrigger: {
              trigger: item, start: "top 80%", end: "bottom 20%", toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background overflow-hidden pb-32">
      
      {/* 1. Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-background z-10" />
          <img 
            src="https://images.pexels.com/photos/2873669/pexels-photo-2873669.jpeg?auto=compress&cs=tinysrgb&w=1600" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto mt-20">
          <p className="hero-text text-primary font-mono tracking-[0.3em] mb-4 text-sm font-bold">A CENTURY OF OBSESSION</p>
          <h1 className="hero-text font-serif text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl leading-tight">
            100 Years of Gemological <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-700">Mastery</span>
          </h1>
          <p className="hero-text text-white/80 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            From deep subterranean expeditions to zero-gravity molecular research, our journey is etched in the eternal brilliance of the stones we uncover.
          </p>
        </div>
      </section>

      {/* 2. The Founder Section */}
      <section className="py-24 px-6 relative z-20 -mt-20">
        <div className="container mx-auto max-w-6xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-[400px] md:h-auto">
              <img src="https://images.pexels.com/photos/247597/pexels-photo-247597.jpeg?auto=compress&cs=tinysrgb&w=1000" alt="The Obsidian Relic" className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <p className="text-primary font-mono tracking-widest text-sm mb-1">THE VISIONARY</p>
                <h3 className="text-3xl font-serif text-white font-bold">Lord Alaric Vance</h3>
                <p className="text-white/60 text-sm">Circa 1924, Madagascar Expedition</p>
              </div>
            </div>
            <div className="p-12 md:p-16 flex flex-col justify-center">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">The First Discovery</h2>
              <div className="w-12 h-1 bg-primary mb-8" />
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                In the winter of 1924, Lord Alaric led an expedition into the uncharted volcanic tube caves of central Madagascar. Armed with nothing but gas lanterns and an obsessive belief in a myth, his team descended 4,000 feet below sea level.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                There, illuminated by the flickering light, they found it. A single, fist-sized crystal hovering millimeteres above its pedestal, reacting to electromagnetic fields in a way physics could not explain. This was the birth of the Antigravity core.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Global Map Section */}
      <section className="py-32 px-6 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="World Map Texture" className="w-full h-full object-cover grayscale" />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <h2 className="fade-up font-serif text-4xl md:text-5xl font-bold text-white mb-6">The Three Sacred <span className="text-primary">Veins</span></h2>
          <p className="fade-up text-muted-foreground text-lg max-w-2xl mx-auto mb-20">
            Antigravity gems do not form everywhere. After 100 years of global research, we have identified only three geographic coordinates on Earth with the exact atmospheric pressure and radiation needed to forge these anomalies.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "The Amethyst Caverns", location: "Madagascar", desc: "The original 1924 discovery site. High concentration of gravity-defying rubies and amethysts.", lat: "-18.8792", long: "47.5079" },
              { title: "The Siberian Frost Vein", location: "Northern Russia", desc: "Discovered in 1961. Extreme cold pressures create diamonds with internal glowing refraction.", lat: "61.5240", long: "105.3188" },
              { title: "The Deep Amazon Core", location: "Brazil", desc: "The most dangerous expedition of 1999. Produces emeralds that emit a faint bio-luminescence.", lat: "-3.4653", long: "-62.2159" }
            ].map((loc, i) => (
              <div key={i} className="fade-up bg-background/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-colors text-left group">
                <MapPin className="text-primary mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-2xl font-serif text-white mb-2">{loc.title}</h3>
                <p className="text-primary font-mono text-sm tracking-widest mb-4">{loc.location}</p>
                <p className="text-muted-foreground mb-6">{loc.desc}</p>
                <div className="pt-6 border-t border-white/10 flex justify-between text-xs text-white/40 font-mono">
                  <span>LAT: {loc.lat}</span>
                  <span>LNG: {loc.long}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Research & Philosophy */}
      <section className="py-32 px-6 bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="fade-up order-2 md:order-1 relative h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(255,215,0,0.1)]">
              <img src="https://images.pexels.com/photos/3825582/pexels-photo-3825582.jpeg?auto=compress&cs=tinysrgb&w=1000" alt="Research Institute" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
              <div className="absolute bottom-8 left-8 max-w-[250px]">
                <p className="text-white font-serif text-xl mb-2">"True luxury cannot be mass-produced. It must be discovered and studied."</p>
                <p className="text-primary font-mono text-xs">GENEVA RESEARCH LAB</p>
              </div>
            </div>
            <div className="fade-up order-1 md:order-2">
              <h2 className="font-serif text-4xl text-white mb-6">100 Years of <span className="text-primary">Research</span></h2>
              <div className="w-12 h-1 bg-primary mb-8" />
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                For a century, our Geneva institute has documented over 14,000 geological phenomena to understand how immense pressure and time create flawless crystalline structures. We operate at the intersection of high jewelry and quantum physics.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Every stone in the Antigravity collection is subjected to our proprietary <strong>Molecular Lattice Refraction Test</strong>, ensuring that only the top 0.01% of the world's minerals reach our ateliers. We don't just cut stones; we unlock their internal light.
              </p>
              <button className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-black transition-colors px-8 py-3 rounded-full font-bold tracking-wide">
                View The Collection
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The Timeline */}
      <section className="py-32 px-6 relative bg-black border-t border-white/5">
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center mb-24 fade-up">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">The Century <span className="text-primary">Timeline</span></h2>
            <p className="text-muted-foreground">A legacy forged under pressure.</p>
          </div>

          <div className="absolute left-1/2 top-48 bottom-0 w-[2px] bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />

          <div className="space-y-32">
            {timelineEvents.map((event, index) => (
              <div key={event.year} className={`timeline-item flex flex-col md:flex-row items-center justify-between ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                <div className="w-full md:w-5/12 mb-8 md:mb-0">
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                  </div>
                </div>
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-primary border-4 border-background items-center justify-center z-10 shadow-[0_0_20px_rgba(255,215,0,0.4)]">
                  {event.icon}
                </div>
                <div className="w-full md:w-5/12 text-center md:text-left">
                  <span className="text-primary font-mono text-xl md:text-2xl font-bold tracking-widest block mb-2">{event.year}</span>
                  <h3 className="font-serif text-3xl text-white mb-4">{event.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

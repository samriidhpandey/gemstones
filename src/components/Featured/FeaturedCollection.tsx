"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FeaturedCollection({ items }: { items: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      const container = containerRef.current;
      const wrapper = scrollWrapperRef.current;

      if (container && wrapper) {
        gsap.to(wrapper, {
          xPercent: -100,
          x: () => window.innerWidth,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full bg-background">
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden py-20">
        
        <div className="absolute top-10 left-10 z-20">
          <h2 className="font-serif text-4xl font-bold tracking-tight text-primary drop-shadow-lg">FEATURED COLLECTIONS</h2>
          <p className="text-muted-foreground mt-2 drop-shadow-md">Scroll horizontally to explore</p>
        </div>

        {/* Vertical centering wrapper */}
        <div className="flex flex-1 items-center">
          <div ref={scrollWrapperRef} className="flex w-max items-center pl-[10vw] pr-[20vw] gap-6 md:gap-10">
            {items.map((item) => (
              <div key={item.id} className="collection-item flex h-[65vh] w-[80vw] flex-shrink-0 items-center justify-center md:w-[32vw]">
                <div className="group relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                  
                  {/* Actual Image Background */}
                  <img src={item.image} alt={item.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  
                  {/* Dark overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 z-0" />
                  
                  <div className="z-10 flex h-48 w-48 items-center justify-center rounded-full bg-background/20 shadow-2xl backdrop-blur-md border border-white/20 mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:bg-background/40">
                    <span className="text-white text-sm font-semibold tracking-wider">View Details</span>
                  </div>

                  <div className="z-10 text-center transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                    <h3 className="font-serif text-4xl font-bold text-white mb-2 drop-shadow-md">{item.name}</h3>
                    <p className="text-primary font-mono text-2xl mb-6 font-semibold drop-shadow-md">{item.price}</p>
                    <button className="rounded-full bg-primary px-8 py-3 font-bold text-primary-foreground shadow-lg transition-colors hover:bg-white">
                      Add to Cart
                    </button>
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

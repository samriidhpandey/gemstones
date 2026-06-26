"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const galleryImages = [
  { 
    id: 1, 
    src: "/gems/gallery1.jpeg", 
    alt: "Blood Ruby Core", 
    className: "col-span-1 md:col-span-2 row-span-2" 
  },
  { 
    id: 2, 
    src: "/gems/gallery2.jpeg", 
    alt: "Amethyst Crystals", 
    className: "col-span-1 row-span-1" 
  },
  { 
    id: 3, 
    src: "/gems/gallery3.jpeg", 
    alt: "Raw Emerald Matrix", 
    className: "col-span-1 row-span-2" 
  },
  { 
    id: 4, 
    src: "/gems/gallery4.jpeg", 
    alt: "Uncut Sapphire", 
    className: "col-span-1 row-span-1" 
  },
  { 
    id: 5, 
    src: "/gems/gallery5.jpeg", 
    alt: "Sunset Opal", 
    className: "col-span-1 md:col-span-2 row-span-1" 
  },
];

export default function Gallery({ images }: { images: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".gallery-item");

      items.forEach((item: any, i) => {
        gsap.fromTo(item, 
          { opacity: 0, y: 100, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-background py-32 px-6">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-primary mb-4">
            THE GALLERY
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Immerse yourself in the raw, unrefined beauty of the world's most sought-after minerals before they are cut into masterpieces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4 md:gap-6">
          {images.map((image) => (
            <div 
              key={image.id} 
              className={`gallery-item relative overflow-hidden rounded-2xl group ${image.className}`}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              {/* Using standard img for reliable remote unoptimized loading since next/image needs domain config */}
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <p className="text-white font-serif text-xl tracking-wide">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

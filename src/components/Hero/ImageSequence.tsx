"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ImageSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(0);
  const frameCount = 300;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const currentFrame = (index: number) => 
      `/hero-sequence/${index.toString().padStart(3, "0")}.webp`;

    const images: HTMLImageElement[] = [];
    const airpods = {
      frame: 0
    };

    // Preload images
    let loadedCount = 0;
    
    const handleLoad = () => {
      loadedCount++;
      setLoaded(Math.floor((loadedCount / frameCount) * 100));
    };

    for (let i = 1; i <= frameCount; i++) {
      const img = new window.Image();
      img.src = currentFrame(i);
      img.onload = () => {
        handleLoad();
        if (i === 1) {
          render();
        }
      };
      img.onerror = handleLoad; // Prevent hanging on missing/failed images
      images.push(img);
    }

    // Force loader to dismiss after 10 seconds regardless of progress
    const fallbackTimer = setTimeout(() => {
      setLoaded(100);
    }, 10000);

    let ctx = gsap.context(() => {
      gsap.to(airpods, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
        onUpdate: render,
      });
    });

    function render() {
      if (!canvas || !context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      const img = images[airpods.frame];
      if (img && img.complete) {
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        context.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          centerShift_x,
          centerShift_y,
          img.width * ratio,
          img.height * ratio
        );
      }
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(fallbackTimer);
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <>
      {loaded < 100 && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background">
          <div className="text-primary font-mono text-xl mb-4">Loading Assets</div>
          <div className="w-64 h-1 bg-border rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300" 
              style={{ width: `${loaded}%` }} 
            />
          </div>
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 h-full w-full object-cover"
      />
    </>
  );
}

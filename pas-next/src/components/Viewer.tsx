"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type ViewerImage = { src: string; alt: string };

export function Viewer({ images }: { images: ViewerImage[] }) {
  const [index, setIndex] = useState(0);
  const [isLandscape, setIsLandscape] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const update = () => {
      const { innerWidth: w, innerHeight: h } = window;
      setIsLandscape(w >= h);
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startX = 0;
    const onStart = (e: TouchEvent) => (startX = e.touches[0].clientX);
    const onMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - startX;
      if (Math.abs(dx) > 48) {
        if (dx < 0) setIndex((i) => Math.min(i + 1, images.length - 1));
        else setIndex((i) => Math.max(i - 1, 0));
        startX = e.touches[0].clientX;
      }
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
    };
  }, [images.length]);

  const current = images[index] ?? images[0];
  // Make image larger: on large screens increase the height ratio slightly
  const aspectClass = isLandscape ? "aspect-[16/8] lg:aspect-[16/7]" : "aspect-[9/16]";

  return (
    <section>
      <div ref={containerRef} className="relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
        <div className={`relative w-full ${aspectClass}`}>
          <Image src={current.src} alt={current.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain" priority />
        </div>
        <button
          aria-label="Vorheriges Bild"
          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-md border border-neutral-800 bg-neutral-900/80 px-2 py-1 text-neutral-200 hover:bg-neutral-800"
        >
          ←
        </button>
        <button
          aria-label="Nächstes Bild"
          onClick={() => setIndex((i) => Math.min(i + 1, images.length - 1))}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md border border-neutral-800 bg-neutral-900/80 px-2 py-1 text-neutral-200 hover:bg-neutral-800"
        >
          →
        </button>
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setIndex(idx)}
            className={`relative w-24 h-16 shrink-0 rounded border ${idx === index ? "border-neutral-300" : "border-neutral-800"} bg-neutral-900`}
            aria-label={`Bild ${idx + 1}`}
          >
            <Image src={img.src} alt={img.alt} fill className="object-cover rounded" />
          </button>
        ))}
      </div>
    </section>
  );
}



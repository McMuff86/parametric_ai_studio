"use client";
import { useEffect, useRef, useState } from "react";

type DesignCardProps = {
  title: string;
  renderingSrc: string;
  renderingAlt?: string;
  animationSrc?: string; // optional 5s clip (mp4/webm)
  descriptionPath?: string; // optional markdown under /public
};

export function DesignCard({ title, renderingSrc, renderingAlt = title, animationSrc, descriptionPath }: DesignCardProps) {
  const [open, setOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [descriptionHtml, setDescriptionHtml] = useState<string>("");
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open || !descriptionPath) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(descriptionPath);
        if (!res.ok) return;
        const text = await res.text();
        const { marked } = await import("marked");
        const html = marked.parse(text);
        if (!cancelled) setDescriptionHtml(String(html));
      } catch {
        // ignore
      }
    })();
    return () => { cancelled = true; };
  }, [open, descriptionPath]);

  const requestFs = async () => {
    try { await modalRef.current?.requestFullscreen?.(); } catch {}
  };

  return (
    <div className="group overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={renderingSrc}
        alt={renderingAlt}
        className="w-full aspect-[16/9] object-cover transition-transform duration-200 group-hover:scale-[1.03] cursor-pointer"
        onClick={() => setOpen(true)}
        loading="lazy"
      />
      <div className="p-3 text-sm text-neutral-300 flex items-center justify-between">
        <span>{title}</span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-xs px-2 py-1 rounded-md border border-neutral-800 hover:bg-neutral-800"
        >
          View
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div ref={modalRef} className="relative w-full max-w-6xl max-h-[92vh] rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-800 bg-neutral-900/60">
              <div className="text-sm text-neutral-300 truncate">{title}</div>
              <div className="flex items-center gap-2">
                {animationSrc && (
                  <button
                    type="button"
                    onClick={() => setShowVideo((v) => !v)}
                    className="text-xs px-2 py-1 rounded-md border border-neutral-800 text-neutral-200 hover:bg-neutral-800"
                  >
                    {showVideo ? "Show image" : "Play animation"}
                  </button>
                )}
                <button
                  type="button"
                  onClick={requestFs}
                  className="text-xs px-2 py-1 rounded-md border border-neutral-800 text-neutral-200 hover:bg-neutral-800"
                >
                  Fullscreen
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-xs px-2 py-1 rounded-md border border-neutral-800 text-neutral-200 hover:bg-neutral-800"
                  aria-label="Close"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-0 md:gap-4 p-0 md:p-4">
              <div className="md:col-span-2">
                <div className="relative w-full aspect-[16/9] md:aspect-[16/9] bg-neutral-900">
                  {showVideo && animationSrc ? (
                    <video
                      src={animationSrc}
                      className="w-full h-full object-contain"
                      playsInline
                      muted
                      loop
                      autoPlay
                      controls
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={renderingSrc} alt={renderingAlt} className="w-full h-full object-contain" />
                  )}
                </div>
              </div>
              <div className="md:col-span-1 p-3 md:p-0">
                {descriptionHtml ? (
                  // eslint-disable-next-line react/no-danger
                  <article className="prose prose-invert prose-neutral max-w-none text-sm">
                    <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
                  </article>
                ) : (
                  <p className="text-sm text-neutral-300">{descriptionPath ? "Loading description…" : "No description provided."}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



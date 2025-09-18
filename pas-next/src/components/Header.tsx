"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-neutral-950/70 backdrop-blur border-b border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/pai-logo-simple-hub.svg" alt="Parametric AI Studio" width={28} height={28} />
          <span className="font-semibold tracking-tight">Parametric AI Studio</span>
        </div>
        <nav aria-label="Hauptnavigation" className="hidden md:flex items-center gap-8 text-sm text-neutral-300">
          <a className="hover:text-white hover:underline underline-offset-4 decoration-2" href="/#services">Services</a>
          <a className="hover:text-white hover:underline underline-offset-4 decoration-2" href="/#cases">Projects</a>
          <a className="hover:text-white hover:underline underline-offset-4 decoration-2" href="/#philosophy">Philosophy</a>
          <a className="hover:text-white hover:underline underline-offset-4 decoration-2" href="/about">About</a>
          <a className="hover:text-white hover:underline underline-offset-4 decoration-2" href="/#contact">Contact</a>
        </nav>
        <button onClick={() => setOpen(v => !v)} className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-neutral-800 hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-sky-500" aria-expanded={open} aria-controls="mobileMenu" aria-label="Menü öffnen">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>
      <div id="mobileMenu" className={`${open ? "" : "hidden"} md:hidden border-t border-neutral-800`} role="dialog" aria-modal="true">
        <div className="px-4 py-3 flex flex-col gap-3 text-sm text-neutral-300">
          <a className="py-2 hover:text-white" href="/#services" onClick={() => setOpen(false)}>Services</a>
          <a className="py-2 hover:text-white" href="/#cases" onClick={() => setOpen(false)}>Projects</a>
          <a className="py-2 hover:text-white" href="/#philosophy" onClick={() => setOpen(false)}>Philosophy</a>
          <a className="py-2 hover:text-white" href="/about" onClick={() => setOpen(false)}>About</a>
          <a className="py-2 hover:text-white" href="/#contact" onClick={() => setOpen(false)}>Contact</a>
        </div>
      </div>
    </header>
  );
}



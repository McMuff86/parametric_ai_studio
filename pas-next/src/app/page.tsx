import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { projects } from "@/data/projects";
import { ShowcaseGroups } from "@/components/ShowcaseGroups";

export default function Home() {
  return (
    <main className="bg-neutral-950 text-neutral-50">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-10 lg:pt-24 lg:pb-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-tight">Digital Fabrication & Computational Workflows</h1>
            <p className="mt-5 text-neutral-300 text-lg">Planung, Konstruktion und Fertigung gehören in eine digitale, offene und nahtlose Pipeline. Mit Rhino, Parametrik und AI schaffen wir Effizienz, Präzision und Nachvollziehbarkeit.</p>
            <div className="mt-8 flex gap-3">
              <a href="#contact" className="inline-flex items-center justify-center rounded-md bg-white text-neutral-900 px-5 py-2.5 text-sm font-medium hover:bg-neutral-200">Projekt anfragen</a>
              <a href="#cases" className="inline-flex items-center justify-center rounded-md border border-neutral-800 text-neutral-100 px-5 py-2.5 text-sm font-medium hover:bg-neutral-900">Showcase ansehen</a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <header className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Services</h2>
            <p className="mt-2 text-neutral-300">Parametrische Modelle, automatisierte Produktionsdaten, BIM-Workflows, Custom-Tools und Beratung.</p>
          </header>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: "Parametrische Modelle", h: "Möbel · Türen · Fronten · Fense · Fassaden" },
              { t: "Produktionsdaten", h: "CAD/CAM · CNC · Rest-API · Modulare Software" },
              { t: "BIM & Zwillinge", h: "BIM-Workflows · Digitale Zwillinge" },
              { t: "Custom-Tools", h: "Rhino/Grasshopper Plugins" },
              { t: "Beratung", h: "AI-gestützte Prozesse · Optimierung · Digitalisierung" },
            ].map((c) => (
              <article key={c.t} className="group rounded-xl border border-neutral-800 p-6 bg-neutral-900">
                <div className="text-sm font-medium text-neutral-400">{c.t}</div>
                <h3 className="mt-1 font-semibold text-white">{c.h}</h3>
                <a className="mt-4 inline-flex items-center gap-1 text-sm text-neutral-200 group-hover:underline underline-offset-4" href="#cases">Mehr →</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section id="cases" className="border-t border-neutral-800 bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-8">
          <header className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Showcase</h2>
            <p className="mt-2 text-neutral-300">Ausgewählte Projekte und Studien – gruppiert nach Themen.</p>
          </header>
          <ShowcaseGroups projects={projects} />
        </div>
      </section>

      {/* Philosophy & KPIs */}
      <section id="philosophy" className="border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Philosophy</h2>
            <p className="mt-3 text-neutral-300 max-w-prose">Offene Schnittstellen, Ende-zu-Ende-Denken und präzise Datenflüsse. Ziel ist eine transparente, robuste Pipeline von Entwurf über Planung bis in die Fertigung.</p>
          </div>
          <ol className="space-y-4">
            <li className="flex gap-3"><span className="font-semibold text-neutral-400">1</span><span className="text-neutral-200">Parametrik als Grundlage für Varianten, Nachvollziehbarkeit und Qualität.</span></li>
            <li className="flex gap-3"><span className="font-semibold text-neutral-400">2</span><span className="text-neutral-200">Automatisierte Datenübergaben statt manueller Fehler.</span></li>
            <li className="flex gap-3"><span className="font-semibold text-neutral-400">3</span><span className="text-neutral-200">Offene Standards und APIs gegen Vendor-Lock-in.</span></li>
            <li className="flex gap-3"><span className="font-semibold text-neutral-400">4</span><span className="text-neutral-200">Fertigung ab Tag eins mitdenken: CNC, BOM, Montage.</span></li>
            <li className="flex gap-3"><span className="font-semibold text-neutral-400">5</span><span className="text-neutral-200">Messbare KPIs: Durchlaufzeit, Fehlerquote, Rückverfolgbarkeit.</span></li>
          </ol>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
            <div className="rounded-xl border border-neutral-800 p-4 bg-neutral-900"><dt className="text-neutral-400">Durchlaufzeit</dt><dd className="mt-1 text-xl font-semibold text-white">−30%</dd></div>
            <div className="rounded-xl border border-neutral-800 p-4 bg-neutral-900"><dt className="text-neutral-400">Fehlerquote</dt><dd className="mt-1 text-xl font-semibold text-white">−50%</dd></div>
            <div className="rounded-xl border border-neutral-800 p-4 bg-neutral-900"><dt className="text-neutral-400">Rückverfolgbarkeit</dt><dd className="mt-1 text-xl font-semibold text-white">100%</dd></div>
            <div className="rounded-xl border border-neutral-800 p-4 bg-neutral-900"><dt className="text-neutral-400">Schnittstellen</dt><dd className="mt-1 text-xl font-semibold text-white">Offen</dd></div>
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="border-t border-neutral-800 bg-neutral-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Lass uns deine digitale Fertigung aufbauen.</h2>
            <p className="mt-2 text-neutral-300">Mail, Call oder Workshop anfragen – wir finden den effizientesten nächsten Schritt.</p>
          </div>
          <div className="flex gap-3">
            <a href="mailto:adrian@example.com" className="inline-flex items-center justify-center rounded-md bg-white text-neutral-900 px-5 py-2.5 text-sm font-medium hover:bg-neutral-100">Mail senden</a>
            <a href="#" className="inline-flex items-center justify-center rounded-md border border-neutral-700 px-5 py-2.5 text-sm font-medium hover:bg-neutral-800">Workshop anfragen</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between text-sm">
          <span>© 2025 Parametric AI Studio</span>
          <a className="hover:underline underline-offset-4" href="/Agents.md">Agents.md</a>
        </div>
      </footer>
    </main>
  );
}

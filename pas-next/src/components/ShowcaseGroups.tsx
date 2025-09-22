"use client";
import Link from "next/link";
import { useState } from "react";
import { GltfViewer } from "@/components/GltfViewer";
import type { Project } from "@/data/projects";
import { DesignCard } from "@/components/DesignCard";

type GroupKey = "cadcam" | "bim" | "rhino" | "ai" | "design";

const GROUPS: { key: GroupKey; title: string; description: string }[] = [
  {
    key: "cadcam",
    title: "CAD/CAM",
    description:
      "Von parametrischem Entwurf bis zum NC‑Programm: Bauteile, Baugruppen und Vorrichtungen für die Fertigung.",
  },
  {
    key: "bim",
    title: "BIM",
    description:
      "Datenreiche Gebäudemodelle, IFC‑Workflows und Koordination – von Autor:innenmodell bis Austausch.",
  },
  {
    key: "rhino",
    title: "Rhino",
    description:
      "Rhino/Grasshopper‑Entwicklung, komplexe Geometrien und maßgeschneiderte Automatisierung.",
  },
  {
    key: "design",
    title: "Design/Architektur",
    description:
      "Renderings und Kurzanimationen zu Design- und Architekturideen.",
  },
  {
    key: "ai",
    title: "AI",
    description:
      "Praktische KI im Workflow: Assistenten, Klassifikation, Automatisierung und Auswertung.",
  },
];

export function ShowcaseGroups({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<Set<GroupKey>>(new Set());
  const [rhinoModel, setRhinoModel] = useState<string>("/models/rhino/table/Tisch2_mesh.gltf");

  const toggle = (k: GroupKey) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k); else next.add(k);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {GROUPS.map(({ key, title }) => {
        const items = projects.filter((p) => p.category === key);
        const isOpen = open.has(key);
        return (
          <section key={key} className="rounded-xl border border-neutral-800 bg-neutral-950/40">
            <button
              type="button"
              onClick={() => toggle(key)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 text-left hover:bg-neutral-900/50"
            >
              <h3 className="text-base sm:text-lg font-semibold tracking-tight">{title}</h3>
              <span className={`transition-transform ${isOpen ? "rotate-90" : ""}`}>▶</span>
            </button>

            <div className={`${isOpen ? "block" : "hidden"} px-4 sm:px-6 lg:px-8 pb-6`}>
              <p className="mt-2 text-neutral-300 text-sm max-w-3xl">{GROUPS.find(g => g.key === key)!.description}</p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.length === 0 && key !== "rhino" && (
                  <div className="rounded-xl border border-neutral-800 bg-neutral-900 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/placeholders/${key}.svg`} alt={`${title} placeholder`} className="w-full aspect-[16/9] object-cover" />
                    <div className="p-3 text-sm text-neutral-300">{title} – Showcase coming soon</div>
                  </div>
                )}
                {key === "rhino" && (
                  <div className="rounded-xl border border-neutral-800 bg-neutral-900 overflow-hidden sm:col-span-2 lg:col-span-3">
                    <div className="flex items-center gap-2 p-3 border-b border-neutral-800 bg-neutral-900/60">
                      <span className="text-sm text-neutral-300">Model:</span>
                      <button
                        type="button"
                        onClick={() => setRhinoModel("/models/rhino/table/Tisch2_mesh.gltf")}
                        className={`text-sm px-3 py-1 rounded-md border ${rhinoModel.includes("table/") ? "bg-neutral-800 border-neutral-700 text-neutral-100" : "border-neutral-800 text-neutral-300 hover:bg-neutral-900"}`}
                      >
                        Table
                      </button>
                      <button
                        type="button"
                        onClick={() => setRhinoModel("/models/rhino/wave_shelf/wave_shelf.gltf")}
                        className={`text-sm px-3 py-1 rounded-md border ${rhinoModel.includes("wave_shelf/") ? "bg-neutral-800 border-neutral-700 text-neutral-100" : "border-neutral-800 text-neutral-300 hover:bg-neutral-900"}`}
                      >
                        Wave shelf
                      </button>
                      <button
                        type="button"
                        onClick={() => setRhinoModel("/models/rhino/sonic/sonic.gltf")}
                        className={`text-sm px-3 py-1 rounded-md border ${rhinoModel.includes("sonic/") ? "bg-neutral-800 border-neutral-700 text-neutral-100" : "border-neutral-800 text-neutral-300 hover:bg-neutral-900"}`}
                      >
                        Sonic
                      </button>
                    </div>
                    <GltfViewer modelUrl={rhinoModel} height="56vh" />
                    <div className="p-3 text-sm text-neutral-300">Rhino – GLTF Preview</div>
                  </div>
                )}
                {items.map((p) => (
                  key === "design" ? (
                    <DesignCard
                      key={p.slug}
                      title={p.title}
                      renderingSrc={(p.images[0] && p.images[0].src) || "/placeholders/design.svg"}
                      renderingAlt={p.title}
                      // Assets convention: /design/<slug>/<slug>.mp4 and /design/<slug>/description.md
                      animationSrc={`/design/${p.slug}/${p.slug}.mp4`}
                      descriptionPath={`/design/${p.slug}/description.md`}
                    />
                  ) : (
                    <Link key={p.slug} href={`/projects/${p.slug}`} className="group block overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={(p.images[0] && p.images[0].src) || "/assets/Sideboard by Night.jpg"}
                        alt={p.title}
                        className="w-full aspect-[16/9] object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="p-3 text-sm text-neutral-300">{p.caption || p.title}</div>
                    </Link>
                  )
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}



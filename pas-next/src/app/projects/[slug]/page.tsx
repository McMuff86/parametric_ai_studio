import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { Viewer } from "@/components/Viewer";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  return (
    <div className="min-h-dvh bg-neutral-950 text-neutral-50">
      <header className="sticky top-0 z-40 bg-neutral-950/70 backdrop-blur border-b border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight hover:underline underline-offset-4">Parametric AI Studio</Link>
          <Link href="/" className="text-sm text-neutral-300 hover:text-white hover:underline underline-offset-4">Zurück</Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Large viewer on top */}
        <Viewer images={project.images} />

        {/* Metadata below */}
        <section className="mt-8">
          <header>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{project.title}</h1>
            {project.caption && <p className="mt-2 text-neutral-300">{project.caption}</p>}
          </header>
          <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            {project.meta.map((m) => (
              <div key={m.label} className="rounded-xl border border-neutral-800 p-4 bg-neutral-900">
                <dt className="text-neutral-400">{m.label}</dt>
                <dd className="mt-1 text-neutral-100">{m.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
    </div>
  );
}

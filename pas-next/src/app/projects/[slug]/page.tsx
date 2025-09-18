import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { Header } from "@/components/Header";
import { Viewer } from "@/components/Viewer";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { projects } = await import("@/data/projects");
  const project = projects.find(p => p.slug === slug);
  if (!project) {
    return (
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-semibold">Project not found</h1>
      </main>
    );
  }

  return (
    <main className="bg-neutral-950 text-neutral-50">
      <Header />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-4">
          <Link
            href="/#cases"
            className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white hover:underline underline-offset-4"
          >
            ← Back to Showcase
          </Link>
        </div>
      {/* Large viewer on top */}
      <Viewer images={project.images} />

      {/* Meta below */}
      <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h1 className="text-2xl font-semibold tracking-tight">{project.title}</h1>
          {project.caption && <p className="mt-2 text-neutral-300">{project.caption}</p>}
        </div>
        <div className="space-y-3">
          {project.meta.map((m, i) => (
            <div key={i} className="rounded-xl border border-neutral-800 p-3 bg-neutral-900">
              <div className="text-sm text-neutral-400">{m.label}</div>
              <div className="text-neutral-200">{m.value}</div>
            </div>
          ))}
        </div>
      </section>
      </section>
    </main>
  );
}

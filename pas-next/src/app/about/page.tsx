import fs from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";
import { Header } from "@/components/Header";

export const metadata = {
  title: "About – Parametric AI Studio",
};

export default async function AboutPage() {
  const filePath = path.join(process.cwd(), "public", "aboutme.md");
  const md = await fs.readFile(filePath, "utf8").catch(() => "# About\nContent missing.");
  const html = marked.parse(md);
  return (
    <main className="bg-neutral-950 text-neutral-50">
      <Header />
      <section id="about" className="border-t border-neutral-800">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
          {/* eslint-disable-next-line react/no-danger */}
          <article className="prose prose-invert prose-neutral max-w-none prose-p:mt-4 prose-li:my-1 prose-headings:font-semibold prose-h1:text-4xl prose-h2:text-2xl prose-hr:border-neutral-800">
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </article>
        </div>
      </section>
    </main>
  );
}



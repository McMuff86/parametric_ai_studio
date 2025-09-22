export type ProjectMeta = { label: string; value: string };
export type Project = {
  slug: string;
  title: string;
  caption?: string;
  images: { src: string; alt: string }[]; // paths under public
  meta: ProjectMeta[];
  category: "cadcam" | "bim" | "rhino" | "ai" | "design";
};

export const projects: Project[] = [
  {
    slug: "modern-architecture-villa",
    title: "Modern Architecture Villa",
    caption: "Wireframe → Reality",
    category: "design",
    images: [
      { src: "/design/modern-architecture-villa/modern-architecture-villa-wireframe-to-reality.png", alt: "Modern Architecture Villa" },
    ],
    meta: [],
  },
  {
    slug: "luxury-mountain-villa",
    title: "Luxury Mountain Villa",
    caption: "Wireframe → Reality",
    category: "design",
    images: [
      { src: "/design/luxury-mountain-villa/luxury-mountain-villa-wireframe-to-reality.png", alt: "Luxury Mountain Villa" },
    ],
    meta: [],
  },
  {
    slug: "modern-villa-livingroom",
    title: "Modern Villa Livingroom",
    caption: "Blueprint → Reality",
    category: "design",
    images: [
      { src: "/design/modern-villa-livingroom/modern-villa-livingroom-wireframe-to-reality.png", alt: "Modern Villa Livingroom" },
    ],
    meta: [],
  },
  {
    slug: "scandinavian-wood-villa",
    title: "Scandinavian Wood Villa",
    caption: "Blueprint → Reality",
    category: "design",
    images: [
      { src: "/design/scandinavian-wood-villa/scandinavian-wood-villa-blueprint-to-reality.png", alt: "Scandinavian Wood Villa" },
    ],
    meta: [],
  },
    slug: "key-rack",
    title: "Key Rack",
    caption: "Key Rack — CNC-gefräst",
    category: "cadcam",
    images: [
      { src: "/hires/key_rack/key_rack_01.jpg", alt: "Key Rack" },
      { src: "/hires/key_rack/key_rack_02.jpg", alt: "Key Rack 2" },
      { src: "/hires/key_rack/key_rack_03.jpg", alt: "Key Rack 3" },
      { src: "/hires/key_rack/key_rack_04.jpg", alt: "Key Rack 4" },
      { src: "/hires/key_rack/key_rack_05.jpg", alt: "Key Rack 5" },
      { src: "/hires/key_rack/key_rack_06.jpg", alt: "Key Rack 6" },
      { src: "/hires/key_rack/key_rack_07.jpg", alt: "Key Rack 7" },
      { src: "/hires/key_rack/key_rack_08.jpg", alt: "Key Rack 8" },
      { src: "/hires/key_rack/key_rack_09.jpg", alt: "Key Rack 9" },
      { src: "/hires/key_rack/key_rack_10.jpg", alt: "Key Rack 10" },
      { src: "/hires/key_rack/key_rack_11.jpg", alt: "Key Rack 11" },
      { src: "/hires/key_rack/key_rack_12.jpg", alt: "Key Rack 12" },
    ],
    meta: [
      { label: "Material", value: "Aluminium" },
      { label: "Oberfläche", value: "Powdercoated, NCS S5000-S30" },
      { label: "Dimensions", value: "1000×500×120 mm" },
    ],
  },
  {
    slug: "sideboard-night",
    title: "Sideboard by Night",
    caption: "Sideboard by Night — Möbel/Parametrik",
    category: "cadcam",
    images: [
      { src: "/hires/sideboard/Sideboard by Night.jpg", alt: "Sideboard by Night" },
    ],
    meta: [
      { label: "Material", value: "Holz, Metall" },
      { label: "Finish", value: "Matt, geölt" },
      { label: "Dimensions", value: "1800×450×600 mm" },
    ],
  },
  {
    slug: "sideboard-dev",
    title: "Sideboard Entwicklung",
    caption: "Sideboard Entwicklung — Iterationen",
    category: "cadcam",
    images: [
      { src: "/hires/sideboard/Sideboard dev 2.jpg", alt: "Sideboard dev 2" },
      { src: "/hires/sideboard/Sideboard dev.JPG", alt: "Sideboard dev" },
      { src: "/hires/sideboard_2/Sideboard.png", alt: "Sideboard concept" },
    ],
    meta: [
      { label: "Workflow", value: "Parametrik, Varianten" },
      { label: "Iterations", value: "v1–v6" },
    ],
  },
  {
    slug: "wine-shelf",
    title: "Weingestell",
    caption: "Weingestell — CNC & Holz",
    category: "cadcam",
    images: [
      { src: "/hires/winerack/Weingestell_2.jpg", alt: "Weingestell" },
      { src: "/hires/winerack/Weingestell SW.png", alt: "Weingestell SW" },
    ],
    meta: [
      { label: "Material", value: "Eiche" },
      { label: "Fertigung", value: "CNC gefräst" },
      { label: "Kapazität", value: "48 Flaschen" },
    ],
  },
  {
    slug: "wavy-shelf-right",
    title: "Wellenregal (rechts)",
    caption: "Wellenregal — Geometrie & Fertigung",
    category: "cadcam",
    images: [
      { src: "/hires/wave_shelf/waveshelf_main.jpg", alt: "Wellenregal" },
      { src: "/hires/wave_shelf/waveshelf_01.jpg", alt: "Wellenregal 1" },
      { src: "/hires/wave_shelf/waveshelf_02.jpg", alt: "Wellenregal 2" },
      { src: "/hires/wave_shelf/waveshelf_03.jpg", alt: "Wellenregal 3" },
      { src: "/hires/wave_shelf/waveshelf_04.jpg", alt: "Wellenregal 4" },
    ],
    meta: [
      { label: "Material", value: "Multiplex" },
      { label: "Oberfläche", value: "Klarlack, matt" },
    ],
  },
  {
    slug: "curved-light",
    title: "Curved Light",
    caption: "Curved Light — Konzept & Fertigung",
    category: "cadcam",
    images: [
      { src: "/hires/curved_light/Curved Light 2Pic.jpg", alt: "Curved Light" },
      { src: "/hires/curved_light/IMG_20180315_194247.jpg", alt: "Curved Light 1" },
      { src: "/hires/curved_light/IMG_20180315_194304.jpg", alt: "Curved Light 2" },
      { src: "/hires/curved_light/IMG_20180316_185914.jpg", alt: "Curved Light 3" },
      { src: "/hires/curved_light/IMG_20180316_185925.jpg", alt: "Curved Light 4" },
      { src: "/hires/curved_light/IMG_20180319_195359.jpg", alt: "Curved Light 5" },
    ],
    meta: [
      { label: "Material", value: "Aluminium, Acryl" },
      { label: "Oberfläche", value: "Pulverbeschichtet, RAL 9005" },
      { label: "Dimensions", value: "1200×300×60 mm" },
    ],
  },
  {
    slug: "table",
    title: "Tisch",
    caption: "Tisch — Holz & Verbindung",
    category: "cadcam",
    images: [
      { src: "/hires/table/Tisch2.jpg", alt: "Tisch" },
    ],
    meta: [
      { label: "Material", value: "Massivholz" },
      { label: "Verbindung", value: "Schwalbenschwanz, Dübel" },
    ],
  },
  {
    slug: "cabinet",
    title: "Vitrine",
    caption: "Vitrine — Detaillösungen",
    category: "cadcam",
    images: [
      { src: "/hires/vitrine/Vitrine_1.jpg", alt: "Vitrine" },
    ],
    meta: [
      { label: "Glas", value: "ESG, 6 mm" },
      { label: "Beschläge", value: "verdeckte Scharniere" },
    ],
  },
  {
    slug: "kitchen-mixed",
    title: "Küche — Konzept zu Real",
    caption: "Küche — Konzept zu Real",
    category: "cadcam",
    images: [
      { src: "/hires/kitchen/Render_Küche_Real_Skizze_mix.png", alt: "Küche Mix" },
      { src: "/hires/kitchen/Render_Küche_Skizze.png", alt: "Küche Skizze" },
    ],
    meta: [
      { label: "Workflow", value: "Konzept → Parametrik → Fertigung" },
    ],
  },
];



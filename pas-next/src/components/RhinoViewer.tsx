"use client";
import { useEffect, useRef, useState } from "react";

export function RhinoViewer({ modelUrl = "/models/sample.3dm" }: { modelUrl?: string }) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<string>("Lade Viewer…");

  useEffect(() => {
    let scene: any, camera: any, renderer: any, controls: any, running = true;
    let rhino: any;

    (async () => {
      try {
        const [{ Scene, PerspectiveCamera, WebGLRenderer, sRGBEncoding, ACESFilmicToneMapping, Color, Group, MeshStandardMaterial, Mesh, DirectionalLight, AmbientLight, Box3, Vector3, BufferGeometry, Float32BufferAttribute, Uint32BufferAttribute }, rhino3dm] = await Promise.all([
          import("three").then((m) => ({
            Scene: m.Scene,
            PerspectiveCamera: m.PerspectiveCamera,
            WebGLRenderer: m.WebGLRenderer,
            sRGBEncoding: m.sRGBEncoding,
            ACESFilmicToneMapping: m.ACESFilmicToneMapping,
            Color: m.Color,
            Group: m.Group,
            MeshStandardMaterial: m.MeshStandardMaterial,
            Mesh: m.Mesh,
            DirectionalLight: m.DirectionalLight,
            AmbientLight: m.AmbientLight,
            Box3: m.Box3,
            Vector3: m.Vector3,
            BufferGeometry: m.BufferGeometry,
            Float32BufferAttribute: m.Float32BufferAttribute,
            Uint32BufferAttribute: m.Uint32BufferAttribute,
          })),
          // rhino3dm is an async factory: call default() to get the module instance
          (await import("rhino3dm")).default(),
        ]);
        rhino = await rhino3dm;

        if (!mountRef.current) return;

        // Three setup
        scene = new Scene();
        scene.background = new Color(0x0a0a0a);
        camera = new PerspectiveCamera(45, 1, 0.1, 1000);
        camera.position.set(4, 3, 6);

        renderer = new WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
        // three r180+: use SRGBColorSpace
        // @ts-ignore
        renderer.outputColorSpace = (await import("three")).SRGBColorSpace || sRGBEncoding;
        renderer.toneMapping = ACESFilmicToneMapping;

        const mount = mountRef.current;
        mount.innerHTML = "";
        mount.appendChild(renderer.domElement);

        const resize = () => {
          if (!mount) return;
          const w = mount.clientWidth || 800;
          const h = (mount.clientHeight || 450);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h, false);
        };
        resize();
        window.addEventListener("resize", resize);

        // Lights
        scene.add(new AmbientLight(0xffffff, 0.6));
        const key = new DirectionalLight(0xffffff, 1.0);
        key.position.set(5, 10, 7.5);
        scene.add(key);

        // Load 3DM
        setStatus("Lade Modell…");
        const resp = await fetch(modelUrl);
        if (!resp.ok) {
          setStatus("Kein Modell gefunden (" + modelUrl + ")");
          return;
        }
        const buffer = await resp.arrayBuffer();
        const file3dm = rhino.File3dm.fromByteArray(new Uint8Array(buffer));

        const root = new Group();
        const material = new MeshStandardMaterial({ color: 0xcccccc, metalness: 0.1, roughness: 0.7 });

        const objs = file3dm.objects();
        for (let i = 0; i < objs.count; i++) {
          const obj = objs.get(i);
          const geo = obj.geometry();
          // Only render meshes directly (simple MVP). Breps/Surfaces would need meshing.
          const isRhinoMesh = geo && typeof (geo as any).vertices === "function" && typeof (geo as any).faces === "function";
          if (isRhinoMesh) {
            const threeGeom = meshToThreeGeometry(geo as any);
            if (threeGeom) {
              const m = new Mesh(threeGeom, material);
              root.add(m);
            }
          }
          obj.delete();
        }
        objs.delete();
        file3dm.delete();

        scene.add(root);

        // Fit camera
        const box = new Box3().setFromObject(root);
        const size = box.getSize(new Vector3()).length();
        const center = box.getCenter(new Vector3());
        camera.near = size / 100;
        camera.far = size * 10;
        camera.updateProjectionMatrix();
        camera.position.copy(center.clone().add(new Vector3(size / 2.5, size / 2.0, size / 2.0)));
        camera.lookAt(center);

        setStatus("");

        const tick = () => {
          if (!running) return;
          renderer.render(scene, camera);
          requestAnimationFrame(tick);
        };
        tick();

        function meshToThreeGeometry(rhMesh: any) {
          // Convert rhino3dm mesh to three.js BufferGeometry
          const g = new BufferGeometry();
          const verts = rhMesh.vertices();
          const vcount = verts.count;
          const positions = new Float32Array(vcount * 3);
          for (let i = 0; i < vcount; i++) {
            const pt = verts.get(i);
            positions[i * 3 + 0] = pt.x;
            positions[i * 3 + 1] = pt.y;
            positions[i * 3 + 2] = pt.z;
          }
          g.setAttribute("position", new Float32BufferAttribute(positions, 3));

          const faces = rhMesh.faces();
          const ic: number[] = [];
          for (let i = 0; i < faces.count; i++) {
            const f = faces.get(i);
            if (f.isTriangle) {
              ic.push(f.a, f.b, f.c);
            } else {
              ic.push(f.a, f.b, f.c, f.a, f.c, f.d);
            }
          }
          g.setIndex(new Uint32BufferAttribute(new Uint32Array(ic), 1));
          g.computeVertexNormals();
          verts.delete();
          faces.delete();
          return g;
        }
      } catch (e: any) {
        console.error(e);
        setStatus("Viewer-Fehler: " + (e?.message || e));
      }
    })();

    return () => {
      running = false;
    };
  }, [modelUrl]);

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900">
      <div ref={mountRef} style={{ width: "100%", height: "60vh" }} />
      {status && <div className="px-4 py-2 text-sm text-neutral-300">{status}</div>}
    </div>
  );
}



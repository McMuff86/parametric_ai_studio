"use client";
import { useEffect, useRef, useState } from "react";

export function GltfViewer({ modelUrl, height = "60vh" }: { modelUrl: string; height?: string }) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<string>("Loading viewer…");

  useEffect(() => {
    let renderer: any;
    let scene: any;
    let camera: any;
    let controls: any;
    let animId: number | null = null;

    (async () => {
      try {
        const three = await import("three");
        const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
        const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");

        if (!mountRef.current) return;

        // Scene setup
        scene = new three.Scene();
        scene.background = new three.Color(0x0a0a0a);

        camera = new three.PerspectiveCamera(45, 1, 0.1, 5000);
        camera.position.set(3, 2, 5);

        renderer = new three.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
        renderer.outputColorSpace = (three as any).SRGBColorSpace;
        renderer.toneMapping = three.ACESFilmicToneMapping as any;

        const mount = mountRef.current;
        mount.innerHTML = "";
        mount.appendChild(renderer.domElement);

        const resize = () => {
          const w = mount.clientWidth || 800;
          const h = mount.clientHeight || 450;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
          renderer.setSize(w, h);
        };
        resize();
        window.addEventListener("resize", resize);
        let ro: any;
        const ResizeObserverRef = (window as any).ResizeObserver;
        if (ResizeObserverRef) {
          ro = new ResizeObserverRef(() => resize());
          ro.observe(mount);
        }

        // Lights
        scene.add(new three.AmbientLight(0xffffff, 0.6));
        const key = new three.DirectionalLight(0xffffff, 1.0);
        key.position.set(5, 10, 7.5);
        scene.add(key);

        // Controls
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        // Load GLTF
        setStatus("Loading model…");
        const loader = new GLTFLoader();
        loader.load(
          modelUrl,
          (gltf: any) => {
            const root = gltf.scene || gltf.scenes?.[0];
            if (!root) {
              setStatus("No scene in GLTF");
              return;
            }
            scene.add(root);

            // Fit camera
            const box = new three.Box3().setFromObject(root);
            const size = box.getSize(new three.Vector3());
            const center = box.getCenter(new three.Vector3());

            const maxDim = Math.max(size.x, size.y, size.z);
            const fitHeightDistance = maxDim / (2 * Math.atan((Math.PI * camera.fov) / 360));
            const fitWidthDistance = fitHeightDistance / camera.aspect;
            const distance = 1.2 * Math.max(fitHeightDistance, fitWidthDistance);

            const dir = new three.Vector3(1, 0.8, 1).normalize();
            camera.position.copy(center.clone().add(dir.multiplyScalar(distance)));
            camera.near = distance / 100;
            camera.far = distance * 100;
            camera.updateProjectionMatrix();
            camera.lookAt(center);
            controls.target.copy(center);
            controls.update();

            setStatus("");

            const tick = () => {
              controls.update();
              renderer.render(scene, camera);
              animId = requestAnimationFrame(tick);
            };
            tick();
          },
          undefined,
          (err: any) => {
            console.error(err);
            setStatus("Failed to load model: " + (err?.message || err));
          }
        );
      } catch (e: any) {
        console.error(e);
        setStatus("Viewer error: " + (e?.message || e));
      }
    })();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      try { (controls as any)?.dispose?.(); } catch {}
      try { (renderer as any)?.dispose?.(); } catch {}
      try {
        const ResizeObserverRef = (window as any).ResizeObserver;
        if (ResizeObserverRef) (ro as any)?.disconnect?.();
      } catch {}
    };
  }, [modelUrl]);

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900">
      <div ref={mountRef} style={{ width: "100%", height }} />
      {status && <div className="px-4 py-2 text-sm text-neutral-300">{status}</div>}
    </div>
  );
}



import { useEffect, useRef } from "react";

export default function HeroCanvas() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.onload = () => initThree();
    document.head.appendChild(script);

    let animId;

    function initThree() {
      const canvas = canvasRef.current;
      const heroEl = heroRef.current;
      if (!canvas || !heroEl) return;

      const THREE = window.THREE;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 300);
      camera.position.set(0, 5, 15);
      camera.lookAt(0, 0, 0);

      function resize() {
        const w = canvas.parentElement.offsetWidth;
        const h = canvas.parentElement.offsetHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
      resize();
      window.addEventListener("resize", resize);

      const gridGroup = new THREE.Group();
      scene.add(gridGroup);
      gridGroup.rotation.x = -0.5;

      const COLS = 30, ROWS = 30, SP = 1.1;
      const lineMat = new THREE.LineBasicMaterial({ color: 0x1e3fa8, transparent: true, opacity: 0.5 });

      for (let r = 0; r <= ROWS; r++) {
        const z = (r - ROWS / 2) * SP;
        const g = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-(COLS / 2) * SP, 0, z),
          new THREE.Vector3((COLS / 2) * SP, 0, z),
        ]);
        gridGroup.add(new THREE.Line(g, lineMat));
      }
      for (let c = 0; c <= COLS; c++) {
        const x = (c - COLS / 2) * SP;
        const g = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(x, 0, -(ROWS / 2) * SP),
          new THREE.Vector3(x, 0, (ROWS / 2) * SP),
        ]);
        gridGroup.add(new THREE.Line(g, lineMat));
      }

      const nodeGeo = new THREE.SphereGeometry(0.06, 6, 6);
      const nodes = [];
      for (let r = 0; r <= ROWS; r++) {
        for (let c = 0; c <= COLS; c++) {
          const mesh = new THREE.Mesh(nodeGeo, new THREE.MeshBasicMaterial({ color: 0x4f7bff }));
          mesh.position.set((c - COLS / 2) * SP, 0, (r - ROWS / 2) * SP);
          mesh.userData.phase = Math.random() * Math.PI * 2;
          mesh.userData.amp = Math.random() * 0.22 + 0.03;
          mesh.userData.spd = Math.random() * 0.7 + 0.3;
          gridGroup.add(mesh);
          nodes.push(mesh);
        }
      }

      const pillarPos = [[-5,-5],[-2,-7],[3,-4],[7,-8],[-8,-2],[1,-11],[8,-3],[-4,-10],[5,-1],[-6,-6]];
      pillarPos.forEach(([px, pz]) => {
        const h = Math.random() * 1.8 + 0.5;
        const geo = new THREE.CylinderGeometry(0.025, 0.025, h, 6);
        const mat = new THREE.MeshBasicMaterial({ color: 0x4f7bff, transparent: true, opacity: 0.2 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(px, h / 2, pz);
        gridGroup.add(mesh);
      });

      const cubeConfigs = [[4,2.5,-3],[-3,3,-5],[7,1.8,-4],[-6,2.5,-3],[0,3.5,-8],[-4,1.5,-6],[5,2,-7]];
      const cubes = cubeConfigs.map(([cx, cy, cz]) => {
        const s = Math.random() * 0.45 + 0.2;
        const mesh = new THREE.Mesh(
          new THREE.BoxGeometry(s, s, s),
          new THREE.MeshBasicMaterial({ color: 0x4f7bff, transparent: true, opacity: 0.15, wireframe: true })
        );
        mesh.position.set(cx, cy, cz);
        mesh.userData.rx = Math.random() * 0.008 + 0.002;
        mesh.userData.ry = Math.random() * 0.012 + 0.003;
        mesh.userData.fph = Math.random() * Math.PI * 2;
        scene.add(mesh);
        return mesh;
      });

      const torus1 = new THREE.Mesh(
        new THREE.TorusGeometry(1.2, 0.02, 8, 64),
        new THREE.MeshBasicMaterial({ color: 0x4f7bff, transparent: true, opacity: 0.25 })
      );
      torus1.position.set(6, 2, -5);
      torus1.rotation.x = 1.2;
      scene.add(torus1);

      const torus2 = new THREE.Mesh(
        new THREE.TorusGeometry(0.7, 0.014, 8, 48),
        new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.2 })
      );
      torus2.position.set(-5.5, 2.2, -4);
      torus2.rotation.x = 1.0;
      scene.add(torus2);

      const icosa = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.8, 0),
        new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.18, wireframe: true })
      );
      icosa.position.set(-8, 2.5, -6);
      scene.add(icosa);

      let tX = 0, tY = 0, cX = 0, cY = 0;
      const onMouseMove = (e) => {
        const rect = heroEl.getBoundingClientRect();
        tX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        tY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      };
      const onMouseLeave = () => { tX = 0; tY = 0; };
      heroEl.addEventListener("mousemove", onMouseMove);
      heroEl.addEventListener("mouseleave", onMouseLeave);

      const clock = new THREE.Clock();
      function animate() {
        animId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        cX += (tX - cX) * 0.045;
        cY += (tY - cY) * 0.045;

        gridGroup.rotation.y = cX * 0.2;
        gridGroup.rotation.x = -0.5 + cY * 0.1;

        camera.position.x = cX * 1.5;
        camera.position.y = 5 - cY * 0.8;
        camera.lookAt(0, 0, 0);

        nodes.forEach((n) => {
          const wave = Math.sin(t * n.userData.spd + n.userData.phase) * n.userData.amp;
          n.position.y = wave;
          const b = 0.5 + (wave / n.userData.amp) * 0.5;
          n.material.color.setRGB(0.31 + b * 0.18, 0.48 + b * 0.12, 1.0);
        });

        torus1.rotation.z += 0.005;
        torus2.rotation.z -= 0.007;
        torus1.position.y = 2 + Math.sin(t * 0.4) * 0.35;
        torus2.position.y = 2.2 + Math.sin(t * 0.5 + 1) * 0.28;

        icosa.rotation.x += 0.005;
        icosa.rotation.y += 0.007;
        icosa.position.y = 2.5 + Math.sin(t * 0.35) * 0.2;

        cubes.forEach((c) => {
          c.rotation.x += c.userData.rx;
          c.rotation.y += c.userData.ry;
          c.position.y += Math.sin(t * 0.5 + c.userData.fph) * 0.003;
        });

        const scrollY = window.scrollY;
        const heroH = heroEl.offsetHeight;
        if (scrollY < heroH) {
          const p = scrollY / heroH;
          gridGroup.position.z = -p * 5;
          gridGroup.rotation.x = -0.5 - p * 0.35 + cY * 0.1;
        }

        renderer.render(scene, camera);
      }
      animate();

      return () => {
        window.removeEventListener("resize", resize);
        heroEl.removeEventListener("mousemove", onMouseMove);
        heroEl.removeEventListener("mouseleave", onMouseLeave);
        cancelAnimationFrame(animId);
        renderer.dispose();
      };
    }

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="fn-hero" ref={heroRef}>
      <canvas className="fn-hero-canvas" ref={canvasRef} />
      <div className="fn-hero-glow" />

      <div className="fn-hero-pill">
        <span className="fn-blink" />
        Full-Service IT Solutions for PNG Businesses
      </div>

      <h1>
        Transform Your Business<br />
        With <span className="ac">Smart IT Services</span>
      </h1>

      <p className="fn-hero-sub">
        FASTNet delivers complete IT solutions — from digital transformation and secure networks
        to websites, training, and cloud integration — built specifically for businesses across Papua New Guinea.
      </p>

      <div className="fn-hero-btns">
        <a href="#services" className="fn-btn-main">
          View Our IT Services <span className="fn-btn-arr">→</span>
        </a>
        <a href="#contact" className="fn-btn-ghost">Get a Free Consultation</a>
      </div>

      {/* Floating UI Cards */}
      <div className="fn-hero-cards">
        {/* Left card */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="fn-fc">
            <div className="fn-fc-label">IT Services Active</div>
            <div className="fn-fc-big">7+ <span style={{ fontSize: "1rem", color: "rgba(255,255,255,.5)" }}>Solutions</span></div>
            <div className="fn-fc-badge">✓ End-to-End IT</div>
          </div>
          <div className="fn-fc-sm">
            <strong style={{ color: "#fff", display: "block", marginBottom: ".2rem" }}>100% Local Expertise</strong>
            PNG-based IT professionals
          </div>
        </div>

        {/* Center card */}
        <div className="fn-fc-center">
          <div className="fn-fc-center-lbl">FASTNet IT Dashboard</div>
          <div className="fn-fc-center-h">
            Digitalising <span>Businesses</span><br />Across PNG
          </div>
          <div className="fn-prog-track"><div className="fn-prog-fill" style={{ width: "87%" }} /></div>
          <div className="fn-fc-note">87% of clients report improved efficiency after FASTNet's digital transformation 🚀</div>
          <div style={{ marginTop: "1rem", display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            {["Networks ✓", "Websites ✓", "Training ✓"].map((t) => (
              <span key={t} style={{ background: "rgba(255,255,255,.1)", borderRadius: "6px", padding: ".3rem .7rem", fontSize: ".7rem", fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Right card */}
        <div className="fn-fc-right">
          <div className="fn-fc-rbadge">✓ Live Project</div>
          <div className="fn-fc-rtitle">Latest Deployment</div>
          <div className="fn-fc-rh">Secure LAN<br />+ Cloud Setup</div>
          <div className="fn-fc-rsub">40% Faster Operations</div>
          <div className="fn-av-stack">
            <div className="fn-av-row">
              <div className="fn-av" style={{ background: "#4f7bff" }}>A</div>
              <div className="fn-av" style={{ background: "#00d4ff", marginLeft: "-6px" }}>B</div>
              <div className="fn-av" style={{ background: "#7c5cbf", marginLeft: "-6px" }}>C</div>
            </div>
            <span className="fn-av-txt">90% Clients Satisfied</span>
          </div>
        </div>
      </div>
    </section>
  );
}

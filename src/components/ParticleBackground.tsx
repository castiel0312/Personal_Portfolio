import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  layer: number; // 0 = far, 1 = mid, 2 = near
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Particle[] = [];
    const particleCount = 80;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    for (let i = 0; i < particleCount; i++) {
      const layer = i < 20 ? 0 : i < 50 ? 1 : 2;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particles.push({
        x, y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * (0.15 + layer * 0.1),
        vy: (Math.random() - 0.5) * (0.15 + layer * 0.1),
        size: Math.random() * (1 + layer * 0.8) + 0.5,
        opacity: Math.random() * 0.4 + 0.1 + layer * 0.08,
        layer,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scroll = scrollRef.current;
      const mouse = mouseRef.current;

      particles.forEach((p, i) => {
        // Parallax: each layer scrolls at different speed offset
        const parallaxFactor = (p.layer + 1) * 0.04;
        const offsetY = scroll * parallaxFactor;

        p.baseX += p.vx;
        p.baseY += p.vy;

        if (p.baseX < 0 || p.baseX > canvas.width) p.vx *= -1;
        if (p.baseY < 0 || p.baseY > canvas.height) p.vy *= -1;

        // Mouse repulsion
        let mx = 0, my = 0;
        const dx = p.baseX - mouse.x;
        const dy = (p.baseY - offsetY) - (mouse.y - scroll);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 120 + p.layer * 30;
        if (dist < repelRadius && dist > 0) {
          const force = (1 - dist / repelRadius) * (15 + p.layer * 8);
          mx = (dx / dist) * force;
          my = (dy / dist) * force;
        }

        p.x = p.baseX + mx;
        p.y = p.baseY - offsetY + my;

        // Color varies by layer
        const hues = [190, 230, 260];
        const hue = hues[p.layer];

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 100%, 55%, ${p.opacity})`;
        ctx.fill();

        // Connections within same or adjacent layers
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          if (Math.abs(p.layer - q.layer) > 1) continue;
          const cdx = p.x - q.x;
          const cdy = p.y - q.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          const maxDist = 130 - (p.layer + q.layer) * 5;

          if (cdist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `hsla(${hue}, 80%, 50%, ${0.06 * (1 - cdist / maxDist)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Re-check height periodically
    const resizeInterval = setInterval(resize, 2000);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(resizeInterval);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default ParticleBackground;

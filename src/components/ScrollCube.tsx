import { useEffect, useState } from "react";

const faces = [
  { transform: "translateZ(80px)", color: "rgba(255, 0, 0, 0.85)" },       // Red - Front
  { transform: "rotateY(180deg) translateZ(80px)", color: "rgba(255, 165, 0, 0.85)" }, // Orange - Back
  { transform: "rotateY(-90deg) translateZ(80px)", color: "rgba(0, 100, 255, 0.85)" }, // Blue - Left
  { transform: "rotateY(90deg) translateZ(80px)", color: "rgba(0, 180, 0, 0.85)" },    // Green - Right
  { transform: "rotateX(90deg) translateZ(80px)", color: "rgba(255, 255, 255, 0.9)" }, // White - Top
  { transform: "rotateX(-90deg) translateZ(80px)", color: "rgba(255, 220, 0, 0.85)" }, // Yellow - Bottom
];

const ScrollCube = () => {
  const [rotation, setRotation] = useState({ x: 25, y: 45 });

  useEffect(() => {
    const onScroll = () => {
      const scroll = window.scrollY;
      setRotation({
        x: 25 + scroll * 0.08,
        y: 45 + scroll * 0.15,
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1, perspective: "1200px" }}>
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 160,
          height: 160,
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: "transform 0.1s linear",
        }}
      >
        {faces.map((face, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-md"
            style={{
              transform: face.transform,
              background: face.color,
              border: "3px solid rgba(0,0,0,0.7)",
              boxShadow: "inset 0 0 15px rgba(0,0,0,0.2)",
              // 3x3 grid overlay
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.6) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.6) 1px, transparent 1px)
              `,
              backgroundSize: "33.33% 33.33%",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollCube;

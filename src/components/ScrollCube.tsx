import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const faces = [
  { transform: "translateZ(80px)", color: "rgba(255, 0, 0, 0.85)" },       // Red - Front
  { transform: "rotateY(180deg) translateZ(80px)", color: "rgba(255, 165, 0, 0.85)" }, // Orange - Back
  { transform: "rotateY(-90deg) translateZ(80px)", color: "rgba(0, 100, 255, 0.85)" }, // Blue - Left
  { transform: "rotateY(90deg) translateZ(80px)", color: "rgba(0, 180, 0, 0.85)" },    // Green - Right
  { transform: "rotateX(90deg) translateZ(80px)", color: "rgba(255, 255, 255, 0.9)" }, // White - Top
  { transform: "rotateX(-90deg) translateZ(80px)", color: "rgba(255, 220, 0, 0.85)" }, // Yellow - Bottom
];

const ScrollCube = () => {
  const scrollY = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Set initial value
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  const springConfig = { stiffness: 200, damping: 25, restDelta: 0.001 };

  // Smooth rotation
  const rotateX = useSpring(useTransform(scrollY, (latest) => 25 + latest * 0.08), springConfig);
  const rotateY = useSpring(useTransform(scrollY, (latest) => 45 + latest * 0.15), springConfig);

  // Smooth position and opacity
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
  const scrollThreshold = screenHeight / 2;

  const topValue = useTransform(scrollY, [0, scrollThreshold], [60, 33], { clamp: true });
  const top = useSpring(topValue, springConfig);

  const opacityValue = useTransform(scrollY, [0, scrollThreshold], [0.3, 1], { clamp: true });
  const opacity = useSpring(opacityValue, springConfig);
  
  const topPercent = useTransform(top, (v) => `${v}%`);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1, perspective: "1200px" }}>
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 160,
          height: 160,
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
          top: topPercent,
          opacity,
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
      </motion.div>
    </div>
  );
};

export default ScrollCube;

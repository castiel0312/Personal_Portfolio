import { useEffect, useRef, useState } from "react";

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
        {/* Front */}
        <div
          className="absolute inset-0 rounded-lg border"
          style={{
            transform: "translateZ(80px)",
            background: "linear-gradient(135deg, hsla(190, 100%, 50%, 0.12), hsla(260, 80%, 60%, 0.08))",
            borderColor: "hsla(190, 100%, 50%, 0.25)",
            boxShadow: "inset 0 0 30px hsla(190, 100%, 50%, 0.05)",
          }}
        />
        {/* Back */}
        <div
          className="absolute inset-0 rounded-lg border"
          style={{
            transform: "rotateY(180deg) translateZ(80px)",
            background: "linear-gradient(135deg, hsla(260, 80%, 60%, 0.12), hsla(220, 90%, 56%, 0.08))",
            borderColor: "hsla(260, 80%, 60%, 0.25)",
            boxShadow: "inset 0 0 30px hsla(260, 80%, 60%, 0.05)",
          }}
        />
        {/* Left */}
        <div
          className="absolute inset-0 rounded-lg border"
          style={{
            transform: "rotateY(-90deg) translateZ(80px)",
            background: "linear-gradient(135deg, hsla(220, 90%, 56%, 0.12), hsla(190, 100%, 50%, 0.08))",
            borderColor: "hsla(220, 90%, 56%, 0.25)",
            boxShadow: "inset 0 0 30px hsla(220, 90%, 56%, 0.05)",
          }}
        />
        {/* Right */}
        <div
          className="absolute inset-0 rounded-lg border"
          style={{
            transform: "rotateY(90deg) translateZ(80px)",
            background: "linear-gradient(135deg, hsla(190, 100%, 50%, 0.1), hsla(260, 80%, 60%, 0.1))",
            borderColor: "hsla(190, 100%, 50%, 0.2)",
            boxShadow: "inset 0 0 30px hsla(190, 100%, 50%, 0.05)",
          }}
        />
        {/* Top */}
        <div
          className="absolute inset-0 rounded-lg border"
          style={{
            transform: "rotateX(90deg) translateZ(80px)",
            background: "linear-gradient(135deg, hsla(260, 80%, 60%, 0.1), hsla(190, 100%, 50%, 0.1))",
            borderColor: "hsla(260, 80%, 60%, 0.2)",
            boxShadow: "inset 0 0 30px hsla(260, 80%, 60%, 0.05)",
          }}
        />
        {/* Bottom */}
        <div
          className="absolute inset-0 rounded-lg border"
          style={{
            transform: "rotateX(-90deg) translateZ(80px)",
            background: "linear-gradient(135deg, hsla(220, 90%, 56%, 0.1), hsla(260, 80%, 60%, 0.1))",
            borderColor: "hsla(220, 90%, 56%, 0.2)",
            boxShadow: "inset 0 0 30px hsla(220, 90%, 56%, 0.05)",
          }}
        />
      </div>
    </div>
  );
};

export default ScrollCube;

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-sm text-primary tracking-widest uppercase mb-4">01 — About</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-12">
            Crafting the <span className="gradient-text">future</span>, one system at a time.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass-card p-8 hover-card-glow"
          >
            <h3 className="font-display text-xl font-semibold mb-4 text-foreground">Who I Am</h3>
            <p className="text-muted-foreground leading-relaxed">
              I'm a Computer Science student passionate about building systems that matter. 
              From designing neural networks to architecting distributed backends, I thrive at 
              the intersection of theory and engineering. Every line of code is an opportunity 
              to solve real problems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass-card p-8 hover-card-glow"
          >
            <h3 className="font-display text-xl font-semibold mb-4 text-foreground">What Drives Me</h3>
            <p className="text-muted-foreground leading-relaxed">
              I'm obsessed with elegant architecture and efficient algorithms. Whether it's 
              optimizing ML pipelines, securing systems against emerging threats, or building 
              APIs that scale to millions — I believe in engineering excellence and clean, 
              maintainable code.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 glass-card p-8 hover-card-glow"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "15+", label: "Projects Built" },
              { value: "6+", label: "Years Coding" },
              { value: "5+", label: "Hackathons Won" },
              { value: "∞", label: "Curiosity" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

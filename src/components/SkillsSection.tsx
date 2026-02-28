import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "TypeScript", "C", "Java", "C++"],
  },
  {
    title: "Web & Backend",
    skills: ["React", "Node.js", "FastAPI","HTML","CSS", "SQL", "PostgreSQL"],
  },
  {
    title: "AI / ML",
    skills: ["PyTorch", "TensorFlow", "Hugging Face", "LangChain",],
  },
  {
    title: "DevOps & Tools",
    skills: ["Docker", "Kubernetes","N8N", "AWS", "Git","Zapier", "Linux","DB Browser"],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-sm text-primary tracking-widest uppercase mb-4">03 — Skills</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-12">
            Tech <span className="gradient-text">arsenal</span>.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * catIndex }}
              className="glass-card p-6 hover-card-glow"
            >
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.1 * catIndex + 0.05 * skillIndex }}
                    className="font-mono text-sm px-3 py-1.5 rounded-lg bg-muted text-muted-foreground border border-border hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

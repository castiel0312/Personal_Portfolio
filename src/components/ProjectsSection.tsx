import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, X } from "lucide-react";

const projects = [
  {
    title: "The Revival CO",
    description: "Created TheRevivalCo.in, an online thrifting website inspired by modern e-commerce platforms. Implemented core features such as buying, selling, auctions, and donations within a single unified platform. Integrated backend services including authentication, database operations, and storage. Designed end-to-end application workflows to closely simulate real-world e-commerce systems.",
    tech: ["React", "MongoDB", "SQL", "Supabase", "Vercel"],
    github: "https://github.com/therevivalco/revival-couture-circle.git",
    live: "#",
    category: "E-commerce",
  },
  {
    title: "Affordable Flats Data Scraper",
    description: "Developed a web scraper that aggregates property listings from platforms like NoBroker and 99Acres to provide more housing options in one place. Implemented advanced filtering and sorting for faster property searches, used custom HTTP headers to bypass basic bot detection, and automated data extraction to keep listings updated while reducing duplicates and outdated entries. Users can search based on budget, location, and amenities.",
    tech: ["Python","MYSQL","PostgreSQL"],
    github: "#",
    category: "Web Scraping",
  },
  {
    title: "AutoFlow Engine",
    description: "Developed a database-backed workflow automation system that executes multi-step pipelines with automatic retries, step-level logging, and structured state management. Enabled workflows to resume automatically after failures, significantly reducing manual task tracking. Integrated external services to trigger AI API calls, notifications, and automated actions, improving overall process speed and reliability in complex automation pipelines.",
    tech: ["Python","n8n","DB For SQLite"],
    github: "https://github.com/castiel0312/Autoflow-Engine.git",
    category: "Automation Pipeline",
  },
  {
    title: "DataPulse",
    description: "Real-time data pipeline processing 10M+ events/sec. Features stream processing, anomaly detection, and adaptive load balancing.",
    tech: ["Scala", "Apache Kafka", "Spark", "Grafana"],
    github: "#",
    category: "Data",
  },
  {
    title: "CipherNet",
    description: "Network traffic analyzer using ML to detect intrusions and anomalies. Trained on 50GB of labeled network flow data.",
    tech: ["Python", "TensorFlow", "Wireshark", "Flask"],
    github: "#",
    live: "#",
    category: "Security",
  },
  {
    title: "CloudMesh",
    description: "Infrastructure-as-code tool for multi-cloud deployment. Simplifies complex architectures into declarative YAML configurations.",
    tech: ["TypeScript", "Terraform", "AWS", "GCP"],
    github: "#",
    category: "DevOps",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="projects" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-sm text-primary tracking-widest uppercase mb-4">02 — Projects</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-12">
            Things I've <span className="gradient-text">built</span>.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              onClick={() => setSelected(index)}
              className="glass-card p-6 cursor-pointer hover-card-glow group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-primary/70 uppercase tracking-wider">{project.category}</span>
                <div className="flex gap-3">
                  <a href={project.github} onClick={(e) => e.stopPropagation()} className="text-muted-foreground hover:text-primary transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                  {project.live && (
                    <a href={project.live} onClick={(e) => e.stopPropagation()} className="text-muted-foreground hover:text-primary transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="font-mono text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="glass-card neon-glow p-8 max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
              <span className="font-mono text-xs text-primary/70 uppercase tracking-wider">{projects[selected].category}</span>
              <h3 className="font-display text-2xl font-bold mt-2 mb-4 gradient-text">{projects[selected].title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{projects[selected].description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {projects[selected].tech.map((t) => (
                  <span key={t} className="font-mono text-xs px-3 py-1.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a href={projects[selected].github} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Github className="w-4 h-4" /> Source Code
                </a>
                {projects[selected].live && (
                  <a href={projects[selected].live} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;

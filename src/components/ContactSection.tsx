import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Linkedin, Mail, Send, CheckCircle, AlertTriangle, Loader } from "lucide-react";

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      setStatus('success');
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus('error');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="section-padding relative" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-sm text-primary tracking-widest uppercase mb-4">04 — Contact</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-12">
            Let's <span className="gradient-text">connect</span>.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-muted-foreground mb-8 leading-relaxed">
              I'm always interested in hearing about new opportunities, collaborations,
              or just talking tech. Feel free to reach out.
            </p>

            <div className="space-y-4">
              {[
                { icon: Mail, label: "akshatkhoria@gmail.com", href: "mailto:akshatkhoria@gmail.com" },
                { icon: Github, label: "github.com/castiel0312", href: "https://github.com/castiel0312" },
                { icon: Linkedin, label: "linkedin.com/in/akshatkhoria", href: "https://linkedin.com/in/akshatkhoria" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-all duration-300 group"
                >
                  <span className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                    <link.icon className="w-4 h-4" />
                  </span>
                  <span className="text-sm">{link.label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all font-sans text-sm"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all font-sans text-sm"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none font-sans text-sm"
            />
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="glass-card px-8 py-3 font-display font-medium text-primary hover:neon-glow transition-all duration-300 hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <><Loader className="w-4 h-4 animate-spin" /> Sending...</>
                ) : (
                  <><Send className="w-4 h-4" /> Send Message</>
                )}
              </button>
              
              {status === 'success' && (
                <p className="text-sm flex items-center gap-2 text-green-500"><CheckCircle className="w-4 h-4"/> Message sent!</p>
              )}
              {status === 'error' && (
                <p className="text-sm flex items-center gap-2 text-red-500"><AlertTriangle className="w-4 h-4"/> Something went wrong.</p>
              )}
            </div>

          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

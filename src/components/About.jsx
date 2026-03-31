import { motion } from 'framer-motion';
import AOS from 'aos';
import { useEffect } from 'react';
import { FiDownload, FiCode, FiCpu, FiLayers } from 'react-icons/fi';

const stats = [
  { label: 'Projects', value: '10+', icon: FiLayers, color: 'text-indigo-400' },
  { label: 'Languages', value: '5+', icon: FiCode, color: 'text-purple-400' },
  { label: 'Technologies', value: '15+', icon: FiCpu, color: 'text-cyan-400' },
];

const About = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section id="about" className="py-20 bg-gray-900/50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14" data-aos="fade-up">
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            Who I Am
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Avatar / Decorative */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full border-2 border-indigo-500/30 animate-spin" style={{ animationDuration: '12s' }} />
              <div className="absolute inset-4 rounded-full border-2 border-purple-500/30 animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }} />
              <div className="absolute inset-8 rounded-full border-2 border-cyan-500/20 animate-spin" style={{ animationDuration: '15s' }} />
              {/* Center content */}
              <div className="absolute inset-12 rounded-full glass border border-indigo-500/30 flex items-center justify-center">
                <span className="text-5xl">👨‍💻</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                A Passionate <span className="gradient-text">Developer</span>
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                I'm a full-stack developer with a love for creating beautiful, functional web experiences.
                My journey spans multiple programming languages and frameworks, from Python data science
                applications to TypeScript-powered 3D interfaces.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                I believe great software is a blend of clean code, thoughtful design, and excellent user
                experience. Whether it's an e-commerce platform, an event ticketing system, or a medical
                management app, I bring passion and precision to every project.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="glass rounded-xl border border-white/10 p-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
                    <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-all duration-300 neon-glow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiDownload className="w-4 h-4" />
                Download CV
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

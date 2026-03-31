import { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import { animateSkillBars } from '../utils/animations';

const skillCategories = [
  {
    title: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'React / Next.js', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'TailwindCSS', level: 92 },
      { name: 'Three.js / 3D', level: 78 },
    ],
  },
  {
    title: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js / Express', level: 82 },
      { name: 'Python / Django', level: 88 },
      { name: 'REST APIs', level: 90 },
      { name: 'SQL / NoSQL', level: 80 },
    ],
  },
  {
    title: 'Tools & DevOps',
    icon: '🛠️',
    skills: [
      { name: 'Git / GitHub', level: 95 },
      { name: 'Docker', level: 72 },
      { name: 'Vite / Webpack', level: 85 },
      { name: 'Testing', level: 75 },
    ],
  },
];

const techStack = [
  { name: 'React', color: '#61dafb' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'Python', color: '#3572A5' },
  { name: 'Node.js', color: '#68a063' },
  { name: 'Three.js', color: '#ffffff' },
  { name: 'TailwindCSS', color: '#38bdf8' },
  { name: 'GSAP', color: '#88ce02' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'Git', color: '#f05032' },
  { name: 'Vite', color: '#646cff' },
];

const SkillBar = ({ skill, delay }) => {
  return (
    <div className="mb-4" data-aos="fade-right" data-aos-delay={delay}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-gray-300">{skill.name}</span>
        <span className="text-xs text-indigo-400 font-semibold">{skill.level}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: delay / 1000 }}
          viewport={{ once: true }}
          data-width={skill.level}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  useEffect(() => {
    AOS.refresh();
    animateSkillBars();
  }, []);

  return (
    <section id="skills" className="py-20 bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-1/3 h-96 bg-indigo-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-1/3 h-96 bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14" data-aos="fade-up">
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            Expertise
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            A collection of technologies and tools I've mastered to build modern digital experiences.
          </p>
        </div>

        {/* Skill Bars Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-14">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              className="glass rounded-2xl border border-white/10 p-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: catIndex * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-lg font-bold text-white">{category.title}</h3>
              </div>
              {category.skills.map((skill, skillIndex) => (
                <SkillBar key={skill.name} skill={skill} delay={skillIndex * 100} />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Pills */}
        <div data-aos="fade-up">
          <h3 className="text-center text-gray-400 text-sm font-semibold uppercase tracking-widest mb-6">
            Tech Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="px-4 py-2 glass rounded-full border border-white/10 text-sm font-medium text-gray-300 hover:border-indigo-500/40 hover:text-white transition-all duration-300 flex items-center gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: tech.color }}
                />
                {tech.name}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

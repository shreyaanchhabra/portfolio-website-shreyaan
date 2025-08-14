import { motion } from 'framer-motion';

const TechStackSection = () => {
  const techCategories = [
    {
      title: 'Frontend',
      color: 'from-primary to-secondary',
      technologies: [
        { name: 'JavaScript', icon: '🟨' },
        { name: 'TypeScript', icon: '🔷' },
        { name: 'React', icon: '⚛️' },
        { name: 'Next.js', icon: '🔺' },
        { name: 'TailwindCSS', icon: '🎨' },
        { name: 'Framer Motion', icon: '🎭' }
      ]
    },
    {
      title: 'Backend',
      color: 'from-secondary to-accent',
      technologies: [
        { name: 'Node.js', icon: '🟢' },
        { name: 'Python', icon: '🐍' },
        { name: 'Express.js', icon: '🚀' },
        { name: 'PostgreSQL', icon: '🐘' },
        { name: 'MongoDB', icon: '🍃' },
        { name: 'Redis', icon: '🔴' }
      ]
    },
    {
      title: 'Tools & Others',
      color: 'from-accent to-neon-pink',
      technologies: [
        { name: 'Git', icon: '📚' },
        { name: 'Docker', icon: '🐳' },
        { name: 'AWS', icon: '☁️' },
        { name: 'Figma', icon: '🎨' },
        { name: 'VS Code', icon: '💻' },
        { name: 'Linux', icon: '🐧' }
      ]
    }
  ];

  return (
    <section id="tech" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Tech I <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent glow-text">Use</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="glass-card p-6 rounded-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Category Header */}
              <div className={`bg-gradient-to-r ${category.color} p-4 rounded-lg mb-6`}>
                <h3 className="text-xl font-bold text-background text-center">
                  {category.title}
                </h3>
              </div>

              {/* Technology Grid */}
              <div className="grid grid-cols-2 gap-4">
                {category.technologies.map((tech, techIndex) => (
                  <motion.div
                    key={techIndex}
                    className="bg-muted rounded-lg p-4 text-center transition-all duration-300 hover:bg-muted/80 hover:scale-105 cursor-pointer group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: categoryIndex * 0.2 + techIndex * 0.1 
                    }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <motion.div
                      className="text-3xl mb-2 group-hover:animate-bounce"
                      whileHover={{ scale: 1.2 }}
                    >
                      {tech.icon}
                    </motion.div>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {tech.name}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Tech Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {['⚛️', '🐍', '🟨', '🔷', '🚀', '🎨'].map((icon, index) => (
            <motion.div
              key={index}
              className="absolute text-4xl opacity-10"
              style={{
                left: `${20 + index * 15}%`,
                top: `${30 + (index % 2) * 40}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 10 + index * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {icon}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
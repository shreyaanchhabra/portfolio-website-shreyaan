import { motion } from 'framer-motion';
import { Calendar, Code, Trophy, Zap } from 'lucide-react';

const AboutSection = () => {
  const milestones = [
    {
      year: '2020',
      title: 'Started Programming',
      description: 'Began learning Python and discovered the magic of code',
      icon: Code,
      color: 'text-primary'
    },
    {
      year: '2022',
      title: 'First Web App',
      description: 'Built my first full-stack application with React and Node.js',
      icon: Zap,
      color: 'text-secondary'
    },
    {
      year: '2023',
      title: 'AI Projects',
      description: 'Started exploring machine learning and AI development',
      icon: Trophy,
      color: 'text-accent'
    },
    {
      year: '2024',
      title: 'Competitions',
      description: 'Participated in hackathons and coding competitions',
      icon: Calendar,
      color: 'text-neon-pink'
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent glow-text">Me</span>
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Pre-college developer passionate about{' '}
              <span className="text-primary glow-text font-medium">full-stack web apps</span>,{' '}
              <span className="text-secondary glow-text font-medium">AI projects</span>, and building tools that solve real-world problems. 
              Interested in tech, design, and creative coding.
            </p>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-center mb-12 text-primary glow-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            My Journey
          </motion.h3>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-50" />

            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <motion.div
                    className="glass-card p-6 rounded-lg neon-glow"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`inline-flex items-center gap-2 mb-3 ${milestone.color}`}>
                      <milestone.icon className="h-5 w-5" />
                      <span className="font-bold text-lg">{milestone.year}</span>
                    </div>
                    <h4 className="text-xl font-semibold mb-2 text-foreground">
                      {milestone.title}
                    </h4>
                    <p className="text-muted-foreground">
                      {milestone.description}
                    </p>
                  </motion.div>
                </div>

                {/* Center Dot */}
                <motion.div
                  className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-2 border-background ${
                    milestone.color.replace('text-', 'bg-')
                  }`}
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Spacer */}
                <div className="w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
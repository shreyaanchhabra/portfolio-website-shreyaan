import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProjectsSection = () => {
  const projects = [
    {
      title: 'AI Chat Platform',
      description: 'Real-time chat application with AI-powered responses',
      tech: ['React', 'Node.js', 'OpenAI', 'WebSocket'],
      liveUrl: 'https://demo.com',
      githubUrl: 'https://github.com',
      gradient: 'from-primary to-secondary'
    },
    {
      title: 'E-Commerce Dashboard',
      description: 'Admin dashboard for managing online store operations',
      tech: ['Next.js', 'PostgreSQL', 'Stripe', 'TailwindCSS'],
      liveUrl: 'https://demo.com',
      githubUrl: 'https://github.com',
      gradient: 'from-secondary to-accent'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task manager with real-time updates',
      tech: ['React', 'Firebase', 'TypeScript', 'Framer Motion'],
      liveUrl: 'https://demo.com',
      githubUrl: 'https://github.com',
      gradient: 'from-accent to-neon-pink'
    },
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio with dark mode and animations',
      tech: ['React', 'TailwindCSS', 'Framer Motion', 'Vite'],
      liveUrl: 'https://demo.com',
      githubUrl: 'https://github.com',
      gradient: 'from-neon-pink to-primary'
    },
    {
      title: 'Weather App',
      description: 'Weather forecast app with location-based predictions',
      tech: ['Vue.js', 'Weather API', 'Chart.js', 'PWA'],
      liveUrl: 'https://demo.com',
      githubUrl: 'https://github.com',
      gradient: 'from-neon-blue to-neon-cyan'
    },
    {
      title: 'Code Editor',
      description: 'Online code editor with syntax highlighting',
      tech: ['Monaco Editor', 'WebAssembly', 'Docker', 'Node.js'],
      liveUrl: 'https://demo.com',
      githubUrl: 'https://github.com',
      gradient: 'from-neon-green to-primary'
    }
  ];

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent glow-text">Projects</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of projects that showcase my skills in full-stack development and creative problem-solving
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="glass-card p-6 rounded-lg h-full transition-all duration-300 group-hover:neon-glow">
                {/* Project Header */}
                <div className={`h-32 bg-gradient-to-br ${project.gradient} rounded-lg mb-6 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}>
                  <div className="text-6xl font-black text-background/20">
                    {project.title.split(' ').map(word => word[0]).join('')}
                  </div>
                </div>

                {/* Project Info */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-xs bg-muted rounded-full text-muted-foreground border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80"
                      asChild
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      asChild
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
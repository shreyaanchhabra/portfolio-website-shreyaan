import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon } from 'lucide-react';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleSpotify: () => void;
}

const Terminal = ({ isOpen, onClose, onToggleSpotify }: TerminalProps) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ command: string; output: string; type: 'input' | 'output' | 'error' }[]>([
    { command: '', output: 'Welcome to the terminal! Type "help" to see available commands.', type: 'output' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => `Available commands:
• about     - Prints your bio directly in the terminal
• projects  - Lists your projects with clickable links
• contact   - Displays your email, LinkedIn, and GitHub
• skills    - Shows your tech stack with emojis/icons
• play music - Opens or toggles the Spotify Now Playing widget
• clear     - Clears the terminal screen
• exit      - Exit out of terminal
• secret    - Shows an Easter egg message or ASCII art`,

    about: () => `Pre-college developer passionate about full-stack web apps, AI projects, and building tools that solve real-world problems. Interested in tech, design, and creative coding.

Currently learning new technologies and working on exciting projects that combine creativity with functionality.`,

    projects: () => `My Projects:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 AI Chat Assistant
   Full-stack chat application with OpenAI integration
   Tech: React, Node.js, OpenAI API, Socket.io
   [Demo] [GitHub]

🎮 Game Analytics Dashboard  
   Real-time gaming performance analytics
   Tech: Next.js, PostgreSQL, Chart.js, Redis
   [Demo] [GitHub]

🛠️ DevTools Extension
   Browser extension for developer productivity
   Tech: TypeScript, Chrome APIs, TailwindCSS
   [Demo] [GitHub]`,

    contact: () => `Let's Connect!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📧 Email: your.email@example.com
💼 LinkedIn: linkedin.com/in/yourprofile
🐙 GitHub: github.com/yourusername
🌐 Website: yourportfolio.com

Feel free to reach out for collaborations, questions, or just to chat about tech!`,

    skills: () => `Tech Stack:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Frontend:
🟨 JavaScript    ⚛️ React        🔷 TypeScript
🔺 Next.js       🎨 TailwindCSS  🎭 Framer Motion

Backend:
🟢 Node.js       🐍 Python       🚀 Express.js
🐘 PostgreSQL    🍃 MongoDB      🔴 Redis

Tools & Others:
📚 Git           🐳 Docker       ☁️ AWS
🎨 Figma         💻 VS Code      🐧 Linux`,

    'play music': () => {
      onToggleSpotify();
      return 'Toggled Spotify Now Playing widget!';
    },

    clear: () => {
      setHistory([]);
      return '';
    },

    exit: () => {
      onClose();
      return '';
    },

    secret: () => `
    ██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗██████╗ 
    ██║  ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗
    ███████║███████║██║     █████╔╝ █████╗  ██████╔╝
    ██╔══██║██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗
    ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║
    ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
    
    🎉 You found the secret! 🎉
    
    "The best way to predict the future is to invent it." - Alan Kay
    
    Keep coding, keep creating, keep exploring! 🚀`
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === '') return;

    setHistory(prev => [...prev, { command: cmd, output: '', type: 'input' }]);

    if (trimmedCmd in commands) {
      const output = commands[trimmedCmd as keyof typeof commands]();
      if (output) {
        setHistory(prev => [...prev, { command: '', output, type: 'output' }]);
      }
    } else {
      setHistory(prev => [...prev, { 
        command: '', 
        output: `Command not found: ${cmd}. Type "help" to see available commands.`, 
        type: 'error' 
      }]);
    }
    
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-terminal-bg border border-primary/30 rounded-lg w-full max-w-4xl h-[600px] flex flex-col shadow-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary/10 rounded-t-lg border-b border-primary/20">
            <div className="flex items-center gap-2">
              <TerminalIcon className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Terminal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
              >
                <X className="h-2 w-2 text-white opacity-0 hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>

          {/* Terminal Content */}
          <div
            ref={terminalRef}
            className="flex-1 p-4 overflow-y-auto font-mono text-sm text-terminal-text bg-terminal-bg"
          >
            {history.map((entry, index) => (
              <div key={index} className="mb-1">
                {entry.type === 'input' && (
                  <div className="flex items-center gap-2">
                    <span className="text-primary">guest@portfolio:~$</span>
                    <span className="text-terminal-text">{entry.command}</span>
                  </div>
                )}
                {entry.type === 'output' && (
                  <pre className="text-terminal-text whitespace-pre-wrap font-mono">{entry.output}</pre>
                )}
                {entry.type === 'error' && (
                  <pre className="text-red-400 whitespace-pre-wrap font-mono">{entry.output}</pre>
                )}
              </div>
            ))}
            
            {/* Input Line */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-primary">guest@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-transparent text-terminal-text outline-none font-mono"
                placeholder="Type a command..."
              />
              <motion.div
                className="w-2 h-5 bg-primary"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Terminal;
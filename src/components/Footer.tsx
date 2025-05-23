
import { Shield, Github, Heart, Lock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full mt-16 py-8 px-4 border-t border-cyan-500/30 bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-cyan-400" />
            <span className="text-gray-400 text-sm">
              © 2024 SpamGuard AI. Protecting your inbox with advanced encryption.
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm">
            <div className="flex items-center space-x-2 text-emerald-400 border border-emerald-500/20 rounded-full px-3 py-1 bg-slate-800/30">
              <Lock className="h-3 w-3" />
              <span className="text-xs font-mono">Homomorphically Encrypted</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
                Privacy
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
                Terms
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center space-x-1"
              >
                <Github className="h-4 w-4" />
                <span>Source</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

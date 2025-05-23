
import { Shield } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-6 px-4 border-b border-cyan-500/30 bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-cyan-400 neon-glow" />
          <h1 className="text-3xl font-bold text-white neon-text">
            SpamGuard AI
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;


import { Shield, Lock } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-6 px-4 border-b border-cyan-500/30 bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-cyan-400 neon-glow" />
          <h1 className="text-3xl font-bold text-white neon-text">
            SpamGuard AI
          </h1>
        </div>
        <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-slate-800/60 rounded-full border border-emerald-500/30">
          <Lock className="h-4 w-4 text-emerald-400" />
          <span className="text-sm text-emerald-400 font-mono">Homomorphic Encryption</span>
        </div>
      </div>
    </header>
  );
};

export default Header;


import { Shield, Lock } from 'lucide-react';

const ResultsHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Shield className="h-6 w-6 text-cyan-400" />
        <h2 className="text-xl font-semibold text-white">Analysis Results</h2>
      </div>
      
      <div className="flex items-center space-x-2">
        <Lock className="h-4 w-4 text-emerald-400" />
        <span className="text-xs text-emerald-400 font-mono">End-to-End Encrypted</span>
      </div>
    </div>
  );
};

export default ResultsHeader;

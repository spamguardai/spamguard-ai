
import { Lock } from 'lucide-react';

const ResultsFooter = () => {
  return (
    <div className="text-xs text-center text-gray-500 font-mono pt-4 border-t border-gray-700">
      <div className="flex items-center justify-center space-x-1">
        <Lock className="h-3 w-3" />
        <span>Privacy-preserving analysis completed with homomorphic encryption</span>
      </div>
    </div>
  );
};

export default ResultsFooter;

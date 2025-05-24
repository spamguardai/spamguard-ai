
import { AlertTriangle } from 'lucide-react';

interface RiskLevelDisplayProps {
  riskLevel: 'Low' | 'Medium' | 'High';
}

const RiskLevelDisplay = ({ riskLevel }: RiskLevelDisplayProps) => {
  const getRiskColor = () => {
    switch (riskLevel) {
      case 'Low':
        return 'text-green-400';
      case 'Medium':
        return 'text-yellow-400';
      case 'High':
        return 'text-red-400';
      default:
        return 'text-cyan-400';
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-lg p-4 border border-cyan-500/20">
      <div className="flex items-center justify-center space-x-2 mb-2">
        <AlertTriangle className="h-5 w-5 text-cyan-400" />
        <span className="text-lg font-semibold text-white">Risk Level</span>
      </div>
      <div className={`text-2xl font-bold ${getRiskColor()}`}>
        {riskLevel.toUpperCase()}
      </div>
    </div>
  );
};

export default RiskLevelDisplay;

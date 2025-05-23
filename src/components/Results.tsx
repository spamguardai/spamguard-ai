
import { Shield, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ResultsProps {
  results: {
    spamProbability: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    analysisComplete: boolean;
  };
}

const Results = ({ results }: ResultsProps) => {
  const { spamProbability, riskLevel } = results;
  
  const getRiskIcon = () => {
    switch (riskLevel) {
      case 'Low':
        return <CheckCircle className="h-8 w-8 text-green-400" />;
      case 'Medium':
        return <AlertTriangle className="h-8 w-8 text-yellow-400" />;
      case 'High':
        return <XCircle className="h-8 w-8 text-red-400" />;
      default:
        return <Shield className="h-8 w-8 text-cyan-400" />;
    }
  };
  
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
  
  const getProgressBarColor = () => {
    switch (riskLevel) {
      case 'Low':
        return 'from-green-500 to-green-400';
      case 'Medium':
        return 'from-yellow-500 to-yellow-400';
      case 'High':
        return 'from-red-500 to-red-400';
      default:
        return 'from-cyan-500 to-cyan-400';
    }
  };

  return (
    <Card className="p-6 bg-slate-900/70 border-cyan-500/30 cyber-border backdrop-blur-sm animate-fade-in">
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Shield className="h-6 w-6 text-cyan-400" />
          <h2 className="text-xl font-semibold text-white">Analysis Results</h2>
        </div>
        
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3">
              {getRiskIcon()}
              <div>
                <div className="text-4xl font-bold text-white neon-text">
                  {spamProbability}%
                </div>
                <div className="text-sm text-gray-400">Spam Probability</div>
              </div>
            </div>
            
            <div className="w-full max-w-md mx-auto">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Safe</span>
                <span>Suspicious</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${getProgressBarColor()} transition-all duration-1000 ease-out`}
                  style={{ width: `${spamProbability}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg p-4 border border-cyan-500/20">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-cyan-400" />
              <span className="text-lg font-semibold text-white">Risk Level</span>
            </div>
            <div className={`text-2xl font-bold ${getRiskColor()}`}>
              {riskLevel.toUpperCase()}
            </div>
          </div>
          
          <div className="text-sm text-gray-400 space-y-2">
            <p className="font-medium text-white">Analysis Summary:</p>
            {riskLevel === 'Low' && (
              <p>This email appears to be legitimate with minimal spam indicators detected.</p>
            )}
            {riskLevel === 'Medium' && (
              <p>This email contains some suspicious elements. Exercise caution and verify sender.</p>
            )}
            {riskLevel === 'High' && (
              <p>This email shows strong spam characteristics. Avoid clicking links or providing information.</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Results;


import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import ResultsHeader from './results/ResultsHeader';
import RiskIndicator from './results/RiskIndicator';
import SpamProbabilityMeter from './results/SpamProbabilityMeter';
import RiskLevelDisplay from './results/RiskLevelDisplay';
import AnalysisSummary from './results/AnalysisSummary';
import ResultsFooter from './results/ResultsFooter';

interface ResultsProps {
  results: {
    spamProbability: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    analysisComplete: boolean;
  };
}

const Results = ({ results }: ResultsProps) => {
  const { spamProbability, riskLevel } = results;
  const [showResults, setShowResults] = useState(false);
  
  // Animate results appearing from encrypted state
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResults(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="p-6 bg-slate-900/70 border-cyan-500/30 cyber-border backdrop-blur-sm animate-fade-in relative overflow-hidden">
      {/* Encryption grid background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="grid grid-cols-20 grid-rows-10 gap-1 h-full w-full">
          {Array.from({ length: 200 }).map((_, i) => (
            <div key={i} className="bg-emerald-500 rounded-sm"></div>
          ))}
        </div>
      </div>
      
      <div className="space-y-6 relative z-10">
        <ResultsHeader />
        
        <div className="text-center space-y-6">
          <div className={`space-y-4 transition-all duration-1000 ${showResults ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center justify-center space-x-3">
              <RiskIndicator riskLevel={riskLevel} />
              <div>
                <div className="text-4xl font-bold text-white neon-text">
                  {spamProbability}%
                </div>
                <div className="text-sm text-gray-400">Spam Probability</div>
              </div>
            </div>
            
            <SpamProbabilityMeter 
              spamProbability={spamProbability} 
              riskLevel={riskLevel} 
            />
          </div>
          
          <RiskLevelDisplay riskLevel={riskLevel} />
          
          <AnalysisSummary riskLevel={riskLevel} />
        </div>
        
        <ResultsFooter />
      </div>
    </Card>
  );
};

export default Results;


interface SpamProbabilityMeterProps {
  spamProbability: number;
  riskLevel: 'Low' | 'Medium' | 'High';
}

const SpamProbabilityMeter = ({ spamProbability, riskLevel }: SpamProbabilityMeterProps) => {
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
  );
};

export default SpamProbabilityMeter;

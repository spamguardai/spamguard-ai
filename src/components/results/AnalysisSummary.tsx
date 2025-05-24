
interface AnalysisSummaryProps {
  riskLevel: 'Low' | 'Medium' | 'High';
}

const AnalysisSummary = ({ riskLevel }: AnalysisSummaryProps) => {
  return (
    <div className="text-sm text-gray-400 space-y-2">
      <div className="flex items-center justify-center space-x-2">
        <p className="font-medium text-white">Homomorphic Analysis Summary:</p>
        <div className="group relative">
          <span className="cursor-help text-cyan-400">ℹ️</span>
          <div className="invisible group-hover:visible absolute bottom-full mb-2 w-64 bg-slate-800 p-2 rounded text-xs border border-cyan-500/30">
            Results generated through homomorphic encryption, allowing computation on encrypted data without exposing the original content.
          </div>
        </div>
      </div>
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
  );
};

export default AnalysisSummary;

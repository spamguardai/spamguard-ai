
import { Loader2 } from 'lucide-react';

interface ProcessingOverlayProps {
  isProcessing: boolean;
  processingStage: string;
  processingProgress: number;
}

const ProcessingOverlay = ({
  isProcessing,
  processingStage,
  processingProgress
}: ProcessingOverlayProps) => {
  if (!isProcessing) return null;
  
  return (
    <div className="absolute inset-0 bg-slate-800/90 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 text-emerald-400 animate-spin mx-auto" />
        <div className="space-y-2">
          <p className="text-emerald-400 font-mono">{processingStage}: {processingProgress}%</p>
          <div className="w-64 h-1 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300"
              style={{ width: `${processingProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-400 font-mono mt-2">
            Computing on encrypted data without decryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessingOverlay;

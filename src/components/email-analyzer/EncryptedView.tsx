import { Lock } from 'lucide-react';
import EncryptionVisualizer from '../EncryptionVisualizer';
import ProcessingOverlay from './ProcessingOverlay';

interface EncryptedViewProps {
  text: string;
  encryptedView: boolean;
  isProcessing: boolean;
  processingStage: string;
  processingProgress: number;
  encryptedVector: string | null;
}

const EncryptedView = ({
  text,
  encryptedView,
  isProcessing,
  processingStage,
  processingProgress,
  encryptedVector,
}: EncryptedViewProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Lock className="h-5 w-5 text-emerald-400" />
        <h2 className="text-xl font-semibold text-white">Encrypted Data</h2>
      </div>
      
      <div className="relative h-64 bg-slate-800/80 border border-emerald-500/30 rounded-lg overflow-hidden">
        <EncryptionVisualizer 
          text={encryptedVector ?? text} 
          isEncrypted={encryptedView} 
          isProcessing={isProcessing} 
        />
        
        <ProcessingOverlay 
          isProcessing={isProcessing}
          processingStage={processingStage}
          processingProgress={processingProgress}
        />
      </div>
    </div>
  );
};

export default EncryptedView;

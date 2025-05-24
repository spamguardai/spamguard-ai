
import { Lock, Loader2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  onEncrypt: () => void;
  onAnalyze: () => void;
  isEncrypting: boolean;
  isAnalyzing: boolean;
  encryptedView: boolean;
  emailContent: string;
}

const ActionButtons = ({
  onEncrypt,
  onAnalyze,
  isEncrypting,
  isAnalyzing,
  encryptedView,
  emailContent
}: ActionButtonsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-6">
      <Button
        onClick={onEncrypt}
        disabled={!emailContent.trim() || isEncrypting || isAnalyzing || encryptedView}
        className="flex-1 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-mono py-3 rounded-lg transition-all duration-300 neon-glow disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isEncrypting ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Encrypting Data...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Lock className="h-4 w-4" />
            <span>Encrypt Data</span>
          </div>
        )}
      </Button>
      
      <Button
        onClick={onAnalyze}
        disabled={!encryptedView || isAnalyzing || isEncrypting}
        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-mono py-3 rounded-lg transition-all duration-300 neon-glow disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isAnalyzing ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Analyzing Encrypted Data...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <span>Analyze</span>
          </div>
        )}
      </Button>
    </div>
  );
};

export default ActionButtons;

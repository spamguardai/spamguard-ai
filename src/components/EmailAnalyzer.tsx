
import { Card } from '@/components/ui/card';
import Results from './Results';
import EmailInput from './email-analyzer/EmailInput';
import EncryptedView from './email-analyzer/EncryptedView';
import ActionButtons from './email-analyzer/ActionButtons';
import { useEmailAnalysis } from './email-analyzer/useEmailAnalysis';

const EmailAnalyzer = () => {
  const {
    emailContent,
    isEncrypting,
    isAnalyzing,
    encryptedView,
    processingStage,
    processingProgress,
    results,
    encryptEmail,
    analyzeEmail,
    handleTextChange
  } = useEmailAnalysis();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="p-6 bg-slate-900/70 border-cyan-500/30 cyber-border backdrop-blur-sm relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Original Text Side */}
          <EmailInput 
            value={emailContent} 
            onChange={handleTextChange} 
            disabled={isEncrypting || isAnalyzing} 
          />
          
          {/* Encrypted View Side */}
          <EncryptedView 
            text={emailContent}
            encryptedView={encryptedView}
            isProcessing={isEncrypting || isAnalyzing}
            processingStage={processingStage}
            processingProgress={processingProgress}
          />
        </div>
        
        <ActionButtons
          onEncrypt={encryptEmail}
          onAnalyze={analyzeEmail}
          isEncrypting={isEncrypting}
          isAnalyzing={isAnalyzing}
          encryptedView={encryptedView}
          emailContent={emailContent}
        />
      </Card>
      
      {results && <Results results={results} />}
    </div>
  );
};

export default EmailAnalyzer;

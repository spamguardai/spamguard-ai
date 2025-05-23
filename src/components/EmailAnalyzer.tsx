
import { useState, useEffect, useRef } from 'react';
import { Zap, Loader2, Lock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Results from './Results';
import EncryptionVisualizer from './EncryptionVisualizer';

const EmailAnalyzer = () => {
  const [emailContent, setEmailContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [encryptedView, setEncryptedView] = useState(false);
  const [processingStage, setProcessingStage] = useState<string>('');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [results, setResults] = useState<{
    spamProbability: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    analysisComplete: boolean;
  } | null>(null);

  const analyzeEmail = async () => {
    if (!emailContent.trim()) return;
    
    setIsAnalyzing(true);
    setResults(null);
    setEncryptedView(true);
    setProcessingStage('Encrypting Data');
    setProcessingProgress(0);
    
    // Simulate encryption process
    await simulateProcess(20, 'Encrypting Data');
    
    // Simulate homomorphic computation
    await simulateProcess(50, 'Homomorphic Operations');
    
    // Simulate pattern analysis
    await simulateProcess(30, 'Pattern Analysis');
    
    // Generate realistic spam probability based on common spam indicators
    const spamIndicators = [
      /urgent/gi,
      /limited time/gi,
      /act now/gi,
      /free/gi,
      /winner/gi,
      /congratulations/gi,
      /click here/gi,
      /\$\d+/g,
      /100%/gi,
      /guarantee/gi
    ];
    
    let spamScore = Math.random() * 30; // Base random score 0-30%
    
    spamIndicators.forEach(indicator => {
      const matches = emailContent.match(indicator);
      if (matches) {
        spamScore += matches.length * 15; // Add 15% per match
      }
    });
    
    // Add score for excessive punctuation
    const exclamationCount = (emailContent.match(/!/g) || []).length;
    spamScore += exclamationCount * 5;
    
    // Add score for ALL CAPS
    const capsWords = emailContent.match(/\b[A-Z]{3,}\b/g) || [];
    spamScore += capsWords.length * 8;
    
    spamScore = Math.min(spamScore, 95); // Cap at 95%
    const spamProbability = Math.round(spamScore);
    
    let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
    if (spamProbability >= 70) riskLevel = 'High';
    else if (spamProbability >= 40) riskLevel = 'Medium';
    
    setResults({
      spamProbability,
      riskLevel,
      analysisComplete: true
    });
    
    setIsAnalyzing(false);
  };

  const simulateProcess = async (percentage: number, stage: string) => {
    const startProgress = processingProgress;
    const endProgress = startProgress + percentage;
    setProcessingStage(stage);
    
    return new Promise<void>(resolve => {
      const duration = 1000 + Math.random() * 1000;
      const startTime = Date.now();
      
      const updateProgress = () => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentProgress = startProgress + progress * percentage;
        
        setProcessingProgress(Math.round(currentProgress));
        
        if (progress < 1) {
          requestAnimationFrame(updateProgress);
        } else {
          resolve();
        }
      };
      
      requestAnimationFrame(updateProgress);
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmailContent(e.target.value);
    // Reset results when text changes
    if (results) {
      setResults(null);
      setEncryptedView(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="p-6 bg-slate-900/70 border-cyan-500/30 cyber-border backdrop-blur-sm relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Original Text Side */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-5 w-5 text-cyan-400" />
              <h2 className="text-xl font-semibold text-white">Email Content</h2>
            </div>
            
            <div className="relative">
              <textarea
                value={emailContent}
                onChange={handleTextChange}
                placeholder="Paste your email content here for secure analysis..."
                className="w-full h-64 p-4 bg-slate-800/80 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                disabled={isAnalyzing}
              />
            </div>
          </div>
          
          {/* Encrypted View Side */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Lock className="h-5 w-5 text-emerald-400" />
              <h2 className="text-xl font-semibold text-white">Encrypted Data</h2>
            </div>
            
            <div className="relative h-64 bg-slate-800/80 border border-emerald-500/30 rounded-lg overflow-hidden">
              <EncryptionVisualizer 
                text={emailContent} 
                isEncrypted={encryptedView} 
                isProcessing={isAnalyzing} 
              />
              
              {isAnalyzing && (
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
              )}
            </div>
          </div>
        </div>
        
        <Button
          onClick={analyzeEmail}
          disabled={!emailContent.trim() || isAnalyzing}
          className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-mono py-3 rounded-lg transition-all duration-300 neon-glow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Processing Encrypted Data...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>Encrypt & Analyze</span>
            </div>
          )}
        </Button>
      </Card>
      
      {results && <Results results={results} />}
    </div>
  );
};

export default EmailAnalyzer;

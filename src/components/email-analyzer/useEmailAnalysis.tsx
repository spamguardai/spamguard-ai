
import { useState } from 'react';

export const useEmailAnalysis = () => {
  const [emailContent, setEmailContent] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [encryptedView, setEncryptedView] = useState(false);
  const [processingStage, setProcessingStage] = useState<string>('');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [results, setResults] = useState<{
    spamProbability: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    analysisComplete: boolean;
  } | null>(null);

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

  const encryptEmail = async () => {
    if (!emailContent.trim()) return;
    
    setIsEncrypting(true);
    setResults(null);
    setEncryptedView(false);
    setProcessingStage('Encrypting Data');
    setProcessingProgress(0);
    
    // Simulate encryption process
    await simulateProcess(100, 'Encrypting Data');
    
    setEncryptedView(true);
    setIsEncrypting(false);
  };

  const analyzeEmail = async () => {
    if (!emailContent.trim() || !encryptedView) return;
    
    setIsAnalyzing(true);
    setResults(null);
    setProcessingProgress(0);
    
    // Simulate homomorphic computation
    await simulateProcess(50, 'Homomorphic Operations');
    
    // Simulate pattern analysis
    await simulateProcess(50, 'Pattern Analysis');
    
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

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmailContent(e.target.value);
    // Reset results and encrypted view when text changes
    if (results) {
      setResults(null);
    }
    if (encryptedView) {
      setEncryptedView(false);
    }
  };

  return {
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
  };
};

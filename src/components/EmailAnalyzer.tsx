
import { useState } from 'react';
import { Zap, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Results from './Results';

const EmailAnalyzer = () => {
  const [emailContent, setEmailContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<{
    spamProbability: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    analysisComplete: boolean;
  } | null>(null);

  const analyzeEmail = async () => {
    if (!emailContent.trim()) return;
    
    setIsAnalyzing(true);
    setResults(null);
    
    // Simulate AI processing with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    
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

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="p-6 bg-slate-900/70 border-cyan-500/30 cyber-border backdrop-blur-sm">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="h-5 w-5 text-cyan-400" />
            <h2 className="text-xl font-semibold text-white">Email Analysis</h2>
          </div>
          
          <div className="relative">
            <textarea
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              placeholder="Paste your email content here for spam analysis..."
              className="w-full h-64 p-4 bg-slate-800/80 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
              disabled={isAnalyzing}
            />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-slate-800/90 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Loader2 className="h-12 w-12 text-cyan-400 animate-spin mx-auto" />
                  <div className="space-y-2">
                    <p className="text-cyan-400 font-medium">Analyzing Email...</p>
                    <div className="w-64 h-1 bg-slate-700 rounded-full overflow-hidden">
                      <div className="scan-line h-full w-1/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <Button
            onClick={analyzeEmail}
            disabled={!emailContent.trim() || isAnalyzing}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold py-3 rounded-lg transition-all duration-300 neon-glow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>Analyze Email</span>
              </div>
            )}
          </Button>
        </div>
      </Card>
      
      {results && <Results results={results} />}
    </div>
  );
};

export default EmailAnalyzer;

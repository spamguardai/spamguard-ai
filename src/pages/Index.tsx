
import Header from '@/components/Header';
import EmailAnalyzer from '@/components/EmailAnalyzer';
import Footer from '@/components/Footer';
import EncryptionBackground from '@/components/EncryptionBackground';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 matrix-bg relative overflow-hidden">
      <EncryptionBackground />
      <Header />
      
      <main className="py-12 px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center mb-2">
              <span className="px-3 py-1 bg-emerald-900/30 text-emerald-400 text-sm font-mono rounded-full border border-emerald-500/30 animate-pulse">
                Privacy-Preserving Analysis
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white neon-text">
              Advanced Spam Detection
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Powered by homomorphic encryption, SpamGuard AI analyzes email content 
              <span className="text-cyan-400"> while your data stays encrypted throughout the process</span>.
            </p>
          </div>
          
          <div className="flex justify-center">
            <EmailAnalyzer />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

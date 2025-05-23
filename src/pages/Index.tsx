
import Header from '@/components/Header';
import EmailAnalyzer from '@/components/EmailAnalyzer';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 matrix-bg">
      <Header />
      
      <main className="py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold text-white neon-text">
              Advanced Spam Detection
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Powered by cutting-edge AI algorithms, SpamGuard analyzes email content 
              to detect spam, phishing attempts, and malicious content with precision.
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

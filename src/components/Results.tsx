import React from 'react';

interface ResultsProps {
  results: {
    isSpam: 'yes' | 'no';
    analysisComplete: boolean;
  };
}

const Results: React.FC<ResultsProps> = ({ results }) => {
  if (!results.analysisComplete) return null;
  return (
    <div className="w-full flex justify-center mt-6">
      <div className={`px-8 py-6 rounded-xl text-2xl font-bold shadow-lg ${results.isSpam === 'yes' ? 'bg-red-600/80 text-white' : 'bg-emerald-600/80 text-white'}`}
      >
        {results.isSpam === 'yes' ? '스팸입니다' : '스팸이 아닙니다'}
      </div>
    </div>
  );
};

export default Results;

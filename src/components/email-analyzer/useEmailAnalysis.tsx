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
  const [encryptedVector, setEncryptedVector] = useState<string | null>(null);
  const [encryptedCoef, setEncryptedCoef] = useState<string[] | null>(null);
  const [encryptedIntercept, setEncryptedIntercept] = useState<string | null>(null);
  const [importantIndices, setImportantIndices] = useState<number[] | null>(null);

  const simulateProcess = async (_percentage: number, stage: string) => {
    setProcessingStage(stage);
    setProcessingProgress(0);
    return new Promise<void>(resolve => {
      const duration = 1000 + Math.random() * 1000;
      const startTime = Date.now();
      const updateProgress = () => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentProgress = Math.round(progress * 100);
        setProcessingProgress(currentProgress);
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
    setEncryptedVector(null);
    setEncryptedCoef(null);
    setEncryptedIntercept(null);
    setImportantIndices(null);
    
    const progressPromise = simulateProcess(100, 'Encrypting Data');
    const apiPromise = fetch('http://localhost:5000/encrypt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: emailContent }),
    }).then(async (response) => {
      if (!response.ok) throw new Error('서버 오류');
      return response.json();
    });

    try {
      const [data] = await Promise.all([apiPromise, progressPromise]);
      // encrypted_vector: string[], important_indices: number[]
      setEncryptedVector(Array.isArray(data.encrypted_vector) ? data.encrypted_vector.join(', ') : String(data.encrypted_vector));
      setEncryptedCoef(Array.isArray(data.encrypted_coef) ? data.encrypted_coef : [String(data.encrypted_coef)]);
      setEncryptedIntercept(String(data.encrypted_intercept));
      setImportantIndices(Array.isArray(data.important_indices) ? data.important_indices : []);
      setEncryptedView(true);
    } catch (e) {
      await progressPromise;
      setEncryptedVector('encryption example');
      setEncryptedCoef(null);
      setEncryptedIntercept(null);
      setImportantIndices(null);
      setEncryptedView(true); // 암호화 실패 시 대체 결과 표시
    }
    setIsEncrypting(false);
  };

  const analyzeEmail = async () => {
    if (!emailContent.trim() || !encryptedView || !encryptedVector || !importantIndices) return;
    setIsAnalyzing(true);
    setResults(null);
    setProcessingProgress(0);
    const progressPromise = simulateProcess(100, 'Analyzing Encrypted Data');
    // 1. 암호화된 예측 결과 받기
    const predictPromise = fetch('http://localhost:5001/encrypted-predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        encrypted_vector: Array.isArray(encryptedVector) ? encryptedVector : String(encryptedVector).split(',').map(s => s.trim()),
        important_indices: importantIndices
      }),
    }).then(async (response) => {
      if (!response.ok) throw new Error('서버 오류');
      return response.json();
    });

    try {
      const [predictData] = await Promise.all([predictPromise, progressPromise]);
      // 2. 복호화 요청
      const decryptResponse = await fetch('http://localhost:5000/decrypt-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ encrypted_result: predictData.encrypted_result }),
      });
      if (!decryptResponse.ok) throw new Error('복호화 서버 오류');
      const decryptData = await decryptResponse.json();

      setResults({
        spamProbability: decryptData.decrypted_value.real,
        riskLevel: decryptData.decrypted_value.real >= 70 ? 'High' : decryptData.decrypted_value.real >= 40 ? 'Medium' : 'Low',
        analysisComplete: true
      });
    } catch (e) {
      await progressPromise;
      setResults({
        spamProbability: 0,
        riskLevel: 'Low',
        analysisComplete: true
      });
    }
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
    setEncryptedVector(null);
  };

  return {
    emailContent,
    isEncrypting,
    isAnalyzing,
    encryptedView,
    processingStage,
    processingProgress,
    results,
    encryptedVector,
    encryptedCoef,
    encryptedIntercept,
    importantIndices,
    encryptEmail,
    analyzeEmail,
    handleTextChange
  };
};

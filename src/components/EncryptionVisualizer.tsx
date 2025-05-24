import React, { useEffect, useRef } from 'react';

interface EncryptionVisualizerProps {
  text: string;
  isEncrypted: boolean;
  isProcessing: boolean;
}

const EncryptionVisualizer: React.FC<EncryptionVisualizerProps> = ({ 
  text
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // Set canvas dimensions to match parent container
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '14px monospace';
    // Split text into lines and draw
    const lines = text ? text.split('\n') : ['Encrypted data will appear here...'];
    const lineHeight = 20;
    lines.forEach((line, i) => {
      if (i < 15) {
        const displayLine = line.length > 50 ? line.substring(0, 50) + '...' : line;
        ctx.fillText(displayLine, 20, 30 + (i * lineHeight));
      } else if (i === 15) {
        ctx.fillText('...', 20, 30 + (i * lineHeight));
      }
    });
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [text]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full"
    />
  );
};

export default EncryptionVisualizer;

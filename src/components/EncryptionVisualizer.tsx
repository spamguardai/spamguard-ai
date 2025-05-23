
import React, { useEffect, useRef } from 'react';

interface EncryptionVisualizerProps {
  text: string;
  isEncrypted: boolean;
  isProcessing: boolean;
}

const EncryptionVisualizer: React.FC<EncryptionVisualizerProps> = ({ 
  text, 
  isEncrypted,
  isProcessing
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
    
    if (!text) {
      // Draw placeholder text if no input
      ctx.fillStyle = 'rgba(100, 100, 100, 0.3)';
      ctx.font = '14px monospace';
      ctx.fillText('Encrypted data will appear here...', 20, 30);
      return;
    }
    
    // Draw the visualization based on encryption state
    if (isEncrypted) {
      // Matrix/grid visualization for encrypted data
      const blockSize = 12;
      const padding = 2;
      const totalSize = blockSize + padding;
      
      const cols = Math.floor(canvas.width / totalSize);
      const rows = Math.floor(canvas.height / totalSize);
      
      // Convert text to numerical values
      const values = text.split('').map(char => char.charCodeAt(0));
      
      // Fill in blocks based on character values
      for (let i = 0; i < Math.min(values.length, rows * cols); i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        
        const x = col * totalSize + padding;
        const y = row * totalSize + padding;
        
        const value = values[i];
        const hue = (value % 120) + 120; // Green to blue range
        const opacity = isProcessing ? 
          0.3 + 0.4 * Math.sin((Date.now() / 1000 + i) % Math.PI) : 
          0.7;
          
        ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${opacity})`;
        
        if (isProcessing && Math.random() > 0.85) {
          // Some blocks appear to be processing
          ctx.fillStyle = 'rgba(255, 193, 7, 0.6)'; // Amber for processing
        }
        
        ctx.fillRect(x, y, blockSize, blockSize);
        
        // Add binary or hex representation
        if (blockSize > 8) {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
          ctx.font = '6px monospace';
          // Show hex value
          const hex = value.toString(16).padStart(2, '0');
          ctx.fillText(hex, x + 2, y + 8);
        }
      }
      
      // Add mathematical symbols overlay for processing animation
      if (isProcessing) {
        const symbols = "⊕⊗∧∨⊂⊃∀∃∈∑∏";
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.font = '18px monospace';
        
        for (let i = 0; i < 5; i++) {
          const symbol = symbols[Math.floor(Math.random() * symbols.length)];
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          ctx.fillText(symbol, x, y);
        }
      }
      
    } else {
      // Simple text preview with monospace font
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '14px monospace';
      
      // Split text into lines and draw
      const lines = text.split('\n');
      const lineHeight = 20;
      
      lines.forEach((line, i) => {
        // Display only first few lines with truncation
        if (i < 15) {
          const displayLine = line.length > 50 ? line.substring(0, 50) + '...' : line;
          ctx.fillText(displayLine, 20, 30 + (i * lineHeight));
        } else if (i === 15) {
          ctx.fillText('...', 20, 30 + (i * lineHeight));
        }
      });
    }
    
    // Animation loop for processing effects
    let animationId: number | null = null;
    
    if (isProcessing && isEncrypted) {
      const animate = () => {
        // Redraw with subtle changes
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1.0;
        
        // Data flow lines
        ctx.strokeStyle = 'rgba(0, 200, 100, 0.2)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < 3; i++) {
          const y = Math.random() * canvas.height;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
        
        animationId = requestAnimationFrame(animate);
      };
      
      animate();
    }
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
      }
    };
    
  }, [text, isEncrypted, isProcessing]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full"
    />
  );
};

export default EncryptionVisualizer;


import React, { useEffect, useRef } from 'react';

const EncryptionBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Matrix symbols
    const symbols = "αβγδεζηθικλμνξπρστυφχψωΓΔΘΛΞΠΣΦΨΩ∀∂∃∈∑∏√∞∫≈≠≡≤≥⊂⊃⊆⊇∧∨¬∩∪⊕⊗";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Array to track each column's y position
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }
    
    // Drawing function
    const draw = () => {
      // Create semi-transparent black layer to create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set text styles for matrix effect
      ctx.fillStyle = 'rgba(39, 174, 96, 0.35)'; // Matrix green with lower opacity
      ctx.font = `${fontSize}px monospace`;
      
      // Loop through drops
      for (let i = 0; i < drops.length; i++) {
        const text = symbols.charAt(Math.floor(Math.random() * symbols.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Reset when it reaches bottom of screen with randomization
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Increment y coordinate
        drops[i]++;
      }
      
      // Occasionally draw encryption formulas
      if (Math.random() > 0.997) {
        const formula = ["E(a+b) = E(a) ⊕ E(b)", "E(a×b) = E(a) ⊗ E(b)", "∀m,r: E(m,r) = g^m·r^n mod n²"][Math.floor(Math.random() * 3)];
        ctx.fillStyle = 'rgba(255, 193, 7, 0.15)'; // Amber with low opacity
        ctx.font = `${fontSize * 1.5}px monospace`;
        ctx.fillText(formula, Math.random() * canvas.width * 0.8, Math.random() * canvas.height);
      }
    };
    
    // Animation loop
    const interval = setInterval(draw, 50);
    
    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 opacity-25" style={{ zIndex: 0 }} />;
};

export default EncryptionBackground;

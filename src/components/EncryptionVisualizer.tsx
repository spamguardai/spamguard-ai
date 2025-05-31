import React, { useEffect, useRef } from 'react';

interface EncryptionVisualizerProps {
  text: string;
  isEncrypted: boolean;
  isProcessing: boolean;
}

const EncryptionVisualizer: React.FC<EncryptionVisualizerProps> = ({
  text,
  isEncrypted,
  isProcessing,
}) => {
  const divRef = useRef<HTMLDivElement>(null);



  let displayText: string;
  if (isEncrypted) {
    if (text) {
      const lines = [];
      for (let i = 0; i < text.length; i += 50) {
        lines.push(text.substring(i, i + 50));
      }
      displayText = lines.join('\n');
    } else {
      displayText = 'Encrypted data will appear here...';
    }
  } else {
    displayText = text || 'Encrypted data will appear here...';
  }

  return (
    <div
      ref={divRef}
      className="w-full h-full p-4 text-white font-mono whitespace-pre-wrap break-all overflow-auto"
    >
      {displayText}
    </div>
  );
};

export default EncryptionVisualizer;

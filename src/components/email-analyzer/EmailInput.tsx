
import React from 'react';
import { Shield } from 'lucide-react';

interface EmailInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled: boolean;
}

const EmailInput = ({ value, onChange, disabled }: EmailInputProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Shield className="h-5 w-5 text-cyan-400" />
        <h2 className="text-xl font-semibold text-white">Email Content</h2>
      </div>
      
      <div className="relative">
        <textarea
          value={value}
          onChange={onChange}
          placeholder="Paste your email content here for secure analysis..."
          className="w-full h-64 p-4 bg-slate-800/80 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default EmailInput;

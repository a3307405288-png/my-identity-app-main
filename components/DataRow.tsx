import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { DataItemProps } from '../types';

interface CopyButtonProps {
  text: string;
  isCopied: boolean;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text, isCopied }) => {
  return (
    <button 
      className={`
        ml-2 p-1.5 rounded-md transition-all duration-300 transform
        ${isCopied ? 'bg-green-100 text-green-600 scale-110' : 'text-slate-300 hover:bg-slate-100 hover:text-slate-600'}
      `}
      aria-label="Copy to clipboard"
    >
      {isCopied ? <Check size={14} className="animate-bounce" /> : <Copy size={14} />}
    </button>
  );
};

export const DataItem: React.FC<DataItemProps> = ({ icon: Icon, label, value }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleCopy = () => {
    // Create flash effect
    setIsClicked(true);
    
    // Copy logic
    if (navigator.clipboard && navigator.clipboard.writeText) {
       navigator.clipboard.writeText(value).catch(err => console.error("Clipboard write failed", err));
    } else {
        // Fallback
        const textArea = document.createElement("textarea");
        textArea.value = value;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Copy failed', err);
        }
        document.body.removeChild(textArea);
    }

    // Reset flash effect
    setTimeout(() => setIsClicked(false), 800);
  };

  return (
    <div 
      onClick={handleCopy}
      className={`
        flex items-center justify-between py-3 border-b border-slate-50 last:border-0 group cursor-pointer
        transition-colors duration-500 ease-out select-none
        ${isClicked ? 'bg-blue-50/80' : 'bg-transparent hover:bg-slate-50/50'}
      `}
    >
      <div className="flex items-center gap-3 pl-2">
        <div className={`
          w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300
          ${isClicked ? 'bg-blue-100 text-blue-600 scale-110 rotate-3' : 'bg-slate-50 text-slate-400 group-hover:text-blue-500 group-hover:bg-blue-50 group-hover:scale-105'}
        `}>
          <Icon size={16} className="transition-transform duration-300" />
        </div>
        <div>
          <div className="text-xs font-medium text-slate-400 mb-0.5 transition-colors group-hover:text-blue-400">{label}</div>
          <div className={`text-sm font-semibold tracking-tight transition-colors ${isClicked ? 'text-blue-700' : 'text-slate-800'}`}>{value}</div>
        </div>
      </div>
      <div className="pr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
         <CopyButton text={value} isCopied={isClicked} />
      </div>
    </div>
  );
};
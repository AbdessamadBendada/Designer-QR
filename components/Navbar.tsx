"use client";

import { Coffee } from 'lucide-react';

export default function Navbar() {
  const bmacUrl = "buymeacoffee.com/abdessamadbendada"; 
  return (
    <nav className="w-full py-4 px-8 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
          QR
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-900">DesignerQR</span>
      </div>

      <a 
        href={bmacUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#FFDD00] hover:bg-[#ffea00] text-black px-4 py-2 rounded-full font-bold text-sm transition-all hover:scale-105 shadow-sm"
      >
        <Coffee size={18} />
        <span className="hidden sm:inline">Buy me a coffee</span>
      </a>
    </nav>
  );
}
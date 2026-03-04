"use client";

import { Heart } from 'lucide-react';

export default function SupportButton() {
  const bmacUrl = "buymeacoffee.com/abdessamadbendada"; 

  return (
    <a 
      href={bmacUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-white text-slate-800 p-3 rounded-full shadow-2xl border border-gray-200 hover:bg-gray-50 transition-all group"
    >
      <div className="bg-red-50 p-2 rounded-full group-hover:bg-red-100 transition-colors">
        <Heart size={20} className="text-red-500 fill-red-500" />
      </div>
      <span className="pr-2 font-semibold text-sm">Support this tool</span>
    </a>
  );
}
"use client";

import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';

export default function QRGenerator() {
  const [url, setUrl] = useState('https://google.com');
  
  // Color States
  const [color, setColor] = useState('#2563eb'); // Primary Color
  const [isGradient, setIsGradient] = useState(false);
  const [color2, setColor2] = useState('#9333ea'); // Secondary Color
  const [rotation, setRotation] = useState(0);
  const [bgColor, setBgColor] = useState('#ffffff');
  
  const [logo, setLogo] = useState<string | undefined>(undefined);
  
  const ref = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    qrCode.current = new QRCodeStyling({
      width: 300,
      height: 300,
      data: url,
      dotsOptions: { type: "rounded" },
      backgroundOptions: { color: bgColor },
      imageOptions: { crossOrigin: "anonymous", margin: 8 }
    });

    if (ref.current) {
      qrCode.current.append(ref.current);
    }
  }, []);

  // Logic to update the QR code with Gradient support
  useEffect(() => {
    if (!qrCode.current) return;

    const dotOptions = isGradient ? {
      gradient: {
        type: "linear" as const,
        rotation: (rotation * Math.PI) / 180,
        colorStops: [
          { offset: 0, color: color },
          { offset: 1, color: color2 }
        ]
      }
    } : {
      color: color,
      gradient: undefined // Reset gradient if disabled
    };

    qrCode.current.update({
      data: url,
      image: logo,
      dotsOptions: dotOptions,
      backgroundOptions: { color: bgColor }
    });
  }, [url, color, color2, isGradient, rotation, bgColor, logo]);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const download = () => qrCode.current?.download({ name: "designer-qr", extension: "png" });

  return (
    <div className="flex flex-col lg:flex-row gap-10 items-start bg-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 max-w-5xl w-full">
      
      {/* LEFT SIDE: CONTROLS */}
      <div className="flex-1 space-y-8 w-full">
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-800">Design Settings</h2>
          <p className="text-slate-500 text-sm">Customize the look and feel of your QR code.</p>
        </div>
        
        <div className="space-y-6">
          {/* URL Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Destination URL</label>
            <input 
              type="text"
              className="w-full p-4 border-2 border-slate-100 rounded-2xl bg-slate-50 text-black outline-none focus:border-blue-500 transition-all font-medium"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          {/* Color Section */}
          <div className="p-6 bg-slate-50 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-700">Enable Gradient</label>
              <input 
                type="checkbox" 
                className="w-5 h-5 accent-blue-600"
                checked={isGradient}
                onChange={(e) => setIsGradient(e.target.checked)}
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                  {isGradient ? 'Start Color' : 'QR Color'}
                </label>
                <input 
                  type="color"
                  className="w-full h-12 rounded-xl cursor-pointer bg-white p-1 border border-slate-200"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>

              {isGradient && (
                <div className="flex-1 animate-in fade-in slide-in-from-left-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">End Color</label>
                  <input 
                    type="color"
                    className="w-full h-12 rounded-xl cursor-pointer bg-white p-1 border border-slate-200"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                  />
                </div>
              )}
            </div>

            {isGradient && (
               <div className="pt-2 animate-in fade-in">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Gradient Rotation: {rotation}°</label>
                  <input 
                    type="range" min="0" max="360" 
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    value={rotation}
                    onChange={(e) => setRotation(parseInt(e.target.value))}
                  />
               </div>
            )}
          </div>

          {/* Logo & BG */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Background Color</label>
              <input 
                type="color"
                className="w-full h-12 rounded-xl cursor-pointer bg-white p-1 border border-slate-200"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Center Logo</label>
              <input 
                type="file"
                accept="image/*"
                className="block w-full text-xs text-slate-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                onChange={onImageChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: PREVIEW */}
      <div className="lg:w-[380px] w-full flex flex-col items-center justify-center bg-slate-900 p-8 rounded-[2rem] shadow-inner relative overflow-hidden">
        {/* Decorative background for the preview area */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 bg-white p-4 rounded-3xl shadow-2xl">
          <div ref={ref} />
        </div>
        
        <button 
          onClick={download}
          className="relative z-10 mt-8 w-full bg-blue-600 text-white font-black py-4 px-8 rounded-2xl hover:bg-blue-500 transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-blue-900/20"
        >
          Download QR Code
        </button>
        <p className="relative z-10 text-[10px] text-slate-400 mt-4 uppercase tracking-[0.3em] font-black">High-Res PNG</p>
      </div>
    </div>
  );
}
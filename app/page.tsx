import QRGenerator from '@/components/QRGenerator';
import Navbar from '@/components/Navbar';
import SupportButton from '@/components/SupportButton';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="flex flex-col items-center py-12 px-6">
        {/* Header Section */}
        <div className="max-w-2xl text-center mb-12">
          <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em]">
            Free Designer Tool
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mt-4 tracking-tighter">
            Branded <span className="text-blue-600">QR</span> Codes.
          </h1>
          <p className="text-slate-500 text-lg mt-6 leading-relaxed">
            Create high-end QR codes with gradients and your own logo. 
            Perfect for menus, business cards, and social media.
          </p>
        </div>

        {/* The Generator Tool */}
        <QRGenerator />

        {/* Info/Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl text-center pb-20">
          <div>
            <div className="text-2xl mb-2">🎨</div>
            <h3 className="font-bold text-slate-800">Gradient Colors</h3>
            <p className="text-sm text-slate-500 mt-2">Pick two colors and create a smooth linear gradient for your QR.</p>
          </div>
          <div>
            <div className="text-2xl mb-2">🖼️</div>
            <h3 className="font-bold text-slate-800">Custom Logo</h3>
            <p className="text-sm text-slate-500 mt-2">Upload your PNG logo to make your QR code instantly recognizable.</p>
          </div>
          <div>
            <div className="text-2xl mb-2">💾</div>
            <h3 className="font-bold text-slate-800">PNG Export</h3>
            <p className="text-sm text-slate-500 mt-2">Download high-quality images ready for your website or print.</p>
          </div>
        </div>
      </main>

      <SupportButton />
    </div>
  );
}
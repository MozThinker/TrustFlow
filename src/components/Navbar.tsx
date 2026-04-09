import { Shield, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  onReset: () => void;
  showReset: boolean;
}

export default function Navbar({ onReset, showReset }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onReset}>
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">TrustFlow</span>
          </div>
          
          {showReset && (
            <button
              onClick={onReset}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Selection
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

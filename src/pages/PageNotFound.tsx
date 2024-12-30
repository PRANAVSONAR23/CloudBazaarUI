import { Rocket, Stars } from 'lucide-react';

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <Stars 
            key={i}
            className="absolute animate-pulse text-white opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative">
        <div className="text-center space-y-6">
          <Rocket size={80} className="mx-auto text-blue-400 animate-bounce" />
          
          <h1 className="text-8xl font-black text-white">
            4<span className="text-blue-400">0</span>4
          </h1>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Houston, we have a problem!</h2>
            <p className="text-blue-200">This page seems to have drifted into deep space</p>
          </div>

          <button 
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/50"
          >
            Return to Earth
          </button>
        </div>

        {/* Orbital ring */}
        <div className="absolute -inset-16 border-4 border-blue-400/20 rounded-full animate-spin-slow" />
      </div>
    </div>
  );
};

export default PageNotFound;